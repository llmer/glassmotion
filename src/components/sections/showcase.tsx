import {
  GlassButton,
  GlassCard,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/design-system/components";

export function Showcase() {
  return (
    <div className="max-w-4xl mx-auto mb-8">
      <GlassCard elevation={3}>
        <CardHeader>
          <CardTitle className="text-2xl">Built on shadcn/ui</CardTitle>
          <CardDescription>
            Extends shadcn components with glass effects
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            GlassMotion wraps shadcn/ui components with translucent surfaces,
            adaptive blur, and fluid animations. Get the accessibility and
            functionality of shadcn with a stunning glass aesthetic.
          </p>

          <div className="flex flex-wrap gap-3">
            <GlassButton>Primary Button</GlassButton>
            <GlassButton variant="secondary">Secondary</GlassButton>
            <GlassButton variant="outline">Outline</GlassButton>
            <GlassButton variant="ghost">Ghost</GlassButton>
          </div>

          <div className="pt-4 border-t border-white/20">
            <h4 className="font-semibold mb-3">Key Features:</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span>TypeScript design tokens with full type safety</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span>Automatic dark mode support</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span>
                  Respects reduced motion and transparency preferences
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span>WCAG AA compliant contrast ratios</span>
              </li>
            </ul>
          </div>
        </CardContent>
        <CardFooter className="flex gap-3">
          <GlassButton>View on GitHub</GlassButton>
          <GlassButton variant="outline">Documentation</GlassButton>
        </CardFooter>
      </GlassCard>
    </div>
  );
}
