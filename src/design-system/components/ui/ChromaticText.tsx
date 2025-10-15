/**
 * ChromaticText Component
 * Text with chromatic aberration (RGB split) effect
 */

'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import {
  getChromaticClassName,
  generateChromaticTextShadow,
  chromaticTextPresets,
  type ChromaticTextConfig,
  type ChromaticIntensity,
  type ChromaticDirection
} from '../../effects/text/chromatic'

export interface ChromaticTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * Chromatic aberration intensity
   * @default 'medium'
   */
  intensity?: ChromaticIntensity

  /**
   * Direction of RGB channel separation
   * @default 'horizontal'
   */
  direction?: ChromaticDirection

  /**
   * Enable hover effect that intensifies the chromatic aberration
   * @default false
   */
  hoverEffect?: boolean

  /**
   * Use a preset configuration
   */
  preset?: keyof typeof chromaticTextPresets

  /**
   * Custom chromatic configuration (overrides preset)
   */
  config?: ChromaticTextConfig

  /**
   * Children (text content)
   */
  children: React.ReactNode

  /**
   * Use inline style instead of CSS classes (for custom colors)
   * @default false
   */
  useInlineStyle?: boolean
}

const ChromaticText = React.forwardRef<HTMLSpanElement, ChromaticTextProps>(
  (
    {
      className,
      intensity = 'medium',
      direction = 'horizontal',
      hoverEffect = false,
      preset,
      config,
      useInlineStyle = false,
      children,
      style,
      ...props
    },
    ref
  ) => {
    // Determine final config
    const finalConfig: ChromaticTextConfig = React.useMemo(() => {
      if (config) return config
      if (preset) return chromaticTextPresets[preset]
      return { intensity, direction, hoverEffect }
    }, [config, preset, intensity, direction, hoverEffect])

    // Generate text shadow
    const textShadow = React.useMemo(
      () => generateChromaticTextShadow(finalConfig),
      [finalConfig]
    )

    // Track hover state for dynamic effect
    const [isHovered, setIsHovered] = React.useState(false)

    // Generate hover shadow (stronger effect)
    const hoverShadow = React.useMemo(() => {
      if (!finalConfig.hoverEffect) return textShadow
      return generateChromaticTextShadow({
        ...finalConfig,
        intensity: 'strong',
        customColors: {
          negative: 'rgba(255, 0, 255, 0.8)',
          positive: 'rgba(0, 255, 255, 0.8)'
        }
      })
    }, [finalConfig, textShadow])

    return (
      <span
        ref={ref}
        className={cn(
          finalConfig.hoverEffect && 'transition-all duration-250',
          className
        )}
        style={{
          ...style,
          textShadow: isHovered ? hoverShadow : textShadow
        }}
        onMouseEnter={finalConfig.hoverEffect ? () => setIsHovered(true) : undefined}
        onMouseLeave={finalConfig.hoverEffect ? () => setIsHovered(false) : undefined}
        {...props}
      >
        {children}
      </span>
    )
  }
)

ChromaticText.displayName = 'ChromaticText'

export { ChromaticText }
