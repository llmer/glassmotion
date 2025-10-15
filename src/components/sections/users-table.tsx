"use client";

import {
  GlassCard,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  GlassBadge,
} from "@/design-system/components";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const users = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    role: "Admin",
    status: "Active",
    joined: "2024-01-15",
  },
  {
    id: 2,
    name: "Mike Chen",
    email: "mike.chen@example.com",
    role: "User",
    status: "Active",
    joined: "2024-02-20",
  },
  {
    id: 3,
    name: "Emma Davis",
    email: "emma.d@example.com",
    role: "Editor",
    status: "Active",
    joined: "2024-03-10",
  },
  {
    id: 4,
    name: "Alex Thompson",
    email: "alex.t@example.com",
    role: "User",
    status: "Inactive",
    joined: "2024-01-28",
  },
  {
    id: 5,
    name: "Lisa Wang",
    email: "lisa.wang@example.com",
    role: "Editor",
    status: "Active",
    joined: "2024-04-05",
  },
];

export function UsersTable() {
  return (
    <GlassCard elevation={2}>
      <CardHeader>
        <CardTitle>Team Members</CardTitle>
        <CardDescription>Manage your team and their roles</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-white/10 hover:bg-white/5">
              <TableHead className="font-semibold">Name</TableHead>
              <TableHead className="font-semibold">Email</TableHead>
              <TableHead className="font-semibold">Role</TableHead>
              <TableHead className="font-semibold">Status</TableHead>
              <TableHead className="font-semibold">Joined</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow
                key={user.id}
                className="border-white/10 hover:bg-white/5 transition-colors"
              >
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell className="text-muted-foreground">
                  {user.email}
                </TableCell>
                <TableCell>
                  <GlassBadge className="bg-blue-500/20 text-blue-700 dark:text-blue-300">
                    {user.role}
                  </GlassBadge>
                </TableCell>
                <TableCell>
                  <GlassBadge
                    className={
                      user.status === "Active"
                        ? "bg-green-500/20 text-green-700 dark:text-green-300"
                        : "bg-gray-500/20 text-gray-700 dark:text-gray-300"
                    }
                  >
                    {user.status}
                  </GlassBadge>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {user.joined}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </GlassCard>
  );
}
