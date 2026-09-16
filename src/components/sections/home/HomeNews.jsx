"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import ArrowSvg from "../../../../public/right-arrow.svg";
import CalenerSvg from "../../../../public/calender.svg";
import { DEFAULT_LANG, langHref } from "@/config";

const CARDS_PER_PAGE = 3;

// Strip WP excerpt markup (including its own "[...]"/"Continue reading" link,
// which points at the WordPress backend) so the card only ever renders plain text.
function stripHtml(html) {
  return (html || "").replace(/<[^>]*>/g, "").trim();
}

export default function HomeNews({
  data,
  lang = DEFAULT_LANG,
  prefetchedPosts,
}) {
  const posts = prefetchedPosts || [];
  const {
    sub_heading,
    heading,
    short_text,
    cta_text,
    cta_url,
    background_color,
  } = data || {};
  const bgImageUrl = data?.background_image?.url || "";
  const [visibleCount, setVisibleCount] = useState(CARDS_PER_PAGE);

  if (!posts.length) return null;

  /* ------------------------------------------------------------
     EXTRACT CATEGORY ("webinar", "insights", etc.)
  ------------------------------------------------------------ */
  function getCategories(post) {
    const terms = post?._embedded?.["wp:term"]?.[0] || [];
    return terms.filter((t) => t.taxonomy === "category");
  }

  const visiblePosts = posts.slice(0, visibleCount);
  const hasMore = visibleCount < posts.length;

  return (
    <section
      className={`relative ${bgImageUrl ? "" : "bg-(--color-warm-stone)"}`}
      style={
        !bgImageUrl && background_color
          ? { backgroundColor: background_color }
          : undefined
      }
    >
      {/* BACKGROUND IMAGE */}
      {bgImageUrl && (
        <div className="absolute inset-0 -z-10">
          <Image
            src={bgImageUrl}
            alt=""
            fill
            quality={90}
            sizes="100vw"
            className="object-cover"
          />
          {background_color && (
            <div
              className="absolute inset-0"
              style={{ backgroundColor: background_color }}
            />
          )}
        </div>
      )}

      <div className="web-width px-6 py-15 md:py-30">
        {/* HEADING + SHORT TEXT — HALF/HALF */}
        <div className="md:flex md:gap-12 md:justify-between items-end mb-12">
          {/* SUB HEADING */}
          <div className="md:w-1/2">
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
            <motion.div
              className="section-heading mb-5 md:mb-0"
              dangerouslySetInnerHTML={{ __html: heading }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              viewport={{ once: true }}
            />
          </div>
          <div className="md:w-1/2">
            {/* SHORT TEXT */}
            {short_text && (
              <motion.div
                className="body-text"
                dangerouslySetInnerHTML={{ __html: short_text }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              />
            )}

            {/* CTA */}
            {cta_text && cta_url && (
              <Link
                href={langHref(cta_url, lang)}
                className="
                gap-3 group relative inline-flex items-center
                rounded-sm bg-(--color-brand) px-6 py-4 text-white
                transition-all duration-300 hover:bg-(--color-brand)
                w-[235px] overflow-hidden select-none
              "
              >
                {/* LEFT DOT */}
                <span className="relative w-6 flex items-center justify-center">
                  <span
                    className="
                    absolute h-2 w-2 rounded-full bg-(--color-mint)
                    transition-all duration-300 ease-out
                    group-hover:opacity-0 group-hover:-translate-x-1
                  "
                  ></span>
                </span>

                {/* TEXT */}
                <span
                  className="
                  flex-1 text-[16px] leading-none
                  transition-all duration-300 ease-out
                  group-hover:-translate-x-4
                  whitespace-nowrap
                "
                >
                  {cta_text}
                </span>

                {/* ARROW */}
                <span className="relative w-4 flex items-center justify-center">
                  <span
                    className="
                    w-4 absolute opacity-0 -translate-x-4
                    transition-all duration-300 ease-out
                    group-hover:opacity-100 group-hover:-translate-x-2
                  "
                  >
                    <Image src={ArrowSvg} width={13} height={13} alt="arrow" />
                  </span>
                </span>
              </Link>
            )}
          </div>
        </div>

        {/* ------------------------------------------------------------
         POST CARD GRID — 3 PER ROW
      ------------------------------------------------------------ */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {visiblePosts.map((post, idx) => {
            const img =
              post?._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "";
            const category = getCategories(post)[0]?.name || "Insights";

            return (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: (idx % CARDS_PER_PAGE) * 0.12,
                }}
                viewport={{ once: true }}
              >
                <Link
                  href={langHref(`/news/${post.slug}`, lang)}
                  className="block group bg-(--color-warm-stone) rounded-lg "
                >
                  {/* IMAGE */}
                  <div className="relative w-full h-65 overflow-hidden rounded-lg ">
                    {img && (
                      <Image
                        src={img}
                        width={460}
                        height={240}
                        alt={post.title.rendered}
                        className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                      />
                    )}

                    {/* CATEGORY BADGE */}
                    <span className="absolute top-4 left-4 bg-(--color-bg) backdrop-blur-md text-white px-3 py-1.5 rounded-full text-[12px] leading-[15px] flex items-center gap-2">
                      <span className="h-2 w-2 bg-(--color-accent) rounded-full"></span>
                      {category}
                    </span>
                  </div>

                  {/* TEXT CONTENT */}
                  <div className="p-6">
                    {/* TITLE */}
                    <h4
                      className="font-medium text-[18px] leading-[26px] mb-3"
                      dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                    />

                    {/* EXCERPT */}
                    {post?.excerpt?.rendered && (
                      <p className="text-[14px] leading-[22px] text-(--color-grey) mb-4 line-clamp-3">
                        {stripHtml(post.excerpt.rendered)}
                      </p>
                    )}

                    {/* DATE + READ MORE */}
                    <div className="flex items-center justify-between gap-4">
                      {/* DATE */}
                      <div className="text-[14px] text-(--color-grey)">
                        <Image
                          src={CalenerSvg}
                          width={12}
                          height={12}
                          alt="calendar"
                          className="inline-block mr-1 mb-1"
                        />
                        {new Date(post.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </div>

                      {/* READ MORE BUTTON */}
                      <span className="gap-3 relative inline-flex items-center rounded-sm bg-(--color-brand) px-6 py-4 text-white transition-all duration-300 hover:bg-(--color-brand) w-[150px] overflow-hidden select-none">
                        {/* LEFT DOT */}
                        <span className="relative w-6 flex items-center justify-center">
                          <span className="absolute h-2 w-2 rounded-full bg-(--color-mint) transition-all duration-300 ease-out group-hover:opacity-0 group-hover:-translate-x-1"></span>
                        </span>

                        {/* TEXT */}
                        <span
                          className="
                          flex-1 text-[16px] leading-none
                          transition-all duration-300 ease-out
                          group-hover:-translate-x-4
                          whitespace-nowrap"
                        >
                          Read more
                        </span>

                        {/* ARROW */}
                        <span className="relative w-4 flex items-center justify-center">
                          <span
                            className="
                            w-4 absolute opacity-0 -translate-x-4
                            transition-all duration-300 ease-out
                            group-hover:opacity-100 group-hover:-translate-x-2
                          "
                          >
                            <Image
                              src={ArrowSvg}
                              width={13}
                              height={13}
                              alt="arrow"
                            />
                          </span>
                        </span>
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* LOAD MORE */}
        {hasMore && (
          <div className="flex justify-center mt-12">
            <button
              type="button"
              onClick={() => setVisibleCount((count) => count + CARDS_PER_PAGE)}
              className="
              gap-3 group relative inline-flex items-center
              rounded-sm bg-(--color-brand) px-6 py-4 text-white
              transition-all duration-300 hover:bg-(--color-brand) w-35
              overflow-hidden select-none cursor-pointer
            "
            >
              <span className="relative w-6 flex items-center justify-center">
                <span
                  className="
                  absolute h-2 w-2 rounded-full bg-(--color-mint)
                  transition-all duration-300 ease-out
                  group-hover:opacity-0 group-hover:-translate-x-1
                "
                ></span>
              </span>

              <span
                className="
                flex-1 text-[16px] leading-none
                transition-all duration-300 ease-out
                group-hover:-translate-x-4
                whitespace-nowrap
              "
              >
                Load more
              </span>

              <span className="relative w-4 flex items-center justify-center">
                <span
                  className="
                  w-4 absolute opacity-0 -translate-x-4
                  transition-all duration-300 ease-out
                  group-hover:opacity-100 group-hover:-translate-x-2
                "
                >
                  <Image src={ArrowSvg} width={13} height={13} alt="arrow" />
                </span>
              </span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
