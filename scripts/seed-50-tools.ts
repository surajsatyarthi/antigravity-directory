const postgres = require('postgres');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config({ path: path.resolve(process.cwd(), '.env.local') });

const sql = postgres(process.env.DATABASE_URL, { ssl: 'require' });

const TOOLS = [
  // AI Coding
  { title: "Cursor", category: "ai-coding", url: "https://cursor.sh", description: "The AI code editor built for pair programming.", verified: true, featured: true, stars: 15000 },
  { title: "GitHub Copilot", category: "ai-coding", url: "https://github.com/features/copilot", description: "Your AI pair programmer.", verified: true, featured: true, stars: 50000 },
  { title: "Tabnine", category: "ai-coding", url: "https://tabnine.com", description: "AI assistant for software developers.", verified: true, stars: 8000 },
  { title: "Cody", category: "ai-coding", url: "https://sourcegraph.com/cody", description: "AI coding assistant by Sourcegraph.", verified: true, stars: 4000 },
  { title: "Replit AI", category: "ai-coding", url: "https://replit.com/ai", description: "AI built into the Replit IDE.", verified: true, stars: 12000 },
  { title: "Codeium", category: "ai-coding", url: "https://codeium.com", description: "Free AI code completion and chat.", verified: true, stars: 3000 },
  { title: "Amazon CodeWhisperer", category: "ai-coding", url: "https://aws.amazon.com/codewhisperer", description: "AI coding companion by AWS.", verified: true, stars: 2000 },
  { title: "Continue", category: "ai-coding", url: "https://continue.dev", description: "Open source autopilot for VS Code.", verified: true, stars: 6000 },
  { title: "Aider", category: "ai-coding", url: "https://aider.chat", description: "AI pair programming in your terminal.", verified: true, stars: 9000 },
  { title: "Supermaven", category: "ai-coding", url: "https://supermaven.com", description: "The fastest copilot.", verified: true, stars: 1000 },

  // LLM APIs
  { title: "OpenAI API", category: "llm-apis", url: "https://platform.openai.com", description: "Access GPT-4 and other models.", verified: true, featured: true, stars: 100000 },
  { title: "Anthropic API", category: "llm-apis", url: "https://anthropic.com/api", description: "Access Claude 3 Opus and Sonnet.", verified: true, featured: true, stars: 40000 },
  { title: "Google Gemini API", category: "llm-apis", url: "https://ai.google.dev", description: "Build with Gemini models.", verified: true, stars: 35000 },
  { title: "Mistral API", category: "llm-apis", url: "https://mistral.ai", description: "Open and portable generative AI.", verified: true, stars: 25000 },
  { title: "Cohere", category: "llm-apis", url: "https://cohere.com", description: "Enterprise AI platform.", verified: true, stars: 15000 },
  { title: "Perplexity API", category: "llm-apis", url: "https://perplexity.ai", description: "Real-time information API.", verified: true, stars: 10000 },
  { title: "Together AI", category: "llm-apis", url: "https://together.ai", description: "Fastest cloud for open source types.", verified: true, stars: 8000 },
  { title: "Groq", category: "llm-apis", url: "https://groq.com", description: "Fastest AI inference chip.", verified: true, stars: 12000 },

  // Agents
  { title: "AutoGPT", category: "agents", url: "https://github.com/Significant-Gravitas/AutoGPT", description: "Autonomous GPT-4 experiment.", verified: true, stars: 160000 },
  { title: "BabyAGI", category: "agents", url: "https://github.com/yoheinakajima/babyagi", description: "Task management system for AI.", verified: true, stars: 20000 },
  { title: "LangChain Agents", category: "agents", url: "https://python.langchain.com/docs/modules/agents", description: "Build agents with LangChain.", verified: true, stars: 85000 },
  { title: "CrewAI", category: "agents", url: "https://crewai.com", description: "Orchestrate role-playing AI agents.", verified: true, featured: true, stars: 18000 },
  { title: "Microsoft Autogen", category: "agents", url: "https://microsoft.github.io/autogen", description: "Multi-agent conversation framework.", verified: true, stars: 25000 },
  { title: "MetaGPT", category: "agents", url: "https://github.com/geekan/MetaGPT", description: "Multi-agent framework.", verified: true, stars: 35000 },
  { title: "ChatDev", category: "agents", url: "https://github.com/OpenBMB/ChatDev", description: "Virtual software company.", verified: true, stars: 22000 },
  { title: "GPT Engineer", category: "agents", url: "https://gptengineer.app", description: "Build apps with AI.", verified: true, stars: 50000 },

  // Vector DBs
  { title: "Pinecone", category: "vector-dbs", url: "https://pinecone.io", description: "The vector database for AI.", verified: true, featured: true, stars: 12000 },
  { title: "Weaviate", category: "vector-dbs", url: "https://weaviate.io", description: "AI-native vector database.", verified: true, stars: 8000 },
  { title: "Qdrant", category: "vector-dbs", url: "https://qdrant.tech", description: "Vector search engine.", verified: true, stars: 14000 },
  { title: "Chroma", category: "vector-dbs", url: "https://trychroma.com", description: "Open source embedding database.", verified: true, stars: 11000 },
  { title: "Milvus", category: "vector-dbs", url: "https://milvus.io", description: "Vector database for scalable similarity search.", verified: true, stars: 26000 },
  { title: "Supabase Vector", category: "vector-dbs", url: "https://supabase.com/vector", description: "Open source vector database built on Postgres.", verified: true, stars: 65000 },

  // Frameworks
  { title: "LangChain", category: "frameworks", url: "https://langchain.com", description: "Building applications with LLMs.", verified: true, verified: true, stars: 85000 },
  { title: "LlamaIndex", category: "frameworks", url: "https://llamaindex.ai", description: "Data framework for LLM apps.", verified: true, stars: 30000 },
  { title: "Haystack", category: "frameworks", url: "https://haystack.deepset.ai", description: "LLM orchestration framework.", verified: true, stars: 12000 },
  { title: "Vercel AI SDK", category: "frameworks", url: "https://sdk.vercel.ai", description: "Library for building AI-powered apps.", verified: true, stars: 10000 },
  { title: "Flowise", category: "frameworks", url: "https://flowiseai.com", description: "Drag & drop LLM flows.", verified: true, stars: 22000 },
  { title: "LangFlow", category: "frameworks", url: "https://langflow.org", description: "UI for LangChain.", verified: true, stars: 18000 },

  // Deployment
  { title: "Vercel", category: "deployment", url: "https://vercel.com", description: "Develop. Preview. Ship.", verified: true, stars: 100000 },
  { title: "Replicate", category: "deployment", url: "https://replicate.com", description: "Run AI with an API.", verified: true, stars: 10000 },
  { title: "Modal", category: "deployment", url: "https://modal.com", description: "End-to-end cloud for AI.", verified: true, stars: 5000 },
  { title: "Hugging Face", category: "deployment", url: "https://huggingface.co", description: "The AI community.", verified: true, stars: 120000 },
  { title: "Railway", category: "deployment", url: "https://railway.app", description: "Deploy code instantly.", verified: true, stars: 8000 },
  { title: "Render", category: "deployment", url: "https://render.com", description: "Unified cloud to build and run all your apps.", verified: true, stars: 6000 },

  // Monitoring
  { title: "LangSmith", category: "monitoring", url: "https://smith.langchain.com", description: "Debug, test, and monitor your chains.", verified: true, stars: 5000 },
  { title: "Helicone", category: "monitoring", url: "https://helicone.ai", description: "Open source LLM observability.", verified: true, stars: 3000 },
  { title: "Traceloop", category: "monitoring", url: "https://traceloop.com", description: "OpenLLMetry based observability.", verified: true, stars: 1000 },
  { title: "Arize", category: "monitoring", url: "https://arize.com", description: "ML observability platform.", verified: true, stars: 500 },
  { title: "Weights & Biases", category: "monitoring", url: "https://wandb.ai", description: "The developer-first MLOps platform.", verified: true, stars: 6000 },
  { title: "Portkey", category: "monitoring", url: "https://portkey.ai", description: "Control panel for AI apps.", verified: true, stars: 1200 }
];

