import { MapPin, Star } from "lucide-react";

import Reveal from "../common/Reveal";
import Eyebrow from "../common/Eyebrow";
import { useTheme } from "../../context/ThemeContext";
import { brand } from "../../components/data/theme";

export default function FeaturedCenters() {
  const { colors } = useTheme();

  const centers = [
    {
      name: "Sunrise Nest",
      city: "Kolkata, Ballygunge",
      rating: 4.9,
      reviews: 214,
      tags: ["Infant care", "CCTV monitored"],
      image:
        "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=900&q=80",
    },
    {
      name: "Little Meadows",
      city: "Bengaluru, Indiranagar",
      rating: 4.8,
      reviews: 176,
      tags: ["Outdoor play", "Organic meals"],
      image:
        "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=900&q=80",
    },
    {
      name: "Cradle & Co.",
      city: "Mumbai, Andheri",
      rating: 4.9,
      reviews: 302,
      tags: ["24x7 desk", "Nurse on-site"],
      image:
        "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=900&q=80",
    },
    {
      name: "Tiny Steps House",
      city: "Pune, Baner",
      rating: 4.7,
      reviews: 128,
      tags: ["Bilingual staff", "Sensory room"],
      image:
        "https://images.unsplash.com/photo-1519340241574-2cec6aef0c01?auto=format&fit=crop&w=900&q=80",
    },
  ];
  const grads = [
    [brand[500], brand[300]],
    [brand[400], brand[200]],
    [brand[300], brand[100]],
    [brand[500], brand[100]],
  ];

  return (
    <section
      id="centers"
      className="py-24 px-5 sm:px-8"
      style={{ backgroundColor: colors.surfaceAlt }}
    >
      <div className="max-w-6xl mx-auto">
        <Reveal className="max-w-2xl mb-14">
          <Eyebrow>Featured centers</Eyebrow>

          <h2
            className="text-3xl sm:text-4xl font-semibold"
            style={{
              color: colors.text,
              fontFamily: "Fraunces, serif",
            }}
          >
            Licensed centers our families love.
          </h2>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {centers.map((c, i) => (
            <Reveal key={c.name} delay={(i % 4) * 0.07}>
              <div
                className="rounded-2xl overflow-hidden h-full flex flex-col"
                style={{
                  backgroundColor: colors.surface,
                  border: `1px solid ${colors.border}`,
                }}
              >
                <div className="h-28 relative overflow-hidden">
                  <img
                    src={c.image}
                    alt={c.name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(0,0,0,.18), rgba(0,0,0,.05), transparent)",
                    }}
                  />

                  <span
                    className="absolute top-3 right-3 text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1"
                    style={{
                      backgroundColor: colors.surface,
                      color: brand.ink,
                    }}
                  >
                    <Star
                      className="w-3 h-3 fill-current"
                      style={{ color: brand[500] }}
                    />
                    {c.rating}
                  </span>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h3
                    className="font-semibold mb-1"
                    style={{ color: colors.text }}
                  >
                    {c.name}
                  </h3>

                  <p
                    className="text-xs flex items-center gap-1 mb-3"
                    style={{ color: colors.textMuted }}
                  >
                    <MapPin className="w-3 h-3" />
                    {c.city} · {c.reviews} reviews
                  </p>

                  <div className="flex flex-wrap gap-1.5 mt-auto">
                    {c.tags.map((t) => (
                      <span
                        key={t}
                        className="text-xs px-2 py-1 rounded-full"
                        style={{
                          backgroundColor: colors.surfaceAlt,
                          color: colors.textMuted,
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
