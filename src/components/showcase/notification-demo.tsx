"use client";

import { useState } from "react";
import { GlassCard, CardHeader, CardTitle, CardDescription, CardContent, GlassButton } from "@/design-system/components";
import { CheckCircle2, AlertTriangle, Info, XCircle, X } from "lucide-react";
import { GlassEffects } from "@/design-system/effects/GlassEffects";

type NotificationType = "success" | "warning" | "info" | "error";

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
}

export function NotificationDemo() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const notificationConfig = {
    success: {
      icon: CheckCircle2,
      color: "text-green-500",
      bg: "bg-green-500/10",
      accent: "border-l-green-500"
    },
    warning: {
      icon: AlertTriangle,
      color: "text-yellow-500",
      bg: "bg-yellow-500/10",
      accent: "border-l-yellow-500"
    },
    info: {
      icon: Info,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
      accent: "border-l-blue-500"
    },
    error: {
      icon: XCircle,
      color: "text-red-500",
      bg: "bg-red-500/10",
      accent: "border-l-red-500"
    }
  };

  const showNotification = (type: NotificationType) => {
    const messages = {
      success: {
        title: "Success",
        message: "Your changes have been saved successfully"
      },
      warning: {
        title: "Warning",
        message: "This action cannot be undone"
      },
      info: {
        title: "Information",
        message: "New updates are available for your account"
      },
      error: {
        title: "Error",
        message: "Failed to process your request. Please try again"
      }
    };

    const notification: Notification = {
      id: Date.now().toString(),
      type,
      ...messages[type]
    };

    setNotifications(prev => [...prev, notification]);

    // Auto-dismiss after 5 seconds
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== notification.id));
    }, 5000);
  };

  const dismissNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Demo Controls */}
      <GlassCard elevation={2} animateIn>
        <CardHeader>
          <CardTitle>Notification System</CardTitle>
          <CardDescription>
            Click buttons to trigger different notification types
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <GlassButton
              onClick={() => showNotification("success")}
              variant="outline"
            >
              Success
            </GlassButton>
            <GlassButton
              onClick={() => showNotification("warning")}
              variant="outline"
            >
              Warning
            </GlassButton>
            <GlassButton
              onClick={() => showNotification("info")}
              variant="outline"
            >
              Info
            </GlassButton>
            <GlassButton
              onClick={() => showNotification("error")}
              variant="outline"
            >
              Error
            </GlassButton>
          </div>
        </CardContent>
      </GlassCard>

      {/* Notification Container */}
      <div className="fixed bottom-4 right-4 z-50 space-y-2 max-w-sm w-full">
        {notifications.map(notification => {
          const config = notificationConfig[notification.type];
          const Icon = config.icon;

          return (
            <div
              key={notification.id}
              className={`
                relative overflow-hidden
                p-4 rounded-lg
                glass-elevation-3
                bg-[var(--glass-tint)]
                border-l-4 ${config.accent}
                animate-in slide-in-from-right duration-300
              `}
            >
              {/* Glass effects layer */}
              <GlassEffects
                overlay="frosted"
                mask="lines"
                className="absolute inset-0 pointer-events-none -z-0"
              />

              {/* Content layer */}
              <div className="relative z-10 flex items-start gap-3">
                <div className={`p-2 rounded-full backdrop-blur-sm ${config.bg}`}>
                  <Icon className={`h-5 w-5 ${config.color}`} />
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-[var(--text-primary)]">
                    {notification.title}
                  </h4>
                  <p className="text-sm text-[var(--text-secondary)] mt-1">
                    {notification.message}
                  </p>
                </div>

                <button
                  onClick={() => dismissNotification(notification.id)}
                  className="p-1 hover:bg-white/20 dark:hover:bg-white/10 rounded transition-colors backdrop-blur-sm"
                  aria-label="Dismiss notification"
                >
                  <X className="h-4 w-4 text-[var(--text-secondary)]" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Static Examples */}
      <GlassCard elevation={2} animateIn>
        <CardHeader>
          <CardTitle>Notification Styles</CardTitle>
          <CardDescription>
            Static examples of all notification variants
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {(Object.keys(notificationConfig) as NotificationType[]).map(type => {
            const config = notificationConfig[type];
            const Icon = config.icon;

            return (
              <div
                key={type}
                className={`
                  relative overflow-hidden
                  p-4 rounded-lg
                  glass-elevation-2
                  bg-[var(--glass-tint)]
                  border-l-4 ${config.accent}
                `}
              >
                {/* Glass effects layer */}
                <GlassEffects
                  overlay="frosted"
                  mask="lines"
                  className="absolute inset-0 pointer-events-none -z-0"
                />

                {/* Content layer */}
                <div className="relative z-10 flex items-start gap-3">
                  <div className={`p-2 rounded-full backdrop-blur-sm ${config.bg} flex-shrink-0`}>
                    <Icon className={`h-5 w-5 ${config.color}`} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-[var(--text-primary)] capitalize">
                      {type} Notification
                    </h4>
                    <p className="text-sm text-[var(--text-secondary)] mt-1">
                      This is an example {type} notification with glass effects
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </CardContent>
      </GlassCard>
    </div>
  );
}
