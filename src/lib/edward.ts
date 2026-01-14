'use server';

import { db } from '@/lib/db';
import { tools } from '@/drizzle/schema';
import { eq, and, desc, gt, sql } from 'drizzle-orm';
import { OutreachTarget, generateEdwardEmail } from './edward-shared';

/**
 * Edward's Intelligence Layer: Finding the best leads to contact.
 */
export async function getEdwardProspects(limit: number = 10): Promise<OutreachTarget[]> {
  try {
    // Edward looks for tools that satisfy:
    // 1. Not verified
    // 2. High search signal (> 1000)
    // 3. Haven't been contacted in the last 30 days
    const prospects = await db
      .select({
        id: tools.id,
        name: tools.name,
        slug: tools.slug,
        contactEmail: tools.contactEmail,
        searchVolumeSignal: tools.searchVolumeSignal,
      })
      .from(tools)
      .where(
        and(
          eq(tools.isVerified, false),
          gt(tools.searchVolumeSignal, 1000),
          // Add logic for lastOutreachAt null or older than 30 days
          sql`${tools.lastOutreachAt} IS NULL OR ${tools.lastOutreachAt} < NOW() - INTERVAL '30 days'`
        )
      )
      .orderBy(desc(tools.searchVolumeSignal))
      .limit(limit);

    return prospects.map(p => ({
      ...p,
      reason: `High search volume signal (${p.searchVolumeSignal}) with unclaimed listing status.`
    }));
  } catch (error) {
    console.error('Edward Discovery Error:', error);
    return [];
  }
}

/**
 * Edward's Delivery System: Sending the email via Resend API.
 */
export async function sendEdwardOutreach(targetId: string): Promise<{ success: boolean; message: string }> {
  try {
    const target = (await db.select().from(tools).where(eq(tools.id, targetId)).limit(1))[0];
    
    if (!target || !target.contactEmail) {
      return { success: false, message: 'Prospect data incomplete (missing email).' };
    }

    const { subject, body } = generateEdwardEmail({
      id: target.id,
      name: target.name,
      slug: target.slug,
      contactEmail: target.contactEmail,
      searchVolumeSignal: target.searchVolumeSignal,
      reason: 'Automated Outreach',
    });

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.warn('RESEND_API_KEY not found. Mocking successful delivery for development.');
      // Simulate delay
      await new Promise(r => setTimeout(r, 1000));
    } else {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          from: 'Edward <edward@mail.googleantigravity.directory>',
          to: target.contactEmail,
          subject: subject,
          text: body,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Resend API failure');
      }
    }

    // Update tracking
    await db
      .update(tools)
      .set({ lastOutreachAt: new Date(), updatedAt: new Date() })
      .where(eq(tools.id, targetId));

    return { success: true, message: `Edward successfully delivered the pitch to ${target.name}.` };
  } catch (error) {
    console.error('Edward Delivery Error:', error);
    return { success: false, message: 'Edward encountered a system blockage during delivery.' };
  }
}
