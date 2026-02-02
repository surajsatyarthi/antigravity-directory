'use client';

import { useState } from 'react';
import { FileJson, ArrowRight, Copy, Check } from 'lucide-react';

export function JsonToPydantic() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const convert = () => {
    setError('');
    
    if (!input.trim()) {
      setOutput('');
      return;
    }

    try {
      const json = JSON.parse(input);
      const models: string[] = [];
      
      const toPascalCase = (str: string) => 
        str.replace(/(^\w|_\w)/g, m => m.replace('_', '').toUpperCase());

      const getPyType = (val: any, key: string): string => {
        if (val === null) return 'Optional[Any]';
        if (typeof val === 'string') return 'str';
        if (typeof val === 'number') return Number.isInteger(val) ? 'int' : 'float';
        if (typeof val === 'boolean') return 'bool';
        if (Array.isArray(val)) {
          if (val.length === 0) return 'List[Any]';
          return `List[${getPyType(val[0], key)}]`;
        }
        if (typeof val === 'object') {
          const className = toPascalCase(key);
          generateModel(val, className);
          return className;
        }
        return 'Any';
      };

      const generateModel = (obj: any, className: string) => {
        const lines = [`class ${className}(BaseModel):`];
        const keys = Object.keys(obj);
        
        if (keys.length === 0) {
          lines.push('    pass');
        } else {
          keys.forEach(key => {
            const type = getPyType(obj[key], key);
            lines.push(`    ${key}: ${type}`);
          });
        }
        models.push(lines.join('\n'));
      };

      // Start generation
      generateModel(json, 'RootModel');
      
      // Combine models (reverse order so dependencies are defined first)
      const fullCode = [
        'from typing import List, Optional, Any',
        'from pydantic import BaseModel',
        '',
        ...models.reverse()
      ].join('\n\n');

      setOutput(fullCode);

    } catch (e: any) {
      setError(e.message || 'Invalid JSON');
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[600px]">
        {/* Input */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-slate-300">
            Paste JSON Here
          </label>
          <div className="relative flex-1">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onBlur={convert}
              placeholder='{"name": "Antigravity", "is_awesome": true}'
              className={`w-full h-full p-4 font-mono text-xs bg-slate-900/50 border rounded-xl outline-none resize-none transition-all text-white placeholder:text-slate-600 ${error ? 'border-red-500 focus:ring-red-500' : 'border-slate-700 focus:ring-2 focus:ring-amber-500'}`}
            />
            {error && (
              <div className="absolute bottom-4 left-4 right-4 bg-red-900/50 border border-red-500/50 text-red-200 text-xs p-2 rounded">
                Error: {error}
              </div>
            )}
          </div>
        </div>

        {/* Output */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-slate-300">
              Pydantic (v2) Output
            </label>
            {output && (
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-slate-400 bg-slate-800 hover:bg-slate-700 rounded transition"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied' : 'Copy Code'}
              </button>
            )}
          </div>
          <div className="relative flex-1">
            <textarea
              readOnly
              value={output}
              placeholder="# Python code will appear here..."
              className="w-full h-full p-4 font-mono text-xs bg-slate-900 text-green-400 border border-slate-800 rounded-xl outline-none resize-none"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={convert}
          className="lg:hidden flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-lg transition shadow-sm"
        >
          Convert JSON <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <p className="text-xs text-center text-slate-400">
        * Generates standard Pydantic v2 models. Handles nested objects and lists recursively.
      </p>
    </div>
  );
}
