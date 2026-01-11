'use client';

import { useEffect } from 'react';
import { AlertTriangle, RefreshCcw, Home } from 'lucide-react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application Error:', error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
      <div className="w-20 h-20 bg-red-500/10 rounded-3xl flex items-center justify-center mb-8 border border-red-500/20">
        <AlertTriangle className="w-10 h-10 text-red-500" />
      </div>
      
      <h1 className="text-3xl font-bold text-white mb-4">Something went wrong</h1>
      <p className="text-gray-400 max-w-md mb-10 leading-relaxed">
        We encountered an unexpected error while loading this page. 
        Our team has been notified and we're working to fix it.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => reset()}
          className="flex items-center justify-center gap-2 px-8 py-4 bg-white text-black font-bold rounded-2xl hover:bg-red-500 hover:text-white transition-all group"
        >
          <RefreshCcw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
          Try Again
        </button>
        
        <Link
          href="/"
          className="flex items-center justify-center gap-2 px-8 py-4 bg-gray-900 text-white font-bold rounded-2xl border border-gray-800 hover:bg-gray-800 transition-all"
        >
          <Home className="w-5 h-5" />
          Back to Home
        </Link>
      </div>

      {error.digest && (
        <p className="mt-12 text-[10px] font-mono text-gray-700 uppercase tracking-widest">
          Error ID: {error.digest}
        </p>
      )}
    </div>
  );
}
