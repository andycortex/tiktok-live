import { NextResponse } from 'next/server';

const SCRAPER_SERVER_URL = process.env.SCRAPER_SERVER_URL;

export async function POST(req) {
  try {
    const { uniqueId } = await req.json();
    if (!uniqueId) {
      return NextResponse.json({ error: 'TikTok uniqueId is required' }, { status: 400 });
    }

    const response = await fetch(`${SCRAPER_SERVER_URL}/scrape/connect`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ uniqueId }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({ error: data.error || 'Error en el scraper' }, { status: response.status });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}