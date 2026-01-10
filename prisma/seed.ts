import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: 'prompts' },
      update: {},
      create: {
        name: 'Prompts',
        slug: 'prompts',
        description: 'Expert prompts for Antigravity AI coding',
        icon: '💬',
        order: 1,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'mcp-servers' },
      update: {},
      create: {
        name: 'MCP Servers',
        slug: 'mcp-servers',
        description: 'Model Context Protocol servers and integrations',
        icon: '🔌',
        order: 2,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'rules' },
      update: {},
      create: {
        name: 'Rules',
        slug: 'rules',
        description: 'Custom rules and configurations',
        icon: '📋',
        order: 3,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'workflows' },
      update: {},
      create: {
        name: 'Workflows',
        slug: 'workflows',
        description: 'Automated workflows and task templates',
        icon: '⚡',
        order: 4,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'guides' },
      update: {},
      create: {
        name: 'Guides',
        slug: 'guides',
        description: 'Tutorials and how-to guides',
        icon: '📚',
        order: 5,
      },
    }),
  ]);

  console.log(`✅ Created ${categories.length} categories`);

  // Create sample resources
  const sampleResources = [
    {
      title: 'React Hooks Expert Prompt',
      slug: 'react-hooks-expert-prompt',
      description:
        'A comprehensive prompt for building React applications with hooks, best practices, and performance optimization.',
      content: `You are a React Hooks expert. When building components:

1. Use functional components with hooks
2. Implement useMemo for expensive calculations
3. Use useCallback for event handlers passed to children
4. Leverage useEffect for side effects
5. Follow React best practices and naming conventions

Always explain your reasoning and suggest optimizations.`,
      categoryId: categories[0].id, // Prompts
      featured: true,
      verified: true,
    },
    {
      title: 'Next.js 14 App Router Prompt',
      slug: 'nextjs-14-app-router-prompt',
      description:
        'Expert guidance for building Next.js 14 applications with App Router, Server Components, and modern patterns.',
      content: `You are a Next.js 14 expert specializing in App Router.

Key principles:
- Use Server Components by default
- Add 'use client' only when necessary
- Implement proper error boundaries
- Optimize images with next/image
- Use Server Actions for mutations

Provide code examples and explain trade-offs.`,
      categoryId: categories[0].id,
      featured: true,
      verified: true,
    },
    {
      title: 'Database MCP Server',
      slug: 'database-mcp-server',
      description:
        'Connect Antigravity to your PostgreSQL, MySQL, or MongoDB database for intelligent schema exploration and query generation.',
      url: 'https://github.com/modelcontextprotocol/servers/tree/main/src/postgres',
      categoryId: categories[1].id, // MCP Servers
      verified: true,
    },
    {
      title: 'TypeScript Strict Mode Rules',
      slug: 'typescript-strict-mode-rules',
      description:
        'Enforce TypeScript strict mode and best practices in your Antigravity projects.',
      content: `{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true
  }
}`,
      categoryId: categories[2].id, // Rules
      verified: true,
    },
    {
      title: 'API Development Workflow',
      slug: 'api-development-workflow',
      description:
        'Automated workflow for building RESTful APIs with validation, error handling, and documentation.',
      categoryId: categories[3].id, // Workflows
      featured: true,
    },
  ];

  const resources = await Promise.all(
    sampleResources.map((resource) =>
      prisma.resource.create({
        data: resource,
      })
    )
  );

  console.log(`✅ Created ${resources.length} sample resources`);

  console.log('🎉 Seeding complete!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
