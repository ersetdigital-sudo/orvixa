import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabase } from "@/lib/supabase";
import crypto from "crypto";

export async function POST(request: Request) {
  const { email, password } = await request.json();

  if (!email || !password) {
    return NextResponse.json({ error: "Email dan password wajib diisi" }, { status: 400 });
  }

  const hash = crypto.createHash("sha256").update(password).digest("hex");

  const { data: admin, error } = await supabase
    .from("admins")
    .select("id, email, display_name, role, active")
    .eq("email", email)
    .eq("password_hash", hash)
    .single();

  if (error || !admin) {
    return NextResponse.json({ error: "Email atau password salah" }, { status: 401 });
  }

  if (!admin.active) {
    return NextResponse.json({ error: "Akun ini sudah nonaktif" }, { status: 403 });
  }

  const cookieStore = await cookies();
  cookieStore.set("admin_token", admin.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });

  return NextResponse.json({
    success: true,
    admin: { id: admin.id, email: admin.email, name: admin.display_name, role: admin.role },
  });
}
