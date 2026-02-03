'use server';

import { db } from '@/lib/db';
import { users } from '@/drizzle/schema';
import personas from '../data/seed-personas.json';
import { v4 as uuidv4 } from 'uuid';

export async function runSeeding() {
  console.log('--- STARTING SEEDING MATRIX ---');
  
  for (const persona of personas) {
    try {
      await db.insert(users).values({
        id: uuidv4(),
        name: persona.name,
        username: persona.username,
        tagline: persona.tagline,
        bio: persona.bio,
        location: persona.location,
        image: `https://api.dicebear.com/7.x/avataaars/svg?seed=${persona.username}`,
        githubUsername: persona.githubUsername || null,
        twitterHandle: persona.twitterHandle || null,
        linkedinUrl: persona.linkedinUrl || null,
        profileCompletionScore: persona.profileCompletionScore,
        publicProfile: true,
        email: `${persona.username}@antigravity-seed.local`,
        createdAt: new Date(Date.now() - Math.random() * 1000000000), // Random past date
      });
      console.log(`[SEED] Inserted ${persona.username}`);
    } catch (error) {
      console.error(`[SEED ERROR] Failed to insert ${persona.username}:`, error);
    }
  }

  console.log('--- SEEDING MATRIX COMPLETE ---');
}
