"use client";

import { useState } from "react";
import { GlassCard, CardHeader, CardTitle, CardDescription, CardContent, GlassButton, GlassInput } from "@/design-system/components";
import { CreditCard, Lock } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function PaymentForm() {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => setIsProcessing(false), 2000);
  };

  return (
    <div className="w-full">
      <GlassCard elevation={2} animateIn>
        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
            <CreditCard className="h-5 w-5 text-[var(--text-primary)]" />
            <CardTitle>Payment Details</CardTitle>
          </div>
          <CardDescription>
            Enter your card information to complete the payment
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Card Information */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-[var(--text-primary)]">
                Card Information
              </h3>

              <div className="space-y-2">
                <Label htmlFor="cardNumber">Card Number</Label>
                <GlassInput
                  id="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiry">Expiry Date</Label>
                  <GlassInput
                    id="expiry"
                    placeholder="MM/YY"
                    maxLength={5}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cvc">CVC</Label>
                  <GlassInput
                    id="cvc"
                    placeholder="123"
                    maxLength={4}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="cardName">Cardholder Name</Label>
                <GlassInput
                  id="cardName"
                  placeholder="John Doe"
                />
              </div>
            </div>

            {/* Billing Address */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-[var(--text-primary)]">
                Billing Address
              </h3>

              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Select>
                  <SelectTrigger className="glass-surface backdrop-blur-[var(--blur-medium)] border-[var(--glass-border)]">
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="us">United States</SelectItem>
                    <SelectItem value="ca">Canada</SelectItem>
                    <SelectItem value="uk">United Kingdom</SelectItem>
                    <SelectItem value="au">Australia</SelectItem>
                    <SelectItem value="de">Germany</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Street Address</Label>
                <GlassInput
                  id="address"
                  placeholder="123 Main Street"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <GlassInput
                    id="city"
                    placeholder="San Francisco"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="state">State/Province</Label>
                  <GlassInput
                    id="state"
                    placeholder="CA"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="zip">ZIP/Postal Code</Label>
                <GlassInput
                  id="zip"
                  placeholder="94102"
                />
              </div>
            </div>

            {/* Security Notice */}
            <div className="flex items-center gap-2 p-4 rounded-lg bg-green-500/10 border border-green-500/20">
              <Lock className="h-4 w-4 text-green-500 flex-shrink-0" />
              <p className="text-xs text-[var(--text-secondary)]">
                Your payment information is encrypted and secure
              </p>
            </div>

            {/* Submit Button */}
            <GlassButton
              type="submit"
              className="w-full"
              focusLayer
              disabled={isProcessing}
            >
              {isProcessing ? "Processing..." : "Pay $29.00"}
            </GlassButton>
          </form>
        </CardContent>
      </GlassCard>
    </div>
  );
}
