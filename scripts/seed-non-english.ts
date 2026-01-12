import postgres from 'postgres';
import { config } from 'dotenv';
import { resolve } from 'path';
import { v4 as uuidv4 } from 'uuid';

config({ path: resolve(process.cwd(), '.env.local') });

const sql = postgres(process.env.DATABASE_URL!, { prepare: false });

/**
 * Restoration Seed: The Multi-Lingual Hub
 * This script seeds non-English resources to be restored and then translated.
 * Includes Spanish, French, Italian, and Chinese technical resources.
 */

async function seed() {
  console.log('🌍 Seeding Multi-Lingual Resources (Restoration Pass)...');

  try {
    // 1. Fetch Categories
    const categoriesList = await sql`SELECT id, slug FROM categories`;
    const getCatId = (slug: string) => categoriesList.find(c => c.slug === slug)?.id;

    const mcpCatId = getCatId('mcp-servers');
    const promptCatId = getCatId('prompts');
    const rulesCatId = getCatId('rules');

    if (!mcpCatId || !promptCatId || !rulesCatId) {
      console.error('❌ Missing categories. Run category seeding first.');
      process.exit(1);
    }

    // 2. Fetch Admin User
    const [admin] = await sql`SELECT id FROM users WHERE role = 'ADMIN' LIMIT 1`;
    const adminId = admin?.id || 'default-admin-id';

    const resourcesToInsert = [
      // SPANISH
      {
        name: 'Servidor MCP de Google Maps (ES)',
        slug: 'mcp-google-maps-es',
        desc: 'Busca lugares, obtén direcciones y explora el mundo a través de la API de Google Maps dentro de tu IA.',
        url: 'https://github.com/model-context-protocol/servers/tree/main/src/google-maps',
        catId: mcpCatId,
      },
      {
        name: 'Prompt para Arquitecto de Sistemas Senior',
        slug: 'prompt-architect-es',
        desc: 'Instrucciones de ingeniería de alta fidelidad para flujos de trabajo de arquitectura de sistemas distribuidos.',
        url: 'https://googleantigravity.directory/submit',
        catId: promptCatId,
      },
      // FRENCH
      {
        name: 'Serveur MCP PostgreSQL (FR)',
        slug: 'mcp-postgres-fr',
        desc: 'Interagissez avec n\'importe quelle base de données PostgreSQL. Exécutez des requêtes et gérez les données efficacement.',
        url: 'https://github.com/model-context-protocol/servers/tree/main/src/postgres',
        catId: mcpCatId,
      },
      {
        name: 'Guide d\'Ingénierie de Prompts',
        slug: 'prompt-guide-fr',
        desc: 'Un guide complet pour optimiser les interactions avec les modèles de langage de pointe.',
        url: 'https://googleantigravity.directory/submit',
        catId: promptCatId,
      },
      // ITALIAN
      {
        name: 'Regole Standard per TypeScript',
        slug: 'rule-typescript-it',
        desc: 'Configurazione .cursorrules pronta per la produzione per progetti enterprise TypeScript.',
        url: 'https://github.com/features/copilot',
        catId: rulesCatId,
      },
      // CHINESE (Simplified)
      {
        name: '智能系统架构师提示词',
        slug: 'prompt-architect-zh',
        desc: '为大型分布式系统设计的全面系统指令提示词，具有高可用性。',
        url: 'https://googleantigravity.directory/submit',
        catId: promptCatId,
      }
    ];

    console.log(`📦 Prepared ${resourcesToInsert.length} non-English resources.`);

    for (const res of resourcesToInsert) {
      await sql`
        INSERT INTO resources (
          id, title, slug, description, url, category_id, author_id, 
          verified, featured, github_stars, github_forks, is_indexed, last_validated_at
        ) VALUES (
          ${uuidv4()}, 
          ${res.name}, 
          ${res.slug}, 
          ${res.desc}, 
          ${res.url}, 
          ${res.catId}, 
          ${adminId},
          true,
          false,
          0,
          0,
          false, -- Not indexed until translated
          NOW()
        )
        ON CONFLICT (slug) DO UPDATE SET
          title = EXCLUDED.title,
          description = EXCLUDED.description
      `;
      console.log(`✅ Seeded: ${res.name}`);
    }

    console.log('🏁 Restoration Seed complete!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  } finally {
    await sql.end();
  }
}

seed();
