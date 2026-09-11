// src/components/sections/Overview.jsx

"use client";

import Link from "next/link";
import Image from "next/image";
import ArrowSvg from "../../../../public/right-arrow.svg";

export default function LargeContent({ data }) {
  if (!data) return null;
  const {
    sub_heading,
    heading,
    content_section,
    cta_text,
    cta_url,
    background_image,
    background_color,
  } = data;

  const bgImageUrl = background_image?.url || "";

  return (
    <>
      <section
        className="relative"
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
          {/* SUB HEADING WITH DOT */}
          {sub_heading && (
            <div className="flex items-center gap-2 mb-2 md:mb-4">
              <span className="h-2 w-2 rounded-full bg-(--color-accent)"></span>
              <span className="subheading-label uppercase">{sub_heading}</span>
            </div>
          )}
          {heading && (
            <h2
              className="section-heading mb-6 md:mb-14"
              dangerouslySetInnerHTML={{ __html: heading }}
            />
          )}
          {content_section && (
            <div
              className="privacy-text max-w-3xl m-auto"
              dangerouslySetInnerHTML={{ __html: content_section }}
            />
          )}

          {/* CTA BUTTON */}
          {cta_text && cta_url && (
            <div className="max-w-3xl m-auto mt-6 md:mt-10">
              <Link
                href={cta_url}
                className="
                  gap-3 group relative inline-flex items-center select-none
                  rounded-sm bg-(--color-brand) px-6 py-4 text-white
                  transition-all duration-300 hover:bg-(--color-brand)
                  w-70 overflow-hidden
                "
              >
                {/* LEFT SLOT (dot area, fixed width) */}
                <span className="relative w-6 flex items-center justify-center">
                  <span
                    className="
                      absolute h-2 w-2 rounded-full bg-(--color-accent)
                      transition-all duration-300 ease-out
                      group-hover:opacity-0 group-hover:-translate-x-1
                    "
                  ></span>
                </span>

                {/* TEXT (slides left on hover) */}
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

                {/* RIGHT SLOT (arrow area, fixed width) */}
                <span className="relative w-4 flex items-center justify-center">
                  <span
                    className="
                      w-4 absolute text-[16px]
                      opacity-0 -translate-x-4
                      transition-all duration-300 ease-out
                      group-hover:opacity-100 group-hover:-translate-x-2
                    "
                  >
                    <Image src={ArrowSvg} alt="arrow" width={13} height={13} />
                  </span>
                </span>
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
