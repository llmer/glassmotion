/**
 * GlassNavBar Component
 * Navigation bar with GlassMotion effects
 */

import * as React from 'react'
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from '@/components/ui/navigation-menu'
import { cn } from '@/lib/utils'

export interface GlassNavBarProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Position of the navbar
   * @default 'top'
   */
  position?: 'top' | 'bottom'

  /**
   * Make navbar sticky
   * @default true
   */
  sticky?: boolean

  /**
   * Blur intensity (low, medium, high)
   * @default 'low'
   */
  blurIntensity?: 'low' | 'medium' | 'high'
}

const GlassNavBar = React.forwardRef<HTMLElement, GlassNavBarProps>(
  ({ className, position = 'top', sticky = true, blurIntensity: _blurIntensity = 'low', children, ...props }, ref) => {
    const navClasses = cn(
      // Glass effects
      'backdrop-blur-[25px]',
      'bg-white/30',
      'w-full',
      'flex items-center justify-between',
      'px-4 sm:px-6 lg:px-8',
      'h-16',
      'transition-all duration-300',
      {
        'sticky z-50': sticky,
        'top-0 border-b border-white/20': position === 'top',
        'bottom-0 border-t border-white/20': position === 'bottom',
      },
      className
    )

    return (
      <nav ref={ref} className={navClasses} {...props}>
        {children}
      </nav>
    )
  }
)

GlassNavBar.displayName = 'GlassNavBar'

// Navigation Menu Glass wrapper
export interface GlassNavigationMenuProps extends React.ComponentPropsWithoutRef<typeof NavigationMenu> {
  glassEffect?: boolean
}

const GlassNavigationMenu = React.forwardRef<
  React.ElementRef<typeof NavigationMenu>,
  GlassNavigationMenuProps
>(({ className, glassEffect = true, ...props }, ref) => {
  return (
    <NavigationMenu
      ref={ref}
      className={cn(glassEffect && 'glass-surface rounded-[var(--radius-medium)]', className)}
      {...props}
    />
  )
})

GlassNavigationMenu.displayName = 'GlassNavigationMenu'

export {
  GlassNavBar,
  GlassNavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
}
