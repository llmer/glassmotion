export function Footer() {
  return (
    <footer className="container mx-auto px-4 py-8 mt-16">
      <div className="backdrop-blur-[30px] bg-white/10 dark:bg-white/5 border border-white/20 rounded-2xl p-6 text-center">
        <p className="text-sm text-muted-foreground">
          Built with Next.js, React, Tailwind CSS, and shadcn/ui
        </p>
        <p className="text-xs text-muted-foreground mt-2">
          GlassMotion Design System • 2025
        </p>
      </div>
    </footer>
  );
}
