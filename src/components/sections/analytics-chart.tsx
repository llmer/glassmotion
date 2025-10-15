"use client";

import {
  GlassCard,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/design-system/components";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", revenue: 4000, users: 2400, conversions: 240 },
  { month: "Feb", revenue: 3000, users: 1398, conversions: 210 },
  { month: "Mar", revenue: 2000, users: 9800, conversions: 290 },
  { month: "Apr", revenue: 2780, users: 3908, conversions: 300 },
  { month: "May", revenue: 1890, users: 4800, conversions: 181 },
  { month: "Jun", revenue: 2390, users: 3800, conversions: 250 },
  { month: "Jul", revenue: 3490, users: 4300, conversions: 310 },
];

interface TooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    color: string;
    payload: { month: string };
  }>;
}

const CustomTooltip = ({ active, payload }: TooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="backdrop-blur-[20px] bg-white/30 dark:bg-white/20 border-0 shadow-lg rounded-lg p-3">
        <p className="font-semibold mb-2">{payload[0].payload.month}</p>
        {payload.map((entry, index: number) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {entry.value.toLocaleString()}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export function AnalyticsChart() {
  return (
    <div className="space-y-6">
      <GlassCard elevation={2}>
        <CardHeader>
          <CardTitle>Revenue Trend</CardTitle>
          <CardDescription>Monthly revenue over time</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.3)" />
              <XAxis
                dataKey="month"
                stroke="#64748b"
                style={{ fontSize: '12px', fontWeight: '500' }}
              />
              <YAxis
                stroke="#64748b"
                style={{ fontSize: '12px', fontWeight: '500' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#8b5cf6"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorRevenue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </GlassCard>

      <GlassCard elevation={2}>
        <CardHeader>
          <CardTitle>User Growth & Conversions</CardTitle>
          <CardDescription>Track user acquisition and conversion rates</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.3)" />
              <XAxis
                dataKey="month"
                stroke="#64748b"
                style={{ fontSize: '12px', fontWeight: '500' }}
              />
              <YAxis
                stroke="#64748b"
                style={{ fontSize: '12px', fontWeight: '500' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line
                type="monotone"
                dataKey="users"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ fill: "#3b82f6", r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="conversions"
                stroke="#10b981"
                strokeWidth={2}
                dot={{ fill: "#10b981", r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </GlassCard>

      <GlassCard elevation={2}>
        <CardHeader>
          <CardTitle>Quarterly Comparison</CardTitle>
          <CardDescription>Compare metrics across months</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.3)" />
              <XAxis
                dataKey="month"
                stroke="#64748b"
                style={{ fontSize: '12px', fontWeight: '500' }}
              />
              <YAxis
                stroke="#64748b"
                style={{ fontSize: '12px', fontWeight: '500' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="revenue" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
              <Bar dataKey="users" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </GlassCard>
    </div>
  );
}
