import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import crypto from "crypto";

export async function GET() {
  const { data, error } = await supabase
    .from("admins")
    .select("id, email, display_name, role, active, created_at, updated_at")
    .order("created_at", { ascending: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const { email, display_name, password, role } = await request.json();

  if (!email || !display_name || !password) {
    return NextResponse.json({ error: "Semua field wajib diisi" }, { status: 400 });
  }

  if (password.length < 6) {
    return NextResponse.json({ error: "Password minimal 6 karakter" }, { status: 400 });
  }

  // Check unique email
  const { data: existing } = await supabase
    .from("admins")
    .select("id")
    .eq("email", email)
    .single();

  if (existing) {
    return NextResponse.json({ error: "Email sudah digunakan" }, { status: 409 });
  }

  const password_hash = crypto.createHash("sha256").update(password).digest("hex");

  const { data, error } = await supabase
    .from("admins")
    .insert({
      email,
      display_name,
      password_hash,
      role: role || "admin",
    })
    .select("id, email, display_name, role, active, created_at")
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
