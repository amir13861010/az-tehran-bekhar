"use client";

import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  BookOpen,
  Store,
  Info,
  ChevronLeft,
  ShoppingBag,
  X,
} from "lucide-react";
import type { Menu } from "@/lib/types";

// رنگ چرخشی برای دسته‌بندی‌ها
const categoryColors = [
  "bg-amber-100 text-amber-700",
  "bg-emerald-100 text-emerald-700",
  "bg-sky-100 text-sky-700",
  "bg-rose-100 text-rose-700",
  "bg-violet-100 text-violet-700",
  "bg-orange-100 text-orange-700",
];

export default function MobileMenu({
  open,
  onClose,
  menu,
}: {
  open: boolean;
  onClose: () => void;
  menu: Menu;
}) {
  return (
    <Sheet open={open} onOpenChange={(o) => !o && onClose()}>
      <SheetContent
        side="right"
        className="w-[340px] p-0 bg-white border-r border-neutral-200 flex flex-col [&>button]:hidden"
      >
        {/* هدر سبز با گرادینت */}
        <div
          className="relative overflow-hidden px-6 pt-8 pb-6"
          style={{
            backgroundImage:
              "radial-gradient(circle at 80% 20%, #2a6b52 0%, #1d4a36 60%, #143528 100%)",
          }}
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="بستن منو"
            className="absolute top-4 left-4 text-brand-cream/70 hover:text-brand-cream transition-colors z-10"
          >
            <X className="w-5 h-5" />
          </button>

          <SheetHeader className="p-0 relative z-10">
            <SheetTitle className="text-right text-brand-cream text-2xl font-extrabold leading-tight">
              از تهران بخر
            </SheetTitle>
            <p className="text-right text-[11px] font-light tracking-widest text-brand-cream/60 mt-1">
              AZ TEHRAN BEKHAR
            </p>
          </SheetHeader>
        </div>

        {/* محتوا */}
        <div className="flex-1 overflow-y-auto px-4 py-5 flex flex-col gap-1">
          {/* آکاردئون بلاگ بازار */}
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="blog" className="border-none">
              <AccordionTrigger className="text-sm font-bold text-brand-brown hover:text-brand-green hover:no-underline px-3 py-3 rounded-xl hover:bg-brand-cream/60 transition-colors [&[data-state=open]]:bg-brand-cream/70 [&>svg]:hidden">
                <span className="flex items-center gap-3 w-full">
                  <span className="w-9 h-9 rounded-xl bg-brand-cream flex items-center justify-center text-brand-brown">
                    <BookOpen className="w-4 h-4" strokeWidth={2} />
                  </span>
                  <span className="flex-1 text-right">بلاگ بازار</span>
                  <ChevronLeft className="w-4 h-4 opacity-40 transition-transform data-[state=open]:-rotate-90" />
                </span>
              </AccordionTrigger>
              <AccordionContent className="pt-2 pb-1">
                <div className="flex flex-col gap-4 pr-1">
                  {menu.blogMarket.map((cat, index) => {
                    const color =
                      categoryColors[index % categoryColors.length];
                    return (
                      <div key={cat.slug}>
                        <div className="flex items-center gap-2 mb-2.5 px-2">
                          <span
                            className={`w-6 h-6 rounded-lg flex items-center justify-center ${color}`}
                          >
                            <Store className="w-3 h-3" strokeWidth={2.2} />
                          </span>
                          <div className="text-[11px] font-bold text-brand-brown/70">
                            {cat.title}
                          </div>
                        </div>
                        <ul className="space-y-0.5 pr-2">
                          {cat.items.map((item) => (
                            <li key={item.slug}>
                              <Link
                                href={`/products/${item.slug}`}
                                onClick={onClose}
                                className="flex items-center gap-2 text-xs text-neutral-600 hover:text-brand-green py-2 px-2 rounded-lg hover:bg-brand-cream/60 transition-colors"
                              >
                                <span className="w-1 h-1 rounded-full bg-brand-green/40 shrink-0" />
                                {item.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* لینک فروشگاه */}
          <Link
            href="/products"
            onClick={onClose}
            className="flex items-center justify-between text-sm font-bold text-brand-brown hover:text-brand-green px-3 py-3 rounded-xl hover:bg-brand-cream/60 transition-colors group"
          >
            <span className="flex items-center gap-3">
              <span className="w-9 h-9 rounded-xl bg-brand-cream flex items-center justify-center text-brand-brown">
                <Store className="w-4 h-4" strokeWidth={2} />
              </span>
              فروشگاه
            </span>
            <ChevronLeft className="w-4 h-4 opacity-40 group-hover:opacity-100 transition-opacity" />
          </Link>

          {/* لینک درباره ما */}
          <Link
            href="/about"
            onClick={onClose}
            className="flex items-center justify-between text-sm font-bold text-brand-brown hover:text-brand-green px-3 py-3 rounded-xl hover:bg-brand-cream/60 transition-colors group"
          >
            <span className="flex items-center gap-3">
              <span className="w-9 h-9 rounded-xl bg-brand-cream flex items-center justify-center text-brand-brown">
                <Info className="w-4 h-4" strokeWidth={2} />
              </span>
              درباره ما
            </span>
            <ChevronLeft className="w-4 h-4 opacity-40 group-hover:opacity-100 transition-opacity" />
          </Link>

          {/* دکمه CTA */}
          <div className="mt-auto pt-6 pb-2">
            <Link
              href="/products"
              onClick={onClose}
              className="relative flex items-center justify-center gap-2 w-full text-brand-cream text-sm font-bold py-4 rounded-full transition-transform hover:scale-[1.02] overflow-hidden"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 30% 30%, #2a6b52 0%, #1d4a36 60%, #143528 100%)",
              }}
            >
              <ShoppingBag className="w-4 h-4" strokeWidth={2.2} />
              شروع خرید
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}