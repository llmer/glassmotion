/**
 * GlassCard Component
 * shadcn Card with GlassMotion effects
 */

'use client'

import * as React from 'react'
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { GlassEffects } from '../../effects/GlassEffects'
import type { MaskConfig, OverlayConfig, OpticConfig } from '../../effects/GlassEffects'
import { maskPresets } from '../../effects/masks/patterns'
import { overlayPresets } from '../../effects/overlays/patterns'
import { opticPresets } from '../../effects/optics/filters'

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Elevation level (1-3)
   * @default 2
   */
  elevation?: 1 | 2 | 3

  /**
   * Enable hover effect
   * @default true
   */
  hoverable?: boolean

  /**
   * Enable scale-in animation on mount
   * @default false
   */
  animateIn?: boolean

  /**
   * Enable adaptive blur based on background complexity
   * @default false
   */
  adaptiveBlur?: boolean

  /**
   * Enable directional lighting highlights
   * @default true
   */
  lighting?: boolean

  /**
   * Apply mask effect (preset name or custom config)
   * @default undefined
   */
  mask?: keyof typeof maskPresets | MaskConfig | MaskConfig[]

  /**
   * Apply overlay effect (preset name or custom config)
   * @default undefined
   */
  overlay?: keyof typeof overlayPresets | OverlayConfig | OverlayConfig[]

  /**
   * Apply optic effect (preset name or custom config)
   * @default undefined
   */
  optic?: keyof typeof opticPresets | OpticConfig
}

const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, elevation = 2, hoverable = true, animateIn = false, adaptiveBlur = false, lighting = true, mask, overlay, optic, children, ...props }, ref) => {
    const cardRef = React.useRef<HTMLDivElement>(null)
    const [backgroundComplexity, setBackgroundComplexity] = React.useState(0)

    React.useEffect(() => {
      if (adaptiveBlur && cardRef.current) {
        // Simple background complexity detection
        const parent = cardRef.current.parentElement
        if (parent) {
          const computedStyle = window.getComputedStyle(parent)
          const bgImage = computedStyle.backgroundImage
          const complexity = bgImage && bgImage !== 'none' ? 0.6 : 0.2
          setBackgroundComplexity(complexity)
        }
      }
    }, [adaptiveBlur])

    const glassClasses = cn(
      // Remove default shadcn background
      '!bg-transparent',
      // Apply glass effects
      'glass-card',
      `glass-elevation-${elevation}`,
      // Use CSS variables for adaptive blur
      'backdrop-blur-[var(--card-blur,30px)]',
      'bg-[var(--glass-tint)]',
      'border border-[var(--glass-border)]',
      'rounded-[var(--radius-large)]',
      // Lighting highlights from top-left
      lighting && 'shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)]',
      // Transitions
      'transition-all duration-300',
      {
        'glass-hover-lift': hoverable,
        'glass-scale-in': animateIn,
      },
      className
    )

    // Calculate adaptive blur value
    const blurValue = adaptiveBlur
      ? `${30 + (backgroundComplexity * 20)}px`
      : '30px'

    // Determine if we need effects
    const hasEffects = mask || overlay || optic

    return (
      <Card
        ref={(node) => {
          if (ref) {
            if (typeof ref === 'function') {
              ref(node)
            } else if (ref && 'current' in ref) {
              ref.current = node
            }
          }
          cardRef.current = node
        }}
        className={cn(glassClasses, hasEffects && 'relative overflow-hidden')}
        style={{
          ...props.style,
          '--card-blur': blurValue,
        } as React.CSSProperties}
        {...props}
      >
        {/* Glass effects layer - applied to background */}
        {hasEffects && (
          <GlassEffects
            mask={mask}
            overlay={overlay}
            optic={optic}
            className="absolute inset-0 pointer-events-none -z-0"
          />
        )}

        {/* Content layer - rendered on top */}
        <div className={cn('flex flex-col gap-6 h-full', hasEffects && 'relative z-10')}>
          {children}
        </div>
      </Card>
    )
  }
)

GlassCard.displayName = 'GlassCard'

// Re-export Card subcomponents for convenience
export { GlassCard, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
