import { Metadata } from "next";
import { getSettings } from "@/lib/data";
import { CheckoutClient } from "./CheckoutClient";

export const metadata: Metadata = {
  title: "تسویه حساب | از تهران بخر",
  description: "لیست خرید و ارسال فاکتور",
  robots: {
    index: false, // نباید توی گوگل ایندکس بشه
  },
};

export default async function CheckoutPage() {
  const settings = await getSettings();

  return <CheckoutClient settings={settings} />;
}