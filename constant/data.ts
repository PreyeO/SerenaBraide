import { FooterSection, NavItem } from "@/types/general";
import { Leaf, Lightbulb, Sprout, TestTubeDiagonal } from "lucide-react";

export const headerAdvert = [
  {
    text: "Fragrance and beauty designed for the individual. Read our story",
    link: {
      label: "Read our story",
      href: "/our-story",
    },
  },
  {
    text: "Wear identity. Own the memory of the room.",
  },
  {
    text: "Complete your signature with our defining perfumes and essential lip care. Explore the collection",
    link: {
      label: "Explore the collection",
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
        heading: "Gift Cards",
        image: "/gift-card.png",
        items: [
          { name: "Buy Gift Cards", href: "/giftcard" },
          { name: "Gift Card Balance", href: "/giftcard-balance" },
        ],
      },
      {
        heading: "Gift Boxes",
        image: "/gift-set.png",
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
      "Simply browse our collections, add your favorites to your cart, and proceed to checkout. You will receive an email confirming that your order has been received.",
  },
  {
    question: "Can I change or cancel my order?",
    answer:
      "We work quickly to process orders. Modifications or cancellations are not possible once it has been placed. Please double-check all shipping details, items, and quantities before purchasing.",
  },
  {
    question: "How do I know my order went through?",
    answer:
      "You will receive a confirmation email with your order number shortly after payment.",
  },
  {
    question: "Where do you ship to?",
    answer:
      "We ship worldwide. Shipping rates and delivery times vary depending on the destination.",
  },
  {
    question: "Do I pay customs fees for international orders?",
    answer:
      "Some countries may charge duties or taxes. These are determined by local authorities and are the customer’s responsibility.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept bank cards, bank transfers, and Serena Braide gift cards.",
  },
  {
    question: "Do you store my card details?",
    answer: "No. Payments are processed securely by certified providers.",
  },
  {
    question: "How do I use my gift card?",
    answer:
      "At checkout, enter the gift card number and pin sent to your email. The value will be applied to your order.",
  },
];
