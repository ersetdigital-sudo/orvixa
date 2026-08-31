import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import crypto from "crypto";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();

  // If updating password, hash it
  if (body.password) {
    if (body.password.length < 6) {
      return NextResponse.json({ error: "Password minimal 6 karakter" }, { status: 400 });
    }
    body.password_hash = crypto.createHash("sha256").update(body.password).digest("hex");
    delete body.password;
  }

  // Check unique email if changing
  if (body.email) {
    const { data: existing } = await supabase
      .from("admins")
      .select("id")
      .eq("email", body.email)
      .neq("id", id)
      .single();

    if (existing) {
      return NextResponse.json({ error: "Email sudah digunakan" }, { status: 409 });
    }
  }

  body.updated_at = new Date().toISOString();

  const { data, error } = await supabase
    .from("admins")
    .update(body)
    .eq("id", id)
    .select("id, email, display_name, role, active, created_at, updated_at")
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  // Soft delete — set active = false
  const { error } = await supabase
    .from("admins")
    .update({ active: false, updated_at: new Date().toISOString() })
    .eq("id", id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
