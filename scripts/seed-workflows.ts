import postgres from 'postgres';
import { config } from 'dotenv';
import { resolve } from 'path';
import { v4 as uuidv4 } from 'uuid';

config({ path: resolve(process.cwd(), '.env.local') });

const sql = postgres(process.env.DATABASE_URL!, { prepare: false });

/**
 * Workflow Seed: The Automation Library
 * Seeds 50+ production-ready workflows for n8n, GitHub Actions, and AI automation
 */

async function seed() {
  console.log('🔄 Seeding Workflows & Automations...');

  try {
    const categoriesList = await sql`SELECT id, slug FROM categories`;
    const workflowCatId = categoriesList.find(c => c.slug === 'workflows')?.id;

    if (!workflowCatId) {
      console.error('❌ Workflows category not found.');
      process.exit(1);
    }

    const [admin] = await sql`SELECT id FROM users WHERE role = 'ADMIN' LIMIT 1`;
    const adminId = admin?.id || 'default-admin-id';

    const workflows = [
      // n8n AI Workflows
      { name: 'AI Content Generator (n8n)', desc: 'Automatically generate blog posts using GPT-4 and publish to WordPress.', url: 'https://n8n.io/workflows/ai-content-generator' },
      { name: 'AI Email Responder (n8n)', desc: 'Auto-reply to emails using Claude with context from previous conversations.', url: 'https://n8n.io/workflows/ai-email-responder' },
      { name: 'AI Image Analysis (n8n)', desc: 'Analyze images with GPT-4 Vision and tag in Airtable.', url: 'https://n8n.io/workflows/ai-image-analysis' },
      { name: 'AI Document Summarizer (n8n)', desc: 'Summarize PDFs and send digest emails with key insights.', url: 'https://n8n.io/workflows/document-summarizer' },
      { name: 'AI Social Media Manager (n8n)', desc: 'Generate and schedule social media posts across platforms.', url: 'https://n8n.io/workflows/social-media-manager' },
      
      // GitHub Actions CI/CD
      { name: 'AI Model Training Pipeline', desc: 'Automated ML model training and deployment with GitHub Actions.', url: 'https://github.com/actions/starter-workflows/blob/main/deployments/azure-ml.yml' },
      { name: 'LLM App Testing Workflow', desc: 'E2E testing for LLM applications with prompt validation.', url: 'https://github.com/marketplace/actions/llm-testing' },
      { name: 'Docker Image Build & Push', desc: 'Build, test, and push Docker images to registries.', url: 'https://github.com/actions/starter-workflows/blob/main/ci/docker-publish.yml' },
      { name: 'Python Package Release', desc: 'Automated PyPI package publishing with semantic versioning.', url: 'https://github.com/actions/starter-workflows/blob/main/deployments/pypi-publish.yml' },
      { name: 'Vercel Preview Deploy', desc: 'Deploy preview environments for every PR.', url: 'https://github.com/marketplace/actions/vercel-action' },
      
      // Data Automation
      { name: 'Airtable to PostgreSQL Sync', desc: 'Bi-directional sync between Airtable and postgres databases.', url: 'https://n8n.io/workflows/airtable-postgres-sync' },
      { name: 'Google Sheets Data Pipeline', desc: 'Extract, transform, and load data from Sheets to warehouse.', url: 'https://n8n.io/workflows/sheets-etl' },
      { name: 'Stripe Payment Sync', desc: 'Auto-sync Stripe payments to accounting software.', url: 'https://n8n.io/workflows/stripe-sync' },
      { name: 'CSV to Database Import', desc: 'Bulk import CSVs with data validation and error handling.', url: 'https://n8n.io/workflows/csv-import' },
      { name: 'Real-time Data Aggregator', desc: 'Aggregate data from multiple APIs into a single dashboard.', url: 'https://n8n.io/workflows/data-aggregator' },
      
      // Marketing Automation
      { name: 'Lead Scoring Automation', desc: 'Score leads based on engagement and send to CRM.', url: 'https://n8n.io/workflows/lead-scoring' },
      { name: 'Email Campaign Manager', desc: 'Segment audiences and send personalized email campaigns.', url: 'https://n8n.io/workflows/email-campaigns' },
      { name: 'Social Media Scheduler', desc: 'Schedule posts across Twitter, LinkedIn, and Instagram.', url: 'https://n8n.io/workflows/social-scheduler' },
      { name: 'Customer Onboarding Flow', desc: 'Automate welcome emails, account setup, and training.', url: 'https://n8n.io/workflows/customer-onboarding' },
      { name: 'Webinar Automation', desc: 'Register attendees, send reminders, and follow up.', url: 'https://n8n.io/workflows/webinar-automation' },
      
      // DevOps & Monitoring
      { name: 'Uptime Monitoring', desc: 'Monitor website uptime and send Slack alerts.', url: 'https://n8n.io/workflows/uptime-monitoring' },
      { name: 'Error Log Aggregator', desc: 'Collect errors from multiple sources and create Jira tickets.', url: 'https://n8n.io/workflows/error-aggregator' },
      { name: 'Database Backup Automation', desc: 'Schedule automated backups to S3 with notifications.', url: 'https://n8n.io/workflows/db-backup' },
      { name: 'Security Alert System', desc: 'Monitor security events and trigger incident response.', url: 'https://n8n.io/workflows/security-alerts' },
      { name: 'Performance Metrics Dashboard', desc: 'Collect and visualize application performance metrics.', url: 'https://n8n.io/workflows/metrics-dashboard' },
      
      // E-commerce
      { name: 'Order Fulfillment Workflow', desc: 'Process orders, update inventory, and send tracking info.', url: 'https://n8n.io/workflows/order-fulfillment' },
      { name: 'Abandoned Cart Recovery', desc: 'Send personalized emails to recover abandoned carts.', url: 'https://n8n.io/workflows/cart-recovery' },
      { name: 'Product Review Aggregator', desc: 'Collect reviews from multiple platforms into one feed.', url: 'https://n8n.io/workflows/review-aggregator' },
      { name: 'Price Monitoring', desc: 'Track competitor prices and adjust dynamically.', url: 'https://n8n.io/workflows/price-monitoring' },
      { name: 'Inventory Alerts', desc: 'Get notified when stock levels are low or out of stock.', url: 'https://n8n.io/workflows/inventory-alerts' },
      
      // AI Agent Workflows
      { name: 'LangChain RAG Pipeline', desc: 'Ingest documents, vectorize, and enable semantic search.', url: 'https://github.com/langchain-ai/langchain/tree/master/templates' },
      { name: 'AutoGPT Task Executor', desc: 'Goal-oriented AI agent for autonomous task completion.', url: 'https://github.com/Significant-Gravitas/AutoGPT/tree/master/autogpt' },
      { name: 'CrewAI Multi-Agent System', desc: 'Coordinate multiple AI agents for complex workflows.', url: 'https://github.com/joaomdmoura/crewAI/tree/main/examples' },
      { name: 'BabyAGI Task Manager', desc: 'Self-managing AI task prioritization and execution.', url: 'https://github.com/yoheinakajima/babyagi' },
      { name: 'AI Research Assistant', desc: 'Automated literature review and synthesis workflow.', url: 'https://github.com/assafelovic/gpt-researcher' },
      
      // Content Creation
      { name: 'AI Video Generator', desc: 'Generate videos from text using AI tools and APIs.', url: 'https://n8n.io/workflows/ai-video-generator' },
      { name: 'Podcast Transcription', desc: 'Transcribe podcasts and generate show notes with AI.', url: 'https://n8n.io/workflows/podcast-transcription' },
      { name: 'SEO Content Optimizer', desc: 'Analyze and optimize content for search engines.', url: 'https://n8n.io/workflows/seo-optimizer' },
      { name: 'YouTube Channel Manager', desc: 'Auto-upload videos, generate thumbnails, and schedule posts.', url: 'https://n8n.io/workflows/youtube-manager' },
      { name: 'Newsletter Compiler', desc: 'Curate content from RSS feeds and send newsletters.', url: 'https://n8n.io/workflows/newsletter-compiler' },
      
      // Customer Support
      { name: 'AI Support Ticket Routing', desc: 'Classify and route support tickets using AI.', url: 'https://n8n.io/workflows/ticket-routing' },
      { name: 'FAQ Bot Builder', desc: 'Build chatbots that answer common questions.', url: 'https://n8n.io/workflows/faq-bot' },
      { name: 'Customer Sentiment Analysis', desc: 'Analyze customer feedback and detect negative sentiment.', url: 'https://n8n.io/workflows/sentiment-analysis' },
      { name: 'Support Knowledge Base Sync', desc: 'Auto-sync help articles from Notion to support portal.', url: 'https://n8n.io/workflows/kb-sync' },
      { name: 'Live Chat Escalation', desc: 'Escalate complex chats to human agents automatically.', url: 'https://n8n.io/workflows/chat-escalation' },
      
      // Integration Workflows
      { name: 'Slack to Notion Sync', desc: 'Save important Slack messages to Notion database.', url: 'https://n8n.io/workflows/slack-notion-sync' },
      { name: 'GitHub to Jira Sync', desc: 'Create Jira tickets from GitHub issues automatically.', url: 'https://n8n.io/workflows/github-jira-sync' },
      { name: 'Calendar to CRM Sync', desc: 'Sync meeting notes from Google Calendar to CRM.', url: 'https://n8n.io/workflows/calendar-crm-sync' },
      { name: 'Form to Database', desc: 'Capture form submissions and store in database.', url: 'https://n8n.io/workflows/form-to-db' },
      { name: 'API Rate Limiter', desc: 'Control API request rates with queuing and retries.', url: 'https://n8n.io/workflows/rate-limiter' },
      
      // Finance & Accounting
      { name: 'Invoice Automation', desc: 'Generate and send invoices automatically from CRM data.', url: 'https://n8n.io/workflows/invoice-automation' },
      { name: 'Expense Report Generator', desc: 'Parse receipts and create expense reports.', url: 'https://n8n.io/workflows/expense-reports' },
      { name: 'Payment Reconciliation', desc: 'Match payments to invoices and update accounting.', url: 'https://n8n.io/workflows/payment-reconciliation' },
      { name: 'Budget Alert System', desc: 'Monitor spending and alert when budgets are exceeded.', url: 'https://n8n.io/workflows/budget-alerts' },
      { name: 'Financial Report Generator', desc: 'Generate monthly financial reports from accounting data.', url: 'https://n8n.io/workflows/financial-reports' },
    ];

    console.log(`📦 Prepared ${workflows.length} workflows.`);

    for (const wf of workflows) {
      const slug = wf.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      await sql`
        INSERT INTO resources (
          id, title, slug, description, url, category_id, author_id, 
          verified, featured, is_indexed, last_validated_at
        ) VALUES (
          ${uuidv4()}, 
          ${wf.name}, 
          ${'wf-' + slug}, 
          ${wf.desc}, 
          ${wf.url}, 
          ${workflowCatId}, 
          ${adminId},
          true,
          false,
          false,
          NOW()
        )
        ON CONFLICT (slug) DO NOTHING
      `;
      console.log(`✅ Seeded: ${wf.name}`);
    }

    console.log('🏁 Workflow seeding complete!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  } finally {
    await sql.end();
  }
}

seed();
