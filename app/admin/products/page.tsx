import Link from "next/link";
import { ChevronRight, Plus, Pencil, Trash2 } from "lucide-react";
import { getProducts } from "@/lib/data";
import { deleteProduct } from "../actions";

export default async function AdminProductsPage() {
  const products = await getProducts();

  return (
    <div className="min-h-screen bg-brand-cream/40" dir="rtl">
      <div className="max-w-4xl mx-auto p-8">
        <Link
          href="/admin"
          className="inline-flex items-center gap-1 text-sm text-neutral-500 hover:text-brand-green mb-4"
        >
          <ChevronRight className="w-4 h-4" />
          بازگشت به داشبورد
        </Link>

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-brand-brown">محصولات</h1>
          <Link
            href="/admin/products/new"
            className="inline-flex items-center gap-2 bg-brand-green text-brand-cream px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-brand-green/90 transition-colors"
          >
            <Plus className="w-4 h-4" />
            افزودن محصول
          </Link>
        </div>

        {products.length === 0 ? (
          <div className="bg-white rounded-2xl border border-brand-brown/10 p-12 text-center">
            <p className="text-neutral-500">هنوز محصولی اضافه نشده.</p>
          </div>
        ) : (
          <ul className="space-y-3">
            {products.map((p) => (
              <li
                key={p.id}
                className="bg-white rounded-2xl border border-brand-brown/10 p-4 flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  {p.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={p.imageUrl}
                      alt={p.name}
                      className="w-16 h-16 rounded-xl object-cover shrink-0"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-xl bg-brand-cream shrink-0" />
                  )}
                  <div className="min-w-0">
                    <div className="font-bold text-brand-brown truncate">
                      {p.name}
                    </div>
                    <div className="text-sm text-neutral-500 truncate">
                      {p.categorySlug} • {p.price.toLocaleString("fa-IR")} تومان
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 shrink-0">
                  <Link
                    href={`/admin/products/${p.id}`}
                    className="inline-flex items-center gap-1.5 text-sm px-3 py-2 rounded-xl border border-brand-brown/15 text-brand-brown hover:bg-brand-cream transition-colors"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                    ویرایش
                  </Link>
                  <form
                    action={async () => {
                      "use server";
                      await deleteProduct(p.id);
                    }}
                  >
                    <button
                      type="submit"
                      className="inline-flex items-center gap-1.5 text-sm px-3 py-2 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      حذف
                    </button>
                  </form>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}