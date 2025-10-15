# Implementation Guide

Step-by-step guide for implementing and extending the GlassMotion design system.

## Getting Started

### Prerequisites

- Next.js 15+ (App Router)
- React 19+
- Tailwind CSS 4+
- TypeScript 5+

### Installation

The design system is already configured in this project. For reference, here's what was set up:

1. **shadcn/ui initialized** with Tailwind CSS 4
2. **Design tokens** in `src/design-system/tokens/`
3. **Glass utilities** in `src/design-system/styles/glass-motion.css`
4. **Components** in `src/design-system/components/`
5. **Utilities** in `src/design-system/utils/`

## Project Structure

```
src/
├── design-system/
│   ├── tokens/              # Design token definitions
│   │   ├── colors.ts
│   │   ├── motion.ts
│   │   ├── effects.ts
│   │   └── index.ts
│   │
│   ├── styles/              # CSS stylesheets
│   │   └── glass-motion.css
│   │
│   ├── components/          # React components
│   │   ├── ui/
│   │   │   ├── GlassButton.tsx
│   │   │   ├── GlassCard.tsx
│   │   │   ├── GlassNavBar.tsx
│   │   │   └── index.ts
│   │   └── index.ts
│   │
│   ├── utils/               # Utility functions
│   │   ├── contrast.ts
│   │   ├── color-mix.ts
│   │   ├── adaptive.ts
│   │   └── index.ts
│   │
│   └── docs/                # Documentation
│       ├── philosophy.md
│       ├── tokens.md
│       ├── components.md
│       └── implementation.md
│
├── components/              # shadcn/ui base components
│   └── ui/
│       ├── button.tsx
│       ├── card.tsx
│       └── navigation-menu.tsx
│
├── lib/
│   └── utils.ts            # shadcn utilities
│
└── app/
    ├── globals.css         # Global styles + design tokens
    ├── layout.tsx
    └── page.tsx
```

## Creating New Components

### Step 1: Install shadcn Component

```bash
npx shadcn@latest add [component-name]
```

### Step 2: Create Glass Wrapper

Create a new file in `src/design-system/components/ui/`:

```tsx
// GlassNewComponent.tsx
import * as React from 'react'
import { NewComponent } from '@/components/ui/new-component'
import { cn } from '@/lib/utils'

export interface GlassNewComponentProps extends React.ComponentPropsWithoutRef<typeof NewComponent> {
  elevation?: 1 | 2 | 3
  blurIntensity?: 'low' | 'medium' | 'high'
}

const GlassNewComponent = React.forwardRef<
  React.ElementRef<typeof NewComponent>,
  GlassNewComponentProps
>(({ className, elevation = 2, blurIntensity = 'medium', ...props }, ref) => {
  const glassClasses = cn(
    'glass-surface',
    `glass-elevation-${elevation}`,
    `glass-blur-${blurIntensity}`,
    'backdrop-blur-[var(--blur-medium)]',
    'bg-[var(--glass-tint)]',
    'border border-[var(--glass-border)]',
    className
  )

  return (
    <NewComponent
      ref={ref}
      className={glassClasses}
      {...props}
    />
  )
})

GlassNewComponent.displayName = 'GlassNewComponent'

export { GlassNewComponent }
```

### Step 3: Export Component

Add to `src/design-system/components/ui/index.ts`:

```tsx
export * from './GlassNewComponent'
```

### Step 4: Use Component

```tsx
import { GlassNewComponent } from '@/design-system/components'

function MyPage() {
  return (
    <GlassNewComponent elevation={2}>
      Content
    </GlassNewComponent>
  )
}
```

## Customizing Design Tokens

### Modifying Existing Tokens

Edit token files in `src/design-system/tokens/`:

```typescript
// src/design-system/tokens/effects.ts
export const effects = {
  blur: {
    low: '20px',      // Changed from 15px
    medium: '40px',   // Changed from 30px
    high: '60px',     // Changed from 50px
  },
  // ...
}
```

### Adding New Token Categories

```typescript
// src/design-system/tokens/spacing.ts
export const spacing = {
  card: {
    padding: '1.5rem',
    gap: '1rem',
  },
  button: {
    padding: {
      sm: '0.5rem 1rem',
      md: '0.75rem 1.5rem',
      lg: '1rem 2rem',
    },
  },
} as const

export type SpacingTokens = typeof spacing
```

Then export from `src/design-system/tokens/index.ts`:

```typescript
export { spacing, type SpacingTokens } from './spacing'
```

### Updating CSS Variables

Modify `src/app/globals.css`:

```css
:root {
  --new-token: value;
}

@media (prefers-color-scheme: dark) {
  :root {
    --new-token: dark-value;
  }
}
```

## Theme Customization

### Changing Accent Color

Update in `globals.css`:

```css
:root {
  --accent: #FF2D55;  /* Custom brand color */
}
```

All glass components will automatically use the new accent.

### Creating Theme Variants

```css
/* Light theme variant */
[data-theme="ocean"] {
  --accent: #0077BE;
  --glass-tint: rgba(0, 119, 190, 0.15);
}

/* Dark theme variant */
[data-theme="ocean"].dark {
  --accent: #00A8E8;
  --glass-tint: rgba(0, 168, 232, 0.10);
}
```

Apply theme:

```tsx
<div data-theme="ocean">
  <GlassCard>Ocean themed card</GlassCard>
</div>
```

### Dynamic Theme Switching

```tsx
'use client'

import { useState } from 'react'

export function ThemeSwitcher() {
  const [theme, setTheme] = useState('default')

  return (
    <div data-theme={theme}>
      <select onChange={(e) => setTheme(e.target.value)}>
        <option value="default">Default</option>
        <option value="ocean">Ocean</option>
        <option value="sunset">Sunset</option>
      </select>

      <GlassCard>
        Themed content
      </GlassCard>
    </div>
  )
}
```

