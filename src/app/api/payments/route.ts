import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  const { data: methods, error: e1 } = await supabase
    .from("payment_methods")
    .select("*")
    .order("sort_order");

  const { data: qris, error: e2 } = await supabase
    .from("qris_settings")
    .select("*")
    .eq("id", 1)
    .single();

  if (e1 || e2) return NextResponse.json({ error: "Gagal load data" }, { status: 500 });
  return NextResponse.json({ methods, qris });
}

export async function POST(request: Request) {
  const body = await request.json();

  if (body.type === "toggle") {
    const { error } = await supabase
      .from("payment_methods")
      .update({ active: body.active })
      .eq("id", body.id);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ success: true });
  }

  if (body.type === "update_qris") {
    const { error } = await supabase
      .from("qris_settings")
      .update({ image_url: body.image_url, updated_at: new Date().toISOString() })
      .eq("id", 1);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ error: "Unknown action" }, { status: 400 });
}
