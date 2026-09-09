"use client";

import { useState } from "react";
import Image from "next/image";
import PlusIcon from "../../../../public/plus-light.svg";

export default function Faq({ data }) {
  const {
    sub_heading,
    heading,
    short_text,
    section_image,
    faq_position,
    background_image,
    background_color,
  } = data;
  const faqs = Array.isArray(data?.faqs) ? data.faqs : [];
  const [openIndex, setOpenIndex] = useState(0); // first open by default

  const toggle = (index) => {
    setOpenIndex(index === openIndex ? null : index);
  };

  const sectionImageUrl = section_image?.url || "";
  const bgImageUrl = background_image?.url || "";
  const isImageLeft = faq_position?.toLowerCase() === "left";

  return (
    <section
      className={`relative ${bgImageUrl ? "" : "bg-(--color-brand)"}`}
      style={!bgImageUrl && background_color ? { backgroundColor: background_color } : undefined}
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
          <div
            className="absolute inset-0"
            style={{ backgroundColor: background_color || "rgba(0,0,0,0.6)" }}
          />
        </div>
      )}

      <div className="web-width px-6 py-15 md:py-30">
        {/* SUB HEADING */}
        {sub_heading && (
          <div className="flex items-center gap-2 mb-4">
            <span className="h-2 w-2 rounded-full bg-(--color-accent)" />
            <span className="subheading-label">{sub_heading}</span>
          </div>
        )}

        {/* MAIN HEADING */}
        {heading && (
          <h2
            className="section-heading mb-8 md:mb-14"
            dangerouslySetInnerHTML={{ __html: heading }}
          />
        )}

        {/* SHORT TEXT */}
        {short_text && (
          <div
            className="mb-8 md:mb-14"
            dangerouslySetInnerHTML={{ __html: short_text }}
          />
        )}

        <div className="flex flex-col lg:flex-row lg:gap-16 xl:gap-24">
          {/* IMAGE */}
          {sectionImageUrl && (
            <div
              className={`relative w-full h-[280px] lg:h-auto lg:w-1/2 mb-8 lg:mb-0 overflow-hidden rounded-sm ${
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

          {/* FAQ LIST */}
          <div
            className={`w-full ${sectionImageUrl ? "lg:w-1/2" : ""} ${
              isImageLeft ? "order-2 lg:order-2" : "order-2 lg:order-1"
            }`}
          >
            <div className="divide-y divide-[#91929f4d] border-t border-[#91929f4d]">
              {faqs.map((faq, index) => {
                const isOpen = openIndex === index;

                return (
                  <div key={index} className="py-6 md:py-8 [&:nth-last-child(1)]:pb-0">
                    <button
                      onClick={() => toggle(index)}
                      className="w-full flex items-center gap-4 md:gap-10 text-left cursor-pointer"
                    >
                      {/* NUMBER */}
                      <span className="text-[var(--color-teracotta)] text-sm md:text-base min-w-[30px] pt-1">
                        ({String(index + 1).padStart(2, "0")})
                      </span>

                      {/* QUESTION */}
                      <span className="flex-1 content-heading">
                        {faq.question}
                      </span>

                      {/* ICON */}
                      <span className="text-[16px] leading-none">
                        <Image
                          src={PlusIcon}
                          alt="toggle icon"
                          width={16}
                          height={16}
                          className={`transition-transform duration-300 brightness-0 ${
                            isOpen ? "rotate-45" : ""
                          }`}
                        />
                      </span>
                    </button>

                    {/* ANSWER */}
                    {isOpen && (
                      <div className="ml-14 md:ml-[75px] mt-6 max-w-[1104px] ">
                        <div dangerouslySetInnerHTML={{ __html: faq.answers }} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
