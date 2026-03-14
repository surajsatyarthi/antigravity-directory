const SITE_URL = 'https://www.googleantigravity.directory';
const INDEXNOW_HOST = 'googleantigravity.directory';

export async function pingIndexNow(slug: string): Promise<void> {
  const key = process.env.INDEXNOW_KEY;
  if (!key) {
    console.warn('[IndexNow] INDEXNOW_KEY not set — skipping ping');
    return;
  }

  const url = `${SITE_URL}/t/${slug}`;

  try {
    const res = await fetch('https://api.indexnow.org/IndexNow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        host: INDEXNOW_HOST,
        key,
        keyLocation: `${SITE_URL}/${key}.txt`,
        urlList: [url],
      }),
    });

    if (res.ok) {
      console.log(`[IndexNow] Pinged: ${url} → ${res.status}`);
    } else {
      console.warn(`[IndexNow] Ping failed: ${url} → ${res.status}`);
    }
  } catch (err) {
    console.error('[IndexNow] Ping error:', err);
  }
}
