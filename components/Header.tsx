"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ShoppingBag, Menu } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import MegaMenu from "@/components/MegaMenu";
import MobileMenu from "@/components/MobileMenu";
import CartSheet from "@/components/CartSheet";
import { useCart } from "@/lib/cart";
import type { Menu as MenuType } from "@/lib/types";

const FALLBACK_MENU: MenuType = {
  blogMarket: [],
};

export default function Header() {
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [menu, setMenu] = useState<MenuType>(FALLBACK_MENU);
  const [mounted, setMounted] = useState(false);

  const totalItems = useCart((s) => s.totalItems);

  useEffect(() => {
    setMounted(true);
    fetch("/api/menu")
      .then((r) => r.json())
      .then(setMenu)
      .catch(() => setMenu(FALLBACK_MENU));
  }, []);

  const itemCount = mounted ? totalItems() : 0;

  return (
    <>
      <header className="absolute top-0 inset-x-0 z-50">
        <div className="flex items-center justify-between px-6 md:px-16 py-6">
          <div className="flex items-center">
            <nav className="hidden lg:flex items-center gap-10 text-brand-cream">
              <div
                className="relative"
                onMouseEnter={() => setMegaOpen(true)}
                onMouseLeave={() => setMegaOpen(false)}
              >
                <button
                  type="button"
                  className="text-base hover:text-brand-cream/70 transition-colors"
                >
                  بلاگ بازار
                </button>
                <MegaMenu open={megaOpen} menu={menu} />
              </div>

              <Link
                href="/products"
                className="text-base hover:text-brand-cream/70 transition-colors"
              >
                فروشگاه
              </Link>
              <Link
                href="/about"
                className="text-base hover:text-brand-cream/70 transition-colors"
              >
                درباره ما
              </Link>
            </nav>

            <button
              type="button"
              aria-label="باز کردن منو"
              onClick={() => setMobileOpen(true)}
              className="lg:hidden text-brand-cream hover:text-brand-cream/70 transition-colors"
            >
              <Menu className="w-7 h-7" strokeWidth={1.8} />
            </button>
          </div>

          <Link
            href="/"
            className="absolute left-1/2 -translate-x-1/2 text-center text-brand-cream"
          >
            <div className="text-xl md:text-4xl font-extrabold leading-tight">
              از تهران بخر
            </div>
            <div className="text-[10px] md:text-sm font-light tracking-widest opacity-80 mt-1">
              Az Tehran Bekhar
            </div>
          </Link>

          <button
            type="button"
            aria-label="سبد خرید"
            onClick={() => setCartOpen(true)}
            className="relative text-brand-cream hover:text-brand-cream/70 transition-colors"
          >
            <ShoppingBag className="w-6 h-6 md:w-7 md:h-7" strokeWidth={1.8} />
            {itemCount > 0 && (
              <Badge className="absolute -top-2 -right-2 h-5 min-w-5 px-1 flex items-center justify-center rounded-full bg-brand-cream text-brand-green text-[10px] font-bold border-0">
                {itemCount.toLocaleString("fa-IR")}
              </Badge>
            )}
          </button>
        </div>
      </header>

      <MobileMenu
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        menu={menu}
      />

      <CartSheet open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}