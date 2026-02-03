'use client';

import React, { useState } from 'react';
import { Mail, Zap, Loader2, CheckCircle2, ChevronRight, Eye } from 'lucide-react';
import { triggerEdwardOutreach } from '@/app/dashboard/actions';
import { OutreachTarget, generateEdwardEmail } from '@/lib/edward-shared';
import { enrichContactsForUnverifiedTools, EnrichmentStats } from '@/lib/enrich-contacts';

interface EdwardOutreachPanelProps {
  prospects: OutreachTarget[];
}

export function EdwardOutreachPanel({ prospects }: EdwardOutreachPanelProps) {
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [successId, setSuccessId] = useState<string | null>(null);
  const [viewingPitch, setViewingPitch] = useState<OutreachTarget | null>(null);
  const [enriching, setEnriching] = useState(false);
  const [enrichmentResults, setEnrichmentResults] = useState<EnrichmentStats | null>(null);

  async function handleSend(target: OutreachTarget) {
    if (!confirm(`Confirm: Send Edward's technical pitch to ${target.name}?`)) return;
    
    setLoadingId(target.id);
    const result = await triggerEdwardOutreach(target.id);
    setLoadingId(null);
    
    if (result.success) {
      setSuccessId(target.id);
      setTimeout(() => setSuccessId(null), 3000);
    } else {
      alert(result.message);
    }
  }

  async function handleEnrichContacts() {
    if (!confirm('Enrich contact emails for top 50 unverified tools? This will use your Apollo.io credits.')) return;
    
    setEnriching(true);
    setEnrichmentResults(null);
    
    try {
      const stats = await enrichContactsForUnverifiedTools(50);
      setEnrichmentResults(stats);
    } catch (error: any) {
      alert(error.message || 'Enrichment failed');
    } finally {
      setEnriching(false);
    }
  }

  return (
    <div className="bg-[#050505] border border-white/[0.05] rounded-[32px] overflow-hidden">
      {/* Header */}
      <div className="p-8 border-b border-white/[0.03] bg-gradient-to-r from-blue-600/5 to-transparent flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Mail className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-black text-white tracking-tight uppercase italic">Edward <span className="text-blue-500">Outreach Intelligence</span></h3>
            <p className="text-[10px] text-gray-500 font-mono uppercase tracking-[0.2em] mt-1">Status: Scanning for High-Signal Leads</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleEnrichContacts}
            disabled={enriching}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white text-[10px] font-black uppercase tracking-widest rounded-lg transition-all flex items-center gap-2"
          >
            {enriching ? (
              <><Loader2 className="w-3 h-3 animate-spin" /> Enriching...</>
            ) : (
              <>🔍 Enrich Contacts</>
            )}
          </button>
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[9px] font-black text-blue-400 uppercase tracking-widest">
            <Zap className="w-3 h-3" /> Demand Signal Active
          </div>
        </div>
      </div>

      <div className="p-8">
        {/* Enrichment Results */}
        {enrichmentResults && (
          <div className="mb-8 p-6 rounded-2xl bg-purple-500/5 border border-purple-500/20">
            <h4 className="text-sm font-black text-white mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-purple-400" />
              Enrichment Complete
            </h4>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center">
                <p className="text-2xl font-black text-white">{enrichmentResults.enriched}</p>
                <p className="text-[9px] text-gray-500 uppercase tracking-widest font-mono">Emails Found</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-black text-gray-600">{enrichmentResults.failed}</p>
                <p className="text-[9px] text-gray-500 uppercase tracking-widest font-mono">Not Found</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-black text-purple-400">{enrichmentResults.creditsUsed}</p>
                <p className="text-[9px] text-gray-500 uppercase tracking-widest font-mono">Credits Used</p>
              </div>
            </div>
            <p className="text-[10px] text-gray-500 italic text-center">
              Edward can now reach out to {enrichmentResults.enriched} new prospects!
            </p>
          </div>
        )}

        {prospects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {prospects.map((target) => (
              <div 
                key={target.id} 
                className={`p-6 rounded-2xl bg-white/[0.02] border transition-all group relative overflow-hidden ${
                  successId === target.id ? 'border-emerald-500/50 bg-emerald-500/5' : 'border-white/[0.05] hover:border-blue-500/30'
                }`}
              >
                {successId === target.id && (
                  <div className="absolute inset-0 bg-emerald-500/10 flex items-center justify-center z-10 backdrop-blur-sm animate-in fade-in zoom-in duration-300">
                    <div className="text-center">
                      <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
                      <p className="text-[10px] font-black text-white uppercase tracking-widest">Pitch Delivered</p>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-black text-white tracking-tight uppercase italic">{target.name}</h4>
                  <span className="text-[9px] font-black text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-full tracking-widest uppercase border border-blue-500/20">
                    Signal: {target.searchVolumeSignal}
                  </span>
                </div>
                
                <p className="text-[10px] text-gray-500 font-mono uppercase tracking-widest leading-relaxed mb-8 flex items-start gap-2">
                  <ChevronRight className="w-3 h-3 text-blue-500 shrink-0" />
                  {target.reason}
                </p>

                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => setViewingPitch(target)}
                    className="flex-1 py-3 bg-white/5 hover:bg-white/10 text-white text-[9px] font-black uppercase tracking-widest rounded-xl transition-all border border-white/5 flex items-center justify-center gap-2"
                  >
                    <Eye className="w-3 h-3" /> View Pitch
                  </button>
                  <button 
                    onClick={() => handleSend(target)}
                    disabled={loadingId === target.id}
                    className="flex-1 py-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-[9px] font-black uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-blue-500/10 active:scale-95 flex items-center justify-center gap-2"
                  >
                    {loadingId === target.id ? <Loader2 className="w-3 h-3 animate-spin" /> : 'Send Pitch →'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-24 text-center border-2 border-dashed border-white/5 rounded-3xl">
            <Mail className="w-10 h-10 text-gray-800 mx-auto mb-4 opacity-20" />
            <p className="text-gray-600 font-mono text-[10px] uppercase tracking-[0.2em] italic">Edward: No unverified tools satisfy the current demand threshold.</p>
          </div>
        )}
      </div>

      {/* Pitch Review Modal (Simple overlay) */}
      {viewingPitch && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-24 bg-black/90 backdrop-blur-xl animate-in fade-in duration-300">
          <div className="bg-[#0A0A0A] border border-white/10 w-full max-w-2xl rounded-[2.5rem] overflow-hidden shadow-2xl shadow-blue-500/10 flex flex-col">
            <div className="p-8 border-b border-white/5 bg-white/[0.02] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-blue-500" />
                <h3 className="text-xl font-black text-white uppercase tracking-tighter italic">Edward's <span className="text-blue-500">Draft</span></h3>
              </div>
              <button 
                onClick={() => setViewingPitch(null)}
                className="text-[10px] font-black text-gray-500 hover:text-white uppercase tracking-widest transition-colors"
              >
                Close ESC
              </button>
            </div>
            <div className="p-8 font-mono text-xs text-gray-400 bg-black/50 overflow-y-auto max-h-[60vh] leading-relaxed">
              <div className="mb-4 pb-4 border-b border-white/5">
                <p className="text-gray-600 mb-1 tracking-widest uppercase font-black text-[9px]">Subject:</p>
                <p className="text-blue-400">{generateEdwardEmail(viewingPitch).subject}</p>
              </div>
              <p className="text-gray-600 mb-1 tracking-widest uppercase font-black text-[9px]">Body:</p>
              <pre className="whitespace-pre-wrap font-mono">{generateEdwardEmail(viewingPitch).body}</pre>
            </div>
            <div className="p-8 bg-black">
              <button 
                onClick={() => {
                  setViewingPitch(null);
                  handleSend(viewingPitch);
                }}
                className="w-full py-4 bg-white text-black font-black rounded-2xl hover:bg-gray-200 transition-all uppercase tracking-widest text-xs shadow-xl shadow-white/5"
              >
                Approve & Deliver Pitch →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
