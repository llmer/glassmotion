/**
 * Adaptive Contrast Utilities
 * Automatically adjust text color based on background luminance
 */

/**
 * Convert RGB to relative luminance using WCAG formula
 * @see https://www.w3.org/TR/WCAG20/#relativeluminancedef
 */
function getLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    const val = c / 255
    return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4)
  })
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs
}

/**
 * Calculate contrast ratio between two colors
 * @see https://www.w3.org/TR/WCAG20/#contrast-ratiodef
 */
export function getContrastRatio(
  foreground: [number, number, number],
  background: [number, number, number]
): number {
  const l1 = getLuminance(...foreground)
  const l2 = getLuminance(...background)
  const lighter = Math.max(l1, l2)
  const darker = Math.min(l1, l2)
  return (lighter + 0.05) / (darker + 0.05)
}

/**
 * Parse CSS color string to RGB values
 */
export function parseColor(color: string): [number, number, number] | null {
  // Handle hex colors
  if (color.startsWith('#')) {
    const hex = color.slice(1)
    if (hex.length === 3) {
      return [
        parseInt(hex[0] + hex[0], 16),
        parseInt(hex[1] + hex[1], 16),
        parseInt(hex[2] + hex[2], 16),
      ]
    }
    if (hex.length === 6) {
      return [
        parseInt(hex.slice(0, 2), 16),
        parseInt(hex.slice(2, 4), 16),
        parseInt(hex.slice(4, 6), 16),
      ]
    }
  }

  // Handle rgb/rgba colors
  const rgbMatch = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/)
  if (rgbMatch) {
    return [parseInt(rgbMatch[1]), parseInt(rgbMatch[2]), parseInt(rgbMatch[3])]
  }

  return null
}

/**
 * Get adaptive text color based on background color
 * Ensures minimum WCAG AA contrast ratio of 4.5:1
 */
export function getAdaptiveTextColor(
  backgroundColor: string,
  isDarkMode: boolean = false
): string {
  const bgColor = parseColor(backgroundColor)
  if (!bgColor) {
    return isDarkMode ? 'rgba(255, 255, 255, 0.90)' : 'rgba(0, 0, 0, 0.90)'
  }

  const lightText: [number, number, number] = [255, 255, 255]
  const darkText: [number, number, number] = [0, 0, 0]

  const lightContrast = getContrastRatio(lightText, bgColor)
  const darkContrast = getContrastRatio(darkText, bgColor)

  // Return the text color with better contrast
  return lightContrast > darkContrast
    ? 'rgba(255, 255, 255, 0.90)'
    : 'rgba(0, 0, 0, 0.90)'
}

/**
 * Check if background color is considered "light"
 */
export function isLightColor(color: string): boolean {
  const rgb = parseColor(color)
  if (!rgb) return true

  const luminance = getLuminance(...rgb)
  return luminance > 0.5
}

/**
 * Get opacity adjusted for background complexity
 * Busier backgrounds need higher opacity for readability
 */
export function getAdaptiveOpacity(baseOpacity: number, isComplexBg: boolean): number {
  return isComplexBg ? Math.min(baseOpacity + 0.1, 0.95) : baseOpacity
}

/**
 * Check if text meets WCAG contrast requirements
 */
export function meetsContrastRequirement(
  foreground: string,
  background: string,
  level: 'AA' | 'AAA' = 'AA',
  isLargeText: boolean = false
): boolean {
  const fg = parseColor(foreground)
  const bg = parseColor(background)

  if (!fg || !bg) return false

  const ratio = getContrastRatio(fg, bg)
  const requiredRatio = level === 'AAA' ? (isLargeText ? 4.5 : 7) : isLargeText ? 3 : 4.5

  return ratio >= requiredRatio
}
