"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";

export default function ConditionalHeader() {
  const pathname = usePathname();

  // توی صفحات ادمین هدر نشون نده
  if (pathname?.startsWith("/admin")) return null;

  return <Header />;
}