'use client';

import { useState } from 'react';
import { CheckCircle2, XCircle, MessageSquare } from 'lucide-react';
import { approveSubmission, rejectSubmission } from '@/app/admin/submissions/actions';
import { useTransition } from 'react';

interface Submission {
  id: string;
  title: string;
  description: string;
  url?: string | null;
  categoryName?: string | null;
  paymentStatus: string;
  paymentType: string;
  status: string;
  createdAt: Date;
  userEmail?: string | null;
  userName?: string | null;
}

interface AdminSubmissionQueueProps {
  submissions: Submission[];
}

export function AdminSubmissionQueue({ submissions }: AdminSubmissionQueueProps) {
  const [isPending, startTransition] = useTransition();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [rejectionReason, setRejectionReason] = useState<Record<string, string>>({});

  const handleApprove = (submissionId: string) => {
    startTransition(async () => {
      const result = await approveSubmission(submissionId);
      if (result?.error) {
        alert(`Error: ${result.error}`);
      }
    });
  };

  const handleReject = (submissionId: string) => {
    startTransition(async () => {
      const result = await rejectSubmission(submissionId, rejectionReason[submissionId]);
      if (result?.error) {
        alert(`Error: ${result.error}`);
      } else {
        setRejectionReason({ ...rejectionReason, [submissionId]: '' });
      }
    });
  };

  if (submissions.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="bg-white/5 border border-white/10 rounded-lg p-8">
          <p className="text-gray-400 text-lg">No pending submissions</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {submissions.map((submission) => (
        <div
          key={submission.id}
          className="bg-white/5 border border-white/10 rounded-lg overflow-hidden hover:border-white/20 transition-colors"
        >
          {/* Header */}
          <div
            className="p-6 cursor-pointer flex items-start justify-between"
            onClick={() => setExpandedId(expandedId === submission.id ? null : submission.id)}
          >
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-lg font-semibold text-white">{submission.title}</h3>
                <span className={`px-3 py-1 rounded-full text-xs font-mono uppercase ${
                  submission.paymentStatus === 'PAID'
                    ? 'bg-emerald-500/20 text-emerald-400'
                    : 'bg-gray-500/20 text-gray-400'
                }`}>
                  {submission.paymentStatus === 'PAID' ? '💰 Paid' : 'Free'}
                </span>
                {submission.paymentType === 'FEATURED' && (
                  <span className="px-3 py-1 rounded-full text-xs font-mono uppercase bg-yellow-500/20 text-yellow-400">
                    ⭐ Featured
                  </span>
                )}
              </div>
              <p className="text-gray-400 text-sm mb-2">{submission.description}</p>
              <div className="flex gap-4 text-xs text-gray-500">
                <span>Category: {submission.categoryName || 'Uncategorized'}</span>
                <span>Submitted by: {submission.userName || submission.userEmail}</span>
                <span>{new Date(submission.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
            <div className="ml-4 text-gray-400">
              {expandedId === submission.id ? '−' : '+'}
            </div>
          </div>

          {/* Expanded Details */}
          {expandedId === submission.id && (
            <div className="border-t border-white/10 bg-black/40 p-6 space-y-4">
              {submission.url && (
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">
                    URL
                  </label>
                  <a
                    href={submission.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-400 hover:underline break-all"
                  >
                    {submission.url}
                  </a>
                </div>
              )}

              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">
                  Full Description
                </label>
                <p className="text-gray-300 text-sm leading-relaxed">{submission.description}</p>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">
                  Submitter Email
                </label>
                <a
                  href={`mailto:${submission.userEmail}`}
                  className="text-emerald-400 hover:underline"
                >
                  {submission.userEmail}
                </a>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-white/10 flex gap-3">
                <button
                  onClick={() => handleApprove(submission.id)}
                  disabled={isPending}
                  className="flex items-center gap-2 px-4 py-2 bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 rounded-lg hover:bg-emerald-500/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium text-sm"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Approve
                </button>

                <button
                  onClick={() => handleReject(submission.id)}
                  disabled={isPending}
                  className="flex items-center gap-2 px-4 py-2 bg-red-500/20 border border-red-500/40 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium text-sm"
                >
                  <XCircle className="w-4 h-4" />
                  Reject
                </button>
              </div>

              {/* Rejection Reason (optional) */}
              {false && (
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">
                    Rejection Reason (optional)
                  </label>
                  <textarea
                    value={rejectionReason[submission.id] || ''}
                    onChange={(e) =>
                      setRejectionReason({
                        ...rejectionReason,
                        [submission.id]: e.target.value,
                      })
                    }
                    placeholder="Why are you rejecting this submission?"
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder:text-gray-600 focus:border-emerald-500/50 outline-none resize-none"
                    rows={3}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
