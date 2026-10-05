import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { getMenu } from "@/lib/data";
import { ProductForm } from "../ProductForm";

export default async function NewProductPage() {
  const menu = await getMenu();

  return (
    <div className="min-h-screen bg-brand-cream/40" dir="rtl">
      <div className="max-w-2xl mx-auto p-8">
        <Link
          href="/admin/products"
          className="inline-flex items-center gap-1 text-sm text-neutral-500 hover:text-brand-green mb-4"
        >
          <ChevronRight className="w-4 h-4" />
          بازگشت به محصولات
        </Link>

        <h1 className="text-3xl font-bold text-brand-brown mb-6">
          افزودن محصول
        </h1>

        <div className="bg-white rounded-2xl border border-brand-brown/10 p-6">
          <ProductForm menu={menu} />
        </div>
      </div>
    </div>
  );
}