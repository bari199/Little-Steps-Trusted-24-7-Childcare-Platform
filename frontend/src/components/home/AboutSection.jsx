import { ShieldCheck, Heart, Clock } from "lucide-react";

import Reveal from "../common/Reveal";
import Eyebrow from "../common/Eyebrow";
import { useTheme } from "../../context/ThemeContext";
import { brand } from "../../components/data/theme";

export default function AboutSection() {
  const { colors } = useTheme();

  const pillars = [
    {
      icon: ShieldCheck,
      title: "Verified, always",
      body: "Every caregiver clears a 7-point background check before they ever meet your child.",
    },
    {
      icon: Heart,
      title: "Raised with warmth",
      body: "Caregivers are trained in early-childhood development, first aid, and gentle discipline.",
    },
    {
      icon: Clock,
      title: "Never off the clock",
      body: "Day shifts, night shifts, weekend emergencies — someone is always on call.",
    },
  ];

  const families = [
    "https://randomuser.me/api/portraits/women/44.jpg",
    "https://randomuser.me/api/portraits/men/32.jpg",
    "https://randomuser.me/api/portraits/women/68.jpg",
    "https://randomuser.me/api/portraits/men/75.jpg",
  ];

  return (
    <section
      id="about"
      className="py-24 px-5 sm:px-8"
      style={{ backgroundColor: colors.surfaceAlt }}
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-start">
        <Reveal>
          <Eyebrow>Our story</Eyebrow>

          <h2
            className="text-3xl sm:text-4xl font-semibold mb-5 leading-tight"
            style={{
              color: colors.text,
              fontFamily: "Fraunces, serif",
            }}
          >
            Built by parents who needed care at 2 a.m., not 9 to 5.
          </h2>

          <p
            className="leading-relaxed mb-6"
            style={{ color: colors.textMuted }}
          >
            Little Steps started in 2021 when two working parents in Kolkata
            couldn't find a single trustworthy sitter for a night shift. Today
            we vet, train and schedule caregivers across 40+ Indian cities, so
            no family has to choose between a paycheck and peace of mind.
          </p>

          <div className="flex items-center gap-4">
            <div className="flex -space-x-3">
              {families.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`Family ${i + 1}`}
                  className="w-9 h-9 rounded-full border-2"
                  style={{
                    backgroundColor: colors.surfaceAlt,
                    borderColor: colors.surfaceAlt,
                  }}
                />
              ))}
            </div>

            <p className="text-sm" style={{ color: colors.textMuted }}>
              Trusted by families across 40+ cities
            </p>
          </div>
        </Reveal>

        <div className="grid gap-5">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.1}>
              <div
                className="flex gap-4 p-5 rounded-2xl"
                style={{
                  backgroundColor: colors.surface,
                  border: `1px solid ${colors.border}`,
                }}
              >
                <div
                  className="w-11 h-11 shrink-0 rounded-xl flex items-center justify-center"
                  style={{
                    backgroundImage: `linear-gradient(135deg, ${brand[500]}, ${brand[300]})`,
                  }}
                >
                  <p.icon className="w-5 h-5" style={{ color: brand.ink }} />
                </div>

                <div>
                  <h3
                    className="font-semibold mb-1"
                    style={{ color: colors.text }}
                  >
                    {p.title}
                  </h3>

                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: colors.textMuted }}
                  >
                    {p.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
