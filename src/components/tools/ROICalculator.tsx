'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const MODELS = [
  { id: 'gpt-4o', name: 'GPT-4o', provider: 'OpenAI', inputPrice: 5.00, outputPrice: 15.00, color: '#10a37f' },
  { id: 'gpt-4o-mini', name: 'GPT-4o Mini', provider: 'OpenAI', inputPrice: 0.15, outputPrice: 0.60, color: '#10a37f' },
  { id: 'claude-3-5-sonnet', name: 'Claude 3.5 Sonnet', provider: 'Anthropic', inputPrice: 3.00, outputPrice: 15.00, color: '#d97757' },
  { id: 'claude-3-haiku', name: 'Claude 3 Haiku', provider: 'Anthropic', inputPrice: 0.25, outputPrice: 1.25, color: '#d97757' },
  { id: 'gemini-1-5-flash', name: 'Gemini 1.5 Flash', provider: 'Google', inputPrice: 0.35, outputPrice: 1.05, color: '#4285F4' },
  { id: 'gemini-1-5-pro', name: 'Gemini 1.5 Pro', provider: 'Google', inputPrice: 3.50, outputPrice: 10.50, color: '#4285F4' },
  { id: 'llama-3-70b', name: 'Llama 3 70B', provider: 'Meta (via Groq)', inputPrice: 0.59, outputPrice: 0.79, color: '#0668E1' },
  { id: 'deepseek-v3', name: 'DeepSeek V3', provider: 'DeepSeek', inputPrice: 0.14, outputPrice: 0.28, color: '#6366f1' },
];

export function RoiCalculator() {
  const [users, setUsers] = useState(100);
  const [requestsPerDay, setRequestsPerDay] = useState(20);
  const [inputTokens, setInputTokens] = useState(500);
  const [outputTokens, setOutputTokens] = useState(200);
  const [customModel, setCustomModel] = useState({ name: 'Custom', inputPrice: 1.0, outputPrice: 2.0 });

  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const monthlyRequests = users * requestsPerDay * 30;
    
    // Calculate costs (Prices are per 1M tokens usually, but standard notation is often per 1M)
    // NOTE: Prices in MODELS array are per 1M tokens (standard industry pricing)
    
    const calculateCost = (model: typeof MODELS[0]) => {
      const inputCost = (inputTokens / 1_000_000) * model.inputPrice;
      const outputCost = (outputTokens / 1_000_000) * model.outputPrice;
      const costPerRequest = inputCost + outputCost;
      return monthlyRequests * costPerRequest;
    };

    const newData = MODELS.map(model => ({
      name: model.name,
      cost: calculateCost(model),
      color: model.color,
      provider: model.provider
    })).sort((a, b) => a.cost - b.cost);

    setData(newData);
  }, [users, requestsPerDay, inputTokens, outputTokens]);

  const formatCurrency = (val: number) => {
    if (val < 1) return `$${val.toFixed(2)}`;
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Controls */}
      <div className="lg:col-span-4 space-y-6">
        <Card className="p-6 bg-white/5 border-white/10 space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="users-input" className="text-slate-200">Active Users</Label>
              <Input 
                id="users-input"
                type="number" 
                value={users} 
                onChange={(e) => setUsers(Number(e.target.value))} 
                className="bg-black/50 border-white/10" 
              />
              <Slider 
                value={[users]} 
                max={10000} 
                step={10} 
                onValueChange={(val) => setUsers(val[0])} 
                className="py-2"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-slate-200">Requests per User / Day</Label>
              <Input 
                type="number" 
                value={requestsPerDay} 
                onChange={(e) => setRequestsPerDay(Number(e.target.value))}
                className="bg-black/50 border-white/10" 
              />
              <Slider 
                value={[requestsPerDay]} 
                max={500} 
                step={1} 
                onValueChange={(val) => setRequestsPerDay(val[0])}
                className="py-2"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-slate-200">Avg Input Tokens</Label>
              <Input 
                type="number" 
                value={inputTokens} 
                onChange={(e) => setInputTokens(Number(e.target.value))}
                className="bg-black/50 border-white/10" 
              />
            </div>

            <div className="space-y-2">
              <Label className="text-slate-200">Avg Output Tokens</Label>
              <Input 
                type="number" 
                value={outputTokens} 
                onChange={(e) => setOutputTokens(Number(e.target.value))}
                className="bg-black/50 border-white/10" 
              />
            </div>
            
             <div className="pt-4 border-t border-white/10 text-xs text-slate-500">
               * Prices per 1M tokens. Updated Feb 2026.
            </div>
          </div>
        </Card>
      </div>

      {/* Chart */}
      <div className="lg:col-span-8 space-y-6">
        <Card className="p-6 bg-white/5 border-white/10 h-[500px] flex flex-col">
          <div className="mb-6 flex justify-between items-end">
             <div>
                <h3 className="text-lg font-semibold text-white">Monthly Cost Projection</h3>
                <p className="text-slate-400 text-sm">Based on {users * requestsPerDay * 30} total monthly requests</p>
             </div>
             <div className="text-right">
                <div className="text-sm text-slate-400">Lowest Cost</div>
                <div className="text-xl font-bold text-green-400">{formatCurrency(data[0]?.cost || 0)}</div>
                <div className="text-xs text-slate-500">{data[0]?.name}</div>
             </div>
          </div>
          
          <div className="flex-1 w-full min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} layout="vertical" margin={{ left: 20, right: 50 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" horizontal={false} />
                <XAxis type="number" stroke="#666" tickFormatter={(val) => `$${val}`} />
                <YAxis dataKey="name" type="category" width={100} stroke="#999" style={{ fontSize: '12px' }} />
                <Tooltip 
                  cursor={{fill: 'transparent'}}
                  contentStyle={{ backgroundColor: '#000', border: '1px solid #333', borderRadius: '8px' }}
                  itemStyle={{ color: '#fff' }}
                  formatter={(value: any) => [formatCurrency(value), 'Est. Monthly Cost']}
                />
                <Bar dataKey="cost" radius={[0, 4, 4, 0]} barSize={32}>
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Insight */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <Card className="p-4 bg-green-500/10 border-green-500/20">
                <h4 className="font-semibold text-green-400 mb-1">Budget Option: DeepSeek V3</h4>
                <p className="text-xs text-slate-300">
                   At <b>{formatCurrency(data.find(d => d.name === 'DeepSeek V3')?.cost || 0)}/mo</b>, DeepSeek V3 offers the most competitive pricing for high-volume applications while maintaining strong reasoning capabilities.
                </p>
             </Card>
             <Card className="p-4 bg-blue-500/10 border-blue-500/20">
                <h4 className="font-semibold text-blue-400 mb-1">Smart Choice: Gemini 1.5 Flash</h4>
                <p className="text-xs text-slate-300">
                   Google's <b>{formatCurrency(data.find(d => d.name === 'Gemini 1.5 Flash')?.cost || 0)}/mo</b> comes with a massive 1M context window, making it ideal for RAG and document processing.
                </p>
             </Card>
        </div>
      </div>
    </div>
  );
}
