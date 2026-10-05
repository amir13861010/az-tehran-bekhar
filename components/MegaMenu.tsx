"use client";

import Link from "next/link";
import type { Menu } from "@/lib/types";

export default function MegaMenu({
  open,
  menu,
}: {
  open: boolean;
  menu: Menu;
}) {
  return (
    <div
      className={`absolute top-full right-0 pt-3 transition-all duration-200 origin-top ${
        open
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 -translate-y-2 pointer-events-none"
      }`}
    >
      <div className="w-[min(860px,90vw)] rounded-3xl bg-white shadow-2xl shadow-black/30 border border-black/5 p-6">
        <div className="grid grid-cols-4 gap-4">
          {menu.blogMarket.map((cat) => (
            <div
              key={cat.slug}
              className="rounded-2xl bg-neutral-100 p-5 hover:bg-neutral-200/70 transition-colors"
            >
              <h3 className="text-sm font-bold text-brand-brown mb-4">
                {cat.title}
              </h3>
              <ul className="space-y-1">
                {cat.items.map((item) => (
                  <li key={item.slug}>
                    <Link
                      href={`/products/${item.slug}`}
                      className="block text-xs text-neutral-600 hover:text-brand-green py-1.5 px-2 -mx-2 rounded-lg hover:bg-white transition-all"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-5 pt-4 border-t border-neutral-200 text-center">
          <Link
            href="/products"
            className="text-xs font-semibold text-brand-green hover:text-brand-brown transition-colors"
          >
            مشاهده همه دسته‌بندی‌ها ←
          </Link>
        </div>
      </div>
    </div>
  );
}