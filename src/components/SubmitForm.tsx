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
        <div className={`p-4 rounded-xl flex items-center gap-3 text-sm font-medium ${
          message.type === 'success' 
            ? 'bg-green-50 text-green-700 border border-green-100 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800' 
            : 'bg-red-50 text-red-700 border border-red-100 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800'
        }`}>
          {message.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
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
            className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 text-sm focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none"
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
            className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 text-sm focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none appearance-none"
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.name}>
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
            className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 text-sm focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none"
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
            className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 text-sm focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none resize-none"
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
            rows={6}
            placeholder="Paste your code snippet or prompt here..."
            className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 text-sm font-mono focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none resize-none"
          />
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={isPending}
            className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-blue-600 border-none hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
            {isPending ? 'Submitting...' : 'Submit for Approval'}
          </button>
          <p className="mt-4 text-center text-xs text-gray-400">
            By submitting, you agree to our community guidelines.
          </p>
        </div>
      </form>
    </div>
  );
}
