import { NextResponse } from "next/server";

const STORE: { number: string } = { number: "6281234567890" };

export async function GET() {
  return NextResponse.json(STORE);
}

export async function POST(request: Request) {
  const { number } = await request.json();

  if (!number || !/^62\d{9,13}$/.test(number)) {
    return NextResponse.json({ error: "Format nomor tidak valid" }, { status: 400 });
  }

  STORE.number = number;
  return NextResponse.json({ success: true, number });
}
