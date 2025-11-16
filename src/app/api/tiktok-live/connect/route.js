import { NextResponse } from 'next/server';

const SCRAPER_SERVER_URL = process.env.SCRAPER_SERVER_URL

export async function POST(req) {
  try {
    console.log('Next.js Connect API: Request received');
    const { uniqueId } = await req.json();

    if (!uniqueId) {
      console.error('Next.js Connect API: TikTok uniqueId is required');
      return NextResponse.json({ error: 'TikTok uniqueId is required' }, { status: 400 });
    }

    const fetchUrl = `${SCRAPER_SERVER_URL}/scrape/start`;
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ uniqueId }),
    };

    console.log(`Next.js Connect API: Attempting to fetch from: ${fetchUrl}`);
    console.log('Next.js Connect API: Fetch options:', fetchOptions);

    const response = await fetch(fetchUrl, fetchOptions);

    console.log('Next.js Connect API: Received response from scraper server.');
    console.log('Next.js Connect API: Response status:', response.status);
    const responseText = await response.text(); // Read as text first
    console.log('Next.js Connect API: Response text:', responseText);

    if (!response.ok) {
      let errorData;
      try {
        errorData = JSON.parse(responseText); // Try parsing as JSON
      } catch (parseError) {
        console.error('Next.js Connect API: Failed to parse error response as JSON:', parseError);
        return NextResponse.json({ error: `Scraper server returned non-JSON error: ${responseText}` }, { status: response.status });
      }
      console.error('Next.js Connect API: Scraper server returned error:', errorData.error);
      return NextResponse.json({ error: errorData.error }, { status: response.status });
    }

    const successData = JSON.parse(responseText); // Parse as JSON if response.ok
    console.log('Next.js Connect API: Scraper server returned success:', successData.message);
    return NextResponse.json(successData, { status: 200 });
  } catch (error) {
    console.error('Next.js Connect API: Error in try block:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
