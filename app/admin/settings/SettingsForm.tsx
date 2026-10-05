"use client";

import { useState } from "react";
import { updateSettings } from "../actions";
import type { Settings } from "@/lib/types";

export function SettingsForm({ initial }: { initial: Settings }) {
  const [form, setForm] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    await updateSettings(form);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-w-xl">
      <div>
        <label className="block text-sm font-semibold text-brand-brown mb-1.5">
          لینک تلگرام
        </label>
        <input
          value={form.telegram}
          onChange={(e) => setForm({ ...form, telegram: e.target.value })}
          className="w-full border border-neutral-300 rounded-xl px-4 py-2.5 focus:border-brand-green focus:outline-none"
          dir="ltr"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-brand-brown mb-1.5">
          لینک واتساپ
        </label>
        <input
          value={form.whatsapp}
          onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
          className="w-full border border-neutral-300 rounded-xl px-4 py-2.5 focus:border-brand-green focus:outline-none"
          dir="ltr"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-brand-brown mb-1.5">
          تیتر اصلی صفحه اصلی
        </label>
        <textarea
          value={form.heroTitle}
          onChange={(e) => setForm({ ...form, heroTitle: e.target.value })}
          rows={3}
          className="w-full border border-neutral-300 rounded-xl px-4 py-2.5 focus:border-brand-green focus:outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-brand-brown mb-1.5">
          متن زیر تیتر
        </label>
        <textarea
          value={form.heroSubtitle}
          onChange={(e) => setForm({ ...form, heroSubtitle: e.target.value })}
          rows={3}
          className="w-full border border-neutral-300 rounded-xl px-4 py-2.5 focus:border-brand-green focus:outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-brand-brown mb-1.5">
          متن دکمه اصلی
        </label>
        <input
          value={form.ctaButtonText}
          onChange={(e) =>
            setForm({ ...form, ctaButtonText: e.target.value })
          }
          className="w-full border border-neutral-300 rounded-xl px-4 py-2.5 focus:border-brand-green focus:outline-none"
        />
      </div>

      <button
        type="submit"
        disabled={saving}
        className="bg-brand-green text-brand-cream px-8 py-3 rounded-full font-semibold disabled:opacity-50 hover:bg-brand-green/90 transition-colors"
      >
        {saving ? "در حال ذخیره..." : saved ? "✓ ذخیره شد" : "ذخیره"}
      </button>
    </form>
  );
}