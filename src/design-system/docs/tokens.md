# Design Tokens Reference

Complete reference for all GlassMotion design tokens.

## Color Tokens

### Tint System

Base accent colors that define the theme identity.

```typescript
// TypeScript
import { colors } from '@/design-system/tokens'

colors.tint.base        // var(--accent, #007AFF)
colors.tint.light       // Lightened variant (60% base + 40% white)
colors.tint.dark        // Darkened variant (60% base + 40% black)
```

```css
/* CSS Custom Properties */
--accent: #007AFF;  /* Customize per theme */
```

### Text Colors

Adaptive text colors with WCAG-compliant contrast ratios.

| Token | Light Mode | Dark Mode | Purpose |
|-------|-----------|-----------|---------|
| `text.primary` | `rgba(0,0,0,0.90)` | `rgba(255,255,255,0.90)` | Primary content |
| `text.secondary` | `rgba(0,0,0,0.63)` | `rgba(255,255,255,0.63)` | Supporting text |
| `text.disabled` | `rgba(0,0,0,0.36)` | `rgba(255,255,255,0.36)` | Disabled state |

### Glass Surface Colors

Translucent background tints for glass surfaces.

```typescript
// Light mode
colors.glass.light.base      // rgba(255, 255, 255, 0.15)
colors.glass.light.overlay   // rgba(255, 255, 255, 0.25)
colors.glass.light.focus     // rgba(255, 255, 255, 0.35)

// Dark mode
colors.glass.dark.base       // rgba(255, 255, 255, 0.10)
colors.glass.dark.overlay    // rgba(255, 255, 255, 0.15)
colors.glass.dark.focus      // rgba(255, 255, 255, 0.25)
```

### Border Colors

Subtle borders for glass surface definition.

```typescript
colors.border.light   // rgba(255, 255, 255, 0.20)
colors.border.dark    // rgba(255, 255, 255, 0.15)
```

## Effect Tokens

### Blur Values

Backdrop blur intensities for different elevation levels.

| Token | Value | Usage |
|-------|-------|-------|
| `blur.none` | `0px` | Disabled/fallback |
| `blur.low` | `15px` | Navbars, low elevation |
| `blur.medium` | `30px` | Cards, buttons, standard surfaces |
| `blur.high` | `50px` | Modals, overlays, high elevation |
| `blur.ultra` | `80px` | Full-screen overlays |

```css
/* CSS Variables */
--blur-low: 15px;
--blur-medium: 30px;
--blur-high: 50px;
```

### Opacity Values

Transparency levels for different surface types.

| Token | Value | Usage |
|-------|-------|-------|
| `opacity.disabled` | `0.4` | Disabled elements |
| `opacity.secondary` | `0.7` | Secondary content |
| `opacity.surface` | `0.75` | Standard glass surfaces |
| `opacity.overlay` | `0.85` | Overlays and modals |
| `opacity.focused` | `0.95` | Active/focused elements |

### Shadow Elevations

Box shadows for depth perception.

| Token | Value | Usage |
|-------|-------|-------|
| `shadow.none` | `none` | Flat elements |
| `shadow.low` | `0 2px 10px rgba(0,0,0,0.08)` | Subtle elevation |
| `shadow.medium` | `0 10px 30px rgba(0,0,0,0.15)` | Standard elevation |
| `shadow.high` | `0 20px 50px rgba(0,0,0,0.25)` | High elevation |
| `shadow.ultra` | `0 30px 80px rgba(0,0,0,0.35)` | Maximum elevation |

### Combined Elevation Presets

Pre-configured blur + shadow + opacity combinations.

```typescript
effects.elevation.level1  // { blur: 15px, shadow: low, opacity: 0.75 }
effects.elevation.level2  // { blur: 25px, shadow: medium, opacity: 0.80 }
effects.elevation.level3  // { blur: 40px, shadow: high, opacity: 0.85 }
```

### Border Radius

Corner radius values matching the design system.

| Token | Value | Usage |
|-------|-------|-------|
| `radius.small` | `8px` | Small elements, badges |
| `radius.medium` | `14px` | Buttons, inputs |
| `radius.large` | `20px` | Cards, panels |
| `radius.xlarge` | `28px` | Large containers |
| `radius.full` | `9999px` | Pills, circular elements |

```css
/* CSS Variables */
--radius-small: 8px;
--radius-medium: 14px;
--radius-large: 20px;
--radius-xlarge: 28px;
```

### Highlight Effects

Inner highlights for glass refraction simulation.

