export type FooterItem =
  | { name: string; href: string }
  | { name: string; src: string; width: number };

export type FooterSection = {
  heading: string;
  items: FooterItem[];
};
