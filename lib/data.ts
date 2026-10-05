import { redis } from "./redis";
import type { Settings, Product, Menu } from "./types";

export const DEFAULT_SETTINGS: Settings = {
  telegram: "https://t.me/",
  whatsapp: "https://wa.me/",
  heroTitle: "تهران را ببین. انتخاب کن. ما می‌خریم.",
  heroSubtitle:
    "ویدیو و نقشه‌ی مغازه‌های بازار؛ لیستت را بفرست، خرید و ارسال با ما.",
  ctaButtonText: "انتخاب محصول",
};

export const DEFAULT_MENU: Menu = {
  blogMarket: [
    {
      title: "بازی‌های تخته‌ای و سنتی",
      slug: "board-games",
      items: [
        { label: "تخته نرد و شطرنج", slug: "backgammon-chess" },
        { label: "بازی‌های فکری رومیزی", slug: "board-games-intellectual" },
        { label: "دومینو و روبیک", slug: "domino-rubik" },
      ],
    },
    {
      title: "پیاده‌روی و کوهنوردی",
      slug: "hiking",
      items: [
        { label: "باتوم و عصای کوهنوردی", slug: "trekking-pole" },
        { label: "کوله‌پشتی کوهنوردی", slug: "backpack" },
        { label: "کاور و گتراس", slug: "cover-gaiters" },
      ],
    },
    {
      title: "مسافرت و صندلی سفری",
      slug: "travel",
      items: [
        { label: "صندلی و میز تاشو", slug: "folding-chair-table" },
        { label: "سایه‌بان و آفتاب‌گیر", slug: "sunshade" },
        { label: "یخدان و کلمن", slug: "cooler" },
      ],
    },
    {
      title: "حیوانات خانگی و پرندگان",
      slug: "pets-birds",
      items: [
        { label: "قفس پرندگان", slug: "bird-cage" },
        { label: "ملزومات نگهداری پرندگان", slug: "bird-care" },
        { label: "غذای مکمل و ویتامین", slug: "bird-supplement" },
      ],
    },
  ],
};

export async function getSettings(): Promise<Settings> {
  const data = await redis.get<Settings>("settings");
  return data ?? DEFAULT_SETTINGS;
}

export async function getMenu(): Promise<Menu> {
  const data = await redis.get<Menu>("menu");
  return data ?? DEFAULT_MENU;
}

export async function getProducts(): Promise<Product[]> {
  const data = await redis.get<Product[]>("products");
  return data ?? [];
}

export async function getProduct(id: string): Promise<Product | null> {
  const products = await getProducts();
  return products.find((p) => p.id === id) ?? null;
}