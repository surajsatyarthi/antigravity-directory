'use client';

import { useState } from 'react';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { submitResource } from '@/app/submit/actions';

interface SubmitFormProps {
  categories: { id: string; name: string }[];
}

export function SubmitForm({ categories }: SubmitFormProps) {
  const [isPending, setIsPending] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  async function handleSubmit(formData: FormData) {
    setIsPending(true);
    setMessage(null);
    
    try {
      const result = await submitResource(formData);
      if (result?.error) {
        setMessage({ type: 'error', text: result.error });
      } else {
        setMessage({ type: 'success', text: 'Thank you! Your resource has been submitted for approval.' });
        // Optional: clear form
        const form = document.querySelector('form') as HTMLFormElement;
        form?.reset();
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Something went wrong. Please try again.' });
    } finally {
      setIsPending(false);
    }
  }

  return (
    <div className="space-y-6">
      {message && (
        <div className={`p-6 rounded-2xl flex items-center gap-4 text-sm font-bold border ${
          message.type === 'success' 
            ? 'bg-green-500/10 text-green-400 border-green-500/20' 
            : 'bg-red-500/10 text-red-400 border-red-500/20'
        }`}>
          {message.type === 'success' ? <CheckCircle2 className="w-5 h-5 shrink-0" /> : <AlertCircle className="w-5 h-5 shrink-0" />}
          {message.text}
        </div>
      )}

      <form action={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
            Resource Name *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            required
            placeholder="e.g. Next.js App Router Helper"
            className="w-full bg-black border border-gray-900 rounded-2xl px-4 py-4 text-sm text-white focus:border-white transition-all outline-none placeholder:text-gray-700 font-medium"
          />
        </div>

        {/* Category */}
        <div>
          <label htmlFor="categoryName" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
            Category
          </label>
          <select
            id="categoryName"
            name="categoryName"
            className="w-full bg-black border border-gray-900 rounded-2xl px-4 py-4 text-sm text-white focus:border-white transition-all outline-none appearance-none font-medium"
          >
            <option value="" className="bg-[#0A0A0A]">Select a category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.name} className="bg-[#0A0A0A]">
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* URL */}
        <div>
          <label htmlFor="url" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
            External URL (Optional)
          </label>
          <input
            type="url"
            id="url"
            name="url"
            placeholder="https://github.com/..."
            className="w-full bg-black border border-gray-900 rounded-2xl px-4 py-4 text-sm text-white focus:border-white transition-all outline-none placeholder:text-gray-700 font-medium"
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
            Short Description *
          </label>
          <textarea
            id="description"
            name="description"
            required
            rows={3}
            placeholder="What does this resource do?"
            className="w-full bg-black border border-gray-900 rounded-2xl px-4 py-4 text-sm text-white focus:border-white transition-all outline-none resize-none placeholder:text-gray-700 font-medium leading-relaxed"
          />
        </div>

        {/* Content */}
        <div>
          <label htmlFor="content" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
            Code / Prompt Content (Optional)
          </label>
          <textarea
            id="content"
            name="content"
            rows={8}
            placeholder="Paste your code snippet or prompt here..."
            className="w-full bg-black border border-gray-900 rounded-2xl px-4 py-4 text-sm text-white focus:border-white transition-all outline-none resize-none placeholder:text-gray-700 font-mono leading-relaxed"
          />
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={isPending}
            className="w-full flex items-center justify-center gap-2 px-8 py-5 bg-white hover:bg-gray-200 text-black font-extrabold rounded-2xl transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-widest text-xs font-mono"
          >
            {isPending ? (
              <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
            {isPending ? 'Submitting...' : 'Submit Resource'}
          </button>
          <p className="mt-4 text-center text-xs text-gray-400">
            By submitting, you agree to our community guidelines.
          </p>
        </div>
      </form>
    </div>
  );
}
