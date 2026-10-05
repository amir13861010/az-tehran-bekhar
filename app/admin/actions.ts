"use server";

import { redis } from "@/lib/redis";
import { revalidatePath } from "next/cache";
import { put, del } from "@vercel/blob";
import type { Settings, Product, Menu } from "@/lib/types";

// ============ تنظیمات ============
export async function updateSettings(settings: Settings) {
  await redis.set("settings", settings);
  revalidatePath("/");
  revalidatePath("/admin/settings");
}

// ============ منو ============
export async function updateMenu(menu: Menu) {
  await redis.set("menu", menu);
  revalidatePath("/");
  revalidatePath("/admin/menu");
}

// ============ محصولات ============
export async function saveProduct(formData: FormData) {
  try {
    const id = (formData.get("id") as string) || crypto.randomUUID();
    const name = formData.get("name") as string;
    const price = Number(formData.get("price"));
    const categorySlug = formData.get("categorySlug") as string;
    const description = (formData.get("description") as string) || undefined;

    let imageUrl: string | undefined;

    const imageFile = formData.get("image");

    console.log("=== saveProduct Debug ===");
    console.log("imageFile:", imageFile);
    console.log(
      "is File:",
      imageFile instanceof File
    );
    if (imageFile instanceof File) {
      console.log("file size:", imageFile.size);
      console.log("file name:", imageFile.name);
    }

    if (imageFile instanceof File && imageFile.size > 0) {
      if (imageFile.size > 5 * 1024 * 1024) {
        return { error: "حجم عکس بیش از ۵ مگابایت است." };
      }

      console.log("Starting blob upload...");
      const blob = await put(`products/${id}-${imageFile.name}`, imageFile, {
        access: "public",
      });
      console.log("Blob upload success:", blob.url);
      imageUrl = blob.url;
    } else {
      console.log("No image file, keeping existing...");
      const existing = await redis.get<Product[]>("products");
      const old = existing?.find((p) => p.id === id);
      imageUrl = old?.imageUrl;
    }

    const product: Product = {
      id,
      name,
      price,
      categorySlug,
      description,
      imageUrl,
    };

    const products = (await redis.get<Product[]>("products")) ?? [];
    const index = products.findIndex((p) => p.id === id);

    if (index >= 0) {
      products[index] = product;
    } else {
      products.push(product);
    }

    await redis.set("products", products);
    revalidatePath("/products");
    revalidatePath("/admin/products");
    revalidatePath(`/admin/products/${id}`);

    return { success: true };
  } catch (err) {
    console.error("=== saveProduct ERROR ===");
    console.error(err);
    return {
      error:
        err instanceof Error
          ? err.message
          : "خطای ناشناخته در ذخیره محصول",
    };
  }
}

export async function deleteProduct(id: string) {
  const products = (await redis.get<Product[]>("products")) ?? [];
  const product = products.find((p) => p.id === id);

  if (product?.imageUrl) {
    await del(product.imageUrl);
  }

  const filtered = products.filter((p) => p.id !== id);
  await redis.set("products", filtered);
  revalidatePath("/products");
  revalidatePath("/admin/products");
}