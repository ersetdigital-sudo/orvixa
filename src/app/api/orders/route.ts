import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");

  let query = supabase
    .from("orders")
    .select("*, products(name, src)")
    .order("created_at", { ascending: false });

  if (status) {
    query = query.eq("status", status);
  }

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const body = await request.json();

  if (body.type === "update_status") {
    const { error } = await supabase
      .from("orders")
      .update({ status: body.status, updated_at: new Date().toISOString() })
      .eq("id", body.id);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ success: true });
  }

  if (body.type === "create") {
    const orderId = "ORD-" + Date.now().toString(36).toUpperCase();
    const { data, error } = await supabase
      .from("orders")
      .insert({
        order_id: orderId,
        product_id: body.product_id,
        item_label: body.item_label,
        item_price: body.item_price,
        customer_fields: body.customer_fields || [],
        payment_method: body.payment_method || "",
        status: "pending",
      })
      .select()
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(data);
  }

  return NextResponse.json({ error: "Unknown action" }, { status: 400 });
}
