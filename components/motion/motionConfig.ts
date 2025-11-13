// src/components/motion/motionConfig.ts
"use client";

import type { Transition, TargetAndTransition, Variants } from "framer-motion";

export const springMain: Transition = { type: "spring", stiffness: 420, damping: 38, mass: 0.9 };
export const springHover: Transition = { type: "spring", stiffness: 600, damping: 30 };

export const getPos = (i: number, current: number, total: number) => {
  const raw = (i - current + total) % total;
  return raw <= 2 ? raw : 3; // 0 = front, 1/2 = behind, 3 = hidden
};

// export const resolveForPos = (pos: number): TargetAndTransition => {
//   const conf =
//     [
//       { x: 0, y: 0, scale: 1.0, rotateY: 0, opacity: 1, zIndex: 30 },      // front
//       { x: 24, y: 10, scale: 0.95, rotateY: -16, opacity: 0.88, zIndex: 20 }, // mid-back
//       { x: 36, y: 18, scale: 0.9, rotateY: 16, opacity: 0.72, zIndex: 10 },  // far-back
//       { x: 0, y: 0, scale: 0.9, rotateY: 0, opacity: 0, zIndex: 0 },      // hidden
//     ][pos] || { x: 0, y: 0, scale: 0.9, rotateY: 0, opacity: 0, zIndex: 0 };

//   return { ...conf, transition: springMain };
// };

// Looks like a true stack under a parent with `perspective` and `transformStyle: "preserve-3d"`
export const resolveForPos = (pos: number): TargetAndTransition => {
  // 0 = front, 1 = mid-back, 2 = far-back, 3 = hidden
  const conf =
    [
      // Front: full size, on top, nearest to viewer
      { x: 0,  y: 0,  z: 0,    scale: 1.0,  rotateX: -2, rotateY: 0,   opacity: 1,    zIndex: 30 },
      // Mid-back: small down-left offset, slight tilt, pushed back in Z
      { x: -14, y: 12, z: -60, scale: 0.96, rotateX: -10, rotateY: -6,  opacity: 0.9,  zIndex: 20 },
      // Far-back: a bit more offset, more Z depth, slightly stronger tilt
      { x: -28, y: 22, z: -120, scale: 0.92, rotateX: -2, rotateY: -10, opacity: 0.78, zIndex: 10 },
      // Hidden: out of flow
      { x: 0,  y: 0,  z: -160, scale: 0.9,  rotateX: -2, rotateY: 0,   opacity: 0,    zIndex: 0 },
    ][pos] || { x: 0, y: 0, z: -160, scale: 0.9, rotateX: -2, rotateY: 0, opacity: 0, zIndex: 0 };

  return { ...conf, transition: springMain };
};



export const cardAnim = {
  target: (custom: { pos: number }) => resolveForPos(custom.pos),
  hover: (custom: { pos: number }): TargetAndTransition =>
    custom.pos === 0 ? { y: -2, scale: 1.01, transition: springHover } : {},
} satisfies Variants;
