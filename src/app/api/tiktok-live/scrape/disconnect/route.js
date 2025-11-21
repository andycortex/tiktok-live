import { NextResponse } from 'next/server';

const SCRAPER_SERVER_URL = process.env.SCRAPER_SERVER_URL;

export async function POST(req) {
  try {
    console.log('Next.js Disconnect API: Request received');
    const { uniqueId } = await req.json();

    if (!uniqueId) {
      return NextResponse.json({ error: 'TikTok uniqueId is required' }, { status: 400 });
    }

    const response = await fetch(`${SCRAPER_SERVER_URL}/scrape/disconnect`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ uniqueId }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json({ error: errorData.error }, { status: response.status });
    }

    const successData = await response.json();
    return NextResponse.json(successData, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}