/**
 * Premium luxury motion tokens — ElevenLabs editorial
 * Easing: cubic 0.22,1,0.36,1 (luxury-out), no bounce/back
 */
export const TRANSITION = {
  luxury: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  slow: { duration: 1.0, ease: [0.22, 1, 0.36, 1] as const },
  subtle: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
} as const;

export const VIEWPORT = {
  once: true,
  amount: 0.2,
  margin: "0px 0px -10% 0px",
} as const;

export const REVEAL = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: TRANSITION.luxury },
} as const;
