'use server';

/**
 * Contact enrichment utilities using Apollo.io API
 */

export interface EnrichmentStats {
  total: number;
  enriched: number;
  failed: number;
  skipped: number;
  creditsUsed: number;
}

/**
 * Enriches contact emails for unverified resources
 * NOTE: This is a placeholder implementation. Full implementation requires Apollo.io API setup.
 */
import { db } from '@/lib/db';
import { tools, users } from '@/drizzle/schema';
import { eq, isNull, desc, and } from 'drizzle-orm';
import { findContactEmail } from './apollo';
import { auth } from '@/auth';

export async function enrichContactsForUnverifiedTools(limit: number = 5): Promise<EnrichmentStats> {
  // Authorization check
  const session = await auth();
  if (!session?.user) {
    throw new Error('Unauthorized');
  }

  // Double check admin role in DB for security
  const [user] = await db.select().from(users).where(eq(users.id, session.user.id!)).limit(1);
  if (!user || user.role !== 'ADMIN') {
    throw new Error('Forbidden: Admin access required');
  }

  const stats: EnrichmentStats = {
    total: 0,
    enriched: 0,
    failed: 0,
    skipped: 0,
    creditsUsed: 0
  };

  try {
    // 1. Fetch unverified tools missing contact email
    const targets = await db
      .select()
      .from(tools)
      .where(
        and(
          eq(tools.isVerified, false),
          isNull(tools.contactEmail)
        )
      )
      .orderBy(desc(tools.searchVolumeSignal))
      .limit(limit);

    stats.total = targets.length;

    if (targets.length === 0) return stats;

    // 2. Process each target
    for (const target of targets) {
      try {
        if (!target.website) {
          stats.failed++;
          continue;
        }

        // Extract domain
        let domain = target.website;
        try {
          const urlObj = new URL(target.website);
          domain = urlObj.hostname.replace('www.', '');
        } catch (e) {
          // Fallback if not a full URL
          domain = target.website.replace('https://', '').replace('http://', '').replace('www.', '').split('/')[0];
        }

        // 3. Find email using Apollo
        const result = await findContactEmail(domain, target.name);
        stats.creditsUsed += result.creditsUsed || 0;

        if (result.success && result.email) {
          // 4. Update database
          await db
            .update(tools)
            .set({ 
              contactEmail: result.email,
              updatedAt: new Date()
            })
            .where(eq(tools.id, target.id));
          
          stats.enriched++;
        } else {
          stats.failed++;
        }
      } catch (e) {
        console.error(`Error enriching ${target.name}:`, e);
        stats.failed++;
      }
    }

    return stats;
  } catch (error) {
    console.error('Enrichment engine failure:', error);
    throw error;
  }
}
