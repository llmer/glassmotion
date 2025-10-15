import Link from "next/link";
import { GlassButton, GlassNavBar } from "@/design-system/components";

export function Navbar() {
  return (
    <GlassNavBar>
      <div className="flex items-center gap-6">
        <Link href="/">
          <div className="text-xl font-bold text-[var(--text-primary)] cursor-pointer">
            GlassMotion
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-2">
          <Link href="/dashboard">
            <GlassButton variant="ghost" size="sm">
              Dashboard
            </GlassButton>
          </Link>
          <Link href="/forms">
            <GlassButton variant="ghost" size="sm">
              Forms
            </GlassButton>
          </Link>
        </nav>
      </div>

      <div className="flex items-center gap-3">
        <Link href="/" className="hidden sm:inline-flex">
          <GlassButton variant="ghost">
            Documentation
          </GlassButton>
        </Link>
        <GlassButton focusLayer>Get Started</GlassButton>
      </div>
    </GlassNavBar>
  );
}
