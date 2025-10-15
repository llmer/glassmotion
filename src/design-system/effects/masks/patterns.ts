/**
 * Glass Mask Patterns
 * Preset mask patterns for etching effects
 */

export type MaskPattern =
  | 'lines-horizontal'
  | 'lines-vertical'
  | 'lines-diagonal'
  | 'dots'
  | 'grid'
  | 'radial'
  | 'gradient-top'
  | 'gradient-bottom'
  | 'gradient-radial'
  | 'noise'

export interface MaskConfig {
  pattern: MaskPattern | string // string for custom SVG
  intensity?: number // 0-1
  scale?: number // pattern size multiplier
  angle?: number // rotation in degrees
  blend?: 'multiply' | 'screen' | 'overlay' | 'darken' | 'lighten'
}

/**
 * Generate CSS mask-image from pattern config
 */
export function generateMaskPattern(config: MaskConfig): string {
  const { pattern, intensity = 0.3, scale = 1, angle = 0 } = config

  switch (pattern) {
    case 'lines-horizontal':
      return `repeating-linear-gradient(
        0deg,
        rgba(0, 0, 0, ${1 - intensity}) 0px,
        rgba(0, 0, 0, ${1 - intensity}) ${2 * scale}px,
        transparent ${2 * scale}px,
        transparent ${4 * scale}px
      )`

    case 'lines-vertical':
      return `repeating-linear-gradient(
        90deg,
        rgba(0, 0, 0, ${1 - intensity}) 0px,
        rgba(0, 0, 0, ${1 - intensity}) ${2 * scale}px,
        transparent ${2 * scale}px,
        transparent ${4 * scale}px
      )`

    case 'lines-diagonal':
      return `repeating-linear-gradient(
        ${angle}deg,
        rgba(0, 0, 0, ${1 - intensity}) 0px,
        rgba(0, 0, 0, ${1 - intensity}) ${2 * scale}px,
        transparent ${2 * scale}px,
        transparent ${4 * scale}px
      )`

    case 'dots':
      // Create repeating dots using radial gradient
      // This creates dots that repeat, not a single dot
      const dotSize = 20 * scale
      const dotRadius = dotSize * 0.4
      return `radial-gradient(
        circle at center,
        rgba(0, 0, 0, ${1 - intensity}) ${dotRadius}px,
        transparent ${dotRadius}px
      )`

    case 'grid':
      // Create a grid pattern using two perpendicular repeating gradients
      const gridSize = 20 * scale
      return `repeating-linear-gradient(0deg, rgba(0, 0, 0, ${1 - intensity}) 0px, rgba(0, 0, 0, ${1 - intensity}) 1px, transparent 1px, transparent ${gridSize}px), repeating-linear-gradient(90deg, rgba(0, 0, 0, ${1 - intensity}) 0px, rgba(0, 0, 0, ${1 - intensity}) 1px, transparent 1px, transparent ${gridSize}px)`

    case 'radial':
      return `radial-gradient(
        circle at center,
        transparent 0%,
        transparent ${30 * scale}%,
        rgba(0, 0, 0, ${intensity}) 100%
      )`

    case 'gradient-top':
      return `linear-gradient(
        180deg,
        rgba(0, 0, 0, ${intensity}) 0%,
        transparent ${50 * scale}%
      )`

    case 'gradient-bottom':
      return `linear-gradient(
        0deg,
        rgba(0, 0, 0, ${intensity}) 0%,
        transparent ${50 * scale}%
      )`

    case 'gradient-radial':
      return `radial-gradient(
        circle at center,
        rgba(0, 0, 0, 0) 0%,
        rgba(0, 0, 0, ${intensity}) 100%
      )`

    case 'noise':
      // Create noise-like effect using multiple layered gradients
      // This creates a dithered/grainy appearance
      const noiseSize = 3 * scale
      return `repeating-linear-gradient(45deg, rgba(0, 0, 0, ${1 - intensity}) 0px, rgba(0, 0, 0, ${1 - intensity}) ${noiseSize}px, transparent ${noiseSize}px, transparent ${noiseSize * 2}px), repeating-linear-gradient(-45deg, rgba(0, 0, 0, ${1 - intensity * 0.8}) 0px, rgba(0, 0, 0, ${1 - intensity * 0.8}) ${noiseSize}px, transparent ${noiseSize}px, transparent ${noiseSize * 2}px)`

    default:
      // Custom SVG pattern
      if (pattern.startsWith('url(') || pattern.startsWith('data:')) {
        return pattern
      }
      return 'none'
  }
}

/**
 * Compose multiple masks using mask-composite
 */
export function composeMasks(masks: MaskConfig[]): {
  maskImage: string
  maskSize: string
  maskRepeat: string
  maskComposite: string
} {
  const maskImages = masks.map(m => generateMaskPattern(m)).join(', ')
  const maskSizes = masks.map(m => {
    const scale = m.scale || 1
    // Set appropriate sizes for repeating patterns
    if (m.pattern === 'dots') return `${20 * scale}px ${20 * scale}px`
    if (m.pattern === 'grid') return 'auto'
    if (m.pattern.includes('lines')) return 'auto'
    if (m.pattern === 'noise') return 'auto'
    return 'cover'
  }).join(', ')
  const maskRepeats = masks.map(m =>
    ['dots', 'grid', 'noise'].includes(m.pattern) || m.pattern.includes('lines') ? 'repeat' : 'no-repeat'
  ).join(', ')
  const maskComposites = masks.slice(1).map(m => m.blend || 'intersect').join(', ')

  return {
    maskImage: maskImages,
    maskSize: maskSizes,
    maskRepeat: maskRepeats,
    maskComposite: maskComposites
  }
}

/**
 * Preset mask configurations
 */
export const maskPresets = {
  subtle: {
    pattern: 'gradient-radial' as MaskPattern,
    intensity: 0.1,
    scale: 1
  },
  lines: {
    pattern: 'lines-diagonal' as MaskPattern,
    intensity: 0.2,
    scale: 1,
    angle: 45
  },
  grid: {
    pattern: 'grid' as MaskPattern,
    intensity: 0.15,
    scale: 1
  },
  dots: {
    pattern: 'dots' as MaskPattern,
    intensity: 0.2,
    scale: 1
  },
  vignette: {
    pattern: 'gradient-radial' as MaskPattern,
    intensity: 0.3,
    scale: 1.5
  }
} as const
