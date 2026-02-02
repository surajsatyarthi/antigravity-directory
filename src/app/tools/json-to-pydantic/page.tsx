import { JsonToPydantic } from "@/components/tools/JsonToPydantic";
import { FileJson } from "lucide-react";

export const metadata = {
  title: 'JSON to Pydantic Converter | Antigravity Tools',
  description: 'Convert JSON objects to Python Pydantic v2 models instantly. Supports nested objects, lists, and type inference for AI engineering workflows.',
};

export default function JsonToPydanticPage() {
  return (
    <div className="space-y-6">
      <div className="border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-amber-900/30 rounded-lg text-amber-500">
            <FileJson className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-white">
            JSON to Pydantic Converter
          </h1>
        </div>
        <p className="text-slate-400 max-w-2xl">
          Paste your raw JSON response below to generate type-safe Pydantic v2 models. 
          Perfect for validating structured outputs from LLMs.
        </p>
      </div>

      <JsonToPydantic />

      <section className="mt-12 space-y-8 max-w-4xl border-t border-slate-800 pt-12">
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white">Instantly Generate Pydantic Models from JSON</h2>
          <p className="text-slate-400 leading-relaxed">
            Stop writing boilerplate verification code. This tool instantly converts raw JSON objects into <strong>Python Pydantic v2 (BaseModel)</strong> class definitions. It recursively analyzes nested objects and lists to generate a complete, type-safe schema ready for your FastAPI or AI application.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Why use Pydantic with LLMs?</h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            When building AI agents (using frameworks like LangChain or AutoGen), structured output is critical. By defining Pydantic models, you can use OpenAI's <code>function_calling</code> or <code>response_format</code> to ensure the LLM returns valid JSON that matches your schema—preventing runtime errors and hallucinations.
          </p>
        </div>
      </section>
    </div>
  );
}
