import {
  GlassCard,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/design-system/components";

export function QuickStart() {
  return (
    <div className="max-w-4xl mx-auto">
      <GlassCard elevation={2}>
        <CardHeader>
          <CardTitle>Quick Start</CardTitle>
          <CardDescription>
            Get started with GlassMotion in seconds
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium mb-2">1. Import components</p>
              <code className="block bg-black/5 dark:bg-white/5 rounded-lg p-3 text-sm font-mono">
                import {`{`} GlassButton, GlassCard {`}`} from
                &apos;@/design-system/components&apos;
              </code>
            </div>

            <div>
              <p className="text-sm font-medium mb-2">2. Use in your app</p>
              <code className="block bg-black/5 dark:bg-white/5 rounded-lg p-3 text-sm font-mono">
                &lt;GlassCard elevation={`{2}`}&gt;
                <br />
                &nbsp;&nbsp;&lt;GlassButton&gt;Click me&lt;/GlassButton&gt;
                <br />
                &lt;/GlassCard&gt;
              </code>
            </div>

            <p className="text-sm text-muted-foreground pt-2">
              See{" "}
              <span className="font-mono bg-black/5 dark:bg-white/5 px-1.5 py-0.5 rounded">
                CLAUDE.md
              </span>{" "}
              for complete documentation and guidelines.
            </p>
          </div>
        </CardContent>
      </GlassCard>
    </div>
  );
}
