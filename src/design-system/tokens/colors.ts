/**
 * GlassMotion Color Tokens
 * Tint palettes and adaptive text colors
 */

export const colors = {
  // Tint system - base accent colors
  tint: {
    // Default accent color (can be customized per theme)
    base: 'var(--accent, #007AFF)',
    light: 'color-mix(in srgb, var(--accent, #007AFF) 60%, white 40%)',
    dark: 'color-mix(in srgb, var(--accent, #007AFF) 60%, black 40%)',
  },

  // Adaptive text colors with contrast ratios
  text: {
    primary: {
      light: 'rgba(0, 0, 0, 0.90)',
      dark: 'rgba(255, 255, 255, 0.90)',
    },
    secondary: {
      light: 'rgba(0, 0, 0, 0.63)', // 70% of primary
      dark: 'rgba(255, 255, 255, 0.63)',
    },
    disabled: {
      light: 'rgba(0, 0, 0, 0.36)', // 40% of primary
      dark: 'rgba(255, 255, 255, 0.36)',
    },
  },

  // Glass surface tints
  glass: {
    light: {
      base: 'rgba(255, 255, 255, 0.15)',
      overlay: 'rgba(255, 255, 255, 0.25)',
      focus: 'rgba(255, 255, 255, 0.35)',
    },
    dark: {
      base: 'rgba(255, 255, 255, 0.10)',
      overlay: 'rgba(255, 255, 255, 0.15)',
      focus: 'rgba(255, 255, 255, 0.25)',
    },
  },

  // Border colors for glass surfaces
  border: {
    light: 'rgba(255, 255, 255, 0.20)',
    dark: 'rgba(255, 255, 255, 0.15)',
  },
} as const

export type ColorTokens = typeof colors
