import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { getSettings } from "@/lib/data";
import { SettingsForm } from "./SettingsForm";

export default async function SettingsPage() {
  const settings = await getSettings();

  return (
    <div className="min-h-screen bg-neutral-50 p-8" dir="rtl">
      <div className="max-w-2xl mx-auto">
        <Link
          href="/admin"
          className="inline-flex items-center gap-1 text-sm text-neutral-500 hover:text-brand-green mb-4"
        >
          <ChevronRight className="w-4 h-4" />
          بازگشت به داشبورد
        </Link>

        <h1 className="text-3xl font-bold text-brand-brown mb-8">
          تنظیمات سایت
        </h1>

        <div className="bg-white rounded-2xl border border-neutral-200 p-6">
          <SettingsForm initial={settings} />
        </div>
      </div>
    </div>
  );
}