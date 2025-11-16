import { NextResponse } from 'next/server';

const SCRAPER_SERVER_URL = process.env.SCRAPER_SERVER_URL;

export async function POST(req) {
  try {
    console.log('Next.js Disconnect API: Request received');
    const { uniqueId } = await req.json();

    if (!uniqueId) {
      console.error('Next.js Disconnect API: TikTok uniqueId is required');
      return NextResponse.json({ error: 'TikTok uniqueId is required' }, { status: 400 });
    }

    console.log(`Next.js Disconnect API: Forwarding disconnect request for ${uniqueId} to scraper server`);
    const response = await fetch(`${SCRAPER_SERVER_URL}/scrape/stop`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ uniqueId }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Next.js Disconnect API: Scraper server returned error:', errorData.error);
      return NextResponse.json({ error: errorData.error }, { status: response.status });
    }

    const successData = await response.json();
    console.log('Next.js Disconnect API: Scraper server returned success:', successData.message);
    return NextResponse.json(successData, { status: 200 });
  } catch (error) {
    console.error('Next.js Disconnect API: Error in try block:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}