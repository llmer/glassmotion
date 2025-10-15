"use client";

import { useState } from "react";
import { GlassCard, CardHeader, CardTitle, CardDescription, CardContent, GlassButton, GlassInput, GlassBadge } from "@/design-system/components";
import { UserPlus, Mail, X } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Invite {
  email: string;
  role: string;
  id: string;
}

export function TeamInvite() {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("member");
  const [invites, setInvites] = useState<Invite[]>([]);

  const handleAddInvite = () => {
    if (!email || !email.includes("@")) return;

    const newInvite: Invite = {
      email,
      role,
      id: Date.now().toString()
    };

    setInvites([...invites, newInvite]);
    setEmail("");
  };

  const handleRemoveInvite = (id: string) => {
    setInvites(invites.filter(invite => invite.id !== id));
  };

  const handleSendInvites = () => {
    // Simulate sending invites
    setTimeout(() => {
      setInvites([]);
    }, 1000);
  };

  return (
    <div className="w-full">
      <GlassCard elevation={2} animateIn>
        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
            <UserPlus className="h-5 w-5 text-[var(--text-primary)]" />
            <CardTitle>Invite Team Members</CardTitle>
          </div>
          <CardDescription>
            Add people to your workspace and assign roles
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Invite Form */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2 space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <GlassInput
                  id="email"
                  type="email"
                  placeholder="colleague@example.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && handleAddInvite()}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select value={role} onValueChange={setRole}>
                  <SelectTrigger className="glass-surface backdrop-blur-[var(--blur-medium)] border-[var(--glass-border)]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="member">Member</SelectItem>
                    <SelectItem value="viewer">Viewer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <GlassButton
              onClick={handleAddInvite}
              variant="outline"
              className="w-full"
            >
              Add to List
            </GlassButton>
          </div>

          {/* Pending Invites */}
          {invites.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-[var(--text-primary)]">
                Pending Invites ({invites.length})
              </h3>

              <div className="space-y-2">
                {invites.map(invite => (
                  <div
                    key={invite.id}
                    className="flex items-center justify-between p-3 rounded-lg
                      backdrop-blur-[var(--blur-medium)] bg-[var(--glass-tint)]
                      border border-[var(--glass-border)]"
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <Mail className="h-4 w-4 text-[var(--text-secondary)] flex-shrink-0" />
                      <span className="text-sm text-[var(--text-primary)] truncate">
                        {invite.email}
                      </span>
                      <GlassBadge variant="secondary" className="ml-auto">
                        {invite.role}
                      </GlassBadge>
                    </div>

                    <button
                      onClick={() => handleRemoveInvite(invite.id)}
                      className="ml-3 p-1 hover:bg-red-500/20 rounded transition-colors"
                      aria-label="Remove invite"
                    >
                      <X className="h-4 w-4 text-red-500" />
                    </button>
                  </div>
                ))}
              </div>

              <GlassButton
                onClick={handleSendInvites}
                className="w-full"
                focusLayer
              >
                Send {invites.length} {invites.length === 1 ? "Invite" : "Invites"}
              </GlassButton>
            </div>
          )}

          {/* Role Info */}
          <div className="space-y-2 p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
            <h4 className="text-sm font-medium text-[var(--text-primary)]">
              Role Permissions
            </h4>
            <ul className="text-xs text-[var(--text-secondary)] space-y-1">
              <li><strong>Admin:</strong> Full access to all workspace features</li>
              <li><strong>Member:</strong> Can view and edit projects</li>
              <li><strong>Viewer:</strong> Read-only access to projects</li>
            </ul>
          </div>
        </CardContent>
      </GlassCard>
    </div>
  );
}
