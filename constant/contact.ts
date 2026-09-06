// constant/contact.ts

/** The address customers are pointed at for orders, returns and enquiries. */
export const CONTACT_EMAIL = "hello@serenabraide.com";

/**
 * Serena Braide's social profiles.
 *
 * The same four URLs appear on the landing page, the coming-soon page and the
 * contact page. Each renders them with its own icon treatment, so only the links
 * live here — a changed handle is then one edit rather than three.
 */
export const socialLinks = {
  instagram: "https://www.instagram.com/serenabraide?igsh=MWQ1ZTB2eDk0NHVpcQ==",
  tiktok: "https://www.tiktok.com/@serenabraide?_r=1&_t=ZS-93jT9cDC5R6",
  facebook: "https://www.facebook.com/share/17nFJ8EPDH/",
  youtube: "https://youtube.com/@serenabraideofficial?si=-rulUJc-gy-VgBjZ",
} as const;
