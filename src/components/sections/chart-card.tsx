"use client";

import {
  GlassCard,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/design-system/components";

export function ChartCard() {
  const data = [
    { day: "Mon", value: 40 },
    { day: "Tue", value: 65 },
    { day: "Wed", value: 45 },
    { day: "Thu", value: 80 },
    { day: "Fri", value: 55 },
    { day: "Sat", value: 90 },
    { day: "Sun", value: 70 },
  ];

  return (
    <GlassCard elevation={2}>
      <CardHeader>
        <CardTitle>Performance Overview</CardTitle>
        <CardDescription>Your metrics over the last 7 days</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[200px] flex items-end justify-between gap-2">
          {data.map((item, i) => (
            <div key={i} className="flex-1 flex flex-col justify-end group">
              <div className="relative">
                <div
                  className="w-full rounded-t-lg backdrop-blur-[15px] bg-gradient-to-t from-purple-500/50 to-blue-500/50 transition-all duration-300 group-hover:from-purple-500/70 group-hover:to-blue-500/70 shadow-lg"
                  style={{ height: `${item.value * 2}px` }}
                />
              </div>
              <p className="text-xs text-center font-medium mt-2 text-gray-700 dark:text-gray-300">
                {item.day}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </GlassCard>
  );
}
