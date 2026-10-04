'use client';

import { useState } from "react";
import { Monitor, X } from "lucide-react";

export function MobileNotice() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="block md:hidden fixed top-20 left-4 right-4 z-40 max-w-md mx-auto">
      <div className="flex items-center justify-between gap-3 p-3.5 rounded-2xl bg-black/85 backdrop-blur-xl border border-yellow-500/30 text-yellow-200 shadow-2xl shadow-yellow-500/10 transition-all duration-300">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="p-2 rounded-xl bg-yellow-500/15 border border-yellow-500/20 shrink-0 text-yellow-400">
            <Monitor size={18} />
          </div>
          <div className="min-w-0 text-xs text-right" dir="rtl">
            <p className="font-semibold text-yellow-300">
              بهترین تجربه در دسکتاپ
            </p>
            <p className="text-[11px] text-gray-300 truncate mt-0.5" dir="ltr">
              Optimized for desktop view
            </p>
          </div>
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition shrink-0"
          aria-label="بستن پیام"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
