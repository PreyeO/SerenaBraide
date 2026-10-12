// General customer feedback received off-site (WhatsApp, Instagram, in person),
// shown on every product page — not tied to any one product. Kept separate
// from on-site product reviews, which carry the "Verified Buyer" badge.
//
// Only add real feedback, with the customer's permission to show their name.
// To retire this section once website reviews build up, empty the list —
// the section hides itself when there's nothing in it.

export interface CustomerTestimonial {
  /** First name + initial, e.g. "Amaka O." */
  name: string;
  /** The customer's words, as sent. */
  text: string;
  /** Where the feedback came from — shown as "Shared via …". */
  source: "WhatsApp" | "Instagram" | "In person";
  /** 1–5. Leave out if the customer didn't give one. */
  rating?: number;
  /** When it was received, YYYY-MM-DD. Optional. */
  date?: string;
}

// "Jane Doe N" entries are placeholders until the customer's name is confirmed.
export const CUSTOMER_TESTIMONIALS: CustomerTestimonial[] = [
  {
    name: "Jane Doe 1",
    text: "Everyone is just praising my perfume. Omo, you hit the nail on the head on that Ren scent. For someone like me who hardly find a scent that I like, you have got a customer for life.",
    source: "WhatsApp",
  },
  {
    name: "Sotom",
    text: "I've just tried the lipgloss I bought and the one I won. They are both lovely! The packaging was well thought through. I love that I don't have to struggle to open the pack. Greater heights I pray for your brand.",
    source: "WhatsApp",
  },
  {
    name: "Amaka",
    text: "Your products are amazing! My daughter and I tried your lipglosses yesterday and she's trying to obtain one of them from me. I love the perfume too! The quality is great too!",
    source: "WhatsApp",
  },
  {
    name: "Moses",
    text: "Really nice. My wife likes it. I probably should have got one for her too.",
    source: "Instagram",
  },
  {
    name: "Jane Doe 2",
    text: "I got back yesterday and I saw the perfume and lipgloss. Love love them! Lipgloss smell so sweet I want to eat it. Then the perfume, yummy.",
    source: "Instagram",
  },
];
