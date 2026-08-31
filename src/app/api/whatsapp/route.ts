import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  const { data, error } = await supabase
    .from("whatsapp_settings")
    .select("*")
    .eq("id", 1)
    .single();

  if (error) return NextResponse.json({ number: "6281234567890" });
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const { number } = await request.json();

  if (!number || !/^62\d{9,13}$/.test(number)) {
    return NextResponse.json({ error: "Format nomor tidak valid" }, { status: 400 });
  }

  const { error } = await supabase
    .from("whatsapp_settings")
    .update({ number, updated_at: new Date().toISOString() })
    .eq("id", 1);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true, number });
}
