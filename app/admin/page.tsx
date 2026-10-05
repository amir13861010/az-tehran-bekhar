import Link from "next/link";
import { Settings, Package, Menu as MenuIcon } from "lucide-react";

export default function AdminDashboard() {
  const items = [
    {
      href: "/admin/settings",
      label: "تنظیمات سایت",
      desc: "تلگرام، واتساپ، متن‌های اصلی",
      icon: Settings,
    },
    {
      href: "/admin/products",
      label: "محصولات",
      desc: "افزودن، ویرایش و حذف محصول",
      icon: Package,
    },
    {
      href: "/admin/menu",
      label: "منوها",
      desc: "دسته‌بندی‌های مگا منو",
      icon: MenuIcon,
    },
  ];

  return (
    <div className="min-h-screen bg-brand-cream/40" dir="rtl">
      <div className="max-w-4xl mx-auto p-8">
        {/* هدر */}
        <div className="bg-brand-green rounded-3xl p-8 mb-6 text-brand-cream">
          <h1 className="text-3xl font-extrabold mb-1">پنل مدیریت</h1>
          <p className="text-sm opacity-80">از تهران بخر</p>
        </div>

        {/* کارت‌ها */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="bg-white rounded-2xl p-6 border border-brand-brown/10 hover:border-brand-green hover:shadow-lg transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-cream flex items-center justify-center text-brand-brown group-hover:bg-brand-green group-hover:text-brand-cream transition-colors mb-4">
                  <Icon className="w-6 h-6" strokeWidth={2} />
                </div>
                <h2 className="font-bold text-lg text-brand-brown mb-1">
                  {item.label}
                </h2>
                <p className="text-sm text-neutral-500">{item.desc}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}