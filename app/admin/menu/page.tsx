import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { getMenu } from "@/lib/data";
import { MenuForm } from "./MenuForm";

export default async function MenuPage() {
  const menu = await getMenu();

  return (
    <div className="min-h-screen bg-brand-cream/40" dir="rtl">
      <div className="max-w-3xl mx-auto p-8">
        <Link
          href="/admin"
          className="inline-flex items-center gap-1 text-sm text-neutral-500 hover:text-brand-green mb-4"
        >
          <ChevronRight className="w-4 h-4" />
          بازگشت به داشبورد
        </Link>

        <h1 className="text-3xl font-bold text-brand-brown mb-2">
          ویرایش منوی «بلاگ بازار»
        </h1>
        <p className="text-sm text-neutral-500 mb-6">
          این دسته‌بندی‌ها توی مگا منو و منوی موبایل نمایش داده می‌شن.
        </p>

        <MenuForm initial={menu} />
      </div>
    </div>
  );
}