/**
 * Chromatic Aberration Text Effects
 * RGB channel separation for optical text effects
 */

export type ChromaticIntensity = 'subtle' | 'medium' | 'strong'
export type ChromaticDirection = 'horizontal' | 'vertical' | 'diagonal'

export interface ChromaticTextConfig {
  intensity?: ChromaticIntensity
  direction?: ChromaticDirection
  hoverEffect?: boolean
  customColors?: {
    negative: string // Left/top color (default: red/magenta)
    positive: string // Right/bottom color (default: cyan)
  }
  offset?: number // Custom pixel offset
}

/**
 * Generate text-shadow value for chromatic aberration
 */
export function generateChromaticTextShadow(config: ChromaticTextConfig): string {
  const {
    intensity = 'medium',
    direction = 'horizontal',
    customColors,
    offset
  } = config

  // Default offset values based on intensity
  const intensityMap: Record<ChromaticIntensity, number> = {
    subtle: 2,
    medium: 3,
    strong: 5
  }

  const pixelOffset = offset ?? intensityMap[intensity]

  // Default colors - balanced opacity for visibility and readability
  const negativeColor = customColors?.negative ?? 'rgba(255, 0, 0, 0.6)'
  const positiveColor = customColors?.positive ?? 'rgba(0, 255, 255, 0.6)'

  // Generate shadow based on direction
  switch (direction) {
    case 'horizontal':
      return `${-pixelOffset}px 0 0 ${negativeColor}, ${pixelOffset}px 0 0 ${positiveColor}`

    case 'vertical':
      return `0 ${-pixelOffset}px 0 ${negativeColor}, 0 ${pixelOffset}px 0 ${positiveColor}`

    case 'diagonal':
      return `${-pixelOffset}px ${-pixelOffset}px 0 ${negativeColor}, ${pixelOffset}px ${pixelOffset}px 0 ${positiveColor}`

    default:
      return `${-pixelOffset}px 0 0 ${negativeColor}, ${pixelOffset}px 0 0 ${positiveColor}`
  }
}

/**
 * Get CSS class name for chromatic text effect
 */
export function getChromaticClassName(config: ChromaticTextConfig): string {
  const { intensity = 'medium', direction = 'horizontal', hoverEffect = false } = config

  const classes: string[] = []

  // Add base chromatic class
  if (direction === 'horizontal') {
    classes.push(`text-chromatic-${intensity}`)
  } else if (direction === 'vertical') {
    classes.push('text-chromatic-vertical')
  } else if (direction === 'diagonal') {
    classes.push('text-chromatic-diagonal')
  }

  // Add hover effect if enabled
  if (hoverEffect) {
    classes.push('text-chromatic-hover')
  }

  return classes.join(' ')
}

/**
 * Preset chromatic text configurations
 */
export const chromaticTextPresets = {
  logo: {
    intensity: 'medium' as ChromaticIntensity,
    direction: 'horizontal' as ChromaticDirection,
    hoverEffect: true
  },
  heading: {
    intensity: 'subtle' as ChromaticIntensity,
    direction: 'horizontal' as ChromaticDirection,
    hoverEffect: false
  },
  accent: {
    intensity: 'strong' as ChromaticIntensity,
    direction: 'diagonal' as ChromaticDirection,
    hoverEffect: true
  },
  minimal: {
    intensity: 'subtle' as ChromaticIntensity,
    direction: 'horizontal' as ChromaticDirection,
    hoverEffect: false
  }
} as const
