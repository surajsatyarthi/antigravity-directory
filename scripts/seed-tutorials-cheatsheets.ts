import postgres from 'postgres';
import { config } from 'dotenv';
import { resolve } from 'path';
import { v4 as uuidv4 } from 'uuid';

config({ path: resolve(process.cwd(), '.env.local') });

const sql = postgres(process.env.DATABASE_URL!, { ssl: 'require', prepare: false });

const tutorials = [
  {
    slug: 'tutorial-what-is-mcp',
    title: 'What is the Model Context Protocol?',
    description: 'Official introduction to the Model Context Protocol (MCP) — what it is, why it exists, and how it connects AI models to the tools and data they need.',
    url: 'https://modelcontextprotocol.io/introduction',
  },
  {
    slug: 'tutorial-building-mcp-with-llms',
    title: 'Building MCP with LLMs',
    description: 'Learn how to use LLMs to accelerate your MCP server development. A practical tutorial from the official MCP documentation.',
    url: 'https://modelcontextprotocol.io/tutorials/building-mcp-with-llms',
  },
  {
    slug: 'tutorial-build-mcp-server-dev-guide',
    title: 'Build an MCP Server (Developer Guide)',
    description: 'Step-by-step developer guide to building your own MCP server from scratch, with code examples and best practices.',
    url: 'https://modelcontextprotocol.io/docs/develop/build-server',
  },
  {
    slug: 'tutorial-build-mcp-client',
    title: 'Build an MCP Client',
    description: 'Learn how to build an LLM-powered chatbot client that connects to MCP servers, from the official MCP documentation.',
    url: 'https://modelcontextprotocol.io/docs/develop/build-client',
  },
  {
    slug: 'tutorial-mcp-server-quickstart',
    title: 'MCP Server Quickstart',
    description: 'Get started quickly building your own MCP server to use in Claude for Desktop and other clients. Official quickstart guide.',
    url: 'https://modelcontextprotocol.io/quickstart/server',
  },
  {
    slug: 'tutorial-mcp-client-quickstart',
    title: 'MCP Client Quickstart',
    description: 'Quickstart guide to building your first MCP client integration, with practical examples from the official MCP docs.',
    url: 'https://modelcontextprotocol.io/quickstart/client',
  },
  {
    slug: 'tutorial-connect-local-mcp-servers',
    title: 'Connect to Local MCP Servers',
    description: 'Learn how to extend Claude Desktop with local MCP servers to enable file system access and other powerful integrations.',
    url: 'https://modelcontextprotocol.io/quickstart/user',
  },
  {
    slug: 'tutorial-get-started-claude',
    title: 'Get Started with Claude',
    description: "Anthropic's official getting started guide for building with Claude. Covers setup, first API call, and key concepts.",
    url: 'https://platform.claude.com/docs/en/get-started',
  },
  {
    slug: 'tutorial-tool-use-claude',
    title: 'Tool Use with Claude',
    description: 'Learn how to enable Claude to call external tools and functions. Official guide covering tool definitions, schemas, and response handling.',
    url: 'https://platform.claude.com/docs/en/docs/build-with-claude/tool-use/overview',
  },
  {
    slug: 'tutorial-extended-thinking',
    title: 'Building with Extended Thinking',
    description: "How to use Claude's extended thinking feature to solve complex problems with deeper reasoning. Official Anthropic tutorial.",
    url: 'https://platform.claude.com/docs/en/docs/build-with-claude/extended-thinking',
  },
  {
    slug: 'tutorial-claude-prompting-best-practices',
    title: 'Claude Prompting Best Practices',
    description: 'Official Anthropic guide to prompting Claude effectively — covering clarity, examples, chain-of-thought, and common mistakes.',
    url: 'https://platform.claude.com/docs/en/docs/build-with-claude/prompt-engineering/claude-prompting-best-practices',
  },
  {
    slug: 'tutorial-computer-use',
    title: 'Computer Use Tool',
    description: "Tutorial for using Claude's computer use capability — how to give Claude control of a desktop environment to complete tasks.",
    url: 'https://platform.claude.com/docs/en/docs/build-with-claude/computer-use',
  },
  {
    slug: 'tutorial-files-api',
    title: 'Files API',
    description: 'Learn how to upload and use files with Claude via the Files API. Covers supported formats, upload process, and referencing files in prompts.',
    url: 'https://platform.claude.com/docs/en/docs/build-with-claude/files',
  },
  {
    slug: 'tutorial-vision-claude',
    title: 'Vision with Claude',
    description: 'How to send images to Claude and use its vision capabilities. Covers image formats, base64 encoding, and multimodal workflows.',
    url: 'https://platform.claude.com/docs/en/docs/build-with-claude/vision',
  },
  {
    slug: 'tutorial-batch-processing',
    title: 'Batch Processing with Claude',
    description: 'How to use the Message Batches API to process large volumes of requests asynchronously at 50% cost reduction.',
    url: 'https://platform.claude.com/docs/en/docs/build-with-claude/batch-processing',
  },
];

