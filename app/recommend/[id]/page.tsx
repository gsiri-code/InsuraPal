"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/libs/supabase";
import type { Profile } from "@/types/user";
import plans from "@/data/plans"; // Your local JSON or mock data

export default function PlanDetailPage() {
  const plan_id = useParams<{ id: number}>().id;

  const router = useRouter();

  const [userProfile, setUserProfile] = useState<Profile | null>(null);
  const [currentPlan, setCurrentPlan] = useState<any>(null);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [highestRated, setHighestRated] = useState<any>(null);

  useEffect(() => {
    if (!plan_id) return;

    const fetchData = async () => {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) return;

      const { data: profileData } = await supabase
        .from("profiles")
        .select()
        .eq("user_id", userData.user.id)
        .single();

      if (!profileData) return;

      setUserProfile(profileData);

      const plan = plans.find((p) => p.id === parseInt(plan_id as string));
      if (!plan) return;

      setSelectedPlan(plan);

      const current = plans.find(
        (p) => p.name === profileData.insurance_provider
      );
      if (!current) {
        console.warn("No matching plan found for insurance_provider:", profileData.insurance_provider);
      }
      setCurrentPlan(current || null); // Fallback to null if no match is found

      const best = plans.reduce((prev, curr) =>
        curr.rating > prev.rating ? curr : prev
      );
      setHighestRated(best);
    };

    fetchData();
  }, [plan_id]);

  const handleSwitch = async () => {
    await supabase
      .from("profiles")
      .update({ insurance_provider: selectedPlan.name })
      .eq("user_id", userProfile?.user_id);
    alert("Switched plans!");
    router.push("/recommend");
  };

  const handleUnsubscribe = async () => {
    await supabase
      .from("profiles")
      .update({ insurance_provider: "" })
      .eq("user_id", userProfile?.user_id);
    alert("Unsubscribed successfully.");
    router.push("/recommend");
  };

  
  if (!selectedPlan || !userProfile || !currentPlan || !highestRated)
    return <p>Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 space-y-6">
      <h1 className="text-3xl font-bold">{selectedPlan.name}</h1>
      <p className="text-lg text-muted-foreground">
        ${selectedPlan.monthly_premium}/mo · {selectedPlan.network}
      </p>
      <div className="space-y-2 text-sm">
        {selectedPlan.description.map((line: string, i: number) => (
          <p
            key={i}
            className="border-l-4 border-blue-600 pl-3 bg-blue-50 rounded-md"
          >
            {line}
          </p>
        ))}
      </div>

      {selectedPlan.name !== userProfile.insurance_provider && (
        <button
          onClick={handleSwitch}
          className="mt-6 w-full py-3 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          Switch to this plan
        </button>
      )}

      {selectedPlan.name === userProfile.insurance_provider &&
        selectedPlan.name !== highestRated.name && (
          <button
            onClick={handleUnsubscribe}
            className="mt-6 w-full py-3 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Unsubscribe from this plan
          </button>
        )}
    </div>
  );
}
