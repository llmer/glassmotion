/**
 * Glass Overlay Patterns
 * Light-blocking overlays with blend modes
 */

export type OverlayPattern =
  | 'vignette'
  | 'spotlight'
  | 'gradient-top'
  | 'gradient-bottom'
  | 'gradient-left'
  | 'gradient-right'
  | 'gradient-radial'
  | 'gradient-diagonal'
  | 'noise'
  | 'frosted'

export interface OverlayConfig {
  pattern: OverlayPattern | string
  intensity?: number // 0-1
  color?: string // Color for tinted overlays
  blend?: 'multiply' | 'screen' | 'overlay' | 'darken' | 'lighten' | 'soft-light' | 'hard-light'
  position?: { x: number; y: number } // 0-100% for spotlight position
}

/**
 * Generate overlay background and blend mode
 */
export function generateOverlayPattern(config: OverlayConfig): {
  background: string
  mixBlendMode: string
  opacity: number
} {
  const {
    pattern,
    intensity = 0.3,
    color = 'rgba(0, 0, 0, 1)',
    blend = 'multiply',
    position = { x: 50, y: 50 }
  } = config

  let background = ''

  switch (pattern) {
    case 'vignette':
      background = `radial-gradient(
        circle at center,
        transparent 0%,
        transparent 40%,
        ${color} 100%
      )`
      break

    case 'spotlight':
      background = `radial-gradient(
        circle at ${position.x}% ${position.y}%,
        transparent 0%,
        transparent 30%,
        ${color} 100%
      )`
      break

    case 'gradient-top':
      background = `linear-gradient(
        180deg,
        ${color} 0%,
        transparent 100%
      )`
      break

    case 'gradient-bottom':
      background = `linear-gradient(
        0deg,
        ${color} 0%,
        transparent 100%
      )`
      break

    case 'gradient-left':
      background = `linear-gradient(
        90deg,
        ${color} 0%,
        transparent 100%
      )`
      break

    case 'gradient-right':
      background = `linear-gradient(
        270deg,
        ${color} 0%,
        transparent 100%
      )`
      break

    case 'gradient-radial':
      background = `radial-gradient(
        circle at center,
        transparent 0%,
        ${color} 100%
      )`
      break

    case 'gradient-diagonal':
      background = `linear-gradient(
        135deg,
        ${color} 0%,
        transparent 50%,
        ${color} 100%
      )`
      break

    case 'noise':
      background = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' fill='${encodeURIComponent(color)}'/%3E%3C/svg%3E")`
      break

    case 'frosted':
      // Frosted glass effect with subtle noise
      background = `
        linear-gradient(135deg, ${color} 0%, transparent 50%, ${color} 100%),
        url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E")
      `
      break

    default:
      // Custom pattern
      if (pattern.startsWith('linear-gradient') || pattern.startsWith('radial-gradient') || pattern.startsWith('url(')) {
        background = pattern
      } else {
        background = color
      }
  }

  return {
    background,
    mixBlendMode: blend,
    opacity: intensity
  }
}

/**
 * Preset overlay configurations
 */
export const overlayPresets = {
  vignette: {
    pattern: 'vignette' as OverlayPattern,
    intensity: 0.3,
    color: 'rgba(0, 0, 0, 1)',
    blend: 'multiply' as const
  },
  spotlight: {
    pattern: 'spotlight' as OverlayPattern,
    intensity: 0.5,
    color: 'rgba(0, 0, 0, 1)',
    blend: 'multiply' as const,
    position: { x: 50, y: 30 }
  },
  'gradient-fade': {
    pattern: 'gradient-top' as OverlayPattern,
    intensity: 0.2,
    color: 'rgba(0, 0, 0, 1)',
    blend: 'multiply' as const
  },
  frosted: {
    pattern: 'frosted' as OverlayPattern,
    intensity: 0.15,
    color: 'rgba(255, 255, 255, 0.5)',
    blend: 'overlay' as const
  },
  'color-tint': {
    pattern: 'gradient-radial' as OverlayPattern,
    intensity: 0.2,
    color: 'rgba(147, 51, 234, 0.3)', // purple tint
    blend: 'overlay' as const
  }
} as const
