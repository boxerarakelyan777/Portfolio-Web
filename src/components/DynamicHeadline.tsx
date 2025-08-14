"use client";

import { useCallback, useEffect, useState } from "react";
import type { CSSProperties } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import clsx from "classnames";

import styles from "./DynamicHeadline.module.scss";

interface DynamicHeadlineProps {
  /** Words to cycle through */
  words: string[];
  /** Time in ms each word is displayed */
  interval?: number;
  /** Intensity multiplier for glitch effect (0 disables) */
  glitchIntensity?: number;
  /** Force disable glitches, useful for low power devices */
  disableGlitch?: boolean;
}

export const DynamicHeadline: React.FC<DynamicHeadlineProps> = ({
  words,
  interval = 3000,
  glitchIntensity = 1,
  disableGlitch = false,
}) => {
  const prefersReducedMotion = useReducedMotion();
  const shouldGlitch = !disableGlitch && !prefersReducedMotion && glitchIntensity > 0;

  const [index, setIndex] = useState(0);
  const [glitch, setGlitch] = useState(false);

  const triggerGlitch = useCallback(() => {
    if (!shouldGlitch) return;
    setGlitch(true);
    setTimeout(() => setGlitch(false), 300);
  }, [shouldGlitch]);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % words.length);
      triggerGlitch();
    }, interval);
    return () => clearInterval(timer);
  }, [interval, triggerGlitch, words.length]);

  const currentWord = words[index];

  return (
    <span
      className={clsx(styles.glitch, glitch && styles.glitchActive)}
      data-text={currentWord}
      style={{ "--glitch-intensity": glitchIntensity } as CSSProperties}
    >
      <AnimatePresence mode="wait" initial={false} onExitComplete={triggerGlitch}>
        <motion.span
          key={currentWord}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
        >
          {currentWord}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};