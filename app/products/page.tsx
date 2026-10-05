import { Metadata } from "next";
import Link from "next/link";
import { getProducts } from "@/lib/data";
import ProductCard from "@/components/ProductCard";
import { ChevronLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "فروشگاه | از تهران بخر",
  description:
    "همه محصولات بازار تهران با قیمت و توضیحات کامل. خرید و ارسال با از تهران بخر.",
  openGraph: {
    title: "فروشگاه | از تهران بخر",
    description: "همه محصولات بازار تهران با قیمت و توضیحات کامل.",
    type: "website",
  },
};

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="min-h-screen bg-brand-cream" dir="rtl">
      {/* هدر سبز */}
      <div
        className="relative overflow-hidden"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 100%, #2a6b52 0%, #1d4a36 50%, #143528 100%)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-16 pt-32 pb-16 md:pt-40 md:pb-20">
          {/* Breadcrumb */}
          <nav
            aria-label="breadcrumb"
            className="flex items-center gap-2 text-xs text-brand-cream/60 mb-6"
          >
            <Link href="/" className="hover:text-brand-cream transition-colors">
              خانه
            </Link>
            <ChevronLeft className="w-3 h-3 opacity-50" />
            <span className="text-brand-cream">فروشگاه</span>
          </nav>

          <h1 className="text-4xl md:text-6xl font-extrabold text-brand-cream mb-4">
            فروشگاه
          </h1>
          <p className="text-brand-cream/70 text-base md:text-lg max-w-2xl leading-relaxed">
            همه محصولات بازار تهران؛ از بازی‌های سنتی تا ملزومات کوهنوردی و سفر.
          </p>
        </div>
      </div>

      {/* لیست محصولات */}
      <div className="max-w-7xl mx-auto px-6 md:px-16 py-12 md:py-16">
        {products.length === 0 ? (
          <div className="bg-white rounded-2xl border border-neutral-200 p-16 text-center">
            <p className="text-neutral-500">هنوز محصولی اضافه نشده.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}