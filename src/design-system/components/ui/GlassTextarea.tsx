/**
 * GlassTextarea Component
 * shadcn Textarea with GlassMotion effects
 */

import * as React from 'react'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

export type GlassTextareaProps = React.ComponentProps<typeof Textarea>

const GlassTextarea = React.forwardRef<HTMLTextAreaElement, GlassTextareaProps>(
  ({ className, ...props }, ref) => {
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
      // Resize handle styling
      'resize-y',
      className
    )

    return <Textarea ref={ref} className={glassClasses} {...props} />
  }
)

GlassTextarea.displayName = 'GlassTextarea'

export { GlassTextarea }
