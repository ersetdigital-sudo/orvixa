import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST() {
  try {
    // Create products table
    const { error: e1 } = await supabase.rpc("exec_sql", {
      query: `
        CREATE TABLE IF NOT EXISTS products (
          id TEXT PRIMARY KEY,
          name TEXT NOT NULL,
          publisher TEXT DEFAULT '',
          src TEXT NOT NULL,
          badge TEXT DEFAULT '',
          price TEXT DEFAULT '',
          category TEXT DEFAULT 'topup',
          active BOOLEAN DEFAULT true,
          sort_order INTEGER DEFAULT 0,
          created_at TIMESTAMPTZ DEFAULT now(),
          updated_at TIMESTAMPTZ DEFAULT now()
        );
      `,
    });

    // If exec_sql doesn't exist, try direct query approach
    if (e1) {
      // Try using the REST API to run SQL
      const sql = `
        -- Products
        CREATE TABLE IF NOT EXISTS products (
          id TEXT PRIMARY KEY,
          name TEXT NOT NULL,
          publisher TEXT DEFAULT '',
          src TEXT NOT NULL,
          badge TEXT DEFAULT '',
          price TEXT DEFAULT '',
          category TEXT DEFAULT 'topup',
          active BOOLEAN DEFAULT true,
          sort_order INTEGER DEFAULT 0,
          created_at TIMESTAMPTZ DEFAULT now(),
          updated_at TIMESTAMPTZ DEFAULT now()
        );

        -- Payment methods
        CREATE TABLE IF NOT EXISTS payment_methods (
          id TEXT PRIMARY KEY,
          name TEXT NOT NULL,
          type TEXT NOT NULL DEFAULT 'ewallet',
          active BOOLEAN DEFAULT true,
          sort_order INTEGER DEFAULT 0,
          created_at TIMESTAMPTZ DEFAULT now(),
          updated_at TIMESTAMPTZ DEFAULT now()
        );

        -- QRIS settings
        CREATE TABLE IF NOT EXISTS qris_settings (
          id INTEGER PRIMARY KEY DEFAULT 1,
          image_url TEXT DEFAULT '',
          updated_at TIMESTAMPTZ DEFAULT now(),
          CONSTRAINT single_row CHECK (id = 1)
        );

        -- WhatsApp settings
        CREATE TABLE IF NOT EXISTS whatsapp_settings (
          id INTEGER PRIMARY KEY DEFAULT 1,
          number TEXT DEFAULT '6281234567890',
          updated_at TIMESTAMPTZ DEFAULT now(),
          CONSTRAINT single_row CHECK (id = 1)
        );

        -- Default data
        INSERT INTO products (id, name, publisher, src, badge, price, sort_order) VALUES
          ('mobile-legends', 'Mobile Legends', 'Moonton', 'https://res.cloudinary.com/dqjh7utdb/image/upload/v1788151577/jlxfpwi1pkxmesccscp1.png', 'Best Seller', 'Rp3.000', 1),
          ('free-fire', 'Free Fire', 'Garena', 'https://res.cloudinary.com/dqjh7utdb/image/upload/v1788151808/fceguvbxqtm2hqlotcro.png', 'Hot', 'Rp2.500', 2),
          ('pubg-mobile', 'PUBG Mobile', 'Level Infinite', 'https://res.cloudinary.com/dqjh7utdb/image/upload/v1788151891/mngzis7bhlj3rihx5pee.png', '', 'Rp15.000', 3),
          ('genshin-impact', 'Genshin Impact', 'HoYoverse', 'https://res.cloudinary.com/dqjh7utdb/image/upload/v1788150221/rdbgqzffn1yqinzinjcd.png', 'Populer', 'Rp16.000', 4),
          ('magic-chess-go-go', 'Magic Chess: Go Go', 'Moonton', 'https://res.cloudinary.com/dqjh7utdb/image/upload/v1788148894/aj4q0rohtu1mfvalbtob.webp', '', 'Rp5.000', 5),
          ('call-of-duty-mobile', 'Call of Duty Mobile', 'Activision', 'https://res.cloudinary.com/dqjh7utdb/image/upload/v1788146538/gldlmfh4plno7cpzy1ra.jpg', '', 'Rp10.000', 6)
        ON CONFLICT (id) DO NOTHING;

        INSERT INTO payment_methods (id, name, type, sort_order) VALUES
          ('qris', 'QRIS', 'qris', 1),
          ('gopay', 'GoPay', 'ewallet', 2),
          ('ovo', 'OVO', 'ewallet', 3),
          ('dana', 'DANA', 'ewallet', 4),
          ('shopeepay', 'ShopeePay', 'ewallet', 5),
          ('va-bca', 'Virtual Account BCA', 'va', 6),
          ('va-mandiri', 'Virtual Account Mandiri', 'va', 7)
        ON CONFLICT (id) DO NOTHING;

        INSERT INTO qris_settings (id, image_url) VALUES (1, '') ON CONFLICT (id) DO NOTHING;
        INSERT INTO whatsapp_settings (id, number) VALUES (1, '6281234567890') ON CONFLICT (id) DO NOTHING;

        -- RLS
        ALTER TABLE products ENABLE ROW LEVEL SECURITY;
        ALTER TABLE payment_methods ENABLE ROW LEVEL SECURITY;
        ALTER TABLE qris_settings ENABLE ROW LEVEL SECURITY;
        ALTER TABLE whatsapp_settings ENABLE ROW LEVEL SECURITY;

        CREATE POLICY "Public read products" ON products FOR SELECT USING (true);
        CREATE POLICY "Public read payments" ON payment_methods FOR SELECT USING (true);
        CREATE POLICY "Public read qris" ON qris_settings FOR SELECT USING (true);
        CREATE POLICY "Public read whatsapp" ON whatsapp_settings FOR SELECT USING (true);

        CREATE POLICY "Service write products" ON products FOR ALL USING (true) WITH CHECK (true);
        CREATE POLICY "Service write payments" ON payment_methods FOR ALL USING (true) WITH CHECK (true);
        CREATE POLICY "Service write qris" ON qris_settings FOR ALL USING (true) WITH CHECK (true);
        CREATE POLICY "Service write whatsapp" ON whatsapp_settings FOR ALL USING (true) WITH CHECK (true);
      `;

      return NextResponse.json({
        message: "SQL schema generated. Please run this SQL in your Supabase SQL Editor.",
        sql,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Setup gagal" }, { status: 500 });
  }
}
