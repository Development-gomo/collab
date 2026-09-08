// src/components/sections/home/HomePartners.jsx

"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function HomePartners({ data }) {
  if (!data) return null;

  const { sub_heading, heading } = data;
  const partners_logo = data?.partners_logo || [];
  const bgImage = data?.bg_image?.url || "";

  if (partners_logo.length === 0) return null;

  // Duplicate for seamless infinite loop
  const logos = [...partners_logo, ...partners_logo];

  return (
    <section className="partners-section py-10 md:py-16 relative overflow-hidden bg-white">
      {bgImage ? (
        <div className="absolute inset-0 -z-2" style={{ backgroundImage: `url(${bgImage})`, backgroundPosition: '100% -10%', backgroundRepeat: 'no-repeat', backgroundSize: 'auto' }} suppressHydrationWarning />
      ) : null}
      <div className="web-width px-6 flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
        {/* SUB HEADING WITH DOT */}
        <div className="md:w-2/6 md:shrink-0">
          <motion.div
            className="flex items-center gap-2 mb-2 md:mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="h-2 w-2 rounded-full bg-(--color-accent)"></span>
            <span className="subheading-label">{sub_heading}</span>
          </motion.div>

          <motion.div
            className="section-heading"
            dangerouslySetInnerHTML={{ __html: heading }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            viewport={{ once: true }}
          />
        </div>

        {/* MARQUEE SLIDER */}
        <div className="partners-marquee-mask overflow-hidden md:flex-1 md:min-w-0">
          <div
            className="partners-marquee-track flex gap-3"
            style={{
              width: "max-content",
              animation: "partners-marquee 30s linear infinite",
            }}
          >
            {logos.map((logo, index) => (
              <div
                key={index}
                className="flex items-center justify-center bg-(--color-warm-stone) rounded-sm px-4 py-3 min-w-[150px] h-[70px] shrink-0"
              >
                <Image
                  src={logo.url}
                  alt={logo.alt || "Partner logo"}
                  width={100}
                  height={30}
                  className="partner-logo w-auto"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes partners-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .partners-marquee-mask {
          -webkit-mask-image: linear-gradient(
            to right,
            transparent 0,
            #000 64px,
            #000 calc(100% - 64px),
            transparent 100%
          );
          mask-image: linear-gradient(
            to right,
            transparent 0,
            #000 64px,
            #000 calc(100% - 64px),
            transparent 100%
          );
        }
        .partners-marquee-mask:hover .partners-marquee-track {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .partners-marquee-track {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}
