"use client";

import { useState } from "react";
import PlanCard from "./PlanCard";
import plans from "@/data/plans.json"; 

// Optional: define type for plan if not already in global types
interface Plan {
  id: number;
  name: string;
  monthly_premium: number;
  deductible: string;
  providerCopay: string;
  prescriptionCopay: string;
  network: string;
  rating: number;
  goodFor: string[];
  description: string[];
}

export default function PlanList() {
  const [expandedPlan, setExpandedPlan] = useState<number | null>(null);

  const toggleExpand = (id: number) => {
    setExpandedPlan(expandedPlan === id ? null : id);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8 text-foreground">
        Recommended Plans for You
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan: Plan) => (
          <PlanCard
            key={plan.id}
            plan={plan}
            isExpanded={expandedPlan === plan.id}
            onToggle={() => toggleExpand(plan.id)}
          />
        ))}
      </div>
    </div>
  );
}
