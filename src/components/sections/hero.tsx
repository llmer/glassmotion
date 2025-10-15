import Link from "next/link";
import { GlassButton, ChromaticText } from "@/design-system/components";

export function Hero() {
  return (
    <div className="max-w-3xl mx-auto text-center mb-16">
      <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 text-[var(--text-primary)]">
        Beautiful <ChromaticText preset="logo">Glass</ChromaticText> Interfaces
      </h1>
      <p className="text-xl text-[var(--text-secondary)] mb-8 max-w-2xl mx-auto">
        Create stunning, translucent UI components with the <ChromaticText preset="minimal">Glass</ChromaticText>Motion design
        system. Built on shadcn/ui and Tailwind CSS.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        {/* Primary CTA - always visible */}
        <Link href="/components">
          <GlassButton size="lg" className="text-base w-full sm:w-auto" focusLayer>
            Explore Components
          </GlassButton>
        </Link>

        {/* Secondary CTAs - hidden on mobile */}
        <Link href="/dashboard" className="hidden sm:block">
          <GlassButton size="lg" variant="outline" className="text-base">
            Dashboard
          </GlassButton>
        </Link>
        <Link href="/forms" className="hidden sm:block">
          <GlassButton size="lg" variant="outline" className="text-base">
            Forms
          </GlassButton>
        </Link>
        <Link href="/effects" className="hidden sm:block">
          <GlassButton size="lg" variant="outline" className="text-base">
            Effects
          </GlassButton>
        </Link>
      </div>
    </div>
  );
}
