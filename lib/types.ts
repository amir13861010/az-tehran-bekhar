export type Settings = {
  telegram: string;    // مثلاً: https://t.me/username
  whatsapp: string;    // مثلاً: https://wa.me/98912xxxxxxx
  heroTitle: string;
  heroSubtitle: string;
  ctaButtonText: string;
};

export type Product = {
  id: string;
  name: string;
  price: number;
  categorySlug: string; // ← عوض شد (به جای category)
  description?: string;
  imageUrl?: string;
};

export type MenuItem = {
  label: string;
  slug: string;
};

export type MenuCategory = {
  title: string;
  slug: string;
  items: MenuItem[];
};

export type Menu = {
  blogMarket: MenuCategory[];
};