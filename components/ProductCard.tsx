"use client";

import { Plus, Check } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import type { Product } from "@/lib/types";
import { toast } from "sonner";

export default function ProductCard({ product }: { product: Product }) {
  const addItem = useCart((s) => s.addItem);
  const [added, setAdded] = useState(false);

  function handleAdd() {
    addItem(product);
    setAdded(true);
    toast.success(`${product.name} به سبد اضافه شد`);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <div className="group bg-white rounded-3xl border border-neutral-200/80 hover:border-brand-green/40 hover:shadow-xl hover:shadow-brand-green/5 transition-all duration-300 overflow-hidden flex flex-col">
      {/* عکس */}
      <div className="relative aspect-[4/3] bg-gradient-to-br from-brand-cream/60 to-neutral-50 overflow-hidden">
        {product.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-neutral-300 gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
              <circle cx="9" cy="9" r="2" />
              <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
            </svg>
            <span className="text-xs">بدون عکس</span>
          </div>
        )}

        {/* بج قیمت */}
        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-md">
          <span className="text-xs font-bold text-brand-green">
            {product.price.toLocaleString("fa-IR")}
          </span>
          <span className="text-[10px] text-neutral-400 mr-1">تومان</span>
        </div>
      </div>

      {/* محتوا */}
      <div className="p-4 flex flex-col gap-3 flex-1">
        <h3 className="font-bold text-brand-brown text-sm md:text-base line-clamp-2 leading-snug min-h-[2.5rem]">
          {product.name}
        </h3>

        {product.description && (
          <p className="text-xs text-neutral-500 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        )}

        {/* دکمه افزودن */}
        <button
          type="button"
          onClick={handleAdd}
          className={`mt-auto inline-flex items-center justify-center gap-2 text-xs font-bold py-3 rounded-2xl transition-all ${
            added
              ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20"
              : "bg-brand-green text-brand-cream hover:bg-brand-green/90 hover:shadow-lg hover:shadow-brand-green/20"
          }`}
        >
          {added ? (
            <>
              <Check className="w-4 h-4" strokeWidth={2.5} />
              اضافه شد
            </>
          ) : (
            <>
              <Plus className="w-4 h-4" strokeWidth={2.5} />
              افزودن به سبد
            </>
          )}
        </button>
      </div>
    </div>
  );
}