"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import DownArrow from "../../../../public/hero-down-arrow.png";
import CalenerSvg from "../../../../public/calender.svg";

export default function PostHero({ post, heroImage, categories = [] }) {
  return (
    <section className="relative w-full overflow-hidden hero">
      {/* BG IMAGE */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          background: heroImage
            ? `linear-gradient(180deg, rgba(0, 0, 0, 0.70) 0.40%, rgba(0, 0, 0, 0.20) 39.69%), url(${heroImage}) lightgray 0px no-repeat`
            : undefined,
        }}
      />

      {/* GRADIENT OVERLAY */}
      <div className="absolute inset-0 bg-(--color-black)/30 -z-10"></div>

      {/* HERO TEXT */}
      <div className="relative min-h-screen web-width px-6 py-24 lg:py-20 h-full flex md:justify-between md:items-end md:flex-row flex-col justify-end items-stretch">
        <div className="max-w-[1046px]">
          {/* CATEGORY + DATE */}
          {(categories.length > 0 || post?.date) && (
            <div className="flex flex-wrap items-center gap-4 mb-4 md:mb-6">
              {categories.length > 0 && (
                <span className="bg-white/20 backdrop-blur-md border border-white/30 text-white px-3 py-1.5 rounded-full text-xs inline-flex items-center gap-2">
                  <span className="h-2 w-2 bg-(--color-accent) rounded-full"></span>
                  {categories[0].name}
                </span>
              )}

              {post?.date && (
                <div className="flex items-center gap-2 text-sm text-white/90">
                  <Image
                    src={CalenerSvg}
                    width={14}
                    height={14}
                    alt="calendar"
                    className="brightness-0 invert"
                  />
                  {new Date(post.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </div>
              )}
            </div>
          )}

          {/* TITLE */}
          {post?.title?.rendered && (
            <h1
              className="heading-xl text-white"
              dangerouslySetInnerHTML={{ __html: post.title.rendered }}
            />
          )}

          {/* EXCERPT */}
          {post?.excerpt?.rendered && (
            <div
              className="max-w-[480px] text-xl mt-6 text-white"
              dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
            />
          )}
        </div>

        {/* DOWN ARROW — SCROLL TO NEXT SECTION */}
        <motion.a
          href="#next"
          onClick={(e) => {
            e.preventDefault();
            document.querySelector("#next")?.scrollIntoView({ behavior: "smooth" });
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="w-16 h-16 text-center pt-6 pl-6 rounded-full bg-(--color-accent) translate-y-2 transition-all duration-300 shadow-md hover:translate-y-[14px] cursor-pointer md:ml-8 mt-8 md:mt-0"
        >
          <Image src={DownArrow} alt="scroll down" width={16} height={16} />
        </motion.a>
      </div>
    </section>
  );
}
