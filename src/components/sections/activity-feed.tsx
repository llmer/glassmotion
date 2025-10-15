import {
  GlassCard,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  GlassBadge,
} from "@/design-system/components";

const activities = [
  {
    id: 1,
    user: "Sarah Johnson",
    action: "completed onboarding",
    time: "2 minutes ago",
    type: "success",
  },
  {
    id: 2,
    user: "Mike Chen",
    action: "upgraded to Pro plan",
    time: "15 minutes ago",
    type: "upgrade",
  },
  {
    id: 3,
    user: "Emma Davis",
    action: "shared a project",
    time: "1 hour ago",
    type: "info",
  },
  {
    id: 4,
    user: "Alex Thompson",
    action: "left feedback",
    time: "2 hours ago",
    type: "feedback",
  },
];

export function ActivityFeed() {
  return (
    <GlassCard elevation={2} className="lg:col-span-2">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Latest updates from your workspace</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center justify-between p-3 rounded-lg backdrop-blur-[15px] bg-white/10 dark:bg-white/5"
            >
              <div className="flex-1">
                <p className="text-sm font-medium">
                  <span className="font-semibold">{activity.user}</span>{" "}
                  {activity.action}
                </p>
                <p className="text-xs text-muted-foreground">
                  {activity.time}
                </p>
              </div>
              <GlassBadge className="ml-4">{activity.type}</GlassBadge>
            </div>
          ))}
        </div>
      </CardContent>
    </GlassCard>
  );
}
