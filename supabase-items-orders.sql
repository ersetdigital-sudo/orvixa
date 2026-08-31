-- Product items (nominals/harga per game)
CREATE TABLE IF NOT EXISTS product_items (
  id SERIAL PRIMARY KEY,
  product_id TEXT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  label TEXT NOT NULL,
  price INTEGER NOT NULL,
  active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Orders
CREATE TABLE IF NOT EXISTS orders (
  id SERIAL PRIMARY KEY,
  order_id TEXT UNIQUE NOT NULL,
  product_id TEXT NOT NULL REFERENCES products(id),
  item_label TEXT NOT NULL,
  item_price INTEGER NOT NULL,
  customer_fields JSONB DEFAULT '[]'::jsonb,
  payment_method TEXT DEFAULT '',
  status TEXT DEFAULT 'pending',
  notes TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- RLS
ALTER TABLE product_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read items" ON product_items FOR SELECT USING (true);
CREATE POLICY "Service write items" ON product_items FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Public read orders" ON orders FOR SELECT USING (true);
CREATE POLICY "Service write orders" ON orders FOR ALL USING (true) WITH CHECK (true);

-- Index
CREATE INDEX idx_product_items_product_id ON product_items(product_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created_at ON orders(created_at DESC);

-- Insert Mobile Legends items
INSERT INTO product_items (product_id, label, price, sort_order) VALUES
('mobile-legends', '5 Diamond', 3000, 1),
('mobile-legends', '12 Diamond', 4000, 2),
('mobile-legends', '19 Diamond', 6000, 3),
('mobile-legends', '28 Diamond', 8500, 4),
('mobile-legends', '44 Diamond', 13000, 5),
('mobile-legends', '59 Diamond', 17000, 6),
('mobile-legends', '85 Diamond', 24000, 7),
('mobile-legends', '170 Diamond', 47000, 8),
('mobile-legends', '240 Diamond', 66000, 9),
('mobile-legends', '296 Diamond', 81000, 10),
('mobile-legends', '568 Diamond', 154000, 11),
('mobile-legends', '875 Diamond', 229000, 12);

-- Insert Free Fire items
INSERT INTO product_items (product_id, label, price, sort_order) VALUES
('free-fire', '5 Diamond', 2500, 1),
('free-fire', '12 Diamond', 3500, 2),
('free-fire', '50 Diamond', 7500, 3),
('free-fire', '70 Diamond', 10000, 4),
('free-fire', '100 Diamond', 14000, 5),
('free-fire', '140 Diamond', 19000, 6),
('free-fire', '210 Diamond', 28000, 7),
('free-fire', '355 Diamond', 47000, 8),
('free-fire', '720 Diamond', 94000, 9),
('free-fire', '1450 Diamond', 186000, 10),
('free-fire', 'Member Mingguan', 29000, 11),
('free-fire', 'Member Bulanan', 149000, 12);

-- Insert PUBG Mobile items
INSERT INTO product_items (product_id, label, price, sort_order) VALUES
('pubg-mobile', '60 UC', 15000, 1),
('pubg-mobile', '120 UC', 29000, 2),
('pubg-mobile', '180 UC', 43000, 3),
('pubg-mobile', '325 UC', 71000, 4),
('pubg-mobile', '385 UC', 84000, 5),
('pubg-mobile', '660 UC', 140000, 6),
('pubg-mobile', '720 UC', 152000, 7),
('pubg-mobile', '985 UC', 210000, 8),
('pubg-mobile', '1800 UC', 349000, 9),
('pubg-mobile', '3850 UC', 699000, 10),
('pubg-mobile', '8100 UC', 1399000, 11),
('pubg-mobile', '16000 UC', 2699000, 12);

-- Insert Genshin Impact items
INSERT INTO product_items (product_id, label, price, sort_order) VALUES
('genshin-impact', '60 Genesis Crystal', 16000, 1),
('genshin-impact', '300 + 30 Crystal', 79000, 2),
('genshin-impact', '980 + 110 Crystal', 249000, 3),
('genshin-impact', '1980 + 260 Crystal', 479000, 4),
('genshin-impact', '3280 + 600 Crystal', 799000, 5),
('genshin-impact', '6480 + 1600 Crystal', 1599000, 6),
('genshin-impact', 'Blessing of the Welkin Moon', 79000, 7),
('genshin-impact', 'Bundle Welkin x2', 155000, 8);

-- Insert Magic Chess items
INSERT INTO product_items (product_id, label, price, sort_order) VALUES
('magic-chess-go-go', '10 Token', 3500, 1),
('magic-chess-go-go', '25 Token', 8000, 2),
('magic-chess-go-go', '50 Token', 15500, 3),
('magic-chess-go-go', '110 Token', 33000, 4),
('magic-chess-go-go', '240 Token', 70000, 5),
('magic-chess-go-go', '500 Token', 145000, 6),
('magic-chess-go-go', '1000 Token', 285000, 7),
('magic-chess-go-go', 'Magic Pass', 49000, 8),
('magic-chess-go-go', 'Weekly Pass', 27000, 9);

-- Insert Call of Duty Mobile items
INSERT INTO product_items (product_id, label, price, sort_order) VALUES
('call-of-duty-mobile', '80 CP', 16000, 1),
('call-of-duty-mobile', '160 CP', 31000, 2),
('call-of-duty-mobile', '240 CP', 46000, 3),
('call-of-duty-mobile', '420 CP', 78000, 4),
('call-of-duty-mobile', '880 CP', 157000, 5),
('call-of-duty-mobile', '1760 CP', 309000, 6),
('call-of-duty-mobile', '2400 CP', 419000, 7),
('call-of-duty-mobile', '5000 CP', 849000, 8),
('call-of-duty-mobile', 'Battle Pass', 99000, 9);
