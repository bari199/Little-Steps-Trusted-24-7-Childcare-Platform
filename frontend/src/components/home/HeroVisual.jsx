import { ShieldCheck, Star } from "lucide-react";

import { useTheme } from "./ThemeContext";
import { brand } from "./theme";

export default function HeroVisual() {
  const { colors } = useTheme();

  return (
    <div className="relative max-w-md mx-auto" style={{ aspectRatio: "4 / 5" }}>
      <div
        className="absolute inset-0 rounded-[2rem]"
        style={{
          backgroundImage: `linear-gradient(160deg, ${brand[500]}, ${brand[200]})`,
        }}
      />

      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 400 500"
        aria-hidden
      >
        <circle cx="330" cy="70" r="60" fill={brand[100]} opacity="0.45" />

        <circle cx="50" cy="440" r="90" fill={brand.ink} opacity="0.08" />
      </svg>
      <img
        src="https://thumbs.dreamstime.com/b/little-kids-build-block-toys-home-daycare-playing-color-blocks-educational-preschool-kindergarten-wooden-140439764.jpg"
        alt="Caregiver"
        className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[88%] object-contain pointer-events-none select-none"
      />
      <div
        className="absolute left-6 right-6 top-8 rounded-2xl p-5"
        style={{
          backgroundColor: colors.surface,
          border: `1px solid ${colors.border}`,
        }}
      >
        <div className="flex items-center gap-3 mb-3">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ backgroundColor: colors.surfaceAlt }}
          >
            <ShieldCheck className="w-5 h-5" style={{ color: brand[500] }} />
          </div>

          <div>
            <p className="text-sm font-semibold" style={{ color: colors.text }}>
              Background verified
            </p>

            <p className="text-xs" style={{ color: colors.textMuted }}>
              ID, police + reference checked
            </p>
          </div>
        </div>

        <div
          className="h-1.5 rounded-full overflow-hidden"
          style={{ backgroundColor: colors.surfaceAlt }}
        >
          <div
            className="h-full rounded-full"
            style={{
              width: "92%",
              backgroundImage: `linear-gradient(90deg, ${brand[500]}, ${brand[300]})`,
            }}
          />
        </div>
      </div>

      <div
        className="absolute left-8 right-8 bottom-10 rounded-2xl p-5"
        style={{
          backgroundColor: colors.surface,
          border: `1px solid ${colors.border}`,
        }}
      >
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-semibold" style={{ color: colors.text }}>
            Priya, caregiver
          </p>

          <span
            className="flex items-center gap-1 text-xs font-semibold"
            style={{ color: brand[500] }}
          >
            <Star className="w-3.5 h-3.5 fill-current" />
            4.9
          </span>
        </div>

        <p className="text-xs" style={{ color: colors.textMuted }}>
          "On my way — 8 mins" · Kolkata, Ballygunge
        </p>
      </div>
    </div>
  );
}
