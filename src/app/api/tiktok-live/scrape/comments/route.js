const BACKEND_URL = process.env.BACKEND_URL || "http://127.0.0.1:5000";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username");
  console.log(username)

  if (!username) {
    return Response.json({ error: "username requerido" }, { status: 400 });
  }

  try {
    const res = await fetch(
      `${BACKEND_URL}/scrape/user/${username}/comments?limit=200`,
      {
        cache: "no-store", // siempre fresco
      }
    );

    if (!res.ok) {
      const error = await res.text();
      console.error("Backend error:", error);
      return Response.json({ comments: [] }, { status: res.status });
    }

    const data = await res.json();

    return Response.json({
      comments: data.comments || [],
      total: data.total || 0,
    });
  } catch (error) {
    console.error("Proxy error:", error);
    return Response.json({ comments: [] }, { status: 500 });
  }
}