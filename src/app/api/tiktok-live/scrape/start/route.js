export async function POST(req) {
  const { uniqueId } = await req.json();
  const res = await fetch('http://localhost:5000/scrape/start', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ uniqueId }),
  });
  const data = await res.json();
  return Response.json(data, { status: res.status });
}
