"use client";

import { useEffect, useState } from "react";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import bannerSaveurs from "@/images/banner-saveurs.jpg";
import bannerChichas from "@/images/bannerChichas.jpg";
import bannerPromo from "@/images/bannerPromo.jpg";
type Slide = { image: StaticImageData; alt: string; href: string };

// 3 images maximum. Ajoute les autres ici (même format que la première).
const slides: Slide[] = [
  { image: bannerSaveurs, alt: "Explorez un monde de saveurs", href: "/shop" },
   { image: bannerChichas, alt: "Nos chichas", href: "/shop" },
{ image: bannerPromo, alt: "Les promotions du moment", href: "/deal" },
];

const INTERVAL_MS = 5000;

const HomeBanner = () => {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = slides.length;

  useEffect(() => {
    if (count < 2 || paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setCurrent((c) => (c + 1) % count), INTERVAL_MS);
    return () => clearInterval(id);
  }, [count, paused, current]);

  return (
    <section
      aria-roledescription="carrousel"
      aria-label="Offres du moment"
      className="relative overflow-hidden rounded-lg bg-shop_light_pink"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="relative aspect-[2240/1000]">
        {slides.map((slide, i) => (
          <Link
            key={slide.alt}
            href={slide.href}
            aria-hidden={i !== current}
            tabIndex={i === current ? 0 : -1}
            className={cn(
              "absolute inset-0 transition-opacity duration-700",
              i === current ? "opacity-100" : "pointer-events-none opacity-0"
            )}
          >
            <Image
              src={slide.image}
              alt={slide.alt}
              fill
              priority={i === 0}
              sizes="(min-width: 1280px) 1248px, 100vw"
              className="object-cover"
            />
          </Link>
        ))}
      </div>

      {count > 1 && (
        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2">
          {slides.map((slide, i) => (
            <button
              key={slide.alt}
              type="button"
              aria-label={`Afficher la bannière ${i + 1}`}
              aria-current={i === current}
              onClick={() => setCurrent(i)}
              className={cn(
                "h-2.5 rounded-full transition-all",
                i === current
                  ? "w-6 bg-shop_dark_green"
                  : "w-2.5 bg-shop_dark_green/40 hover:bg-shop_dark_green/70"
              )}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default HomeBanner;