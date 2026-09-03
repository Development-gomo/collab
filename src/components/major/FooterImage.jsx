"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function FooterImage({ src, className }) {
  if (!src) return null;

  return (
    <motion.div
      className={`overflow-hidden ${className || ""}`}
      initial={{ clipPath: "inset(0 0 0 100%)" }}
      whileInView={{ clipPath: "inset(0 0 0 0%)" }}
      transition={{ duration: 0.9, ease: "easeInOut" }}
      viewport={{ once: true }}
    >
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1 }}
        whileInView={{ scale: 1.08 }}
        transition={{ duration: 15, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <Image src={src} alt="" fill className="object-cover" />
      </motion.div>
    </motion.div>
  );
}
