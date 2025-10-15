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
  GlassTextarea,
} from "@/design-system/components";
import { Label } from "@/components/ui/label";

export function ContactForm() {
  return (
    <GlassCard elevation={2} animateIn adaptiveBlur lighting className="flex flex-col">
      <CardHeader>
        <CardTitle>Get in Touch</CardTitle>
        <CardDescription>
          Send us a message and we&apos;ll get back to you soon
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 flex-1 flex flex-col">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName" className="text-sm font-medium">
              First Name
            </Label>
            <GlassInput id="firstName" placeholder="John" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName" className="text-sm font-medium">
              Last Name
            </Label>
            <GlassInput id="lastName" placeholder="Doe" />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium">
            Email
          </Label>
          <GlassInput
            id="email"
            type="email"
            placeholder="john.doe@example.com"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="subject" className="text-sm font-medium">
            Subject
          </Label>
          <GlassInput id="subject" placeholder="How can we help?" />
        </div>

        <div className="space-y-2 flex-1 flex flex-col">
          <Label htmlFor="message" className="text-sm font-medium">
            Message
          </Label>
          <GlassTextarea
            id="message"
            placeholder="Tell us more about your inquiry..."
            className="flex-1 min-h-[120px]"
          />
        </div>
      </CardContent>
      <CardFooter className="flex gap-3">
        <GlassButton className="flex-1" focusLayer>Send Message</GlassButton>
        <GlassButton variant="ghost">Clear</GlassButton>
      </CardFooter>
    </GlassCard>
  );
}
