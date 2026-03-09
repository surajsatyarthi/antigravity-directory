'use client';

import { useState, useRef } from 'react';
import { Send, CheckCircle2, AlertCircle, Zap, ChevronDown } from 'lucide-react';
import { submitResource } from '@/app/submit/actions';

interface SubmitFormProps {
  categories: { id: string; name: string }[];
}

export function SubmitForm({ categories }: SubmitFormProps) {
  const [isPending, setIsPending] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const formData = new FormData(formRef.current!);
    if (!formData.get('title') || !formData.get('description')) {
      setMessage({ type: 'error', text: 'Please provide at least a Title and Description.' });
      return;
    }
    setIsPending(true);
    try {
      formData.set('paymentStatus', 'NONE');
      formData.set('paymentType', 'FREE');
      formData.set('paymentId', '');
      const result = await submitResource(formData);
      if (result?.error) {
        setMessage({ type: 'error', text: result.error });
      } else {
        setMessage({ type: 'success', text: 'Submitted! Your resource is under review and will be live shortly.' });
        formRef.current?.reset();
      }
    } catch {
      setMessage({ type: 'error', text: 'Submission error. Please try again.' });
    } finally {
      setIsPending(false);
    }
  }

  const inputClasses = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-base text-white placeholder:text-gray-600 focus:border-white/30 transition-all outline-none font-medium";
  const labelClasses = "block text-xs uppercase tracking-[0.15em] font-black text-gray-500 mb-2 ml-1";

  return (
    <div className="max-w-2xl mx-auto animate-in fade-in duration-700">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-4">
          Submit a Resource
        </h1>
        <p className="text-gray-500 max-w-lg mx-auto text-base">
          Add your MCP server, rule, prompt, workflow, or skill to the directory. Free, always.
        </p>
      </div>

      <div className="bg-white/[0.03] border border-white/[0.06] rounded-3xl p-8">
        {message && (
          <div className={`mb-8 p-4 rounded-xl flex items-center gap-3 text-sm font-bold border ${
            message.type === 'success'
              ? 'bg-emerald-500/5 text-emerald-400 border-emerald-500/20'
              : 'bg-red-500/5 text-red-400 border-red-500/20'
          }`}>
            {message.type === 'success' ? <CheckCircle2 className="w-5 h-5 shrink-0" /> : <AlertCircle className="w-5 h-5 shrink-0" />}
            {message.text}
          </div>
        )}

        <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-6">
          <div>
            <label htmlFor="categoryName" className={labelClasses}>Category</label>
            <div className="relative">
              <select
                id="categoryName"
                name="categoryName"
                required
                className={`${inputClasses} appearance-none cursor-pointer`}
              >
                <option value="">Select a category...</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 pointer-events-none" />
            </div>
          </div>

          <div>
            <label htmlFor="title" className={labelClasses}>Resource Name</label>
            <input type="text" id="title" name="title" required placeholder="Name of your tool, rule, or prompt..." className={inputClasses} />
          </div>

          <div>
            <label htmlFor="url" className={labelClasses}>Website / Link</label>
            <input type="url" id="url" name="url" required placeholder="https://..." className={inputClasses} />
          </div>

          <div>
            <label htmlFor="description" className={labelClasses}>Short Description</label>
            <textarea id="description" name="description" required rows={3} placeholder="What does it do? (Max 200 chars)" className={`${inputClasses} resize-none`} />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isPending}
              className="w-full py-4 bg-white hover:bg-gray-100 text-black font-black rounded-xl transition-all uppercase tracking-[0.15em] text-xs flex items-center justify-center gap-3"
            >
              {isPending ? (
                <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
              ) : (
                <Zap className="w-4 h-4" />
              )}
              Submit Resource
            </button>
            <p className="mt-3 text-center text-xs text-gray-700 font-medium">
              Reviewed by our team · Typically live within 48 hours
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
