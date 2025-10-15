/**
 * Color Mixing Utilities
 * CSS color-mix() helpers for glass tinting
 */

export type ColorFormat = 'rgb' | 'hsl' | 'oklch'

/**
 * Generate CSS color-mix() string
 * @example colorMix('#007AFF', 'white', 40) => "color-mix(in srgb, #007AFF 60%, white 40%)"
 */
export function colorMix(
  color1: string,
  color2: string,
  color2Percentage: number,
  colorSpace: 'srgb' | 'oklch' | 'hsl' = 'srgb'
): string {
  const color1Percentage = 100 - color2Percentage
  return `color-mix(in ${colorSpace}, ${color1} ${color1Percentage}%, ${color2} ${color2Percentage}%)`
}

/**
 * Create tint palette from base color
 */
export function createTintPalette(baseColor: string) {
  return {
    base: baseColor,
    light: colorMix(baseColor, 'white', 40),
    dark: colorMix(baseColor, 'black', 40),
    ultraLight: colorMix(baseColor, 'white', 60),
    ultraDark: colorMix(baseColor, 'black', 60),
  }
}

/**
 * Create glass tint with accent color
 */
export function createGlassTint(
  accentColor: string,
  _baseOpacity: number = 0.15,
  isDarkMode: boolean = false
): string {
  const baseColor = isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.15)'
  return colorMix(accentColor, baseColor, 85)
}

/**
 * Generate button background with glass effect
 */
export function createGlassButtonBg(
  accentColor: string,
  intensity: number = 15,
  isDarkMode: boolean = false
): string {
  const glassTint = isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.15)'
  return colorMix(accentColor, glassTint, 100 - intensity)
}

/**
 * Lighten a color by mixing with white
 */
export function lighten(color: string, amount: number): string {
  return colorMix(color, 'white', amount)
}

/**
 * Darken a color by mixing with black
 */
export function darken(color: string, amount: number): string {
  return colorMix(color, 'black', amount)
}

/**
 * Add transparency to a color
 */
export function fade(color: string, opacity: number): string {
  return colorMix(color, 'transparent', 100 - opacity * 100)
}

/**
 * Convert hex color to rgba string
 */
export function hexToRgba(hex: string, alpha: number = 1): string {
  const cleanHex = hex.replace('#', '')
  const r = parseInt(cleanHex.slice(0, 2), 16)
  const g = parseInt(cleanHex.slice(2, 4), 16)
  const b = parseInt(cleanHex.slice(4, 6), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}