const cheatsheets = [
  {
    slug: 'cheatsheet-prompt-engineering-overview',
    title: 'Prompt Engineering Overview',
    description: 'Quick reference for prompt engineering with Claude — core techniques, principles, and when to use each approach.',
    url: 'https://platform.claude.com/docs/en/docs/build-with-claude/prompt-engineering/overview',
  },
  {
    slug: 'cheatsheet-mcp-architecture',
    title: 'MCP Architecture Overview',
    description: 'Concise reference for the Model Context Protocol architecture — hosts, clients, servers, and how they interact.',
    url: 'https://modelcontextprotocol.io/docs/learn/architecture',
  },
  {
    slug: 'cheatsheet-claude-models',
    title: 'Claude Models Overview',
    description: 'Quick reference for all Claude models — Opus, Sonnet, Haiku — with model IDs, capabilities, and context window sizes.',
    url: 'https://platform.claude.com/docs/en/docs/about-claude/models/overview',
  },
  {
    slug: 'cheatsheet-mcp-tools',
    title: 'MCP Tools Reference',
    description: 'Reference guide for MCP Tools — how servers expose callable functions to LLMs, tool schemas, and execution patterns.',
    url: 'https://modelcontextprotocol.io/docs/concepts/tools',
  },
  {
    slug: 'cheatsheet-mcp-resources',
    title: 'MCP Resources Reference',
    description: 'Reference guide for MCP Resources — how servers expose data and content that clients can read and use as context.',
    url: 'https://modelcontextprotocol.io/docs/concepts/resources',
  },
  {
    slug: 'cheatsheet-mcp-prompts',
    title: 'MCP Prompts Reference',
    description: 'Reference for MCP Prompts — reusable prompt templates and workflows that servers expose to clients and users.',
    url: 'https://modelcontextprotocol.io/docs/concepts/prompts',
  },
  {
    slug: 'cheatsheet-mcp-specification',
    title: 'MCP Specification',
    description: 'The official Model Context Protocol specification — full protocol reference for implementors building MCP clients and servers.',
    url: 'https://modelcontextprotocol.io/specification/latest',
  },
  {
    slug: 'cheatsheet-claude-api-overview',
    title: 'Claude API Overview',
    description: 'Quick reference for getting started with the Claude API — authentication, base URL, required headers, and first request.',
    url: 'https://platform.claude.com/docs/en/api/getting-started',
  },
  {
    slug: 'cheatsheet-rate-limits',
    title: 'Claude API Rate Limits',
    description: 'Reference for Claude API rate limits by tier — requests per minute, tokens per minute, and how to handle 429 errors.',
    url: 'https://platform.claude.com/docs/en/api/rate-limits',
  },
  {
    slug: 'cheatsheet-client-sdks',
    title: 'Claude Client SDKs',
    description: 'Reference for official Claude SDKs — Python, TypeScript/Node.js — with install commands and quick examples.',
    url: 'https://platform.claude.com/docs/en/api/client-sdks',
  },
  {
    slug: 'cheatsheet-structured-outputs',
    title: 'Structured Outputs with Claude',
    description: 'How to get Claude to return structured JSON — tool use patterns, schema definitions, and parsing responses reliably.',
    url: 'https://platform.claude.com/docs/en/docs/build-with-claude/structured-outputs',
  },
  {
    slug: 'cheatsheet-mcp-example-clients',
    title: 'MCP Example Clients',
    description: 'Directory of clients that support the Model Context Protocol — Claude Desktop, Cursor, Zed, and community integrations.',
    url: 'https://modelcontextprotocol.io/clients',
  },
  {
    slug: 'cheatsheet-messages-api',
    title: 'Messages API Reference',
    description: 'Full reference for the Claude Messages API (POST /v1/messages) — parameters, content blocks, tool use, and response schema.',
    url: 'https://platform.claude.com/docs/en/api/messages',
  },
  {
    slug: 'cheatsheet-mcp-transports',
    title: 'MCP Transports Reference',
    description: 'Reference for MCP transport mechanisms — stdio and Streamable HTTP — with protocol details and connection patterns.',
    url: 'https://modelcontextprotocol.io/docs/concepts/transports',
  },
  {
    slug: 'cheatsheet-prompt-caching',
    title: 'Prompt Caching',
    description: 'Quick reference for Claude prompt caching — cache breakpoints, TTL options, pricing, and minimum token thresholds.',
    url: 'https://platform.claude.com/docs/en/docs/build-with-claude/prompt-caching',
  },
];

