import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { StatsGrid } from "@/components/sections/stats-grid";
import { ActivityFeed } from "@/components/sections/activity-feed";
import { ChartCard } from "@/components/sections/chart-card";
import { UsersTable } from "@/components/sections/users-table";

export default function DashboardPage() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated gradient background with patterns */}
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

      <main className="container mx-auto px-4 py-8 sm:py-12 relative space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here&apos;s what&apos;s happening with your workspace.
          </p>
        </div>

        <StatsGrid />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <ActivityFeed />
          <ChartCard />
        </div>

        <UsersTable />
      </main>

      <Footer />
    </div>
  );
}
