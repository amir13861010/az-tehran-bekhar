import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-[100dvh] relative overflow-hidden">
      {/* پس‌زمینه دو تیکه — فقط دسکتاپ */}
      <div className="hidden md:block absolute inset-0">
        {/* نیمه چپ: قهوه‌ای با هاله radial */}
        <div
          className="absolute inset-y-0 left-0 w-1/2"
          style={{
            backgroundImage:
              "radial-gradient(circle at 50% 50%, #8a3a1f 0%, #5c2515 45%, #3a1508 100%)",
          }}
        />
        {/* نیمه راست: سبز ساده */}
        <div className="absolute inset-y-0 right-0 w-1/2 bg-brand-green" />
      </div>

      {/* موبایل: تک رنگ با همون هاله */}
      <div
        className="md:hidden absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 40%, #8a3a1f 0%, #5c2515 50%, #3a1508 100%)",
        }}
      />

      {/* محتوا */}
      <div className="relative z-10 min-h-[100dvh] flex items-center justify-start px-6 sm:px-8 md:px-16 py-24 md:py-0">
        <div className="w-full md:w-1/2 text-right text-brand-cream">
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold leading-[1.3] md:leading-tight mb-5 md:mb-8">
            تهران را ببین.
            <br />
            انتخاب کن.
            <br />
            ما می‌خریم.
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-brand-cream/80 mb-8 md:mb-10 leading-relaxed">
            ویدیو و نقشه‌ی مغازه‌های بازار؛
            <br />
            لیستت را بفرست، خرید و ارسال با ما.
          </p>

          <Link
            href="/products"
            className="inline-flex items-center justify-center bg-brand-cream text-brand-green hover:bg-brand-cream/90 text-base md:text-lg font-bold px-7 py-5 md:px-10 md:py-7 rounded-full transition-colors"
          >
            انتخاب محصول
          </Link>
        </div>
      </div>
    </main>
  );
}