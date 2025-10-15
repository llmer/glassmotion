import Link from "next/link";
import { GlassButton, GlassNavBar, ChromaticText } from "@/design-system/components";

export function Navbar() {
  return (
    <GlassNavBar>
      <div className="flex items-center gap-6">
        <Link href="/">
          <span className="text-xl font-bold text-[var(--text-primary)] cursor-pointer">
            <ChromaticText preset="logo">Glass</ChromaticText>
            Motion
          </span>
        </Link>
      </div>

      <div className="flex items-center gap-3">
        <a href="https://github.com/llmer/glassmotion" target="_blank" rel="noopener noreferrer">
          <GlassButton variant="ghost">
            GitHub
          </GlassButton>
        </a>
      </div>
    </GlassNavBar>
  );
}
