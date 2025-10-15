# GlassMotion Design System

This document serves as the source of truth for the GlassMotion design system used in this project. Reference this file when implementing new features or components to maintain design consistency.

## Design Philosophy

A visual and interaction system based on **translucent surfaces, dynamic lighting, and fluid motion**, creating interfaces that feel layered, responsive, and adaptive.

### Core Principles

1. **Depth through Transparency** – Surfaces convey spatial hierarchy through blur, translucency, and shadow layering
2. **Dynamic Light Interaction** – Components respond to simulated lighting and environmental tone (light/dark modes, background colors)
3. **Motion as Context** – Transitions guide attention and reinforce spatial relationships, not decoration
4. **Adaptive Contrast** – Text, icons, and controls adjust contrast dynamically against underlying surfaces for maximum legibility
5. **Responsive Materiality** – Components visually adapt based on context (content density, input mode, background complexity)

## Visual Language

### Surface Layers

| Layer | Purpose | Properties |
|-------|---------|------------|
| **Base Layer** | Background environment (wallpaper, imagery) | No blur, static content, visual context |
| **Glass Layer** | Primary UI surface | `opacity: 0.6–0.85`, `backdrop-blur: 20–40px`, tint-color variable, optional refraction highlight |
| **Overlay Layer** | Floating dialogs, sheets, context menus | Increased blur (30–60px), drop shadow, soft radius, motion entry transitions |
| **Focus Layer** | Emphasized components (buttons, inputs) | Subtle lighting highlight, stronger opacity (>0.85) |

### Color System

#### Tint Palette
```css
--tint-base: var(--accent);
--tint-light: color-mix(in srgb, var(--accent), white 40%);
--tint-dark: color-mix(in srgb, var(--accent), black 40%);
```

#### Text Colors
- `--text-primary`: Adaptive contrast (min 4.5:1 ratio)
- `--text-secondary`: 70% opacity of primary
- `--text-disabled`: 40% opacity of primary

### Elevation & Shadows

Elevation is achieved through blur + shadow blending:

| Level | Blur Radius | Shadow |
|-------|-------------|--------|
| 1 | 15px | `rgba(0, 0, 0, 0.08)` |
| 2 | 25px | `rgba(0, 0, 0, 0.12)` |
| 3 | 40px | `rgba(0, 0, 0, 0.16)` |

## Motion System

### Animation Curves
- **Standard Motion**: `cubic-bezier(0.32, 0.72, 0, 1)`
- **Ease Out (Entry)**: `cubic-bezier(0.16, 1, 0.3, 1)`
- **Ease In (Exit)**: `cubic-bezier(0.7, 0, 0.84, 0)`

### Component Motion Rules

| Component | Behavior |
|-----------|----------|
| Cards / Panels | Enter with scale 0.95 → 1.0 and opacity fade |
| Menus / Sheets | Slide from anchor point with overshoot bounce |
| Buttons / Inputs | Subtle lighting ripple and refraction pulse |
| System Transitions | Blur + depth fade of background layer |

## Design Tokens

All design tokens are defined in `src/design-system/tokens/`:

- **colors.ts** - Tint palette, adaptive text colors
- **motion.ts** - Animation curves, timing functions
- **effects.ts** - Blur values, opacity, shadow definitions

### Token Reference

```typescript
// Opacity
tokens.opacity.surface    // 0.75
tokens.opacity.overlay    // 0.85
tokens.opacity.disabled   // 0.4

// Blur
tokens.blur.low          // 15px
tokens.blur.medium       // 30px
tokens.blur.high         // 50px

// Motion
tokens.motion.standard   // cubic-bezier(0.32, 0.72, 0, 1)
tokens.motion.easeIn     // cubic-bezier(0.7, 0, 0.84, 0)
tokens.motion.easeOut    // cubic-bezier(0.16, 1, 0.3, 1)
```

## Component Architecture

### Base Components

We use **shadcn/ui** as the foundation for all components. Glass effects are applied on top via:

1. CSS custom properties in `globals.css`
2. Utility classes in `glass-motion.css`
3. Wrapper components in `src/design-system/components/ui/`

### Example Component Structure

```tsx
// GlassButton wraps shadcn Button with glass effects
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function GlassButton({ className, ...props }) {
  return (
    <Button
      className={cn("glass-surface glass-button", className)}
      {...props}
    />
  )
}
```

### Available Components

- **GlassCard** - Content containers with glass effect
- **GlassButton** - Interactive buttons with glass surface
- **GlassNavBar** - Navigation bars with translucent background

## CSS Utilities

Custom Tailwind utilities available:

- `.glass-surface` - Base glass effect with blur and translucency
- `.glass-overlay` - Higher elevation glass layer
- `.glass-button` - Glass effect optimized for buttons
- `.glass-card` - Glass effect optimized for cards

## Adaptive Behavior

### Context-Based Adjustments

