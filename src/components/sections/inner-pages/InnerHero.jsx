"use client";

import Image from "next/image";
import React, { useRef } from "react";
import DownArrow from "../../../../public/hero-down-arrow.png";
import Overlay from "../../../../public/overlay.png";
import { motion, useScroll, useTransform } from "framer-motion";

export default function InnerHero({ data }) {
  const bgImage = data?.bg_image?.url || "";
  const heading = data?.heading || "";
  const sub_heading = data?.sub_heading || "";
  const short_text = data?.short_text || "";

  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);

  return (
    <section
      id="inner-hero"
      ref={sectionRef}
      className="relative w-full  overflow-hidden hero"
    >
      {/* BG IMAGE/VIDEO */}
      <motion.div className="absolute inset-0 -z-10" style={{ y }}>
        {bgImage && (
          <Image
            src={bgImage}
            alt="Hero Background"
            fill
            className="object-cover scale-125"
            priority
          />
        )}
      </motion.div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-(--color-warm-stone)/70 -z-10"></div>

      {/* HERO TEXT */}
      <div className="relative min-h-screen web-width px-6 py-24 lg:py-20 h-full flex md:justify-between md:items-end md:flex-row flex-col justify-end items-stretch">
        <div className="max-w-[1046px]">
          {sub_heading && (
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="uppercase subheading-label text-[var(--color-navy)] mb-4 md:mb-6"
              dangerouslySetInnerHTML={{ __html: sub_heading }}
            />
          )}
          <h1>
            <motion.span
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="heading-xl text-black"
              dangerouslySetInnerHTML={{
                __html: heading.replace(/<em>(.*?)<\/em>/g, `<em>$1</em>`),
              }}
            />
          </h1>
          <div
            className="body-text max-w-[480px] mt-6 text-black"
            dangerouslySetInnerHTML={{ __html: short_text }}
          />
        </div>
        <motion.a
          onClick={(e) => {
            e.preventDefault();
            document
              .querySelector("#next")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className=" w-16 h-16 text-center pt-6 pl-6 rounded-full bg-(--color-accent) translate-y-2 transition-all duration-300 shadow-md hover:translate-y-[14px] cursor-pointer md:ml-8 mt-4 md:mt-0"
        >
          <Image src={DownArrow} alt="arrow" width={16} height={16} />
        </motion.a>
      </div>
    </section>
  );
}
