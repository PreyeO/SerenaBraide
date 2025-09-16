import { FooterSection } from "@/types/general";
import { Product } from "@/types/product";

export const headerAdvert = [
  {
    text: "Sign up for the newsletter for 10% off your first order",
    link: {
      label: "Sign up",
      href: "/signup",
    },
  },
  {
    text: "Enjoy complementary next working day delivery when you order above $150",
  },
  {
    text: "Receive 20ml scented complementary gift with every purchase over $200",
  },
];

export const currencies = [
  {
    name: "USD",
    src: "/usa-flag.svg",
  },
  {
    name: "EUR",
    src: "/eu-flag.svg",
  },
  { name: "NGN", src: "/nigeria-flag.svg" },
  {
    name: "GBP",
    src: "/usa-flag.svg",
  },
];

// data/navLinks.ts

export const navItems = [
  {
    title: "CATEGORIES",
    href: "/categories",
    sections: [
      {
        heading: "Fragrances",
        items: [
          { name: "Men Fragrances", href: "/categories/fragrances/men" },
          { name: "Women Fragrances", href: "/categories/fragrances/women" },
          { name: "Kids Fragrances", href: "/categories/fragrances/kids" },
          { name: "Body Spray", href: "/categories/fragrances/body-spray" },
          { name: "Body Mist", href: "/categories/fragrances/body-mist" },
        ],
      },
      {
        heading: "Lips",
        items: [
          { name: "Lip Gloss", href: "/categories/lips/lip-gloss" },
          { name: "Lip Balm", href: "/categories/lips/lip-balm" },
          { name: "Lip Tints", href: "/categories/lips/tints" },
          { name: "Liquid Lipsticks", href: "/categories/lips/liquid" },
        ],
      },
      {
        heading: "Skincare",
        items: [
          { name: "Face Wash", href: "/categories/skincare/face-wash" },
          { name: "Moisturizer", href: "/categories/skincare/moisturizer" },
          { name: "SPF", href: "/categories/skincare/spf" },
          { name: "Serums", href: "/categories/skincare/serums" },
        ],
      },
      {
        heading: "Diffusers",
        items: [
          { name: "Reed Diffuser", href: "/categories/diffusers/reed" },
          { name: "Electric Diffuser", href: "/categories/diffusers/electric" },
          { name: "Essential Oils", href: "/categories/diffusers/oils" },
        ],
      },
    ],
  },
  {
    title: "BEST SELLERS",
    href: "/best-sellers",
    sections: [
      {
        heading: "Top Fragrances",
        items: [
          { name: "Amber Oud", href: "/best-sellers/amber-oud" },
          { name: "Royal Musk", href: "/best-sellers/royal-musk" },
        ],
      },
      {
        heading: "Trending Skincare",
        items: [
          { name: "Glow Serum", href: "/best-sellers/glow-serum" },
          { name: "Hydra Balm", href: "/best-sellers/hydra-balm" },
        ],
      },
    ],
  },
  {
    title: "GIFTS & SETS",
    href: "/gifts-sets",
    sections: [
      {
        heading: "Gifting Ideas",
        items: [
          { name: "Luxury Box", href: "/gifts-sets/luxury-box" },
          { name: "Mini Collection", href: "/gifts-sets/mini" },
        ],
      },
      {
        heading: "Holiday Sets",
        items: [
          { name: "Winter Glow Set", href: "/gifts-sets/winter-glow" },
          { name: "Lip Love Bundle", href: "/gifts-sets/lip-love" },
        ],
      },
    ],
  },
  {
    title: "OUR STORY",
    href: "/our-story",
    sections: [], // No submenu
  },
];

export const pros = [
  {
    name: "Free Delivery Over $500",
    src: "/fast-delivery.svg",
  },
  {
    name: "Gift Cards",
    src: "/gift-card.svg",
  },
  { name: "Secure Payment", src: "/payment.svg" },
  {
    name: "Easy Checkout",
    src: "/checkout.svg",
  },
  {
    name: "Loyalty Reward",
    src: "/loyalty.svg",
  },
];

export const productCategories = [
  {
    name: "Lips",
    src: "/lip-gloss.png",
    height: 327,
  },
  {
    name: "Fragrance",
    src: "/fragrance.png",
    height: 450,
  },
  { name: "Hair Care", src: "/hair-care.png", height: 327 },
  {
    name: "Diffusers",
    src: "/diffusers.png",
    height: 450,
  },
  {
    name: "Clothings",
    src: "/clothings.png",
    height: 327,
  },
  {
    name: "Skin Care",
    src: "/skin-care.png",
    height: 450,
  },
];

