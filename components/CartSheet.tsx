"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Trash2, Minus, Plus, ShoppingBag, X } from "lucide-react";
import { useCart } from "@/lib/cart";
import Link from "next/link";

export default function CartSheet({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const items = useCart((s) => s.items);
  const updateQuantity = useCart((s) => s.updateQuantity);
  const removeItem = useCart((s) => s.removeItem);
  const totalPrice = useCart((s) => s.totalPrice);

  return (
    <Sheet open={open} onOpenChange={(o) => !o && onClose()}>
      <SheetContent
        side="left"
        className="w-[340px] p-0 bg-white border-l border-neutral-200 flex flex-col [&>button]:hidden"
      >
        {/* هدر */}
        <div className="bg-brand-green px-6 pt-8 pb-6 relative">
          <button
            type="button"
            onClick={onClose}
            aria-label="بستن سبد"
            className="absolute top-4 right-4 text-brand-cream/70 hover:text-brand-cream transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <SheetHeader className="p-0">
            <SheetTitle className="text-right text-brand-cream text-2xl font-extrabold flex items-center gap-2">
              <ShoppingBag className="w-6 h-6" strokeWidth={2} />
              سبد خرید
            </SheetTitle>
          </SheetHeader>
        </div>

        {/* محتوا */}
        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
            <div className="w-16 h-16 rounded-full bg-brand-cream flex items-center justify-center mb-4">
              <ShoppingBag className="w-7 h-7 text-brand-brown" />
            </div>
            <p className="text-neutral-500 mb-4">سبد خریدت خالیه</p>
            <Link
              href="/products"
              onClick={onClose}
              className="text-sm text-brand-green hover:underline"
            >
              برو به فروشگاه
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex items-start gap-3 bg-neutral-50 rounded-xl p-3"
                >
                  {item.product.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      className="w-16 h-16 rounded-lg object-cover shrink-0"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-lg bg-brand-cream shrink-0" />
                  )}

                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-bold text-brand-brown line-clamp-1">
                      {item.product.name}
                    </div>
                    <div className="text-xs text-brand-green font-semibold mt-1">
                      {item.product.price.toLocaleString("fa-IR")} تومان
                    </div>

                    <div className="flex items-center gap-2 mt-2">
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(
                            item.product.id,
                            item.quantity - 1
                          )
                        }
                        className="w-6 h-6 rounded-lg bg-white border border-neutral-200 flex items-center justify-center text-neutral-500 hover:border-brand-green hover:text-brand-green transition-colors"
                        aria-label="کاهش"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-sm font-bold text-brand-brown min-w-[1.5rem] text-center">
                        {item.quantity.toLocaleString("fa-IR")}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(
                            item.product.id,
                            item.quantity + 1
                          )
                        }
                        className="w-6 h-6 rounded-lg bg-white border border-neutral-200 flex items-center justify-center text-neutral-500 hover:border-brand-green hover:text-brand-green transition-colors"
                        aria-label="افزایش"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeItem(item.product.id)}
                    className="text-neutral-400 hover:text-red-600 p-1 shrink-0"
                    aria-label="حذف"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* جمع کل */}
            <div className="border-t border-neutral-200 p-4 bg-white">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-neutral-500">جمع کل</span>
                <span className="font-bold text-brand-green">
                  {totalPrice().toLocaleString("fa-IR")} تومان
                </span>
              </div>
              <Link
                href="/checkout"
                onClick={onClose}
                className="flex items-center justify-center gap-2 w-full bg-brand-green text-brand-cream text-sm font-bold py-3.5 rounded-full hover:bg-brand-green/90 transition-colors"
              >
                تسویه حساب
              </Link>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}