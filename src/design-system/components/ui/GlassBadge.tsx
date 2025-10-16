/**
 * GlassBadge Component
 * shadcn Badge with GlassMotion effects
 */

import * as React from 'react'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

export type GlassBadgeProps = React.ComponentProps<typeof Badge>

const GlassBadge = React.forwardRef<HTMLDivElement, GlassBadgeProps>(
  ({ className, ...props }, ref) => {
    const glassClasses = cn(
      // Base glass effects
      'backdrop-blur-[15px]',
      'bg-white/25',
      'border-0',
      'shadow-[0_2px_8px_0_rgba(31,38,135,0.2)]',
      'text-gray-900',
      'font-medium',
      className
    )

    return <Badge ref={ref} className={glassClasses} {...props} />
  }
)

GlassBadge.displayName = 'GlassBadge'

export { GlassBadge }
