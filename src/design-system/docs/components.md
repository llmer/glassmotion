# Components Guide

Complete reference for all GlassMotion components built on shadcn/ui.

## GlassButton

Glass-styled button component with adaptive effects.

### Import

```typescript
import { GlassButton } from '@/design-system/components'
```

### Basic Usage

```tsx
<GlassButton>
  Click me
</GlassButton>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `glassIntensity` | `number` | `15` | Glass effect intensity (0-100) |
| `hoverLift` | `boolean` | `true` | Enable hover lift animation |
| `focusGlow` | `boolean` | `true` | Enable focus glow effect |
| `variant` | `string` | `'default'` | Button variant from shadcn |
| ...ButtonProps | - | - | All shadcn Button props |

### Variants

```tsx
// Primary glass button
<GlassButton variant="default">Primary</GlassButton>

// Secondary glass button
<GlassButton variant="secondary">Secondary</GlassButton>

// Destructive glass button
<GlassButton variant="destructive">Delete</GlassButton>

// Outline glass button
<GlassButton variant="outline">Outline</GlassButton>

// Ghost glass button
<GlassButton variant="ghost">Ghost</GlassButton>
```

### Customization

```tsx
// Higher glass intensity
<GlassButton glassIntensity={30}>
  Strong Glass Effect
</GlassButton>

// Disable hover lift
<GlassButton hoverLift={false}>
  No Lift Effect
</GlassButton>

// With icon
<GlassButton>
  <Icon className="mr-2 h-4 w-4" />
  With Icon
