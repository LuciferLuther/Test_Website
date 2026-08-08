"use client";

import type { HTMLMotionProps } from "motion/react";
import { motion } from "motion/react";

interface RevealProps extends HTMLMotionProps<"div"> {
  delay?: number;
  distance?: number;
}

export function Reveal({ children, delay: _delay, distance: _distance, ...props }: RevealProps) {
  void _delay;
  void _distance;
  return <motion.div {...props}>{children}</motion.div>;
}
