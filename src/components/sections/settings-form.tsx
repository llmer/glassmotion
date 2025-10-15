"use client";

import {
  GlassCard,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  GlassButton,
  GlassInput,
  GlassBadge,
} from "@/design-system/components";
import { Label } from "@/components/ui/label";

export function SettingsForm() {
  return (
    <div className="space-y-6">
      <GlassCard elevation={2} animateIn adaptiveBlur lighting>
        <CardHeader>
          <CardTitle>Profile Settings</CardTitle>
          <CardDescription>
            Update your personal information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username" className="text-sm font-medium">
              Username
            </Label>
            <GlassInput
              id="username"
              defaultValue="johndoe"
              placeholder="Enter username"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="displayName" className="text-sm font-medium">
              Display Name
            </Label>
            <GlassInput
              id="displayName"
              defaultValue="John Doe"
              placeholder="Enter display name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio" className="text-sm font-medium">
              Bio
            </Label>
            <GlassInput
              id="bio"
              defaultValue="Product designer & developer"
              placeholder="Tell us about yourself"
            />
          </div>
        </CardContent>
        <CardFooter>
          <GlassButton>Save Changes</GlassButton>
        </CardFooter>
      </GlassCard>

      <GlassCard elevation={2} animateIn adaptiveBlur lighting>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Account Status</CardTitle>
              <CardDescription>Your subscription details</CardDescription>
            </div>
            <GlassBadge className="bg-green-500/20 text-green-700 dark:text-green-300">
              Pro Plan
            </GlassBadge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Member Since</p>
              <p className="text-lg font-semibold">Jan 2024</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Renewal Date</p>
              <p className="text-lg font-semibold">Jan 2025</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex gap-3">
          <GlassButton variant="outline">Manage Subscription</GlassButton>
          <GlassButton variant="ghost">Cancel Plan</GlassButton>
        </CardFooter>
      </GlassCard>
    </div>
  );
}
