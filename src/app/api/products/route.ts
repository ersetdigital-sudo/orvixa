import { NextResponse } from "next/server";

const GAMES = [
  { id: "mobile-legends", name: "Mobile Legends", publisher: "Moonton", src: "https://res.cloudinary.com/dqjh7utdb/image/upload/v1788151577/jlxfpwi1pkxmesccscp1.png", badge: "Best Seller", price: "Rp3.000" },
  { id: "free-fire", name: "Free Fire", publisher: "Garena", src: "https://res.cloudinary.com/dqjh7utdb/image/upload/v1788151808/fceguvbxqtm2hqlotcro.png", badge: "Hot", price: "Rp2.500" },
  { id: "pubg-mobile", name: "PUBG Mobile", publisher: "Level Infinite", src: "https://res.cloudinary.com/dqjh7utdb/image/upload/v1788151891/mngzis7bhlj3rihx5pee.png", badge: "", price: "Rp15.000" },
  { id: "genshin-impact", name: "Genshin Impact", publisher: "HoYoverse", src: "https://res.cloudinary.com/dqjh7utdb/image/upload/v1788150221/rdbgqzffn1yqinzinjcd.png", badge: "Populer", price: "Rp16.000" },
  { id: "magic-chess-go-go", name: "Magic Chess: Go Go", publisher: "Moonton", src: "https://res.cloudinary.com/dqjh7utdb/image/upload/v1788148894/aj4q0rohtu1mfvalbtob.webp", badge: "", price: "Rp5.000" },
  { id: "call-of-duty-mobile", name: "Call of Duty Mobile", publisher: "Activision", src: "https://res.cloudinary.com/dqjh7utdb/image/upload/v1788146538/gldlmfh4plno7cpzy1ra.jpg", badge: "", price: "Rp10.000" },
];

export async function GET() {
  return NextResponse.json(GAMES);
}
