import {
  GlassCard,
  CardHeader,
  CardTitle,
  CardContent,
  GlassBadge,
} from "@/design-system/components";

const stats = [
  {
    title: "Total Revenue",
    value: "$45,231",
    change: "+20.1%",
    trend: "up" as const,
  },
  {
    title: "Active Users",
    value: "2,350",
    change: "+12.5%",
    trend: "up" as const,
  },
  {
    title: "Conversion Rate",
    value: "3.65%",
    change: "+4.3%",
    trend: "up" as const,
  },
  {
    title: "Avg. Session",
    value: "4m 32s",
    change: "-2.1%",
    trend: "down" as const,
  },
];

export function StatsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat) => (
        <GlassCard key={stat.title} elevation={2} hoverable animateIn>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="text-3xl font-bold">{stat.value}</div>
            <GlassBadge
              className={
                stat.trend === "up"
                  ? "bg-green-500/20 text-green-700 dark:text-green-300"
                  : "bg-red-500/20 text-red-700 dark:text-red-300"
              }
            >
              {stat.change}
            </GlassBadge>
          </CardContent>
        </GlassCard>
      ))}
    </div>
  );
}