| Context | Adjustment |
|---------|------------|
| Dark Mode | Reduce transparency (0.6 → 0.75) to maintain contrast |
| Busy Backgrounds | Apply increased blur and higher opacity |
| High Motion Sensitivity | Reduce animation duration, disable scale transitions |
| Low Performance | Replace blur with semi-opaque gradients |

### Implementation

Use utility functions in `src/design-system/utils/`:

```typescript
import { getAdaptiveContrast } from '@/design-system/utils/contrast'
import { shouldReduceMotion } from '@/design-system/utils/adaptive'

// Automatically detect and apply appropriate styles
const textColor = getAdaptiveContrast(backgroundColor)
const animationClass = shouldReduceMotion() ? 'transition-none' : 'transition-all'
```

## Accessibility Requirements

1. **Automatic Contrast Correction** - Detects background luminance and adjusts text color dynamically
2. **Reduced Transparency Mode** - Fallback to flat color backgrounds when system preference is enabled
3. **Reduced Motion Mode** - Disables transform/scale animations, uses simple fade transitions
4. **Color Independence** - Never rely on color alone for state communication (use icon + text pairings)

## Implementation Guidelines

### When Creating New Components

1. Start with shadcn/ui base component
2. Apply appropriate glass utility classes
3. Ensure adaptive contrast for text
4. Test in both light and dark modes
5. Verify reduced motion fallbacks
6. Check keyboard navigation

### Component Priority

- Always render primary interactions (buttons, inputs) at highest opacity
- Background elements should have lower opacity to reduce distraction
- Maintain visual hierarchy: Focus Layer > Overlay Layer > Glass Layer > Base Layer

### Consistent Lighting Model

- Use unified directional light source (top-center or top-left)
- Highlights should be subtle and consistent across components
- Shadows should reinforce depth, not overwhelm

### Motion Sync

- Elements that move together should share timing curves
- Related transitions should be choreographed (stagger by 50-100ms)
- Exit animations should be faster than entry animations

## Development Workflow

**IMPORTANT: Use pnpm, not npm**

This project uses `pnpm` as the package manager. Always use pnpm commands:
- `pnpm install` - Install dependencies
- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm add [package]` - Add new dependency
- `npx shadcn@latest add [component]` - Add shadcn components (uses npx)

### Code Organization Best Practices

**Keep Files Small and Modular**

- Maximum ~200 lines per file (excluding types/docs)
- Each component should have a single responsibility
- Extract sections into separate component files
- Use composition over large monolithic files

**Component Structure**
```
src/
├── app/
│   └── page.tsx              # Page orchestration only (imports sections)
├── components/
│   ├── sections/             # Page sections (Hero, Features, etc.)
│   ├── layout/               # Layout components (Header, Footer)
│   └── shared/               # Reusable components
└── design-system/
    └── components/           # Glass design system components
```

**Example: Good vs Bad**

❌ Bad - Everything in one file:
```tsx
// page.tsx (500+ lines)
export default function Page() {
  return (
    <div>
      {/* 100 lines of hero code */}
      {/* 100 lines of features */}
      {/* 100 lines of showcase */}
      {/* etc... */}
    </div>
  )
}
```

✅ Good - Modular composition:
```tsx
// page.tsx (20 lines)
import { Hero } from '@/components/sections/hero'
import { Features } from '@/components/sections/features'

export default function Page() {
  return (
    <>
      <Hero />
      <Features />
    </>
  )
}
```

### Adding a New Component

1. Install shadcn component: `npx shadcn@latest add [component-name]`
2. Create glass wrapper in `src/design-system/components/ui/`
3. Apply glass utilities and test adaptive behavior
4. Document in `src/design-system/docs/components.md`

### Modifying Design Tokens

1. Update token files in `src/design-system/tokens/`
2. Regenerate CSS custom properties if needed
3. Test across all existing components
4. Update this document with changes

## Resources

- Full design specification: `src/design-system/docs/philosophy.md`
- Token reference: `src/design-system/docs/tokens.md`
- Component guide: `src/design-system/docs/components.md`
- Implementation details: `src/design-system/docs/implementation.md`

## Quick Reference: CSS Custom Properties

```css
/* Surface Effects */
--glass-opacity: 0.75;
--glass-blur: 30px;
--glass-tint: rgba(255, 255, 255, 0.1);

/* Elevation */
--shadow-low: 0 2px 10px rgba(0,0,0,0.08);
--shadow-medium: 0 10px 30px rgba(0,0,0,0.15);
--shadow-high: 0 20px 50px rgba(0,0,0,0.25);

/* Motion */
--motion-standard: cubic-bezier(0.32, 0.72, 0, 1);
--motion-ease-out: cubic-bezier(0.16, 1, 0.3, 1);
--motion-ease-in: cubic-bezier(0.7, 0, 0.84, 0);
--motion-duration-fast: 150ms;
--motion-duration-normal: 250ms;
--motion-duration-slow: 350ms;
```

---

**Last Updated**: 2025-10-15
**Version**: 1.0.0
**Maintainer**: Design System Team