async function seed() {
  console.log('🌱 Starting seed: tutorials + cheatsheets...');

  try {
    // 1. Get tutorials category
    const [tutorialsCategory] = await sql`SELECT id FROM categories WHERE slug = 'tutorials' LIMIT 1`;
    if (!tutorialsCategory) {
      console.error('❌ tutorials category not found. Seed categories first.');
      process.exit(1);
    }

    // 2. Get cheatsheets category
    const [cheatsheetsCategory] = await sql`SELECT id FROM categories WHERE slug = 'cheatsheets' LIMIT 1`;
    if (!cheatsheetsCategory) {
      console.error('❌ cheatsheets category not found. Seed categories first.');
      process.exit(1);
    }

    // 3. Get admin user
    const [admin] = await sql`SELECT id FROM users WHERE role = 'ADMIN' LIMIT 1`;
    const adminId = admin?.id || 'default-admin-id';

    // 4. Insert tutorials
    console.log('📚 Inserting tutorials...');
    for (const item of tutorials) {
      await sql`
        INSERT INTO resources (
          id, title, slug, description, url, category_id, author_id,
          verified, featured, github_stars, github_forks, is_indexed, last_validated_at
        ) VALUES (
          ${uuidv4()},
          ${item.title},
          ${item.slug},
          ${item.description},
          ${item.url},
          ${tutorialsCategory.id},
          ${adminId},
          true,
          false,
          0,
          0,
          false,
          NOW()
        )
        ON CONFLICT (slug) DO NOTHING
      `;
      console.log(`✅ Tutorial: ${item.title}`);
    }

    // 5. Insert cheatsheets
    console.log('📋 Inserting cheatsheets...');
    for (const item of cheatsheets) {
      await sql`
        INSERT INTO resources (
          id, title, slug, description, url, category_id, author_id,
          verified, featured, github_stars, github_forks, is_indexed, last_validated_at
        ) VALUES (
          ${uuidv4()},
          ${item.title},
          ${item.slug},
          ${item.description},
          ${item.url},
          ${cheatsheetsCategory.id},
          ${adminId},
          true,
          false,
          0,
          0,
          false,
          NOW()
        )
        ON CONFLICT (slug) DO NOTHING
      `;
      console.log(`✅ Cheatsheet: ${item.title}`);
    }

    console.log('🏁 Seed complete!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  } finally {
    await sql.end();
  }
}

seed();
