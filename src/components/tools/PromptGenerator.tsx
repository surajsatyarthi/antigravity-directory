'use client';

import { useState } from 'react';
import { Terminal, Copy, Check } from 'lucide-react';

export function PromptGenerator() {
  const [role, setRole] = useState('');
  const [task, setTask] = useState('');
  const [constraints, setConstraints] = useState('');
  const [format, setFormat] = useState('');
  const [context, setContext] = useState('');
  const [copied, setCopied] = useState(false);

  const generatePrompt = () => {
    const parts = [];
    
    if (role) parts.push(`# ROLE\n${role}`);
    if (task) parts.push(`# TASK\n${task}`);
    if (constraints) parts.push(`# CONSTRAINTS\n${constraints}`);
    if (format) parts.push(`# OUTPUT FORMAT\n${format}`);
    if (context) parts.push(`# CONTEXT\n${context}`);

    return parts.join('\n\n');
  };

  const output = generatePrompt();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Form */}
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            AI Persona / Role
          </label>
          <input
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="You are a senior React engineer..."
            className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none text-white placeholder:text-slate-600"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Task Description
          </label>
          <textarea
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Analyze the following code and find security vulnerabilities..."
            className="w-full h-24 px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none resize-none text-white placeholder:text-slate-600"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Constraints & Rules
          </label>
          <textarea
            value={constraints}
            onChange={(e) => setConstraints(e.target.value)}
            placeholder="- Do not explain basic concepts&#10;- Be concise&#10;- Use TypeScript"
            className="w-full h-24 px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none resize-none text-white placeholder:text-slate-600"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Output Format
          </label>
          <textarea
            value={format}
            onChange={(e) => setFormat(e.target.value)}
            placeholder="Return a JSON list of objects with 'id' and 'severity' keys."
            className="w-full h-20 px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none resize-none text-white placeholder:text-slate-600"
          />
        </div>
      </div>

      {/* Preview */}
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium text-slate-300">
            System Prompt Preview
          </label>
          <button
            onClick={copyToClipboard}
            className="flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-slate-400 bg-slate-800 hover:bg-slate-700 rounded transition"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
        <div className="relative flex-1 min-h-[400px]">
          <textarea
            readOnly
            value={output}
            placeholder="# Your structured prompt will appear here..."
            className="w-full h-full p-6 font-mono text-sm bg-slate-900 text-purple-300 border border-slate-800 rounded-xl outline-none resize-none"
          />
        </div>
      </div>
    </div>
  );
}
