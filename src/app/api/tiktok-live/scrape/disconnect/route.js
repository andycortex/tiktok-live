// src/app/api/tiktok-live/scrape/stop/route.js
import { NextResponse } from 'next/server';

const BACKEND_URL = process.env.SCRAPER_SERVER_URL || 'http://127.0.0.1:5000';

export async function POST(request) {
  try {
    const { uniqueId } = await request.json();

    if (!uniqueId) {
      return NextResponse.json(
        { error: 'uniqueId es requerido' },
        { status: 400 }
      );
    }

    const res = await fetch(`${BACKEND_URL}/scrape/disconnect`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ uniqueId }),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      return NextResponse.json(
        { error: data.error || 'Error al desconectar del scraper' },
        { status: res.status }
      );
    }

    return NextResponse.json(data);

  } catch (error) {
    console.error('Error en proxy disconnect:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}