```typescript
effects.highlight.subtle   // inset 0 1px 0 0 rgba(255,255,255,0.1)
effects.highlight.medium   // inset 0 1px 0 0 rgba(255,255,255,0.2)
effects.highlight.strong   // inset 0 2px 0 0 rgba(255,255,255,0.3)
```

## Motion Tokens

### Easing Curves

Timing functions for natural-feeling animations.

| Token | Value | Usage |
|-------|-------|-------|
| `curves.standard` | `cubic-bezier(0.32, 0.72, 0, 1)` | Default transitions |
| `curves.easeOut` | `cubic-bezier(0.16, 1, 0.3, 1)` | Entry animations |
| `curves.easeIn` | `cubic-bezier(0.7, 0, 0.84, 0)` | Exit animations |
| `curves.spring` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Bouncy emphasis |

```css
/* CSS Variables */
--motion-standard: cubic-bezier(0.32, 0.72, 0, 1);
--motion-ease-out: cubic-bezier(0.16, 1, 0.3, 1);
--motion-ease-in: cubic-bezier(0.7, 0, 0.84, 0);
```

### Duration Values

Animation and transition durations.

| Token | Value | Usage |
|-------|-------|-------|
| `duration.fast` | `150ms` | Micro-interactions, hover |
| `duration.normal` | `250ms` | Standard transitions |
| `duration.slow` | `350ms` | Complex animations |
| `duration.slower` | `500ms` | Page transitions |

```css
/* CSS Variables */
--motion-duration-fast: 150ms;
--motion-duration-normal: 250ms;
--motion-duration-slow: 350ms;
```

### Component-Specific Motion

Pre-configured animation settings for specific components.

```typescript
// Button
motion.components.button.hover
  // { duration: '200ms', curve: 'cubic-bezier(0.32,0.72,0,1)' }

// Card
motion.components.card.enter
  // { duration: '350ms', curve: 'easeOut', scale: {from: 0.95, to: 1.0} }

// Menu
motion.components.menu.slideIn
  // { duration: '300ms', curve: 'easeOut' }
```

## Usage Examples

### TypeScript

```typescript
import { colors, effects, motion } from '@/design-system/tokens'

const buttonStyle = {
  backgroundColor: colors.glass.light.base,
  backdropFilter: `blur(${effects.blur.medium})`,
  transition: `all ${motion.duration.fast} ${motion.curves.standard}`,
  borderRadius: effects.radius.medium,
}
```

### CSS

```css
.glass-button {
  background-color: var(--glass-tint);
  backdrop-filter: blur(var(--blur-medium));
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-medium);
  box-shadow: var(--shadow-low);
  transition: all var(--motion-duration-fast) var(--motion-standard);
}
```

### Tailwind

```tsx
<div className="
  backdrop-blur-[var(--blur-medium)]
  bg-[var(--glass-tint)]
  border border-[var(--glass-border)]
  rounded-[var(--radius-large)]
  shadow-[var(--shadow-medium)]
">
  Glass content
</div>
```

## Helper Functions

### Color Mixing

```typescript
import { colorMix, createTintPalette } from '@/design-system/utils'

// Mix two colors
const mixed = colorMix('#007AFF', 'white', 40)
// => "color-mix(in srgb, #007AFF 60%, white 40%)"

// Create tint palette
const palette = createTintPalette('#007AFF')
// => { base, light, dark, ultraLight, ultraDark }
```

### Glass Surface Creation

```typescript
import { createGlassSurface } from '@/design-system/tokens'

const glassStyles = createGlassSurface('level2', 'rgba(255,255,255,0.15)')
// => {
//   backdropFilter: 'blur(25px)',
//   backgroundColor: 'rgba(255,255,255,0.15)',
//   boxShadow: '0 10px 30px rgba(0,0,0,0.12)',
//   border: '1px solid rgba(255,255,255,0.2)'
// }
```

### Transition Creation

```typescript
import { createTransition } from '@/design-system/tokens'

const transition = createTransition(['opacity', 'transform'], 'normal', 'easeOut')
// => "opacity 250ms cubic-bezier(0.16,1,0.3,1), transform 250ms cubic-bezier(0.16,1,0.3,1)"
```

## Customization

### Changing the Accent Color

Update the CSS variable in your theme:

```css
:root {
  --accent: #FF2D55;  /* Custom accent */
}
```

### Adjusting Blur Intensity

Modify blur values globally:

```css
:root {
  --blur-low: 10px;     /* Less blur */
  --blur-medium: 20px;
  --blur-high: 35px;
}
```

### Custom Motion Timing

Override motion tokens for different feel:

```css
:root {
  --motion-duration-normal: 300ms;  /* Slower transitions */
  --motion-standard: ease-out;      /* Simpler easing */
}
```
