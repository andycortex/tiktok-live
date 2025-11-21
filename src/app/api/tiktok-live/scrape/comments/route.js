import { NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL;

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username");

  if (!username) {
    return NextResponse.json(
      { error: "Falta el parámetro 'username'" },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(
      `${BACKEND_URL}/scrape/comments?username=${encodeURIComponent(username)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        next: { revalidate: 1 }
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: errorText || "Live no encontrado o no activo" },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json({
      username: data.username,
      total: data.total,
      comments: data.comments || [],
    });
  } catch (error) {
    console.error("Error proxy /scrape/comments:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}