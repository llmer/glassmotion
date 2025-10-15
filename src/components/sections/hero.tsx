import { GlassButton } from "@/design-system/components";

export function Hero() {
  return (
    <div className="max-w-3xl mx-auto text-center mb-16">
      <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 text-[var(--text-primary)]">
        Beautiful Glass Interfaces
      </h1>
      <p className="text-xl text-[var(--text-secondary)] mb-8 max-w-2xl mx-auto">
        Create stunning, translucent UI components with the GlassMotion design
        system. Built on shadcn/ui and Tailwind CSS.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <GlassButton size="lg" className="text-base" focusLayer>
          View Components
        </GlassButton>
        <GlassButton size="lg" variant="outline" className="text-base">
          Read Documentation
        </GlassButton>
      </div>
    </div>
  );
}