export const productDisplay: Record<string, Product[]> = {
  Fragrance: [
    {
      type: "Women Fragrance",
      price: "$120",
      name: "Amber Oud",
      src: "/perfume-1.png",
      sizes: ["3ML", "10ML", "50ML"],
      rating: 4.5,
      reviews: 320,
      sold: "500+",
    },
    {
      type: "Men Fragrance",
      price: "$95",
      name: "Royal Musk",
      src: "/perfume-2.png",
      sizes: ["5ML", "30ML"],
      rating: 4.0,
      reviews: 210,
      sold: "300+",
    },
    {
      type: "Fragrance GiftSets",
      price: "$95",
      name: "Luxury Gift Box",
      src: "/perfume-3.png",
      sizes: ["10ML", "20ML"],
      rating: 5.0,
      reviews: 150,
      sold: "200+",
    },
    {
      type: "Kids Fragrance",
      price: "$95",
      name: "Sweet Blossom",
      src: "/perfume-4.png",
      sizes: ["3ML", "15ML"],
      rating: 3.5,
      reviews: 90,
      sold: "120+",
    },
  ],
  Lips: [
    {
      type: "Lip Gloss",
      price: "$30",
      name: "Shiny Glow",
      src: "/perfume-3.png",
      sizes: ["5ML", "15ML"],
      rating: 4.8,
      reviews: 80,
      sold: "150+",
    },
  ],
  Diffusers: [
    {
      type: "Reed Diffuser",
      price: "$55",
      name: "Ocean Breeze",
      src: "perfume-1.png",
      sizes: ["100ML", "200ML"],
      rating: 4.2,
      reviews: 60,
      sold: "90+",
    },
  ],
  Skincare: [
    {
      type: "Serum",
      price: "$80",
      name: "Glow Serum",
      src: "/perfume-4.png",
      sizes: ["30ML", "50ML"],
      rating: 4.9,
      reviews: 140,
      sold: "400+",
    },
  ],
  Haircare: [
    {
      type: "Shampoo",
      price: "$40",
      name: "Silky Wash",
      src: "/perfume-2.png",
      sizes: ["250ML", "500ML"],
      rating: 4.3,
      reviews: 70,
      sold: "130+",
    },
  ],
};

export const categories = [
  "Fragrance",
  "Lips",
  "Diffusers",
  "Skincare",
  "Haircare",
];

export const GiftProductDisplay: Record<string, Product[]> = {
  Fragrance: [
    {
      type: "Women Fragrance",
      price: "$120",
      name: "Amber Oud",
      src: "/gift-1.png",
      sizes: ["3ML", "10ML", "50ML"],
      rating: 4.5,
      reviews: 320,
      sold: "500+",
    },
    {
      type: "Men Fragrance",
      price: "$95",
      name: "Royal Musk",
      src: "/gift-2.png",
      sizes: ["5ML", "30ML"],
      rating: 4.0,
      reviews: 210,
      sold: "300+",
    },
    {
      type: "Fragrance GiftSets",
      price: "$95",
      name: "Luxury Gift Box",
      src: "/gift-3.png",
      sizes: ["10ML", "20ML"],
      rating: 5.0,
      reviews: 150,
      sold: "200+",
    },
    {
      type: "Kids Fragrance",
      price: "$95",
      name: "Sweet Blossom",
      src: "/gift-4.png",
      sizes: ["3ML", "15ML"],
      rating: 3.5,
      reviews: 90,
      sold: "120+",
    },
  ],
  Lips: [
    {
      type: "Lip Gloss",
      price: "$30",
      name: "Shiny Glow",
      src: "/gift-3.png",
      sizes: ["5ML", "15ML"],
      rating: 4.8,
      reviews: 80,
      sold: "150+",
    },
  ],
  Diffusers: [
    {
      type: "Reed Diffuser",
      price: "$55",
      name: "Ocean Breeze",
      src: "/gift-1.png",
      sizes: ["100ML", "200ML"],
      rating: 4.2,
      reviews: 60,
      sold: "90+",
    },
  ],
  Skincare: [
    {
      type: "Serum",
      price: "$80",
      name: "Glow Serum",
      src: "/gift-3.png",
      sizes: ["30ML", "50ML"],
      rating: 4.9,
      reviews: 140,
      sold: "400+",
    },
  ],
  Haircare: [
    {
      type: "Shampoo",
      price: "$40",
      name: "Silky Wash",
      src: "/gift-2.png",
      sizes: ["250ML", "500ML"],
      rating: 4.3,
      reviews: 70,
      sold: "130+",
    },
  ],
};

export const footerLinks: FooterSection[] = [
  {
    heading: "EXPLORE",
    items: [
      { name: "Men Fragrance", href: "/categories/fragrances/men" },
      { name: "Women Fragrance", href: "/categories/fragrances/women" },
      { name: "Best Sellers", href: "/best-sellers" },
      { name: "Gift Cards", href: "/gift-cards" },
      { name: "Gift Card Balance", href: "/gift-cards/balance" },
    ],
  },
  {
    heading: "HELP",
    items: [
      { name: "Contact Us", href: "/contact" },
      { name: "FAQ", href: "/faq" },
    ],
  },
  {
    heading: "LEGAL",
    items: [
      { name: "Purchase Policy", href: "/legal/purchase-policy" },
      { name: "Terms of Service", href: "/legal/terms" },
      { name: "Privacy Policy", href: "/legal/privacy" },
      { name: "Cookie Policy", href: "/legal/cookies" },
    ],
  },
  {
    heading: "CONTACT",
    items: [
      { name: "support@example.com", href: "mailto:support@example.com" },
      { name: "+1 (234) 567-890", href: "tel:+1234567890" },
    ],
  },
  {
    heading: "WE ACCEPT",
    items: [
      { name: "Visa", src: "/visa.svg", width: 72 },
      { name: "MasterCard", src: "/mastercard.svg", width: 68.12 },
      { name: "Paystack", src: "/paystack.svg", width: 50 },
    ],
  },
];