async function seedTools() {
  try {
    // 1. Fetch Categories for mapping
    const categories = await sql`SELECT id, slug FROM categories`;
    const categoryMap = new Map(categories.map(c => [c.slug, c.id]));

    // 2. Fetch Admin User
    const [admin] = await sql`SELECT id FROM users WHERE role = 'ADMIN' LIMIT 1`;
    const adminId = admin?.id;

    if (!adminId) {
      console.error('❌ No Admin ID found. Run user seed first.');
      process.exit(1);
    }

    console.log(`📦 Preparing to seed ${TOOLS.length} tools...`);
    let success = 0;

    for (const tool of TOOLS) {
      const categoryId = categoryMap.get(tool.category);

      if (!categoryId) {
        console.warn(`⚠️ Skipping ${tool.title} (Category ${tool.category} not found)`);
        continue;
      }

      const slug = tool.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + '-' + Math.random().toString(36).substring(2, 5);

      await sql`
        INSERT INTO resources (
          id, title, slug, description, url, category_id, author_id, 
          verified, featured, github_stars, github_forks, is_indexed, last_validated_at, created_at, updated_at
        ) VALUES (
          ${uuidv4()}, 
          ${tool.title}, 
          ${slug}, 
          ${tool.description}, 
          ${tool.url}, 
          ${categoryId}, 
          ${adminId},
          ${tool.verified},
          ${tool.featured || false},
          ${tool.stars || 0},
          0,
          true,
          NOW(),
          NOW(),
          NOW()
        )
      `;
      success++;
      console.log(`✅ Seeded: ${tool.title}`);
    }

    console.log(`\n🎉 Successfully seeded ${success} tools!`);

  } catch (e) {
    console.error('Seeding failed:', e);
  } finally {
    await sql.end();
  }
}

seedTools();
