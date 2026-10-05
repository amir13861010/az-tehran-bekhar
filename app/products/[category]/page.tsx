import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { getProducts, getMenu } from "@/lib/data";
import ProductCard from "@/components/ProductCard";

// -----------------------------------------------------
// پیدا کردن دسته (والد یا فرزند) با slug
// -----------------------------------------------------
type CategoryInfo = {
  slug: string;
  title: string;
  type: "parent" | "child";
  parentSlug?: string;
  parentTitle?: string;
};

async function findCategory(slug: string): Promise<CategoryInfo | null> {
  const menu = await getMenu();

  // چک کن والد هست؟
  const parent = menu.blogMarket.find((c) => c.slug === slug);
  if (parent) {
    return {
      slug: parent.slug,
      title: parent.title,
      type: "parent",
    };
  }

  // چک کن فرزند هست؟
  for (const cat of menu.blogMarket) {
    const child = cat.items.find((i) => i.slug === slug);
    if (child) {
      return {
        slug: child.slug,
        title: child.label,
        type: "child",
        parentSlug: cat.slug,
        parentTitle: cat.title,
      };
    }
  }

  return null;
}

// -----------------------------------------------------
// Metadata داینامیک برای SEO
// -----------------------------------------------------
export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category: slug } = await params;
  const cat = await findCategory(slug);

  if (!cat) {
    return { title: "یافت نشد | از تهران بخر" };
  }

  const title =
    cat.type === "parent"
      ? `${cat.title} | از تهران بخر`
      : `${cat.title} - ${cat.parentTitle} | از تهران بخر`;

  const description =
    cat.type === "parent"
      ? `همه محصولات ${cat.title} بازار تهران با قیمت و توضیحات.`
      : `${cat.title} از دسته ${cat.parentTitle} بازار تهران. خرید و ارسال با از تهران بخر.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
    },
  };
}

// -----------------------------------------------------
// صفحه
// -----------------------------------------------------
export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: slug } = await params;
  const cat = await findCategory(slug);

  if (!cat) notFound();

  const products = await getProducts();

  // فیلتر محصولات
  let filtered = products;
  if (cat.type === "child") {
    filtered = products.filter((p) => p.categorySlug === cat.slug);
  } else {
    // والد: همه زیرمنوهای این دسته
    const menu = await getMenu();
    const parent = menu.blogMarket.find((c) => c.slug === cat.slug);
    if (parent) {
      const childSlugs = parent.items.map((i) => i.slug);
      filtered = products.filter((p) =>
        childSlugs.includes(p.categorySlug)
      );
    }
  }

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
            className="flex items-center gap-2 text-xs text-brand-cream/60 mb-6 flex-wrap"
          >
            <Link
              href="/"
              className="hover:text-brand-cream transition-colors"
            >
              خانه
            </Link>
            <ChevronLeft className="w-3 h-3 opacity-50" />
            <Link
              href="/products"
              className="hover:text-brand-cream transition-colors"
            >
              فروشگاه
            </Link>

            {cat.type === "child" && cat.parentSlug && (
              <>
                <ChevronLeft className="w-3 h-3 opacity-50" />
                <Link
                  href={`/products/${cat.parentSlug}`}
                  className="hover:text-brand-cream transition-colors"
                >
                  {cat.parentTitle}
                </Link>
              </>
            )}

            <ChevronLeft className="w-3 h-3 opacity-50" />
            <span className="text-brand-cream">{cat.title}</span>
          </nav>

          <h1 className="text-4xl md:text-6xl font-extrabold text-brand-cream mb-4">
            {cat.title}
          </h1>

          {cat.type === "child" && cat.parentTitle && (
            <p className="text-brand-cream/70 text-base md:text-lg max-w-2xl leading-relaxed">
              زیرمجموعه‌ای از دسته {cat.parentTitle}
            </p>
          )}
        </div>
      </div>

      {/* لیست محصولات */}
      <div className="max-w-7xl mx-auto px-6 md:px-16 py-12 md:py-16">
        {filtered.length === 0 ? (
          <div className="bg-white rounded-2xl border border-neutral-200 p-16 text-center">
            <p className="text-neutral-500 mb-4">
              محصولی در این دسته پیدا نشد.
            </p>
            <Link
              href="/products"
              className="inline-block text-sm text-brand-green hover:underline"
            >
              مشاهده همه محصولات
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}