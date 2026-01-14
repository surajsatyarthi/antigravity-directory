'use server';

/**
 * Apollo.io API Client for Contact Enrichment
 * Zero-dependency implementation using native fetch
 */

export type ApolloContactResult = {
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  title: string | null;
  confidence: number;
};

export type EnrichmentResult = {
  success: boolean;
  email: string | null;
  message: string;
  creditsUsed: number;
};

/**
 * Find contact email using Apollo.io People Search API
 */
export async function findContactEmail(
  companyDomain: string,
  companyName: string
): Promise<EnrichmentResult> {
  const apiKey = process.env.APOLLO_API_KEY;

  if (!apiKey) {
    console.warn('APOLLO_API_KEY not found. Enrichment disabled.');
    return {
      success: false,
      email: null,
      message: 'Apollo API key not configured',
      creditsUsed: 0,
    };
  }

  try {
    // Apollo.io People Search endpoint
    const response = await fetch('https://api.apollo.io/v1/mixed_people/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        'X-Api-Key': apiKey,
      },
      body: JSON.stringify({
        // Search for decision-makers at this company
        organization_domains: [companyDomain],
        person_titles: [
          'founder',
          'ceo',
          'chief executive',
          'co-founder',
          'head of growth',
          'head of marketing',
          'cmo',
        ],
        page: 1,
        per_page: 5, // Get top 5 matches
      }),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Unknown error' }));
      throw new Error(error.message || `Apollo API error: ${response.status}`);
    }

    const data = await response.json();

    // Extract best contact from results
    if (data.people && data.people.length > 0) {
      // Prioritize: CEO > Founder > Co-Founder > Head of Marketing
      const priorityTitles = ['ceo', 'founder', 'co-founder', 'head of growth', 'head of marketing'];
      
      let bestContact = data.people[0]; // Default to first
      
      for (const title of priorityTitles) {
        const match = data.people.find((p: any) => 
          p.title?.toLowerCase().includes(title)
        );
        if (match && match.email) {
          bestContact = match;
          break;
        }
      }

      if (bestContact.email) {
        return {
          success: true,
          email: bestContact.email,
          message: `Found ${bestContact.title || 'contact'} at ${companyName}`,
          creditsUsed: 1,
        };
      }
    }

    return {
      success: false,
      email: null,
      message: `No verified email found for ${companyName}`,
      creditsUsed: 1,
    };
  } catch (error: any) {
    console.error('Apollo API Error:', error);
    return {
      success: false,
      email: null,
      message: error.message || 'Apollo API request failed',
      creditsUsed: 0,
    };
  }
}
