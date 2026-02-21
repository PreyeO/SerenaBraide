// Payment Type Constants
export const PAYMENT_TYPES = {
  GIFT_CARD: "1",
  FLUTTERWAVE: "2",
} as const;

export type PaymentTypeId = (typeof PAYMENT_TYPES)[keyof typeof PAYMENT_TYPES];

export const paymentType = [
  {
    src: "/gift-payment.png",
    detail: "Gift card",
    width: 24.2,
    height: 22,
    alt: "gift card logo",
    id: PAYMENT_TYPES.GIFT_CARD,
    href: "/payment/giftcard-payment",
  },
  {
    src: "/flutter.PNG",
    detail: "Flutterwave",
    width: 54,
    height: 22,
    alt: "flutterwave payment logo",
    id: PAYMENT_TYPES.FLUTTERWAVE,
    href: "/payment/flutterwave",
  },
];