</GlassButton>
```

### Accessibility

- Maintains WCAG AA contrast ratios
- Full keyboard navigation support
- Screen reader compatible
- Respects reduced motion preferences

---

## GlassCard

Glass-styled card container with elevation levels.

### Import

```typescript
import {
  GlassCard,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from '@/design-system/components'
```

### Basic Usage

```tsx
<GlassCard>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description</CardDescription>
  </CardHeader>
  <CardContent>
    Card content goes here
  </CardContent>
  <CardFooter>
    Card footer
  </CardFooter>
</GlassCard>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `elevation` | `1 \| 2 \| 3` | `2` | Visual elevation level |
| `hoverable` | `boolean` | `true` | Enable hover lift effect |
| `animateIn` | `boolean` | `false` | Animate card entrance |
| ...HTMLDivElement | - | - | All div props |

### Elevation Levels

```tsx
// Low elevation (subtle)
<GlassCard elevation={1}>
  Low Elevation Card
</GlassCard>

// Medium elevation (default)
<GlassCard elevation={2}>
  Medium Elevation Card
</GlassCard>

// High elevation (prominent)
<GlassCard elevation={3}>
  High Elevation Card
</GlassCard>
```

### Interactive Cards

```tsx
// Hoverable card with animation
<GlassCard hoverable animateIn>
  <CardHeader>
    <CardTitle>Interactive Card</CardTitle>
  </CardHeader>
  <CardContent>
    This card lifts on hover and animates in on mount
  </CardContent>
</GlassCard>

// Non-hoverable static card
<GlassCard hoverable={false}>
  <CardContent>Static content card</CardContent>
</GlassCard>
```

### Layout Examples

```tsx
// Grid of cards
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <GlassCard animateIn>
    <CardHeader>
      <CardTitle>Card 1</CardTitle>
    </CardHeader>
    <CardContent>Content 1</CardContent>
  </GlassCard>
  <GlassCard animateIn>
    <CardHeader>
      <CardTitle>Card 2</CardTitle>
    </CardHeader>
    <CardContent>Content 2</CardContent>
  </GlassCard>
  <GlassCard animateIn>
    <CardHeader>
      <CardTitle>Card 3</CardTitle>
    </CardHeader>
    <CardContent>Content 3</CardContent>
  </GlassCard>
</div>
```

---

## GlassNavBar

Glass-styled navigation bar with adaptive blur.

### Import

```typescript
import {
  GlassNavBar,
  GlassNavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink
} from '@/design-system/components'
```

### Basic Usage

```tsx
<GlassNavBar>
  <div className="flex items-center gap-4">
    <Logo />
    <nav>
      <ul className="flex gap-4">
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
    </nav>
  </div>
  <div>
    <GlassButton>Sign In</GlassButton>
  </div>
</GlassNavBar>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `position` | `'top' \| 'bottom'` | `'top'` | Position of navbar |
| `sticky` | `boolean` | `true` | Make navbar sticky |
| `blurIntensity` | `'low' \| 'medium' \| 'high'` | `'low'` | Blur strength |
| ...HTMLElement | - | - | All nav element props |

### Positioning

```tsx
// Top navigation (default)
<GlassNavBar position="top">
  Top navigation content
</GlassNavBar>

// Bottom navigation
<GlassNavBar position="bottom">
  Bottom navigation content
</GlassNavBar>

// Non-sticky navbar
<GlassNavBar sticky={false}>
  Non-sticky content
</GlassNavBar>
```

### Blur Intensity

```tsx
// Low blur (default, better performance)
<GlassNavBar blurIntensity="low">
  Low blur navbar
</GlassNavBar>

// Medium blur
<GlassNavBar blurIntensity="medium">
  Medium blur navbar
</GlassNavBar>

// High blur (most prominent)
<GlassNavBar blurIntensity="high">
  High blur navbar
</GlassNavBar>
```

### With Navigation Menu

```tsx
<GlassNavBar>
  <div className="flex items-center gap-8">
    <Logo />

    <GlassNavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink href="/">
            Home
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="/products">
            Products
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="/about">
            About
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </GlassNavigationMenu>
  </div>

  <div className="flex items-center gap-2">
    <GlassButton variant="ghost">Sign In</GlassButton>
    <GlassButton>Sign Up</GlassButton>
  </div>
</GlassNavBar>
```

---

## Utility Classes

Pre-built CSS classes for quick styling.

### Glass Surface Classes

```tsx
// Base glass surface
<div className="glass-surface">
  Glass surface with blur
</div>

// Glass overlay (higher elevation)
<div className="glass-overlay">
  Glass overlay
</div>

// Glass card preset
<div className="glass-card">
  Glass card container
</div>
```

### Elevation Classes

```tsx
<div className="glass-elevation-1">Low elevation</div>
<div className="glass-elevation-2">Medium elevation</div>
<div className="glass-elevation-3">High elevation</div>
```

### Blur Variants

```tsx
<div className="glass-blur-none">No blur</div>
<div className="glass-blur-low">Low blur (15px)</div>
<div className="glass-blur-medium">Medium blur (30px)</div>
<div className="glass-blur-high">High blur (50px)</div>
```

### Hover Effects

```tsx
// Lift on hover
<div className="glass-surface glass-hover-lift">
  Lifts on hover
</div>

// Glow on hover
<div className="glass-surface glass-hover-glow">
  Glows on hover
</div>
```

### Animation Classes

```tsx
// Fade in animation
<div className="glass-surface glass-animate-in">
  Fades in on mount
</div>

// Scale in animation
<div className="glass-surface glass-scale-in">
  Scales in on mount
</div>
```

---

## Composition Examples

### Dashboard Layout

```tsx
<div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
  <GlassNavBar>
    <Logo />
    <GlassButton>Settings</GlassButton>
  </GlassNavBar>

  <main className="container mx-auto p-8">
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <GlassCard elevation={2} animateIn>
        <CardHeader>
          <CardTitle>Stats</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-bold">1,234</p>
        </CardContent>
      </GlassCard>

      <GlassCard elevation={2} animateIn className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          Activity content...
        </CardContent>
      </GlassCard>
    </div>
  </main>
</div>
```

### Modal Dialog

```tsx
<div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center">
  <GlassCard elevation={3} className="max-w-md w-full" animateIn>
    <CardHeader>
      <CardTitle>Confirm Action</CardTitle>
      <CardDescription>Are you sure you want to continue?</CardDescription>
    </CardHeader>
    <CardContent>
      <p>This action cannot be undone.</p>
    </CardContent>
    <CardFooter className="flex gap-2">
      <GlassButton variant="outline">Cancel</GlassButton>
      <GlassButton variant="destructive">Confirm</GlassButton>
    </CardFooter>
  </GlassCard>
</div>
```

### Hero Section

```tsx
<section className="relative min-h-screen flex items-center justify-center">
  {/* Background image */}
  <div className="absolute inset-0 bg-cover bg-center"
       style={{backgroundImage: 'url(/hero-bg.jpg)'}} />

  {/* Glass content card */}
  <GlassCard elevation={3} animateIn className="max-w-2xl z-10">
    <CardHeader>
      <CardTitle className="text-5xl">Welcome</CardTitle>
      <CardDescription className="text-xl">
        Beautiful glass interfaces
      </CardDescription>
    </CardHeader>
    <CardContent>
      <p className="text-lg">
        Create stunning, translucent UI components with GlassMotion.
      </p>
    </CardContent>
    <CardFooter className="flex gap-4">
      <GlassButton size="lg">Get Started</GlassButton>
      <GlassButton variant="outline" size="lg">Learn More</GlassButton>
    </CardFooter>
  </GlassCard>
</section>
```

---

## Best Practices

### Do's

- ✅ Use glass effects on top of visual backgrounds
- ✅ Maintain consistent elevation hierarchy
- ✅ Test contrast ratios for text readability
- ✅ Respect user's reduced motion preferences
- ✅ Provide fallbacks for unsupported browsers

### Don'ts

- ❌ Don't stack too many glass layers
- ❌ Don't use glass on plain white backgrounds (no context)
- ❌ Don't rely on color alone for information
- ❌ Don't ignore accessibility requirements
- ❌ Don't animate everything at once
