"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import StarRating from "./StarRating";
import Link from "next/link";

interface Plan {
  id: number;
  name: string;
  monthly_premium: number;
  network: string;
  rating: number;
  goodFor: string[];
  deductible: string;
  providerCopay: string;
  prescriptionCopay: string;
}

interface PlanCardProps {
  plan: Plan;
  isExpanded: boolean;
  onToggle: () => void;
}

export default function PlanCard({
  plan,
  isExpanded,
  onToggle,
}: PlanCardProps) {
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
      <div className="p-5">
        <h2 className="text-xl font-bold mb-2">{plan.name}</h2>
        <div className="flex justify-between items-center mb-3">
          <span className="text-2xl font-semibold">
            $
            {plan.monthly_premium.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
            /mo
          </span>
          <StarRating rating={plan.rating} />
        </div>
        <p className="text-sm text-gray-500 mb-3">{plan.network}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {plan.goodFor
            .slice(0, isExpanded ? plan.goodFor.length : 3)
            .map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-xs rounded-full font-medium"
              >
                {tag}
              </span>
            ))}
        </div>

        <Link href={`/recommend/${plan.id}`}>
          <button className="...">View Details</button>
        </Link>

        {isExpanded && (
          <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
            {plan.description.map((point, idx) => (
              <p
                key={idx}
                className="border-l-4 border-blue-600 pl-3 bg-blue-50 dark:bg-blue-950/30 rounded-md"
              >
                {point}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
