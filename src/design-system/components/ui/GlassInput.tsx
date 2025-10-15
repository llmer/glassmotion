/**
 * GlassInput Component
 * shadcn Input with GlassMotion effects
 */

import * as React from 'react'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

export interface GlassInputProps extends React.ComponentProps<typeof Input> {
  /**
   * Glass effect intensity
   * @default 'medium'
   */
  glassIntensity?: 'low' | 'medium' | 'high'
}

const GlassInput = React.forwardRef<HTMLInputElement, GlassInputProps>(
  ({ className, glassIntensity: _glassIntensity = 'medium', ...props }, ref) => {
    const glassClasses = cn(
      // Base glass effects using design tokens
      'backdrop-blur-[20px]',
      'bg-[var(--glass-tint)]',
      'border-0',
      'shadow-[var(--shadow-low),inset_0_1px_0_0_rgba(255,255,255,0.1)]',
      'text-[var(--text-primary)]',
      'placeholder:text-[var(--text-secondary)]',
      'transition-all',
      'duration-[var(--motion-duration-fast)]',
      'rounded-[var(--radius-medium)]',
      // Focus states with focus-layer treatment
      'focus:bg-[color-mix(in_srgb,var(--glass-tint),white_10%)]',
      'focus:shadow-[var(--shadow-medium),inset_0_1px_0_0_rgba(255,255,255,0.15)]',
      'focus:backdrop-blur-[25px]',
      'focus:ring-2',
      'focus:ring-[color-mix(in_srgb,var(--accent)_50%,transparent_50%)]',
      'focus:ring-offset-0',
      // Hover states
      'hover:shadow-[var(--shadow-medium),inset_0_1px_0_0_rgba(255,255,255,0.12)]',
      className
    )

    return <Input ref={ref} className={glassClasses} {...props} />
  }
)

GlassInput.displayName = 'GlassInput'

export { GlassInput }
