import { FooterSection, NavItem } from "@/types/general";
import { Leaf, Lightbulb, Sprout, TestTubeDiagonal } from "lucide-react";

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
export const dummySearchItems = Array(3).fill({
  name: "Orphéon - Eau de parfum",
  price: "$160",
  image: "/recent-searched.png", // replace later
});

export const currencyNavItem = {
  title: "CURRENCY",
  href: "/currency", // optional fallback
  sections: [
    {
      heading: "Select Currency",
      items: [
        {
          name: "USD",
          href: "#",
          icon: "/usa-flag.svg",
        },
        {
          name: "EUR",
          href: "#",
          icon: "/eu-flag.svg",
        },
        {
          name: "NGN",
          href: "#",
          icon: "/nigeria-flag.svg",
        },
        {
          name: "GBP",
          href: "#",
          icon: "/usa-flag.svg", // You might want to change this to UK flag
        },
      ],
    },
  ],
};

export const NAVIGATION_CONFIG = {
  DESKTOP_BREAKPOINT: 1024,
  SHEET_CLOSE_DELAY: 150,
  MENU_RESET_DELAY: 100,
} as const;

export const BADGE_STYLES = {
  cart: "absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center",
  wishlist:
    "absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center",
} as const;

export const navItems: NavItem[] = [
  {
    title: "ALL PRODUCTS",
    href: "/all-products",
    sections: [],
  },
  {
    title: "CATEGORIES",
    href: "/categories",
    sections: [],
  },

  {
    title: "GIFTS & SETS",
    href: "/giftcards",
    sections: [
      {
        heading: "Gift cards",
        image: "/gift-card.png",
        items: [
          { name: "Gift card", href: "/giftcard" },
          { name: "Gift card balance", href: "/giftcard-balance" },
        ],
      },
      {
        heading: "Gifting Ideas",
        image: "/gift-set.png",
        items: [
          { name: "Valentines day", href: "/gifts-sets/winter-glow" },
          { name: "Anniversary", href: "/gifts-sets/lip-love" },
          { name: "Mothers day", href: "/gifts-sets/lip-love" },
          { name: "Fathers day", href: "/gifts-sets/lip-love" },
          { name: "Birthdays", href: "/gifts-sets/lip-love" },
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
    name: "Fast Delivery",
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

export const footerLinks: FooterSection[] = [
  {
    heading: "EXPLORE",
    items: [
      { name: "Men Fragrance", href: "/categories/fragrances/men" },
      { name: "Women Fragrance", href: "/categories/fragrances/women" },
      { name: "Lip Gloss", href: "/best-sellers" },
      { name: "Gift Cards", href: "/gift-cards" },
      { name: "Gift Card Balance", href: "/gift-cards/balance" },
    ],
  },
  {
    heading: "HELP",
    items: [
      { name: "FAQ", href: "/faq" },
      { name: "Contact Us", href: "/contact-us" },
    ],
  },

  {
    heading: "LEGAL",
    items: [
      { name: "Purchase Policy", href: "/legal/purchase_policy" },
      { name: "Terms of Service", href: "/legal/terms_of_service" },
      { name: "Privacy Policy", href: "/legal/privacy_policy" },
      { name: "Cookie Policy", href: "/legal/cookie_policy" },
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

export const icons = [
  {
    id: 1,
    Icon: Leaf,
    description: "Eco-Designed Packaging with Purpose",
  },
  {
    id: 2,
    Icon: Lightbulb,
    description: "Sustainable Manufacturing",
  },
  {
    id: 3,
    Icon: TestTubeDiagonal,
    description: "100% Transparent & Proven Formula",
  },
  {
    id: 4,
    Icon: Sprout,
    description: "Distilled Elegance from Earth’s Elements",
  },
];

export const faq = [
  {
    question: "What makes Serena Braide fragrances unique?",
    answer:
      "Our fragrances are crafted from the finest natural ingredients, blending artistry with science to deliver timeless, elegant scents that evoke emotion and identity.",
  },
  {
    question: "When will my order ship?",
    answer:
      "Orders are processed within 1–2 business days. You will receive a tracking number once your order has been dispatched.",
  },
  {
    question: "Are your products cruelty-free?",
    answer:
      "Yes. Serena Braide is fully committed to ethical sourcing — all our products are cruelty-free and never tested on animals.",
  },
  {
    question: "Do you offer international shipping?",
    answer:
      "Yes, we ship worldwide. Shipping rates and delivery times vary depending on the destination.",
  },
];
