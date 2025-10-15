/**
 * GlassButton Component
 * shadcn Button with GlassMotion effects
 */

import * as React from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export interface GlassButtonProps extends React.ComponentProps<typeof Button> {
  /**
   * Glass effect intensity (0-100)
   * @default 15
   */
  glassIntensity?: number

  /**
   * Enable hover lift effect
   * @default true
   */
  hoverLift?: boolean

  /**
   * Enable focus glow effect
   * @default true
   */
  focusGlow?: boolean

  /**
   * Focus layer treatment for primary CTAs
   * Creates emphasized appearance with higher opacity and elevation
   * @default false
   */
  focusLayer?: boolean
}

const GlassButton = React.forwardRef<HTMLButtonElement, GlassButtonProps>(
  (
    {
      className,
      variant = 'default',
      glassIntensity = 15,
      hoverLift = true,
      focusGlow = true,
      focusLayer = false,
      ...props
    },
    ref
  ) => {
    // Apply glass effects based on variant
    const glassClasses = cn(
      // Base glass effects - consistent across all variants
      'backdrop-blur-[20px]',
      'transition-all',
      'duration-[var(--motion-duration-fast)]',
      'border-0', // Remove borders, use shadows instead
      'text-[var(--text-primary)]',
      // Lighting highlight from top
      !focusLayer && 'shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]',
      // Focus layer treatment (overrides variant styles)
      focusLayer
        ? [
            // Focus layer: highest opacity, strongest elevation
            'bg-[color-mix(in_srgb,var(--accent)_30%,var(--glass-tint)_70%)]',
            'backdrop-blur-[25px]',
            'shadow-[var(--shadow-high),inset_0_2px_0_0_rgba(255,255,255,0.25)]',
            'hover:bg-[color-mix(in_srgb,var(--accent)_40%,var(--glass-tint)_60%)]',
            'hover:shadow-[var(--shadow-high),inset_0_2px_0_0_rgba(255,255,255,0.3),0_0_20px_rgba(var(--accent),0.3)]',
            'font-semibold',
          ]
        : // Variant-specific styles using design tokens
        variant === 'outline'
        ? [
            // Outline variant - lighter, more transparent
            'bg-[var(--glass-tint)]',
            'shadow-[var(--shadow-medium)]',
            'hover:bg-[color-mix(in_srgb,var(--glass-tint),white_10%)]',
            'hover:shadow-[var(--shadow-high)]',
          ]
        : variant === 'ghost'
        ? [
            // Ghost variant - minimal background
            'bg-[color-mix(in_srgb,var(--glass-tint),transparent_50%)]',
            'shadow-[var(--shadow-low)]',
            'hover:bg-[var(--glass-tint)]',
            'hover:shadow-[var(--shadow-medium)]',
          ]
        : [
            // Default/solid variant - more opaque with accent tint
            'bg-[color-mix(in_srgb,var(--accent)_15%,var(--glass-tint)_85%)]',
            'shadow-[var(--shadow-medium)]',
            'hover:bg-[color-mix(in_srgb,var(--accent)_25%,var(--glass-tint)_75%)]',
            'hover:shadow-[var(--shadow-high)]',
          ],
      {
        'hover:transform hover:-translate-y-0.5': hoverLift,
        'focus-visible:ring-2 focus-visible:ring-[color-mix(in_srgb,var(--accent)_50%,transparent_50%)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent': focusGlow,
      },
      className
    )

    return (
      <Button
        ref={ref}
        variant={variant}
        className={glassClasses}
        style={
          {
            '--glass-intensity': glassIntensity,
          } as React.CSSProperties
        }
        {...props}
      />
    )
  }
)

GlassButton.displayName = 'GlassButton'

export { GlassButton }
