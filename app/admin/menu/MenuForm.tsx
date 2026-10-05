"use client";

import { useState } from "react";
import { Plus, Trash2, X, GripVertical } from "lucide-react";
import { updateMenu } from "../actions";
import type { Menu, MenuCategory } from "@/lib/types";

// تبدیل عنوان فارسی به slug انگلیسی
function toSlug(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

export function MenuForm({ initial }: { initial: Menu }) {
  const [menu, setMenu] = useState<Menu>(initial);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function addCategory() {
    setMenu({
      ...menu,
      blogMarket: [
        ...menu.blogMarket,
        {
          title: "دسته‌بندی جدید",
          slug: `category-${Date.now()}`,
          items: [],
        },
      ],
    });
  }

  function removeCategory(index: number) {
    setMenu({
      ...menu,
      blogMarket: menu.blogMarket.filter((_, i) => i !== index),
    });
  }

  function updateCategory(index: number, cat: MenuCategory) {
    const newCats = [...menu.blogMarket];
    newCats[index] = cat;
    setMenu({ ...menu, blogMarket: newCats });
  }

  function addItem(catIndex: number) {
    const cat = menu.blogMarket[catIndex];
    updateCategory(catIndex, {
      ...cat,
      items: [
        ...cat.items,
        { label: "زیرمنوی جدید", slug: `item-${Date.now()}` },
      ],
    });
  }

  function removeItem(catIndex: number, itemIndex: number) {
    const cat = menu.blogMarket[catIndex];
    updateCategory(catIndex, {
      ...cat,
      items: cat.items.filter((_, i) => i !== itemIndex),
    });
  }

  function updateItem(
    catIndex: number,
    itemIndex: number,
    field: "label" | "slug",
    value: string
  ) {
    const cat = menu.blogMarket[catIndex];
    const newItems = [...cat.items];
    newItems[itemIndex] = { ...newItems[itemIndex], [field]: value };
    updateCategory(catIndex, { ...cat, items: newItems });
  }

  async function handleSave() {
    setError(null);

    const allSlugs = [
      ...menu.blogMarket.map((c) => c.slug),
      ...menu.blogMarket.flatMap((c) => c.items.map((i) => i.slug)),
    ];
    const duplicates = allSlugs.filter(
      (s, i) => allSlugs.indexOf(s) !== i
    );
    if (duplicates.length > 0) {
      setError(`slug تکراری: ${[...new Set(duplicates)].join(", ")}`);
      return;
    }

    setSaving(true);
    await updateMenu(menu);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="space-y-6">
      {menu.blogMarket.map((cat, catIndex) => (
        <div
          key={catIndex}
          className="bg-white rounded-2xl border border-brand-brown/10 p-5"
        >
          <div className="flex items-start gap-3 mb-4">
            <div className="flex-1 space-y-2">
              <input
                value={cat.title}
                onChange={(e) =>
                  updateCategory(catIndex, { ...cat, title: e.target.value })
                }
                className="w-full font-bold text-brand-brown text-lg border-b border-transparent focus:border-brand-green focus:outline-none py-1"
                placeholder="عنوان دسته‌بندی (فارسی)"
              />
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-neutral-400 font-mono">
                  slug:
                </span>
                <input
                  value={cat.slug}
                  onChange={(e) =>
                    updateCategory(catIndex, {
                      ...cat,
                      slug: toSlug(e.target.value) || cat.slug,
                    })
                  }
                  className="flex-1 text-xs font-mono text-neutral-500 border border-neutral-200 rounded px-2 py-1 focus:border-brand-green focus:outline-none"
                  placeholder="board-games"
                  dir="ltr"
                />
              </div>
            </div>
            <button
              type="button"
              onClick={() => removeCategory(catIndex)}
              className="text-red-600 hover:bg-red-50 p-2 rounded-lg mt-1"
              aria-label="حذف دسته"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-2 pr-2 border-r-2 border-brand-cream">
            {cat.items.map((item, itemIndex) => (
              <div
                key={itemIndex}
                className="flex items-center gap-2 bg-neutral-50 rounded-lg p-2"
              >
                <GripVertical className="w-3.5 h-3.5 text-neutral-300 shrink-0" />

                <input
                  value={item.label}
                  onChange={(e) =>
                    updateItem(catIndex, itemIndex, "label", e.target.value)
                  }
                  placeholder="نام زیرمنو"
                  className="flex-1 text-sm bg-transparent border-b border-transparent focus:border-brand-green focus:outline-none py-1"
                />

                <input
                  value={item.slug}
                  onChange={(e) =>
                    updateItem(
                      catIndex,
                      itemIndex,
                      "slug",
                      toSlug(e.target.value) || item.slug
                    )
                  }
                  placeholder="slug"
                  className="w-32 text-[10px] font-mono text-neutral-500 bg-white border border-neutral-200 rounded px-2 py-1 focus:border-brand-green focus:outline-none"
                  dir="ltr"
                />

                <button
                  type="button"
                  onClick={() => removeItem(catIndex, itemIndex)}
                  className="text-neutral-400 hover:text-red-600 p-1 shrink-0"
                  aria-label="حذف آیتم"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={() => addItem(catIndex)}
              className="inline-flex items-center gap-1 text-xs text-brand-green hover:underline mt-2 pr-2"
            >
              <Plus className="w-3.5 h-3.5" />
              افزودن زیرمنو
            </button>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addCategory}
        className="w-full border-2 border-dashed border-brand-brown/20 rounded-2xl py-4 text-sm font-semibold text-brand-brown hover:border-brand-green hover:bg-brand-cream/30 transition-colors inline-flex items-center justify-center gap-2"
      >
        <Plus className="w-4 h-4" />
        افزودن دسته‌بندی جدید
      </button>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl p-3">
          {error}
        </div>
      )}

      <div className="sticky bottom-4">
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="w-full bg-brand-green text-brand-cream px-8 py-3.5 rounded-full font-semibold disabled:opacity-50 hover:bg-brand-green/90 transition-colors shadow-lg"
        >
          {saving ? "در حال ذخیره..." : saved ? "✓ ذخیره شد" : "ذخیره تغییرات"}
        </button>
      </div>
    </div>
  );
}