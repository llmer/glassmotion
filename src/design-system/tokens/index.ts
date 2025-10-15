/**
 * GlassMotion Design Tokens
 * Unified export of all design system tokens
 */

export { colors, type ColorTokens } from './colors'
export { motion, createTransition, type MotionTokens } from './motion'
export { effects, createGlassSurface, type EffectTokens } from './effects'

// Import for combined object
import { colors } from './colors'
import { motion } from './motion'
import { effects } from './effects'

// Combined token object for convenience
export const tokens = {
  colors,
  motion,
  effects,
}

// Type-safe token access
export type DesignTokens = {
  colors: typeof colors
  motion: typeof motion
  effects: typeof effects
}
