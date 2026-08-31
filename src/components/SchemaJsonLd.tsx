"use client";

const SITE_URL = "https://orvixagaming.net";

const PRODUCTS = [
  {
    name: "Top Up Diamond Mobile Legends",
    description: "Top up diamond Mobile Legends murah dan instan di ORVIXA GAMING. Harga mulai Rp3.000, proses otomatis 24 jam.",
    image: "/images/3f4dc619-cefc-4b2a-9dce-54e6ef9c20da.jpg",
    url: "/mobile-legends",
    price: 3000,
    brand: "Moonton",
  },
  {
    name: "Top Up Diamond Free Fire",
    description: "Top up diamond Free Fire harga murah di ORVIXA GAMING. Harga mulai Rp2.500, proses instan tanpa ribet.",
    image: "/images/991b8eb7-cf5a-491a-9947-1a2ba05b45d3.jpg",
    url: "/free-fire",
    price: 2500,
    brand: "Garena",
  },
  {
    name: "Top Up UC PUBG Mobile",
    description: "Top up UC PUBG Mobile termurah di ORVIXA GAMING. Harga mulai Rp15.000, pembayaran QRIS dan e-wallet.",
    image: "/images/173d0489-e4bc-41a4-80b4-24c25887d559.png",
    url: "/pubg-mobile",
    price: 15000,
    brand: "Level Infinite",
  },
  {
    name: "Top Up Genesis Crystal Genshin Impact",
    description: "Top up Genesis Crystal Genshin Impact di ORVIXA GAMING. Harga mulai Rp16.000, proses otomatis 24 jam.",
    image: "/images/7eb8ddc8-60a4-4794-85bd-ed0fd653defd.jpg",
    url: "/genshin-impact",
    price: 16000,
    brand: "HoYoverse",
  },
  {
    name: "Top Up Token Magic Chess: Go Go",
    description: "Top up token Magic Chess: Go Go di ORVIXA GAMING. Harga mulai Rp3.500, proses instan.",
    image: "/images/55ca2912-708c-4b77-8867-82e0043a40bb.png",
    url: "/magic-chess-go-go",
    price: 3500,
    brand: "Moonton",
  },
  {
    name: "Top Up CP Call of Duty Mobile",
    description: "Top up CP Call of Duty Mobile di ORVIXA GAMING. Harga mulai Rp15.000, proses otomatis 24 jam.",
    image: "https://res.cloudinary.com/dqjh7utdb/image/upload/v1788146538/gldlmfh4plno7cpzy1ra.jpg",
    url: "/call-of-duty-mobile",
    price: 15000,
    brand: "Activision",
  },
];

export default function SchemaJsonLd() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ORVIXA GAMING",
    url: SITE_URL,
    logo: `${SITE_URL}/favicon.svg`,
    description: "Layanan top up game dan produk digital di Indonesia dengan proses otomatis, harga transparan, dan pembayaran lengkap.",
    sameAs: [],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "ORVIXA GAMING",
    url: SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  const productSchemas = PRODUCTS.map((p) => ({
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    description: p.description,
    image: p.image.startsWith("http") ? p.image : `${SITE_URL}${p.image}`,
    url: `${SITE_URL}${p.url}`,
    brand: {
      "@type": "Brand",
      name: p.brand,
    },
    offers: {
      "@type": "Offer",
      price: p.price,
      priceCurrency: "IDR",
      availability: "https://schema.org/InStock",
      url: `${SITE_URL}${p.url}`,
    },
  }));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      {productSchemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
