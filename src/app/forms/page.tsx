import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ContactForm } from "@/components/sections/contact-form";
import { SettingsForm } from "@/components/sections/settings-form";
import { AnalyticsChart } from "@/components/sections/analytics-chart";

export default function FormsPage() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated gradient background with patterns */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-purple-900 dark:to-slate-900" />

        {/* Animated gradient orbs */}
        <div className="absolute top-0 -left-4 w-96 h-96 bg-purple-300 dark:bg-purple-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-70 animate-blob" />
        <div className="absolute top-0 -right-4 w-96 h-96 bg-yellow-300 dark:bg-yellow-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-70 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-pink-300 dark:bg-pink-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-70 animate-blob animation-delay-4000" />

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      <Navbar />

      <main className="container mx-auto px-4 py-8 sm:py-12 relative space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-2 text-[var(--text-primary)]">Forms & Analytics</h1>
          <p className="text-[var(--text-secondary)]">
            Beautiful glass-styled forms and interactive charts
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ContactForm />
          <SettingsForm />
        </div>

        <AnalyticsChart />
      </main>

      <Footer />
    </div>
  );
}
