"use client";

import Link from "next/link";
import Image from "next/image";
import ArrowSvg from "../../../../public/right-arrow.svg";

export default function ContentSection({ data }) {
  if (!data) return null;

  const {
    sub_heading,
    heading,
    short_text,
    cta_text,
    cta_url,
    image_position,
    background_color,
  } = data;

  const sectionImageUrl = data?.section_image?.url || "";
  const bgImageUrl = data?.background_image?.url || "";
  const isImageLeft = image_position?.toLowerCase() === "left";

  return (
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
        <div className="flex flex-col lg:flex-row lg:gap-16 xl:gap-24 items-center">
          {/* IMAGE */}
          {sectionImageUrl && (
            <div
              className={`relative w-full h-[280px] lg:h-[480px] lg:w-1/2 mb-8 lg:mb-0 overflow-hidden rounded-sm ${
                isImageLeft ? "order-1 lg:order-1" : "order-1 lg:order-2"
              }`}
            >
              <Image
                src={sectionImageUrl}
                alt=""
                fill
                className="object-cover"
              />
            </div>
          )}

          {/* CONTENT */}
          <div
            className={`w-full ${sectionImageUrl ? "lg:w-1/2" : ""} ${
              isImageLeft ? "order-2 lg:order-2" : "order-2 lg:order-1"
            }`}
          >
            {/* SUB HEADING */}
            {sub_heading && (
              <div className="flex items-center gap-2 mb-2 md:mb-4">
                <span className="h-2 w-2 rounded-full bg-(--color-accent)"></span>
                <span className="subheading-label uppercase">{sub_heading}</span>
              </div>
            )}

            {/* HEADING */}
            {heading && (
              <h2
                className="section-heading mb-6 md:mb-8"
                dangerouslySetInnerHTML={{ __html: heading }}
              />
            )}

            {/* SHORT TEXT */}
            {short_text && (
              <div
                className="body-text max-w-150 mb-6 md:mb-8"
                dangerouslySetInnerHTML={{ __html: short_text }}
              />
            )}

            {/* CTA BUTTON */}
            {cta_text && cta_url && (
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
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
