import { ArrowRight, PlayCircle } from "lucide-react";

import { useTheme } from "./ThemeContext";
import { brand } from "./theme";

import Reveal from "./Reveal";
import Button from "./Button";
import HeroVisual from "./HeroVisual";
import SunArc from "./SunArc";

export default function HeroSection() {
  const { colors } = useTheme();

  const stats = [
    ["12,400+", "Families served"],
    ["3,600+", "Verified caregivers"],
    ["4.9/5", "Average parent rating"],
  ];

  return (
    <section
      id="top"
      className="relative pt-16 pb-24 px-5 sm:px-8 overflow-hidden"
      style={{ backgroundColor: colors.bg }}
    >
      <div
        className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 rounded-full"
        style={{
          backgroundImage: `radial-gradient(circle, ${brand[200]}30, transparent 70%)`,
        }}
        aria-hidden
      />

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-14 items-center relative">
        <Reveal>
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold mb-6"
            style={{
              backgroundColor: colors.surfaceAlt,
              color: brand[500],
              border: `1px solid ${colors.border}`,
            }}
          >
            <span className="relative flex h-2 w-2">
              <span
                className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60"
                style={{ backgroundColor: brand[500] }}
              />
              <span
                className="relative inline-flex rounded-full h-2 w-2"
                style={{ backgroundColor: brand[500] }}
              />
            </span>
            Live now · caregivers on call 24x7
          </div>

          <h1
            className="text-4xl sm:text-5xl lg:text-6xl leading-tight font-semibold mb-6"
            style={{
              color: colors.text,
              fontFamily: "Fraunces, serif",
            }}
          >
            Trusted childcare, <span style={{ color: brand[500] }}>awake</span>{" "}
            when you are.
          </h1>

          <p
            className="text-lg leading-relaxed mb-8 max-w-xl"
            style={{ color: colors.textMuted }}
          >
            Little Steps connects your family with background-verified
            caregivers and licensed centers — day, night, or on ten minutes'
            notice. Every step tracked, every caregiver checked, every hour
            covered.
          </p>

          <div className="flex flex-wrap gap-4 mb-10">
            <Button variant="primary" icon={ArrowRight}>
              Find care near you
            </Button>

            <Button variant="secondary" icon={PlayCircle}>
              See how it works
            </Button>
          </div>

          <div className="flex flex-wrap gap-8">
            {stats.map(([n, l]) => (
              <div key={l}>
                <p
                  className="text-2xl font-semibold"
                  style={{
                    color: colors.text,
                    fontFamily: "Fraunces, serif",
                  }}
                >
                  {n}
                </p>

                <p className="text-xs" style={{ color: colors.textMuted }}>
                  {l}
                </p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <HeroVisual />
        </Reveal>
      </div>

      <SunArc />
    </section>
  );
}
