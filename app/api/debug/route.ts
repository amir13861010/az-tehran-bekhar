import { NextResponse } from "next/server";
import { redis } from "@/lib/redis";

export async function GET() {
  const products = await redis.get("products");
  return NextResponse.json({ products });
}