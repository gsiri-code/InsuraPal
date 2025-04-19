"use client";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { supabase } from "@/libs/supabase";
import { useEffect, useState } from "react";
import Cookie from "js-cookie";
import { Profile } from "@/types/user";
import PlanList from "@/components/PlanList";

export default function Recommend() {
  const [userProfile, setUserProfile] = useState<Profile | null>(null);

  useEffect(() => {
    const getUserInfo = async () => {
      const { data: userData, error } = await supabase.auth.getUser(
        Cookie.get("supabase-auth-token")
      );
      const { data: profileData } = await supabase
        .from("profiles")
        .select()
        .eq("user_id", userData.user?.id);

      if (!profileData?.length) {
        window.location.href = "/profile";
        return;
      }

      for (const key in profileData[0]) {
        if (profileData[0][key] === null) {
          window.location.href = "/profile";
          return;
        }
      }
      console.log(profileData);

      setUserProfile(profileData[0]);
    };
    getUserInfo();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <PlanList />
    </div>
  );
}
