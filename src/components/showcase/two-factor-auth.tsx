"use client";

import { useState, useRef, KeyboardEvent } from "react";
import { GlassCard, CardHeader, CardTitle, CardDescription, CardContent, GlassButton } from "@/design-system/components";
import { Shield, Smartphone } from "lucide-react";

export function TwoFactorAuth() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isVerifying, setIsVerifying] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) value = value[0];
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = pastedData.split("");
    setOtp([...newOtp, ...Array(6 - newOtp.length).fill("")]);
    inputRefs.current[Math.min(pastedData.length, 5)]?.focus();
  };

  const handleVerify = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    }, 2000);
  };

  const isComplete = otp.every(digit => digit !== "");

  return (
    <div className="w-full">
      <GlassCard elevation={2} animateIn>
        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
            <Shield className="h-5 w-5 text-[var(--text-primary)]" />
            <CardTitle>Two-Factor Authentication</CardTitle>
          </div>
          <CardDescription>
            Enter the 6-digit code from your authenticator app
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* OTP Input */}
          <div className="flex justify-center gap-2" onPaste={handlePaste}>
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={el => { inputRefs.current[index] = el }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={e => handleChange(index, e.target.value)}
                onKeyDown={e => handleKeyDown(index, e)}
                className="w-12 h-14 text-center text-2xl font-bold
                  backdrop-blur-[var(--blur-medium)] bg-[var(--glass-tint)]
                  border border-[var(--glass-border)] rounded-lg
                  focus:outline-none focus:ring-2 focus:ring-purple-500/50
                  text-[var(--text-primary)]
                  transition-all duration-200"
                aria-label={`Digit ${index + 1}`}
              />
            ))}
          </div>

          {/* Info Box */}
          <div className="flex items-start gap-3 p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
            <Smartphone className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="text-sm font-medium text-[var(--text-primary)]">
                Can&apos;t access your authenticator?
              </p>
              <p className="text-xs text-[var(--text-secondary)]">
                Use a backup code or contact support for help
              </p>
            </div>
          </div>

          {/* Verify Button */}
          <GlassButton
            onClick={handleVerify}
            className="w-full"
            focusLayer
            disabled={!isComplete || isVerifying}
          >
            {isVerifying ? "Verifying..." : "Verify Code"}
          </GlassButton>

          {/* Resend Link */}
          <button
            type="button"
            className="w-full text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
          >
            Resend code
          </button>
        </CardContent>
      </GlassCard>
    </div>
  );
}
