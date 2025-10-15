/**
 * Glass Optic Effects
 * Chromatic aberration, color filters, and advanced optics
 */

export type OpticEffect =
  | 'chromatic-horizontal'
  | 'chromatic-vertical'
  | 'chromatic-radial'
  | 'color-shift'
  | 'rainbow'
  | 'duotone'
  | 'blur-edges'

export interface ChromaticAberrationConfig {
  strength?: number // 1-10 pixels
  direction?: 'horizontal' | 'vertical' | 'radial'
  channels?: {
    red?: { x: number; y: number }
    green?: { x: number; y: number }
    blue?: { x: number; y: number }
  }
}

export interface ColorFilterConfig {
  hue?: number // 0-360 degrees
  saturation?: number // 0-2 (1 = normal)
  brightness?: number // 0-2 (1 = normal)
  contrast?: number // 0-2 (1 = normal)
  invert?: boolean
}

export interface OpticConfig {
  effect: OpticEffect
  chromatic?: ChromaticAberrationConfig
  colorFilter?: ColorFilterConfig
  intensity?: number // 0-1 overall effect intensity
}

/**
 * Generate SVG filter ID for chromatic aberration
 */
export function generateChromaticAberrationFilter(
  id: string,
  config: ChromaticAberrationConfig
): string {
  const { strength = 3, direction = 'horizontal', channels } = config

  let redOffset = { x: 0, y: 0 }
  let greenOffset = { x: 0, y: 0 }
  let blueOffset = { x: 0, y: 0 }

  if (channels) {
    redOffset = channels.red || redOffset
    greenOffset = channels.green || greenOffset
    blueOffset = channels.blue || blueOffset
  } else {
    // Auto-calculate offsets based on direction
    switch (direction) {
      case 'horizontal':
        redOffset = { x: -strength, y: 0 }
        blueOffset = { x: strength, y: 0 }
        break
      case 'vertical':
        redOffset = { x: 0, y: -strength }
        blueOffset = { x: 0, y: strength }
        break
      case 'radial':
        redOffset = { x: -strength * 0.7, y: -strength * 0.7 }
        blueOffset = { x: strength * 0.7, y: strength * 0.7 }
        break
    }
  }

  return `
    <svg width="0" height="0" style="position: absolute;">
      <defs>
        <filter id="${id}" x="-20%" y="-20%" width="140%" height="140%" filterUnits="objectBoundingBox" color-interpolation-filters="sRGB">
          <!-- Separate RGB channels -->
          <feColorMatrix type="matrix" values="
            1 0 0 0 0
            0 0 0 0 0
            0 0 0 0 0
            0 0 0 1 0" result="red"/>

          <feColorMatrix type="matrix" values="
            0 0 0 0 0
            0 1 0 0 0
            0 0 0 0 0
            0 0 0 1 0" result="green"/>

          <feColorMatrix type="matrix" values="
            0 0 0 0 0
            0 0 0 0 0
            0 0 1 0 0
            0 0 0 1 0" result="blue"/>

          <!-- Offset each channel -->
          <feOffset in="red" dx="${redOffset.x}" dy="${redOffset.y}" result="redOffset"/>
          <feOffset in="green" dx="${greenOffset.x}" dy="${greenOffset.y}" result="greenOffset"/>
          <feOffset in="blue" dx="${blueOffset.x}" dy="${blueOffset.y}" result="blueOffset"/>

          <!-- Combine channels -->
          <feBlend mode="screen" in="redOffset" in2="greenOffset" result="rg"/>
          <feBlend mode="screen" in="rg" in2="blueOffset"/>
        </filter>
      </defs>
    </svg>
  `
}

/**
 * Generate CSS filter for color effects
 */
export function generateColorFilter(config: ColorFilterConfig): string {
  const {
    hue = 0,
    saturation = 1,
    brightness = 1,
    contrast = 1,
    invert = false
  } = config

  const filters: string[] = []

  if (hue !== 0) filters.push(`hue-rotate(${hue}deg)`)
  if (saturation !== 1) filters.push(`saturate(${saturation})`)
  if (brightness !== 1) filters.push(`brightness(${brightness})`)
  if (contrast !== 1) filters.push(`contrast(${contrast})`)
  if (invert) filters.push('invert(1)')

  return filters.join(' ')
}

/**
 * Generate complete optic effect configuration
 */
export function generateOpticEffect(config: OpticConfig): {
  svgFilter?: string
  cssFilter?: string
  filterId?: string
} {
  const { effect, chromatic, colorFilter, intensity = 1 } = config

  switch (effect) {
    case 'chromatic-horizontal':
    case 'chromatic-vertical':
    case 'chromatic-radial': {
      const direction = effect.replace('chromatic-', '') as 'horizontal' | 'vertical' | 'radial'
      const filterId = `chromatic-${direction}-${Math.random().toString(36).substr(2, 9)}`
      const chromaticConfig = chromatic || { strength: 8 * intensity, direction }

      return {
        svgFilter: generateChromaticAberrationFilter(filterId, chromaticConfig),
        filterId
      }
    }

    case 'color-shift':
      return {
        cssFilter: generateColorFilter({
          hue: 30 * intensity,
          saturation: 1 + (0.2 * intensity),
          ...colorFilter
        })
      }

    case 'rainbow':
      return {
        cssFilter: generateColorFilter({
          hue: 180 * intensity,
          saturation: 1.5,
          ...colorFilter
        })
      }

    case 'duotone': {
      // Duotone effect using CSS filters
      const hue = colorFilter?.hue || 220
      return {
        cssFilter: `grayscale(1) sepia(1) hue-rotate(${hue}deg) saturate(3) contrast(0.8) brightness(${0.9 + (0.1 * intensity)})`
      }
    }

    case 'blur-edges': {
      const filterId = `blur-edges-${Math.random().toString(36).substr(2, 9)}`
      const blurAmount = 5 * intensity

      return {
        svgFilter: `
          <svg width="0" height="0" style="position: absolute;">
            <defs>
              <filter id="${filterId}" x="-20%" y="-20%" width="140%" height="140%" filterUnits="objectBoundingBox">
                <feGaussianBlur in="SourceGraphic" stdDeviation="${blurAmount}" />
                <feComponentTransfer>
                  <feFuncA type="table" tableValues="0 0 1 1"/>
                </feComponentTransfer>
              </filter>
            </defs>
          </svg>
        `,
        filterId
      }
    }

    default:
      return {}
  }
}

/**
 * Preset optic effect configurations
 */
export const opticPresets = {
  'chromatic-subtle': {
    effect: 'chromatic-horizontal' as OpticEffect,
    intensity: 0.5,
    chromatic: {
      strength: 6,
      direction: 'horizontal' as const
    }
  },
  'chromatic-strong': {
    effect: 'chromatic-horizontal' as OpticEffect,
    intensity: 1,
    chromatic: {
      strength: 12,
      direction: 'horizontal' as const
    }
  },
  'color-warm': {
    effect: 'color-shift' as OpticEffect,
    intensity: 1,
    colorFilter: {
      hue: 15,
      saturation: 1.1,
      brightness: 1.05
    }
  },
  'color-cool': {
    effect: 'color-shift' as OpticEffect,
    intensity: 1,
    colorFilter: {
      hue: 200,
      saturation: 1.1,
      brightness: 0.95
    }
  },
  rainbow: {
    effect: 'rainbow' as OpticEffect,
    intensity: 0.7
  },
  'duotone-purple': {
    effect: 'duotone' as OpticEffect,
    intensity: 1,
    colorFilter: {
      hue: 270
    }
  }
} as const
