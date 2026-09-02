"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import ArrowSvg from "../../../../public/right-arrow.svg";
import { DEFAULT_LANG, langHref } from "@/config";

export default function HomeColumnSection({ data, lang = DEFAULT_LANG }) {
  const { sub_heading, heading, short_text, cta_text, cta_url } = data || {};
  const bgImage = data?.bg_image?.url || "";
  const columns_side = data?.columns_side || [];

  if (!data) return null;

  return (
    <section
      id="next"
      className="py-15 md:py-30 relative overflow-hidden bg-white"
    >
      {bgImage ? (
        <div
          className="absolute inset-0 -z-2"
          style={{
            backgroundImage: `url(${bgImage})`,
            backgroundPosition: "-8% 40%",
            backgroundRepeat: "no-repeat",
            backgroundSize: "auto",
          }}
          suppressHydrationWarning
        />
      ) : null}

      <div className="w-full px-6 web-width">
        {sub_heading && (
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
        )}

        <div className="lg:flex lg:justify-between items-end mb-10 lg:mb-14">
          <motion.div
            className="section-heading mb-4 md:mb-0"
            dangerouslySetInnerHTML={{ __html: heading }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            viewport={{ once: true }}
          />

          {cta_text && cta_url && (
            <Link
              href={langHref(cta_url, lang)}
              className="gap-3 group relative inline-flex items-center rounded-sm bg-(--color-brand) px-6 py-4 text-white transition-all duration-300 hover:bg-(--color-brand) w-[235px] overflow-hidden select-none"
            >
              <span className="relative w-6 flex items-center justify-center">
                <span className="absolute h-2 w-2 rounded-full bg-(--color-mint) transition-all duration-300 ease-out group-hover:opacity-0 group-hover:-translate-x-1"></span>
              </span>
              <span className="flex-1 text-[16px] leading-none transition-all duration-300 ease-out group-hover:-translate-x-4 whitespace-nowrap">
                {cta_text}
              </span>
              <span className="relative w-4 flex items-center justify-center">
                <span className="w-4 absolute opacity-0 -translate-x-4 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:-translate-x-2">
                  <Image src={ArrowSvg} width={13} height={13} alt="arrow" />
                </span>
              </span>
            </Link>
          )}
        </div>

        {columns_side.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {columns_side.map((col, idx) => {
              const img = col?.bg_image?.url || "";
              return (
                <motion.div
                  key={idx}
                  className="group rounded-lg overflow-hidden relative"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                >
                  {img && (
                    <Image
                      src={img}
                      alt={col?.heading || ""}
                      width={410}
                      height={500}
                      className="w-full h-[500px] object-cover transition-all duration-500 group-hover:scale-105"
                    />
                  )}

                  <div className="absolute inset-0 bg-linear-to-t from-black via-black/0 to-transparent"></div>

                  {col?.heading && (
                    <div className="absolute top-6 left-6">
                      <span className="bg-(--color-bg) text-white px-6 py-3 rounded-full flex items-center gap-2 text-sm leading-[18px]">
                        {col.heading}
                      </span>
                    </div>
                  )}

                  {col?.short_text && (
                    <div className="absolute bottom-6 left-6 right-6">
                      <div
                        className="text-white text-[24px] lg:text-[32px] leading-[38px]"
                        dangerouslySetInnerHTML={{ __html: col.short_text }}
                      />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
