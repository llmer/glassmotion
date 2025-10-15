/**
 * GlassMotion Effect Tokens
 * Blur, opacity, shadow, and elevation values
 */

export const effects = {
  // Backdrop blur values
  blur: {
    none: '0px',
    low: '15px',
    medium: '30px',
    high: '50px',
    ultra: '80px',
  },

  // Opacity values for surfaces
  opacity: {
    disabled: 0.4,
    secondary: 0.7,
    surface: 0.75,
    overlay: 0.85,
    focused: 0.95,
  },

  // Shadow elevations
  shadow: {
    none: 'none',
    low: '0 2px 10px rgba(0, 0, 0, 0.08)',
    medium: '0 10px 30px rgba(0, 0, 0, 0.15)',
    high: '0 20px 50px rgba(0, 0, 0, 0.25)',
    ultra: '0 30px 80px rgba(0, 0, 0, 0.35)',
  },

  // Combined elevation presets (blur + shadow)
  elevation: {
    level1: {
      blur: '15px',
      shadow: '0 2px 10px rgba(0, 0, 0, 0.08)',
      opacity: 0.75,
    },
    level2: {
      blur: '25px',
      shadow: '0 10px 30px rgba(0, 0, 0, 0.12)',
      opacity: 0.80,
    },
    level3: {
      blur: '40px',
      shadow: '0 20px 50px rgba(0, 0, 0, 0.16)',
      opacity: 0.85,
    },
  },

  // Border radius values
  radius: {
    small: '8px',
    medium: '14px',
    large: '20px',
    xlarge: '28px',
    full: '9999px',
  },

  // Inner highlights for glass refraction
  highlight: {
    subtle: 'inset 0 1px 0 0 rgba(255, 255, 255, 0.1)',
    medium: 'inset 0 1px 0 0 rgba(255, 255, 255, 0.2)',
    strong: 'inset 0 2px 0 0 rgba(255, 255, 255, 0.3)',
  },
} as const

export type EffectTokens = typeof effects

// Helper to create glass surface styles
export const createGlassSurface = (
  level: keyof typeof effects.elevation = 'level1',
  tint: string = 'rgba(255, 255, 255, 0.1)'
) => ({
  backdropFilter: `blur(${effects.elevation[level].blur})`,
  backgroundColor: tint,
  boxShadow: effects.elevation[level].shadow,
  border: '1px solid rgba(255, 255, 255, 0.2)',
})
