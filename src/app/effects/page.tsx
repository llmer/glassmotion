import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import {
  GlassCard,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/design-system/components";

export default function EffectsPage() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50" />

        {/* Animated gradient orbs */}
        <div className="absolute top-0 -left-4 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
        <div className="absolute top-0 -right-4 w-96 h-96 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-cyan-300 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-blob animation-delay-6000" />
        <div className="absolute bottom-1/4 right-10 w-72 h-72 bg-orange-300 rounded-full mix-blend-multiply filter blur-xl opacity-65 animate-blob animation-delay-8000" />
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-green-300 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-blob animation-delay-10000" />
        <div className="absolute bottom-1/3 left-1/2 w-56 h-56 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-55 animate-blob animation-delay-12000" />
        <div className="absolute top-2/3 right-1/3 w-48 h-48 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob animation-delay-14000" />

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      <Navbar />

      <main className="container mx-auto px-4 py-8 sm:py-12 relative space-y-12">
        <div>
          <h1 className="text-4xl font-bold mb-2 text-[var(--text-primary)]">
            Glass Effects Showcase
          </h1>
          <p className="text-[var(--text-secondary)]">
            Explore masks, overlays, and optic effects for glass surfaces
          </p>
        </div>

        {/* Mask Effects */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[var(--text-primary)]">
            Mask Effects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <GlassCard elevation={2} animateIn mask="lines">
              <CardHeader>
                <CardTitle>Lines Mask</CardTitle>
                <CardDescription>Diagonal etched lines</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-[var(--text-secondary)]">
                  Subtle diagonal lines create a refined etched glass effect.
                </p>
              </CardContent>
            </GlassCard>

            <GlassCard elevation={2} animateIn mask="dots">
              <CardHeader>
                <CardTitle>Dots Mask</CardTitle>
                <CardDescription>Dot pattern texture</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-[var(--text-secondary)]">
                  Repeating dot pattern adds depth and texture.
                </p>
              </CardContent>
            </GlassCard>

            <GlassCard elevation={2} animateIn mask="grid">
              <CardHeader>
                <CardTitle>Grid Mask</CardTitle>
                <CardDescription>Geometric grid pattern</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-[var(--text-secondary)]">
                  Clean grid lines for a technical aesthetic.
                </p>
              </CardContent>
            </GlassCard>

            <GlassCard elevation={2} animateIn mask="vignette">
              <CardHeader>
                <CardTitle>Vignette Mask</CardTitle>
                <CardDescription>Radial fade effect</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-[var(--text-secondary)]">
                  Focuses attention toward the center with radial fading.
                </p>
              </CardContent>
            </GlassCard>

            <GlassCard
              elevation={2}
              animateIn
              mask={[
                { pattern: "lines-diagonal", intensity: 0.2, angle: 45 },
                { pattern: "dots", intensity: 0.15, blend: "multiply" },
              ]}
            >
              <CardHeader>
                <CardTitle>Combined Masks</CardTitle>
                <CardDescription>Lines + Dots composite</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-[var(--text-secondary)]">
                  Multiple mask layers create complex textures.
                </p>
              </CardContent>
            </GlassCard>
          </div>
        </section>

        {/* Overlay Effects */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[var(--text-primary)]">
            Overlay Effects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <GlassCard elevation={2} animateIn overlay="vignette">
              <CardHeader>
                <CardTitle>Vignette Overlay</CardTitle>
                <CardDescription>Dark edges, bright center</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-[var(--text-secondary)]">
                  Darkens edges to draw attention to content.
                </p>
              </CardContent>
            </GlassCard>

            <GlassCard elevation={2} animateIn overlay="spotlight">
              <CardHeader>
                <CardTitle>Spotlight Overlay</CardTitle>
                <CardDescription>Focused light effect</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-[var(--text-secondary)]">
                  Creates a theatrical spotlight effect.
                </p>
              </CardContent>
            </GlassCard>

            <GlassCard elevation={2} animateIn overlay="gradient-fade">
              <CardHeader>
                <CardTitle>Gradient Fade</CardTitle>
                <CardDescription>Top-down fade</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-[var(--text-secondary)]">
                  Subtle gradient from top to bottom.
                </p>
              </CardContent>
            </GlassCard>

            <GlassCard elevation={2} animateIn overlay="frosted">
              <CardHeader>
                <CardTitle>Frosted Overlay</CardTitle>
                <CardDescription>Extra frosted glass</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-[var(--text-secondary)]">
                  Enhanced frosted glass appearance with noise.
                </p>
              </CardContent>
            </GlassCard>

            <GlassCard elevation={2} animateIn overlay="color-tint">
              <CardHeader>
                <CardTitle>Color Tint</CardTitle>
                <CardDescription>Purple color overlay</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-[var(--text-secondary)]">
                  Adds a subtle color wash to the glass.
                </p>
              </CardContent>
            </GlassCard>
          </div>
        </section>

        {/* Optic Effects */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[var(--text-primary)]">
            Optic Effects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <GlassCard elevation={2} animateIn optic="chromatic-subtle">
              <CardHeader>
                <CardTitle>Chromatic Aberration</CardTitle>
                <CardDescription>Subtle RGB separation</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-[var(--text-secondary)]">
                  Simulates lens chromatic aberration for a photographic feel.
                </p>
              </CardContent>
            </GlassCard>

            <GlassCard elevation={2} animateIn optic="color-warm">
              <CardHeader>
                <CardTitle>Warm Color Filter</CardTitle>
                <CardDescription>Warm color shift</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-[var(--text-secondary)]">
                  Applies a warm color grade to the glass surface.
                </p>
              </CardContent>
            </GlassCard>

            <GlassCard elevation={2} animateIn optic="color-cool">
              <CardHeader>
                <CardTitle>Cool Color Filter</CardTitle>
                <CardDescription>Cool color shift</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-[var(--text-secondary)]">
                  Applies a cool, blue-tinted color grade.
                </p>
              </CardContent>
            </GlassCard>

            <GlassCard elevation={2} animateIn optic="rainbow">
              <CardHeader>
                <CardTitle>Rainbow Filter</CardTitle>
                <CardDescription>Colorful hue rotation</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-[var(--text-secondary)]">
                  Creates a vibrant, saturated rainbow effect.
                </p>
              </CardContent>
            </GlassCard>

            <GlassCard elevation={2} animateIn optic="duotone-purple">
              <CardHeader>
                <CardTitle>Duotone Effect</CardTitle>
                <CardDescription>Two-tone color treatment</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-[var(--text-secondary)]">
                  Converts to a stylized two-color palette.
                </p>
              </CardContent>
            </GlassCard>
          </div>
        </section>

        {/* Combined Effects */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[var(--text-primary)]">
            Combined Effects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <GlassCard
              elevation={2}
              animateIn
              mask="lines"
              overlay="vignette"
              optic="chromatic-subtle"
            >
              <CardHeader>
                <CardTitle>All Effects Combined</CardTitle>
                <CardDescription>
                  Lines + Vignette + Chromatic
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-[var(--text-secondary)]">
                  Combining multiple effect layers creates rich, complex glass
                  surfaces with depth and character.
                </p>
              </CardContent>
            </GlassCard>

            <GlassCard
              elevation={2}
              animateIn
              mask="dots"
              overlay="color-tint"
              optic="color-warm"
              className="min-h-[200px]"
            >
              <CardHeader>
                <CardTitle>Creative Combination</CardTitle>
                <CardDescription>Dots + Tint + Warm Filter</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-[var(--text-secondary)]">
                  Mix and match effects to create unique visual styles that
                  match your brand aesthetic.
                </p>
              </CardContent>
            </GlassCard>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
