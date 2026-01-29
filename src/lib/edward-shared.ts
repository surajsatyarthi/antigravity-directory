export type OutreachTarget = {
  id: string;
  name: string;
  slug: string;
  contactEmail: string | null;
  searchVolumeSignal: number | null;
  reason: string;
};

/**
 * Edward's Personalization Engine: Crafting the perfect pitch.
 * This is a shared utility safe for both Server and Client.
 */
export function generateEdwardEmail(target: OutreachTarget) {
  // Use a fallback for env if not available on client
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || process.env.NEXTAUTH_URL || 'https://antigravity.directory';
  const loginUrl = `${baseUrl}/submit?claim=${target.slug}`;
  
  return {
    subject: `[Verified Signal] Technical Audit for ${target.name} on Antigravity`,
    body: `
Hi there,

I'm Edward, Lead Technical Auditor at Antigravity Directory.

I'm reaching out because our platform has detected a significant surge in developer intent for "${target.name}" over the last 14 days. 

Currently, your tool's listing on Antigravity is "Unverified," which means you're missing out on:
1. Direct ROI analytics for your category.
2. A Permanent Do-Follow link for your domain authority.
3. Priority placement in our Weekly Newsletter (15k+ subscribers).

We're offering early adopter pricing for verified listings. You can claim your listing and verify your data here:
${loginUrl}

Looking forward to seeing ${target.name} in the inner circle.

Best,
Edward
Antigravity Directory
    `.trim(),
  };
}