## Advanced Patterns

### Adaptive Glass Based on Background

```tsx
'use client'

import { useState, useEffect } from 'react'
import { getAdaptiveGlassOpacity } from '@/design-system/utils'

export function AdaptiveGlassCard({ children }: { children: React.ReactNode }) {
  const [opacity, setOpacity] = useState(0.75)

  useEffect(() => {
    // Detect if background is complex
    const isComplex = detectBackgroundComplexity()
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches

    const adaptiveOpacity = getAdaptiveGlassOpacity(0.75, {
      isDarkMode: isDark,
      isComplexBackground: isComplex,
    })

    setOpacity(adaptiveOpacity)
  }, [])

  return (
    <GlassCard
      style={{ '--glass-opacity': opacity } as React.CSSProperties}
    >
      {children}
    </GlassCard>
  )
}
```

### Context-Aware Text Color

```tsx
'use client'

import { getAdaptiveTextColor } from '@/design-system/utils'

export function AdaptiveText({
  backgroundColor,
  children
}: {
  backgroundColor: string
  children: React.ReactNode
}) {
  const textColor = getAdaptiveTextColor(backgroundColor)

  return (
    <p style={{ color: textColor }}>
      {children}
    </p>
  )
}
```

### Performance-Optimized Glass

```tsx
'use client'

import { useEffect, useState } from 'react'
import { isLowEndDevice, getAdaptiveBlur } from '@/design-system/utils'

export function PerformanceGlassCard({ children }: { children: React.ReactNode }) {
  const [blur, setBlur] = useState('30px')

  useEffect(() => {
    if (isLowEndDevice()) {
      setBlur('15px') // Reduce blur on low-end devices
    }
  }, [])

  return (
    <GlassCard
      style={{ '--glass-blur': blur } as React.CSSProperties}
    >
      {children}
    </GlassCard>
  )
}
```

## Testing

### Accessibility Testing

```tsx
// Test contrast ratios
import { meetsContrastRequirement } from '@/design-system/utils'

const isAccessible = meetsContrastRequirement(
  '#000000',  // text color
  '#FFFFFF',  // background color
  'AA',       // WCAG level
  false       // is large text
)

console.log('Meets WCAG AA:', isAccessible)
```

### Browser Support Testing

```tsx
import { supportsBackdropFilter } from '@/design-system/utils'

if (!supportsBackdropFilter()) {
  console.warn('Backdrop filter not supported - using fallback')
}
```

### Motion Preference Testing

```tsx
import { shouldReduceMotion } from '@/design-system/utils'

const animationDuration = shouldReduceMotion() ? 0 : 250

<div style={{ transitionDuration: `${animationDuration}ms` }}>
  Content
</div>
```

## Debugging

### Visualizing Glass Layers

Add to `globals.css` temporarily:

```css
/* Debug mode - shows glass layer boundaries */
[data-debug="true"] .glass-surface,
[data-debug="true"] .glass-overlay,
[data-debug="true"] .glass-card {
  outline: 2px solid red !important;
  outline-offset: -2px;
}
```

Use in development:

```tsx
<div data-debug="true">
  <GlassCard>Debug mode enabled</GlassCard>
</div>
```

### Checking Token Values

```tsx
import { colors, effects, motion } from '@/design-system/tokens'

console.log('Design Tokens:', {
  colors,
  effects,
  motion,
})
```

## Deployment Considerations

### Production Optimizations

1. **Tree-shake unused components**
   - Only import what you use
   - Build will automatically remove unused code

2. **Optimize CSS**
   - Tailwind automatically purges unused styles
   - Minification happens during build

3. **Browser Support**
   - Provide fallbacks for older browsers
   - Test on target browsers before launch

### Performance Monitoring

Monitor these metrics:

- **First Paint Time**: Glass effects shouldn't delay initial render
- **Animation Frame Rate**: Maintain 60fps during transitions
- **Bundle Size**: Monitor component impact on bundle

### Error Boundaries

Wrap glass components with error boundaries:

```tsx
import { ErrorBoundary } from 'react-error-boundary'

function ErrorFallback({ error }: { error: Error }) {
  return (
    <div className="glass-card">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
    </div>
  )
}

<ErrorBoundary FallbackComponent={ErrorFallback}>
  <GlassCard>Content</GlassCard>
</ErrorBoundary>
```

## Migration Guide

### From Plain shadcn to GlassMotion

Replace shadcn imports with Glass variants:

```diff
- import { Button } from '@/components/ui/button'
+ import { GlassButton } from '@/design-system/components'

- <Button>Click</Button>
+ <GlassButton>Click</GlassButton>
```

### Gradual Adoption

You can use both side-by-side:

```tsx
import { Button } from '@/components/ui/button'
import { GlassButton } from '@/design-system/components'

// Mix and match
<>
  <Button>Standard Button</Button>
  <GlassButton>Glass Button</GlassButton>
</>
```

## FAQ

**Q: Why use glass effects?**
A: Creates visual depth, reduces visual weight, maintains context visibility.

**Q: Performance impact?**
A: Minimal on modern devices. Fallbacks provided for older browsers.

**Q: Can I use without shadcn?**
A: Yes, use utility classes directly on any element.

**Q: How to disable animations?**
A: System respects `prefers-reduced-motion` automatically.

**Q: Dark mode support?**
A: Built-in, automatically adjusts opacity and colors.

## Resources

- [Design Philosophy](./philosophy.md)
- [Token Reference](./tokens.md)
- [Component Guide](./components.md)
- [shadcn/ui Docs](https://ui.shadcn.com)
- [Tailwind CSS Docs](https://tailwindcss.com)
