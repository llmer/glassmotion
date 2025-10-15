/**
 * Adaptive Behavior Utilities
 * Device and context detection for responsive design
 */

/**
 * Check if user prefers reduced motion
 */
export function shouldReduceMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Check if user prefers reduced transparency
 */
export function shouldReduceTransparency(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-transparency: reduce)').matches
}

/**
 * Check if user prefers dark mode
 */
export function prefersDarkMode(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

/**
 * Check if device supports backdrop-filter
 */
export function supportsBackdropFilter(): boolean {
  if (typeof window === 'undefined' || typeof CSS === 'undefined') return false
  return (
    CSS.supports('backdrop-filter', 'blur(1px)') ||
    CSS.supports('-webkit-backdrop-filter', 'blur(1px)')
  )
}

/**
 * Check if device is low-end (for performance optimizations)
 */
export function isLowEndDevice(): boolean {
  if (typeof navigator === 'undefined') return false

  // Check device memory (if available)
  const nav = navigator as Navigator & { deviceMemory?: number }
  if (nav.deviceMemory && nav.deviceMemory < 4) {
    return true
  }

  // Check hardware concurrency (CPU cores)
  if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
    return true
  }

  return false
}

/**
 * Get adaptive blur value based on device capabilities
 */
export function getAdaptiveBlur(defaultBlur: string): string {
  if (!supportsBackdropFilter()) return '0px'
  if (isLowEndDevice()) {
    // Reduce blur intensity on low-end devices
    const blurValue = parseInt(defaultBlur)
    return `${Math.max(blurValue * 0.5, 10)}px`
  }
  return defaultBlur
}

/**
 * Get adaptive animation duration based on user preferences
 */
export function getAdaptiveAnimationDuration(defaultDuration: string): string {
  if (shouldReduceMotion()) return '0ms'
  return defaultDuration
}

/**
 * Detect background complexity using luminance variance
 * Returns a value between 0 (simple) and 1 (complex)
 */
export function detectBackgroundComplexity(element?: HTMLElement | null): number {
  if (typeof window === 'undefined' || !element) return 0

  try {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    if (!ctx) return 0

    // Sample a small area for performance
    const sampleSize = 50
    canvas.width = sampleSize
    canvas.height = sampleSize

    // Get computed background
    const computedStyle = window.getComputedStyle(element)
    const bgColor = computedStyle.backgroundColor

    // Simple heuristic: if background is transparent or has multiple layers
    if (bgColor === 'transparent' || bgColor === 'rgba(0, 0, 0, 0)') {
      return 0.7 // Assume complex background
    }

    // For gradient backgrounds, return moderate complexity
    const bgImage = computedStyle.backgroundImage
    if (bgImage && bgImage !== 'none') {
      return 0.6
    }

    return 0.2 // Simple background
  } catch {
    return 0.5 // Default to moderate complexity on error
  }
}

/**
 * Get adaptive glass opacity based on context
 */
export function getAdaptiveGlassOpacity(
  baseOpacity: number,
  options: {
    isDarkMode?: boolean
    isComplexBackground?: boolean
    backgroundComplexity?: number
    reduceTransparency?: boolean
  } = {}
): number {
  let opacity = baseOpacity

  // Adjust for dark mode
  if (options.isDarkMode) {
    opacity += 0.05
  }

  // Increase opacity for complex backgrounds
  if (options.isComplexBackground) {
    opacity += 0.1
  }

  // Adjust based on background complexity (0-1)
  if (options.backgroundComplexity !== undefined) {
    opacity += options.backgroundComplexity * 0.15
  }

  // Honor reduced transparency preference
  if (options.reduceTransparency || shouldReduceTransparency()) {
    opacity = 0.95
  }

  return Math.min(opacity, 1)
}

/**
 * Get adaptive blur value based on background complexity
 */
export function getAdaptiveBlurForBackground(
  baseBlur: string,
  backgroundComplexity: number = 0
): string {
  if (!supportsBackdropFilter()) return '0px'
  if (isLowEndDevice()) {
    const blurValue = parseInt(baseBlur)
    return `${Math.max(blurValue * 0.5, 10)}px`
  }

  // Increase blur for complex backgrounds
  const blurValue = parseInt(baseBlur)
  const complexityMultiplier = 1 + (backgroundComplexity * 0.5) // Up to 1.5x blur
  return `${Math.round(blurValue * complexityMultiplier)}px`
}

/**
 * Create adaptive CSS variables based on context
 */
export function createAdaptiveStyles(): Record<string, string> {
  const isDark = prefersDarkMode()
  const reducedMotion = shouldReduceMotion()
  const reducedTransparency = shouldReduceTransparency()

  return {
    '--glass-blur': reducedTransparency ? '0px' : getAdaptiveBlur('30px'),
    '--glass-opacity': reducedTransparency ? '0.95' : isDark ? '0.80' : '0.75',
    '--motion-duration-normal': reducedMotion ? '0ms' : '250ms',
    '--motion-duration-fast': reducedMotion ? '0ms' : '150ms',
    '--motion-duration-slow': reducedMotion ? '0ms' : '350ms',
  }
}

// Import React hooks for useMediaQuery
import { useState, useEffect } from 'react'

/**
 * React hook for listening to media query changes
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia(query).matches
  })

  useEffect(() => {
    if (typeof window === 'undefined') return

    const mediaQuery = window.matchMedia(query)
    const handler = (event: MediaQueryListEvent) => setMatches(event.matches)

    // Set initial value
    setMatches(mediaQuery.matches)

    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [query])

  return matches
}
