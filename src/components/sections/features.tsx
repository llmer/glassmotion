import {
  GlassButton,
  GlassCard,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/design-system/components";

const features = [
  {
    title: "Translucent Surfaces",
    description: "Layered glass effects with adaptive blur",
    content:
      "Create depth through transparency. Glass surfaces blur the background while maintaining context visibility.",
  },
  {
    title: "Adaptive Contrast",
    description: "Automatic text color adjustment",
    content:
      "Text dynamically adjusts to maintain WCAG AA contrast ratios against varying backgrounds.",
  },
  {
    title: "Fluid Motion",
    description: "Physics-based animations",
    content:
      "Smooth transitions with custom easing curves that guide attention and reinforce spatial relationships.",
  },
];

export function Features() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
      {features.map((feature) => (
        <GlassCard
          key={feature.title}
          elevation={1}
          hoverable
          animateIn
          adaptiveBlur
          lighting
          className="h-full"
        >
          <CardHeader>
            <CardTitle>{feature.title}</CardTitle>
            <CardDescription>{feature.description}</CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <p className="text-sm text-[var(--text-secondary)]">
              {feature.content}
            </p>
          </CardContent>
          <CardFooter>
            <GlassButton variant="ghost" size="sm">
              Learn more →
            </GlassButton>
          </CardFooter>
        </GlassCard>
      ))}
    </div>
  );
}
