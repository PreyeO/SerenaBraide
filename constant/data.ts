import { FooterSection, NavItem } from "@/types/general";
import { Leaf, Lightbulb, Sprout, TestTubeDiagonal } from "lucide-react";

export const HERO_IMAGES = ["/banner-A.png", "/banner-B.png"];

export const HERO_MOBILE_IMAGES = [
  "/mobile-banner1.png",
  "/mobile-banner2.png",
  "/mobile-bann3r2.png",
];

export const headerAdvert = [
  {
    text: "Fragrance designed for the individual. Read our story",
    link: {
      label: "Read our story",
      href: "/our-story",
    },
  },
  {
    text: "Wear identity. Own the memory of the room.",
  },
  {
    text: "Shop with Serena Braide. Explore our collection",
    link: {
      label: "Explore our collection",
      href: "/all-products",
    },
  },
];

export const currencies = [
  { name: "NGN", src: "/nigeria-flag.svg" },
  {
    name: "USD",
    src: "/usa-flag.svg",
  },
  {
    name: "EUR",
    src: "/eu-flag.svg",
  },

  // {
  //   name: "GBP",
  //   src: "/usa-flag.svg",
  // },
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
  // WISHLIST HIDDEN FOR LAUNCH
  // wishlist:
  //   "absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center",
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
        heading: "Gift Cards",
        image: "/giftcard-1.png",
        items: [
          { name: "Buy Gift Cards", href: "/giftcard" },
          { name: "Gift Card Balance", href: "/giftcard-balance" },
        ],
      },
      {
        heading: "Gift Boxes",
        image: "/gift-box.png",
        items: [
          {
            name: "The Intimate Edit",
            caption: "coming soon",
            captionColor: "amber",
          },
          {
            name: "The Legacy Collection",
            caption: "coming soon",
            captionColor: "blue",
          },
          {
            name: "The Milestone Set",
            caption: "coming soon",
            captionColor: "purple",
          },
          {
            name: "The Discovery Archive",
            caption: "coming soon",
            captionColor: "teal",
          },
          {
            name: "The Complete Signature",
            caption: "coming soon",
            captionColor: "pink",
          },
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
    name: "Expedited Shipping", // Sounds more premium than "Fast Delivery"
    src: "/fast-delivery.svg",
  },
  {
    name: "Signature Gifting", // Fits your "Signature" brand theme
    src: "/gift-card.svg",
  },
  {
    name: "Secure Transactions", // More professional than "Secure Payment"
    src: "/payment.svg",
  },
  {
    name: "Seamless Shopping", // Elevates "Easy Checkout"
    src: "/checkout.svg",
  },
  {
    name: "Member Privileges", // "Privileges" sounds more exclusive than "Rewards"
    src: "/loyalty.svg",
  },
];

export const productCategories = [
  {
    name: "Lips",
    src: "/all-lipgloss.png",
    height: 327,
  },
  {
    name: "Perfume",
    src: "/perfume.jpg",
    height: 450,
  },
  { name: "Body Mist", src: "/bodymist.png", height: 327 },
  {
    name: "Perfume Oil",
    src: "/perfumeoil.png",
    height: 450,
  },
  {
    name: "Lip Balm",
    src: "/lip-balm.png",
    height: 327,
  },
  {
    name: "Body Oil",
    src: "/bodyoil.png",
    height: 450,
  },
];

export const footerLinks: FooterSection[] = [
  {
    heading: "EXPLORE",
    items: [
      { name: "Perfumes", href: "/all-products" },
      { name: "Lip Gloss", href: "/all-products" },
      { name: "Gift Cards", href: "/giftcard" },
      { name: "Gift Card Balance", href: "/giftcard-balance" },
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
      { name: "Visa", src: "/VISA-logo.png", width: 72 },
      { name: "MasterCard", src: "/MASTER-logo.png", width: 72 },
    ],
  },
];

export const icons = [
  {
    id: 1,
    Icon: Leaf,
    description: "Considered Packaging",
  },
  {
    id: 2,
    Icon: Lightbulb,
    description: "Conscious Craftsmanship",
  },
  {
    id: 3,
    Icon: TestTubeDiagonal,
    description: "Uncompromised Formulations",
  },
  {
    id: 4,
    Icon: Sprout,
    description: "Earth-Derived Elegance",
  },
];

export const faq = [
  {
    question: "How do I place an order?",
    answer:
      "Browse our collections, add your favorites to your bag, and check out. You’ll receive an email confirming your order has been received.",
  },
  {
    question: "Can I change or cancel my order?",
    answer:
      "Orders are processed quickly, so changes or cancellations aren’t possible once placed. Please double-check your shipping details, items, and quantities before completing your purchase.",
  },
  {
    question: "How do I know my order went through?",
    answer:
      "You’ll receive a confirmation email with your order number shortly after payment.",
  },
  {
    question: "Where do you ship to?",
    answer:
      "We ship worldwide. Rates and delivery times vary by destination and are calculated at checkout.",
  },
  {
    question: "Do I pay customs fees on international orders?",
    answer:
      "Some countries charge duties or taxes on incoming orders. These are set by local authorities and are the customer’s responsibility.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "Bank cards, bank transfers, Flutterwave, and Serena Braide gift cards.",
  },
  {
    question: "Do you store my card details?",
    answer:
      "No. Payments are processed securely by certified third-party providers. We never see or store your card information.",
  },
  {
    question: "How do I use my gift card?",
    answer:
      "At checkout, enter your gift card number and PIN, sent to you by email. The value is applied automatically to your order.",
  },
  {
    question: "Can I return or exchange an item?",
    answer:
      "For hygiene and safety reasons, we accept returns only on items that are unused, unopened, and in their original packaging, within 7 days of delivery. Contact hello@serenabraide.com with your order number to start a return.",
  },
];
