"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const AUTO_DISMISS_MS = 6000;
const MAX_VISITS = 2;
const VISIT_COUNT_KEY = "collab-top-banner-visit-count";

export default function TopBanner({ data }) {
  const enabled = Boolean(data?.enable_popup) && Boolean(data?.popup_text);
  const [visible, setVisible] = useState(false);
  const barRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    if (!enabled) return;

    // Each page load/refresh counts as one visit for this browser session.
    // Show on the 1st and 2nd visit, stay hidden from the 3rd onward.
    const visits = Number(sessionStorage.getItem(VISIT_COUNT_KEY) || 0) + 1;
    sessionStorage.setItem(VISIT_COUNT_KEY, String(visits));
    if (visits > MAX_VISITS) return;

    setVisible(true);
    timerRef.current = setTimeout(() => setVisible(false), AUTO_DISMISS_MS);
    return () => clearTimeout(timerRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled]);

  // Push the fixed header down while the banner occupies space, and let it
  // spring back to the top as soon as the banner slides away.
  useEffect(() => {
    if (!visible || !barRef.current) {
      document.documentElement.style.setProperty("--top-banner-offset", "0px");
      return;
    }
    const el = barRef.current;
    const sync = () => {
      document.documentElement.style.setProperty("--top-banner-offset", `${el.offsetHeight}px`);
    };
    sync();
    const observer = new ResizeObserver(sync);
    observer.observe(el);
    return () => observer.disconnect();
  }, [visible]);

  function dismiss() {
    clearTimeout(timerRef.current);
    setVisible(false);
  }

  if (!enabled) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="top-banner-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          onClick={dismiss}
          className="fixed inset-0 z-70 bg-black/50 backdrop-blur-[2px]"
        />
      )}
      {visible && (
        <motion.div
          key="top-banner-bar"
          ref={barRef}
          initial={{ y: "-100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed top-0 left-0 right-0 z-80 bg-(--color-warm-stone)"
        >
          <div className="web-width mx-auto px-6 py-3 flex items-center justify-center gap-15">
            <div
              className="top-banner-text text-(--color-navy) text-sm md:text-base flex flex-wrap items-center gap-x-2"
              dangerouslySetInnerHTML={{ __html: data.popup_text }}
            />
            <button
              type="button"
              onClick={dismiss}
              aria-label="Dismiss announcement"
              className="shrink-0 text-(--color-navy)/70 hover:text-(--color-navy) transition-colors text-xl leading-none cursor-pointer"
            >
              ✕
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
