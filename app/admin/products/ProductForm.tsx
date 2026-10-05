"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { saveProduct } from "../actions";
import type { Product, Menu } from "@/lib/types";
import {
  Upload,
  X,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

type UploadState = "idle" | "uploading" | "saving" | "success" | "error";

export function ProductForm({
  initial,
  menu,
}: {
  initial?: Product;
  menu: Menu;
}) {
  const [preview, setPreview] = useState<string | null>(
    initial?.imageUrl ?? null
  );
  const [imageName, setImageName] = useState<string | null>(null);
  const [state, setState] = useState<UploadState>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const options = menu.blogMarket.flatMap((cat) =>
    cat.items.map((item) => ({
      slug: item.slug,
      label: `${cat.title} › ${item.label}`,
    }))
  );

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setImageName(file.name);
    }
  }

  function clearImage() {
    setPreview(null);
    setImageName(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  async function handleSubmit(formData: FormData) {
    setErrorMsg(null);

    // ← چک کنیم فایل واقعاً توی FormData هست یا نه
    const fileInForm = formData.get("image");
    console.log("[CLIENT] image in formData:", fileInForm);

    if (imageName) {
      setState("uploading");
    } else {
      setState("saving");
    }

    try {
      if (imageName) {
        await new Promise((r) => setTimeout(r, 300));
      }

      const result = await saveProduct(formData);

      if (result?.error) {
        setState("error");
        setErrorMsg(result.error);
        return;
      }

      setState("success");

      setTimeout(() => {
        router.push("/admin/products");
      }, 800);
    } catch (err) {
      setState("error");
      setErrorMsg(
        err instanceof Error ? err.message : "خطای ناشناخته در ذخیره"
      );
    }
  }

  return (
    <form action={handleSubmit} encType="multipart/form-data" className="space-y-5">
      {initial?.id && <input type="hidden" name="id" value={initial.id} />}

      <div>
        <label className="block text-sm font-semibold text-brand-brown mb-1.5">
          نام محصول
        </label>
        <input
          name="name"
          defaultValue={initial?.name}
          required
          disabled={state === "uploading" || state === "saving"}
          className="w-full border border-neutral-300 rounded-xl px-4 py-2.5 focus:border-brand-green focus:outline-none disabled:opacity-60"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-brand-brown mb-1.5">
            قیمت (تومان)
          </label>
          <input
            name="price"
            type="number"
            defaultValue={initial?.price}
            required
            disabled={state === "uploading" || state === "saving"}
            className="w-full border border-neutral-300 rounded-xl px-4 py-2.5 focus:border-brand-green focus:outline-none disabled:opacity-60"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-brand-brown mb-1.5">
            دسته‌بندی
          </label>
          <select
            name="categorySlug"
            defaultValue={initial?.categorySlug ?? ""}
            required
            disabled={state === "uploading" || state === "saving"}
            className="w-full border border-neutral-300 rounded-xl px-4 py-2.5 focus:border-brand-green focus:outline-none bg-white disabled:opacity-60"
          >
            <option value="" disabled>
              انتخاب دسته‌بندی...
            </option>
            {options.map((opt) => (
              <option key={opt.slug} value={opt.slug}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-brand-brown mb-1.5">
          توضیحات
        </label>
        <textarea
          name="description"
          defaultValue={initial?.description}
          rows={3}
          disabled={state === "uploading" || state === "saving"}
          className="w-full border border-neutral-300 rounded-xl px-4 py-2.5 focus:border-brand-green focus:outline-none disabled:opacity-60"
        />
      </div>

      {/* ← input فایل همیشه توی DOM هست، فقط مخفیه */}
      <div>
        <label className="block text-sm font-semibold text-brand-brown mb-1.5">
          عکس محصول
        </label>

        <input
          ref={fileInputRef}
          type="file"
          name="image"
          accept="image/*"
          onChange={handleImageChange}
          disabled={state === "uploading" || state === "saving"}
          className="hidden"
        />

        {preview ? (
          <div className="space-y-2">
            <div className="relative w-40 h-40 rounded-xl overflow-hidden border border-neutral-200 group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={preview}
                alt="پیش‌نمایش"
                className="object-cover w-full h-full"
              />
              {state !== "uploading" && state !== "saving" && (
                <button
                  type="button"
                  onClick={clearImage}
                  className="absolute top-2 left-2 bg-black/60 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label="حذف عکس"
                >
                  <X className="w-4 h-4" />
                </button>
              )}

              {state === "uploading" && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <Loader2 className="w-6 h-6 text-white animate-spin" />
                </div>
              )}
            </div>

            {imageName && state !== "success" && (
              <p className="text-xs text-neutral-500 truncate max-w-[200px]">
                {imageName}
              </p>
            )}

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="text-xs text-brand-green hover:underline"
            >
              تغییر عکس
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-neutral-300 rounded-xl cursor-pointer hover:border-brand-green hover:bg-brand-cream/30 transition-colors"
          >
            <Upload className="w-6 h-6 text-neutral-400 mb-2" />
            <span className="text-sm text-neutral-500">
              کلیک کنید یا عکس را بکشید
            </span>
            <span className="text-[10px] text-neutral-400 mt-1">
              حداکثر ۵ مگابایت
            </span>
          </button>
        )}
      </div>

      {state === "error" && errorMsg && (
        <div className="flex items-start gap-2 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl p-3">
          <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {(state === "uploading" || state === "saving") && (
        <div className="bg-brand-cream rounded-xl p-4 space-y-3">
          <div className="flex items-center gap-2 text-sm text-brand-brown">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>
              {state === "uploading"
                ? "در حال آپلود عکس..."
                : "در حال ذخیره محصول..."}
            </span>
          </div>

          <div className="relative h-1.5 bg-brand-brown/10 rounded-full overflow-hidden">
            <div className="absolute inset-y-0 w-1/3 bg-brand-green rounded-full animate-progress" />
          </div>
        </div>
      )}

      {state === "success" && (
        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm rounded-xl p-3">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>محصول با موفقیت ذخیره شد! در حال انتقال...</span>
        </div>
      )}

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={
            state === "uploading" || state === "saving" || state === "success"
          }
          className="inline-flex items-center gap-2 bg-brand-green text-brand-cream px-8 py-3 rounded-full font-semibold disabled:opacity-50 hover:bg-brand-green/90 transition-colors"
        >
          {(state === "uploading" || state === "saving") && (
            <Loader2 className="w-4 h-4 animate-spin" />
          )}
          {state === "uploading"
            ? "در حال آپلود..."
            : state === "saving"
            ? "در حال ذخیره..."
            : state === "success"
            ? "ذخیره شد ✓"
            : "ذخیره"}
        </button>
      </div>
    </form>
  );
}