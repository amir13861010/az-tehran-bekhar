"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ChevronLeft,
  Trash2,
  Minus,
  Plus,
  Copy,
  Check,
  ShoppingBag,
} from "lucide-react";
import { useCart } from "@/lib/cart";
import type { Settings } from "@/lib/types";
import { toast } from "sonner";

export function CheckoutClient({ settings }: { settings: Settings }) {
  const items = useCart((s) => s.items);
  const updateQuantity = useCart((s) => s.updateQuantity);
  const removeItem = useCart((s) => s.removeItem);
  const totalPrice = useCart((s) => s.totalPrice);
  const [copied, setCopied] = useState(false);

  function buildInvoiceText(): string {
    if (items.length === 0) return "";

    const lines: string[] = [];
    lines.push("🛒 سفارش از «از تهران بخر»");
    lines.push("");
    lines.push("📋 لیست محصولات:");
    lines.push("─────────────────");

    items.forEach((item, index) => {
      lines.push(`${index + 1}. ${item.product.name}`);
      lines.push(
        `   تعداد: ${item.quantity} × ${item.product.price.toLocaleString("fa-IR")} تومان`
      );
      lines.push(
        `   جمع: ${(item.product.price * item.quantity).toLocaleString("fa-IR")} تومان`
      );
      lines.push("");
    });

    lines.push("─────────────────");
    lines.push(`💰 جمع کل: ${totalPrice().toLocaleString("fa-IR")} تومان`);
    lines.push("");
    lines.push("لطفاً این سفارش را تأیید کنید 🙏");

    return lines.join("\n");
  }

  function shareToTelegram() {
    const text = buildInvoiceText();
    const encodedText = encodeURIComponent(text);
    const telegramUrl = `${settings.telegram}?text=${encodedText}`;
    window.open(telegramUrl, "_blank");
  }

  function shareToWhatsapp() {
    const text = buildInvoiceText();
    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `${settings.whatsapp}?text=${encodedText}`;
    window.open(whatsappUrl, "_blank");
  }

  async function copyInvoice() {
    const text = buildInvoiceText();
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success("متن فاکتور کپی شد");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("خطا در کپی");
    }
  }

  if (items.length === 0) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        dir="rtl"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 50%, #8a3a1f 0%, #5c2515 50%, #3a1508 100%)",
        }}
      >
        <div className="max-w-2xl mx-auto px-6 text-center">
          <div className="w-20 h-20 rounded-full bg-brand-cream/10 flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-8 h-8 text-brand-cream" />
          </div>
          <h1 className="text-2xl font-bold text-brand-cream mb-3">
            سبد خریدت خالیه
          </h1>
          <p className="text-brand-cream/60 mb-8">
            برای تسویه حساب، اول از فروشگاه محصول انتخاب کن.
          </p>
          <Link
            href="/products"
            className="inline-block bg-brand-cream text-brand-brown px-8 py-3.5 rounded-full font-semibold hover:bg-brand-cream/90 transition-colors"
          >
            برو به فروشگاه
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row" dir="rtl">
      {/* ============ نیمه راست: لیست محصولات (سبز) ============ */}
      <div
        className="w-full lg:w-1/2 relative overflow-hidden"
        style={{
          backgroundImage:
            "radial-gradient(circle at 70% 30%, #2a6b52 0%, #1d4a36 55%, #143528 100%)",
        }}
      >
        <div className="min-h-screen flex items-center justify-center px-6 py-28 lg:py-24">
          <div className="w-full max-w-2xl">
            <h1 className="text-3xl md:text-4xl font-bold text-brand-cream mb-2">
              لیست خرید
            </h1>
            <p className="text-sm text-brand-cream/60 mb-8">
              {items.length.toLocaleString("fa-IR")} محصول در سبد
            </p>

            {/* لیست */}
            <div className="space-y-3">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="bg-white/5 backdrop-blur-sm border border-brand-cream/10 rounded-2xl p-4 flex gap-4"
                >
                  {item.product.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      className="w-20 h-20 rounded-xl object-cover shrink-0"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-xl bg-brand-cream/10 shrink-0" />
                  )}

                  <div className="flex-1 min-w-0 flex flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-bold text-brand-cream text-sm line-clamp-2">
                        {item.product.name}
                      </h3>
                      <button
                        type="button"
                        onClick={() => removeItem(item.product.id)}
                        className="text-brand-cream/40 hover:text-red-400 p-1 shrink-0 transition-colors"
                        aria-label="حذف"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="mt-auto pt-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity - 1)
                          }
                          className="w-7 h-7 rounded-lg bg-brand-cream/10 border border-brand-cream/20 flex items-center justify-center text-brand-cream hover:bg-brand-cream hover:text-brand-brown transition-colors"
                          aria-label="کاهش"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-sm font-bold text-brand-cream min-w-[2rem] text-center">
                          {item.quantity.toLocaleString("fa-IR")}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity + 1)
                          }
                          className="w-7 h-7 rounded-lg bg-brand-cream/10 border border-brand-cream/20 flex items-center justify-center text-brand-cream hover:bg-brand-cream hover:text-brand-brown transition-colors"
                          aria-label="افزایش"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-left">
                        <div className="text-xs text-brand-cream/50">
                          {item.product.price.toLocaleString("fa-IR")} ×{" "}
                          {item.quantity.toLocaleString("fa-IR")}
                        </div>
                        <div className="font-bold text-brand-cream text-sm">
                          {(
                            item.product.price * item.quantity
                          ).toLocaleString("fa-IR")}{" "}
                          تومان
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* جمع کل */}
            <div className="mt-6 bg-brand-cream/10 backdrop-blur-sm border border-brand-cream/20 rounded-2xl p-5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-brand-cream/70">جمع کل</span>
                <span className="font-extrabold text-brand-cream text-lg">
                  {totalPrice().toLocaleString("fa-IR")} تومان
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ============ نیمه چپ: اشتراک‌گذاری (قهوه‌ای) ============ */}
      <div
        className="w-full lg:w-1/2 relative overflow-hidden"
        style={{
          backgroundImage:
            "radial-gradient(circle at 30% 30%, #8a3a1f 0%, #5c2515 50%, #3a1508 100%)",
        }}
      >
        <div className="min-h-screen flex items-center justify-center px-6 py-28 lg:py-24">
          <div className="w-full max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-cream mb-3">
              نهایی کردن سفارش
            </h2>
            <p className="text-brand-cream/70 text-sm md:text-base mb-10 leading-relaxed">
              لیست خریدت رو برای ما بفرست تا سریع‌ترین راه ارتباطی و تأیید
              سفارش رو با هم چک کنیم.
            </p>

            <div className="space-y-3">
              {/* تلگرام */}
              <button
                type="button"
                onClick={shareToTelegram}
                className="group flex items-center gap-4 w-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-brand-cream/20 rounded-2xl p-4 transition-all"
              >
                <span className="w-12 h-12 rounded-xl bg-[#229ED9] flex items-center justify-center text-white shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                  </svg>
                </span>
                <div className="flex-1 text-right">
                  <div className="font-bold text-brand-cream text-sm">
                    ارسال در تلگرام
                  </div>
                  <div className="text-xs text-brand-cream/60 mt-0.5">
                    فاکتور مستقیم ارسال می‌شه
                  </div>
                </div>
                <ChevronLeft className="w-5 h-5 text-brand-cream/40 group-hover:text-brand-cream transition-colors" />
              </button>

              {/* واتساپ */}
              <button
                type="button"
                onClick={shareToWhatsapp}
                className="group flex items-center gap-4 w-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-brand-cream/20 rounded-2xl p-4 transition-all"
              >
                <span className="w-12 h-12 rounded-xl bg-[#25D366] flex items-center justify-center text-white shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                </span>
                <div className="flex-1 text-right">
                  <div className="font-bold text-brand-cream text-sm">
                    ارسال در واتساپ
                  </div>
                  <div className="text-xs text-brand-cream/60 mt-0.5">
                    فاکتور مستقیم ارسال می‌شه
                  </div>
                </div>
                <ChevronLeft className="w-5 h-5 text-brand-cream/40 group-hover:text-brand-cream transition-colors" />
              </button>

              {/* کپی */}
              <button
                type="button"
                onClick={copyInvoice}
                className="group flex items-center gap-4 w-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-brand-cream/20 rounded-2xl p-4 transition-all"
              >
                <span
                  className={`w-12 h-12 rounded-xl flex items-center justify-center text-white shrink-0 transition-colors ${
                    copied ? "bg-emerald-500" : "bg-brand-green"
                  }`}
                >
                  {copied ? (
                    <Check className="w-5 h-5" strokeWidth={2.5} />
                  ) : (
                    <Copy className="w-5 h-5" strokeWidth={2} />
                  )}
                </span>
                <div className="flex-1 text-right">
                  <div className="font-bold text-brand-cream text-sm">
                    {copied ? "کپی شد!" : "کپی متن فاکتور"}
                  </div>
                  <div className="text-xs text-brand-cream/60 mt-0.5">
                    می‌تونی هرجای دیگه بفرستی
                  </div>
                </div>
                <ChevronLeft className="w-5 h-5 text-brand-cream/40 group-hover:text-brand-cream transition-colors" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}