/**
 * GlassMotion Design System Components
 * Main export file for all design system components
 */

export * from './ui'

// Export effects
export { GlassEffects } from '../effects/GlassEffects'
export type { MaskConfig, OverlayConfig, OpticConfig } from '../effects/GlassEffects'
export { maskPresets } from '../effects/masks/patterns'
export { overlayPresets } from '../effects/overlays/patterns'
export { opticPresets } from '../effects/optics/filters'

// Export text effects
export { chromaticTextPresets } from '../effects/text/chromatic'
export type { ChromaticTextConfig, ChromaticIntensity, ChromaticDirection } from '../effects/text/chromatic'
