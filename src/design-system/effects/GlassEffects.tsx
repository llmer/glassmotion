/**
 * GlassEffects Component
 * Composable effects wrapper for glass surfaces
 */

'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { MaskConfig, composeMasks, maskPresets, generateMaskPattern } from './masks/patterns'
import { OverlayConfig, generateOverlayPattern, overlayPresets } from './overlays/patterns'
import { OpticConfig, generateOpticEffect, opticPresets } from './optics/filters'

export interface GlassEffectsProps {
  className?: string

  // Simple API - use preset names
  mask?: keyof typeof maskPresets | MaskConfig | MaskConfig[]
  overlay?: keyof typeof overlayPresets | OverlayConfig | OverlayConfig[]
  optic?: keyof typeof opticPresets | OpticConfig

  // Performance optimization
  disableEffects?: boolean // Disable on low-end devices
}

export function GlassEffects({
  className,
  mask,
  overlay,
  optic,
  disableEffects = false
}: GlassEffectsProps) {
  const [svgFilters, setSvgFilters] = React.useState<string[]>([])

  // Generate mask styles
  const maskStyles = React.useMemo(() => {
    if (!mask || disableEffects) return {}

    const maskConfigs: MaskConfig[] = Array.isArray(mask)
      ? mask
      : typeof mask === 'string'
      ? [maskPresets[mask]]
      : [mask]

    if (maskConfigs.length === 0) return {}

    if (maskConfigs.length === 1) {
      const config = maskConfigs[0]

      // Generate the mask pattern directly from the config
      const maskPattern = generateMaskPattern(config)

      // Determine appropriate size based on pattern type
      let size = 'cover'
      if (config.pattern === 'dots') {
        const scale = config.scale || 1
        size = `${20 * scale}px ${20 * scale}px`
      }

      return {
        WebkitMaskImage: maskPattern,
        maskImage: maskPattern,
        WebkitMaskSize: size,
        maskSize: size,
        WebkitMaskRepeat: ['dots', 'grid', 'noise'].includes(config.pattern) || config.pattern.includes('lines') ? 'repeat' : 'no-repeat',
        maskRepeat: ['dots', 'grid', 'noise'].includes(config.pattern) || config.pattern.includes('lines') ? 'repeat' : 'no-repeat'
      }
    }

    // Multiple masks - use composition
    const composed = composeMasks(maskConfigs)
    return {
      WebkitMaskImage: composed.maskImage,
      maskImage: composed.maskImage,
      WebkitMaskSize: composed.maskSize,
      maskSize: composed.maskSize,
      WebkitMaskRepeat: composed.maskRepeat,
      maskRepeat: composed.maskRepeat,
      WebkitMaskComposite: composed.maskComposite,
      maskComposite: composed.maskComposite
    }
  }, [mask, disableEffects])

  // Generate overlay styles
  const overlayStyles = React.useMemo(() => {
    if (!overlay || disableEffects) return null

    const overlayConfigs: OverlayConfig[] = Array.isArray(overlay)
      ? overlay
      : typeof overlay === 'string'
      ? [overlayPresets[overlay]]
      : [overlay]

    return overlayConfigs.map((config, index) => {
      const overlayConfig = typeof config === 'string'
        ? overlayPresets[config as keyof typeof overlayPresets]
        : config

      const { background, mixBlendMode, opacity } = generateOverlayPattern(overlayConfig)

      return (
        <div
          key={`overlay-${index}`}
          className="absolute inset-0 pointer-events-none"
          style={{
            background,
            mixBlendMode: mixBlendMode as React.CSSProperties['mixBlendMode'],
            opacity
          }}
        />
      )
    })
  }, [overlay, disableEffects])

  // Generate optic effect configuration
  const opticEffect = React.useMemo(() => {
    if (!optic || disableEffects) return null

    const opticConfig = typeof optic === 'string'
      ? opticPresets[optic]
      : optic

    return generateOpticEffect(opticConfig)
  }, [optic, disableEffects])

  // Update SVG filters when optic effect changes
  React.useEffect(() => {
    if (opticEffect?.svgFilter && opticEffect?.filterId) {
      setSvgFilters(prev => {
        // Remove any existing filter with the same ID, then add the new one
        const filtered = prev.filter(f => !f.includes(opticEffect.filterId!))
        return [...filtered, opticEffect.svgFilter!]
      })
    }
  }, [opticEffect])

  // Generate styles for optic effects
  const opticStyles = React.useMemo(() => {
    if (!opticEffect) return {}
    const { cssFilter, filterId } = opticEffect
    return {
      filter: filterId ? `url(#${filterId})` : cssFilter
    }
  }, [opticEffect])

  return (
    <>
      {/* Render SVG filters */}
      {svgFilters.length > 0 && (
        <div
          dangerouslySetInnerHTML={{ __html: svgFilters.join('') }}
          style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}
        />
      )}

      {/* Mask layer - separate from optic effects */}
      {mask && (
        <div
          className={cn('absolute inset-0', className)}
          style={maskStyles}
          aria-hidden="true"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-white/15 to-white/10 dark:from-white/15 dark:via-white/10 dark:to-white/5" />
        </div>
      )}

      {/* Overlay layer */}
      {overlay && (
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          {overlayStyles}
        </div>
      )}

      {/* Optic effects layer - needs more visible content */}
      {optic && (
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          {/* Much more visible gradient for chromatic aberration and color filters */}
          {/* Apply filter directly to the gradient, not the container */}
          <div
            className="absolute inset-0 bg-gradient-to-br from-blue-500/40 via-purple-500/35 to-pink-500/30 dark:from-blue-400/35 dark:via-purple-400/30 dark:to-pink-400/25 mix-blend-soft-light"
            style={opticStyles}
          />
        </div>
      )}
    </>
  )
}

// Export all effect utilities for advanced usage
export { maskPresets, overlayPresets, opticPresets }
export type { MaskConfig, OverlayConfig, OpticConfig }
