import postgres from 'postgres';
import { config } from 'dotenv';
import { resolve } from 'path';
import { v4 as uuidv4 } from 'uuid';

config({ path: resolve(process.cwd(), '.env.local') });

const sql = postgres(process.env.DATABASE_URL!, { prepare: false });

/**
 * Boilerplate Seed: The Starter Kit Library
 * Seeds 50+ production-ready boilerplates and starter kits
 */

async function seed() {
  console.log('🏗️ Seeding Boilerplates & Starter Kits...');

  try {
    const categoriesList = await sql`SELECT id, slug FROM categories`;
    const boilerplateCatId = categoriesList.find(c => c.slug === 'boilerplates')?.id;

    if (!boilerplateCatId) {
      console.error('❌ Boilerplates category not found.');
      process.exit(1);
    }

    const [admin] = await sql`SELECT id FROM users WHERE role = 'ADMIN' LIMIT 1`;
    const adminId = admin?.id || 'default-admin-id';

    const boilerplates = [
      // SaaS Starters
      { name: 'ShipFast - Next.js SaaS', desc: 'The #1 Next.js SaaS boilerplate with Stripe, Auth, and SEO built-in.', url: 'https://github.com/shipfastsaas/shipfast', stars: 4200 },
      { name: 'Makerkit - Multi-Framework SaaS', desc: 'Production-ready SaaS kit for Next.js, Remix, and SvelteKit.', url: 'https://github.com/makerkit/makerkit', stars: 3100 },
      { name: 'OpenSaaS - Wasp Framework', desc: 'Free, open-source SaaS template with React, Node.js, and Prisma.', url: 'https://github.com/wasp-lang/open-saas', stars: 2800 },
      { name: 'T3 Stack - tRPC + Prisma', desc: 'Type-safe full-stack starter with Next.js, tRPC, Tailwind, and Prisma.', url: 'https://github.com/t3-oss/create-t3-app', stars: 24000 },
      { name: 'Nextless.js SaaS Starter', desc: 'AWS-powered serverless SaaS boilerplate with Next.js and Auth.', url: 'https://nextlessjs.com/', stars: 1500 },
      
      // AI/LLM Templates
      { name: 'Vercel AI Chatbot', desc: 'Official Vercel AI SDK chatbot template with streaming responses.', url: 'https://github.com/vercel/ai-chatbot', stars: 5200 },
      { name: 'ChatGPT Clone - Next.js', desc: 'Full-featured ChatGPT UI clone with OpenAI integration.', url: 'https://github.com/mckaywrigley/chatbot-ui', stars: 27000 },
      { name: 'LangChain.js Template', desc: 'Production-ready LangChain app with Next.js and Vercel AI SDK.', url: 'https://github.com/langchain-ai/langchainjs-starter', stars: 1200 },
      { name: 'OpenAI Cookbook Starter', desc: 'Official OpenAI examples and best practices for GPT-4.', url: 'https://github.com/openai/openai-cookbook', stars: 58000 },
      { name: 'Anthropic Claude Quickstart', desc: 'Claude API starter with streaming and function calling.', url: 'https://github.com/anthropics/anthropic-quickstarts', stars: 3400 },
      { name: 'AutoGPT Starter Kit', desc: 'Autonomous AI agent template with goal-oriented execution.', url: 'https://github.com/Significant-Gravitas/AutoGPT', stars: 165000 },
      { name: 'LlamaIndex App Template', desc: 'RAG application starter with vector databases and LLMs.', url: 'https://github.com/run-llama/create-llama', stars: 2100 },
      { name: 'Embedchain Starter', desc: 'Build ChatGPT-like bots over your datasets in minutes.', url: 'https://github.com/embedchain/embedchain', stars: 8900 },
      
      // Full-Stack Templates
      { name: 'Remix SaaS Template', desc: 'Remix-based SaaS starter with Stripe and multi-tenancy.', url: 'https://github.com/dev-xo/stripe-stack', stars: 1800 },
      { name: 'Astro SaaS Starter', desc: 'Lightning-fast SaaS template with Astro and Tailwind.', url: 'https://github.com/withastro/astro-starter-kit', stars: 2300 },
      { name: 'RedwoodJS Startup', desc: 'Full-stack React framework for startups with GraphQL.', url: 'https://github.com/redwoodjs/redwood', stars: 17000 },
      { name: 'Supabase SaaS Kit', desc: 'Next.js starter with Supabase Auth, DB, and Storage.', url: 'https://github.com/supabase/supabase-js', stars: 3200 },
      { name: 'Firebase SaaS Starter', desc: 'Complete SaaS template with Firebase and Stripe.', url: 'https://github.com/firebase/quickstart-js', stars: 5100 },
      
      // Backend Starters
      { name: 'FastAPI Microservice Template', desc: 'Production-ready FastAPI backend with Docker and Celery.', url: 'https://github.com/tiangolo/full-stack-fastapi-template', stars: 24000 },
      { name: 'NestJS Enterprise Starter', desc: 'Scalable NestJS backend with TypeORM and GraphQL.', url: 'https://github.com/nestjs/nest', stars: 65000 },
      { name: 'Django SaaS Boilerplate', desc: 'Django-powered SaaS with Stripe, Celery, and Docker.', url: 'https://github.com/cookiecutter/cookiecutter-django', stars: 11000 },
      { name: 'Express TypeScript API', desc: 'Modern Express.js API with TypeScript and Prisma.', url: 'https://github.com/Microsoft/TypeScript-Node-Starter', stars: 11000 },
      { name: 'Go Clean Architecture', desc: 'Enterprise-grade Go API with hexagonal architecture.', url: 'https://github.com/bxcodec/go-clean-arch', stars: 9000 },
      
      // Mobile/Desktop
      { name: 'React Native Starter', desc: 'Production-ready React Native app with navigation and auth.', url: 'https://github.com/react-native-community/react-native-template-typescript', stars: 4500 },
      { name: 'Expo Router Template', desc: 'File-based routing for React Native with Expo.', url: 'https://github.com/expo/expo', stars: 30000 },
      { name: 'Tauri Desktop App', desc: 'Rust-powered desktop app with React/Vue/Svelte frontend.', url: 'https://github.com/tauri-apps/tauri', stars: 79000 },
      { name: 'Electron React Boilerplate', desc: 'Cross-platform desktop app with Electron and React.', url: 'https://github.com/electron-react-boilerplate/electron-react-boilerplate', stars: 23000 },
      
      // Chrome Extensions
      { name: 'Chrome Extension Starter', desc: 'Modern Chrome extension with React and Vite.', url: 'https://github.com/GuochuanLi/chrome-extension-vite-react', stars: 1200 },
      { name: 'Plasmo Extension Framework', desc: 'The fastest way to build browser extensions with React.', url: 'https://github.com/PlasmoHQ/plasmo', stars: 9000 },
      
      // CLI Tools
      { name: 'Go CLI Template', desc: 'Professional CLI tool starter with Cobra and Viper.', url: 'https://github.com/spf13/cobra', stars: 37000 },
      { name: 'Node.js CLI Starter', desc: 'Interactive CLI builder with Inquirer and Commander.', url: 'https://github.com/oclif/oclif', stars: 8900 },
      { name: 'Rust CLI Template', desc: 'Fast CLI tool starter with Clap and Tokio.', url: 'https://github.com/clap-rs/clap', stars: 13000 },
      
      // API/Backend Specialized
      { name: 'Serverless Framework Template', desc: 'AWS Lambda functions with Node.js/Python/Go.', url: 'https://github.com/serverless/serverless', stars: 46000 },
      { name: 'Cloudflare Workers Starter', desc: 'Edge computing with Cloudflare Workers and Wrangler.', url: 'https://github.com/cloudflare/workers-sdk', stars: 2500 },
      { name: 'Railway Starter Templates', desc: 'One-click deploy templates for Railway.app.', url: 'https://railway.app/templates', stars: 0 },
      { name: 'Fly.io App Templates', desc: 'Production-ready app templates for Fly.io deployment.', url: 'https://fly.io/docs/app-guides/', stars: 0 },
      
      // E-commerce
      { name: 'Next.js Commerce', desc: 'High-performance e-commerce template by Vercel.', url: 'https://github.com/vercel/commerce', stars: 11000 },
      { name: 'Medusa E-commerce', desc: 'Headless commerce engine with customizable backend.', url: 'https://github.com/medusajs/medusa', stars: 24000 },
      { name: 'Shopify Hydrogen Starter', desc: 'React-based Shopify storefront with Remix.', url: 'https://github.com/Shopify/hydrogen', stars: 1400 },
      
      // AI Agent Frameworks
      { name: 'LangGraph Agent Template', desc: 'Build stateful, multi-actor AI agents with LangGraph.', url: 'https://github.com/langchain-ai/langgraph', stars: 5200 },
      { name: 'CrewAI Multi-Agent System', desc: 'Orchestrate AI agents for complex task automation.', url: 'https://github.com/joaomdmoura/crewAI', stars: 18000 },
      { name: 'AutoGen Agent Framework', desc: 'Microsoft Research multi-agent conversation framework.', url: 'https://github.com/microsoft/autogen', stars: 29000 },
      
      // Data/ML
      { name: 'Streamlit Data App', desc: 'Interactive data science apps in pure Python.', url: 'https://github.com/streamlit/streamlit', stars: 33000 },
      { name: 'Gradio ML Demo', desc: 'Fast web UIs for machine learning models.', url: 'https://github.com/gradio-app/gradio', stars: 31000 },
      { name: 'Dash Analytics Starter', desc: 'Python framework for analytical web applications.', url: 'https://github.com/plotly/dash', stars: 21000 },
      
      // Static Site Generators
      { name: 'Docusaurus Documentation', desc: 'React-based documentation site generator.', url: 'https://github.com/facebook/docusaurus', stars: 53000 },
      { name: 'VitePress Docs Template', desc: 'Vite-powered static site generator for docs.', url: 'https://github.com/vuejs/vitepress', stars: 12000 },
      { name: 'Nextra Docs Starter', desc: 'Next.js-based documentation framework with MDX.', url: 'https://github.com/shuding/nextra', stars: 11000 },
      
      // Testing/DevOps
      { name: 'Playwright Test Suite', desc: 'End-to-end testing framework template.', url: 'https://github.com/microsoft/playwright', stars: 64000 },
      { name: 'Cypress E2E Starter', desc: 'Modern E2E test suite with visual regression.', url: 'https://github.com/cypress-io/cypress', stars: 46000 },
      { name: 'Docker Compose Stacks', desc: 'Pre-configured multi-container application stacks.', url: 'https://github.com/docker/awesome-compose', stars: 32000 },
    ];

    console.log(`📦 Prepared ${boilerplates.length} boilerplates.`);

    for (const bp of boilerplates) {
      const slug = bp.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      await sql`
        INSERT INTO resources (
          id, title, slug, description, url, category_id, author_id, 
          verified, featured, github_stars, is_indexed, last_validated_at
        ) VALUES (
          ${uuidv4()}, 
          ${bp.name}, 
          ${'bp-' + slug}, 
          ${bp.desc}, 
          ${bp.url}, 
          ${boilerplateCatId}, 
          ${adminId},
          true,
          ${bp.stars > 10000},
          ${bp.stars},
          false,
          NOW()
        )
        ON CONFLICT (slug) DO UPDATE SET
          github_stars = EXCLUDED.github_stars
      `;
      console.log(`✅ Seeded: ${bp.name}`);
    }

    console.log('🏁 Boilerplate seeding complete!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  } finally {
    await sql.end();
  }
}

seed();
