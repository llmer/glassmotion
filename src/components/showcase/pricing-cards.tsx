"use client";

import { GlassCard, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, GlassButton, ChromaticText } from "@/design-system/components";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "$9",
    period: "/month",
    description: "Perfect for individuals and small projects",
    features: [
      "Up to 5 projects",
      "5GB storage",
      "Basic analytics",
      "Email support",
      "API access"
    ],
    popular: false
  },
  {
    name: "Pro",
    price: "$29",
    period: "/month",
    description: "For professionals and growing teams",
    features: [
      "Unlimited projects",
      "50GB storage",
      "Advanced analytics",
      "Priority support",
      "API access",
      "Custom domains",
      "Team collaboration"
    ],
    popular: true
  },
  {
    name: "Enterprise",
    price: "$99",
    period: "/month",
    description: "For large organizations with custom needs",
    features: [
      "Everything in Pro",
      "Unlimited storage",
      "Advanced security",
      "24/7 phone support",
      "Custom integrations",
      "Dedicated account manager",
      "SLA guarantee"
    ],
    popular: false
  }
];

export function PricingCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {plans.map((plan) => (
        <GlassCard
          key={plan.name}
          elevation={plan.popular ? 3 : 2}
          hoverable
          animateIn
          className={`flex flex-col ${plan.popular ? "border-2 border-purple-500/50" : ""}`}
        >
          <CardHeader>
            <div className="flex items-center justify-between mb-2">
              <CardTitle>{plan.name}</CardTitle>
              {plan.popular && (
                <span className="px-3 py-1 text-xs font-semibold bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full">
                  Popular
                </span>
              )}
            </div>
            <CardDescription>{plan.description}</CardDescription>
          </CardHeader>

          <CardContent className="space-y-6 flex-1">
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-bold text-[var(--text-primary)]">
                {plan.price}
              </span>
              <span className="text-[var(--text-secondary)]">{plan.period}</span>
            </div>

            <ul className="space-y-3">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-[var(--text-secondary)]">{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>

          <CardFooter className="mt-auto">
            <GlassButton
              className="w-full"
              focusLayer={plan.popular}
              variant={plan.popular ? "default" : "outline"}
            >
              Get Started
            </GlassButton>
          </CardFooter>
        </GlassCard>
      ))}
    </div>
  );
}
