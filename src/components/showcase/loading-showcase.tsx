"use client";

import { GlassCard, CardHeader, CardTitle, CardDescription, CardContent } from "@/design-system/components";
import { Loader2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";

export function LoadingShowcase() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Spinners */}
      <GlassCard elevation={2} animateIn>
        <CardHeader>
          <CardTitle>Spinners</CardTitle>
          <CardDescription>Loading indicators with glass effects</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-6">
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="h-8 w-8 animate-spin text-[var(--text-primary)]" />
              <p className="text-sm text-[var(--text-secondary)] text-center">Default Spinner</p>
            </div>

            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <div className="h-12 w-12 rounded-full backdrop-blur-[var(--blur-medium)] bg-[var(--glass-tint)] border-2 border-[var(--glass-border)] border-t-purple-500 animate-spin" />
              </div>
              <p className="text-sm text-[var(--text-secondary)] text-center">Glass Spinner</p>
            </div>

            <div className="flex flex-col items-center gap-4">
              <div className="flex gap-2">
                {[0, 1, 2].map(i => (
                  <div
                    key={i}
                    className="h-3 w-3 rounded-full backdrop-blur-[var(--blur-medium)] bg-purple-500/50 animate-bounce"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  />
                ))}
              </div>
              <p className="text-sm text-[var(--text-secondary)] text-center">Bouncing Dots</p>
            </div>
          </div>
        </CardContent>
      </GlassCard>

      {/* Progress Bars */}
      <GlassCard elevation={2} animateIn>
        <CardHeader>
          <CardTitle>Progress Bars</CardTitle>
          <CardDescription>Track progress with glass-styled bars</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-[var(--text-primary)]">Upload Progress</span>
              <span className="text-[var(--text-secondary)]">65%</span>
            </div>
            <Progress value={65} />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-[var(--text-primary)]">Processing</span>
              <span className="text-[var(--text-secondary)]">30%</span>
            </div>
            <Progress value={30} className="[&>div]:bg-green-500" />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-[var(--text-primary)]">Download</span>
              <span className="text-[var(--text-secondary)]">90%</span>
            </div>
            <Progress value={90} className="[&>div]:bg-blue-500" />
          </div>
        </CardContent>
      </GlassCard>

      {/* Skeleton Loaders */}
      <GlassCard elevation={2} animateIn className="md:col-span-2">
        <CardHeader>
          <CardTitle>Skeleton Loaders</CardTitle>
          <CardDescription>Placeholder content while loading</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Profile Skeleton */}
            <div className="space-y-4">
              <p className="text-sm font-medium text-[var(--text-primary)]">
                Profile Card Loading
              </p>
              <div className="flex items-start gap-4">
                <Skeleton className="h-12 w-12 rounded-full backdrop-blur-[var(--blur-medium)] bg-[var(--glass-tint)]" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-[200px] backdrop-blur-[var(--blur-medium)] bg-[var(--glass-tint)]" />
                  <Skeleton className="h-4 w-[150px] backdrop-blur-[var(--blur-medium)] bg-[var(--glass-tint)]" />
                </div>
              </div>
            </div>

            {/* Content Skeleton */}
            <div className="space-y-4">
              <p className="text-sm font-medium text-[var(--text-primary)]">
                Content Loading
              </p>
              <div className="space-y-2">
                <Skeleton className="h-4 w-full backdrop-blur-[var(--blur-medium)] bg-[var(--glass-tint)]" />
                <Skeleton className="h-4 w-full backdrop-blur-[var(--blur-medium)] bg-[var(--glass-tint)]" />
                <Skeleton className="h-4 w-3/4 backdrop-blur-[var(--blur-medium)] bg-[var(--glass-tint)]" />
              </div>
            </div>

            {/* Card Skeleton */}
            <div className="space-y-4 md:col-span-2">
              <p className="text-sm font-medium text-[var(--text-primary)]">
                Card Loading
              </p>
              <div className="rounded-lg border border-[var(--glass-border)] backdrop-blur-[var(--blur-medium)] bg-[var(--glass-tint)] p-6 space-y-4">
                <Skeleton className="h-6 w-1/3 backdrop-blur-[var(--blur-medium)] bg-white/10 dark:bg-white/5" />
                <Skeleton className="h-32 w-full backdrop-blur-[var(--blur-medium)] bg-white/10 dark:bg-white/5" />
                <div className="flex gap-2">
                  <Skeleton className="h-10 w-24 backdrop-blur-[var(--blur-medium)] bg-white/10 dark:bg-white/5" />
                  <Skeleton className="h-10 w-24 backdrop-blur-[var(--blur-medium)] bg-white/10 dark:bg-white/5" />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </GlassCard>
    </div>
  );
}
