// src/app/api/tiktok-live/scrape/comments/[username]/route.js

export async function GET(request, { params }) {
  const { username } = await params;
  const SCRAPER_SERVER_URL = process.env.SCRAPER_SERVER_URL;

  try {
    const backendResponse = await fetch(
      `${SCRAPER_SERVER_URL}/scrape/user/${username}/comments`,
      { cache: "no-store" }
    );

    if (!backendResponse.ok) {
      return Response.json(
        { error: "Live no encontrado o sin comentarios", username },
        { status: backendResponse.status }
      );
    }

    const data = await backendResponse.json();
    return Response.json(data);

  } catch (error) {
    return Response.json(
      { error: "Backend no está corriendo", username },
      { status: 502 }
    );
  }
}