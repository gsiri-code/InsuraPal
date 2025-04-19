"use client";
import React, { useState } from "react";
import {
  HoveredLink,
  Menu,
  MenuItem,
  ProductItem,
} from "@/components/ui/navbar-menu";
import { cn } from "@/lib/utils";
import { Shield, User, LogOut } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { supabase } from "@/libs/supabase";
import Cookies from "js-cookie";

export default function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkUser() {
      setLoading(true);
      const token = Cookies.get("supabase-auth-token");

      if (token) {
        try {
          const { data, error } = await supabase.auth.getUser(token);
          if (data?.user && !error) {
            setUser(data.user);
          }
        } catch (error) {
          console.error("Error checking authentication:", error);
        }
      }

      setLoading(false);
    }

    checkUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    Cookies.remove("supabase-auth-token");
    setUser(null);
    window.location.href = "/";
  };

  return (
    <header className="border-b bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Shield className="h-8 w-8 text-indigo-600" />
          <span className="text-xl font-bold">InsuraPalmain</span>
        </Link>

        <div className={cn("z-50", className)}>
          <Menu setActive={setActive}>
            <MenuItem setActive={setActive} active={active} item="Plans">
              <div className="flex flex-col space-y-4 text-sm">
                <HoveredLink href="/plan">Current Plan</HoveredLink>
                <HoveredLink href="/recommend">Recommended Plans</HoveredLink>
                <HoveredLink href="/switch">Switch Plans</HoveredLink>
              </div>
            </MenuItem>
            <MenuItem setActive={setActive} active={active} item="Services">
              <div className="text-sm grid grid-cols-2 gap-10 p-4 w-[500px]">
                <ProductItem
                  title="AI Chat Assistant"
                  href="/chat"
                  src="/placeholder.svg?key=ai-chat"
                  description="Get instant answers about your coverage and benefits."
                />
                <ProductItem
                  title="Claim Analyzer"
                  href="/claim-analyzer"
                  src="/placeholder.svg?key=claim-analyzer"
                  description="Understand why your claim was approved or denied."
                />
                <ProductItem
                  title="Claim Fighter"
                  href="/claim-fighter"
                  src="/placeholder.svg?key=claim-fighter"
                  description="Get help appealing denied claims with AI-powered tools."
                />
                <ProductItem
                  title="Plan Recommendations"
                  href="/recommend"
                  src="/placeholder.svg?key=plan-recommendations"
                  description="Find insurance plans that better match your needs."
                />
              </div>
            </MenuItem>
            <MenuItem setActive={setActive} active={active} item="Resources">
              <div className="flex flex-col space-y-4 text-sm">
                <HoveredLink href="/faq">FAQ</HoveredLink>
                <HoveredLink href="/glossary">Insurance Glossary</HoveredLink>
                <HoveredLink href="/blog">Blog</HoveredLink>
                <HoveredLink href="/contact">Contact Support</HoveredLink>
              </div>
            </MenuItem>
          </Menu>
        </div>

        <div className="flex items-center gap-3">
          {loading ? (
            <div className="w-[160px] h-10 bg-gray-200 animate-pulse rounded-md"></div>
          ) : user ? (
            <>
              <Link href="/profile">
                <Button variant="outline" className="flex items-center gap-2">
                  <User size={16} />
                  <span>Profile</span>
                </Button>
              </Link>
              <Button
                onClick={handleLogout}
                className="bg-indigo-600 hover:bg-indigo-700 flex items-center gap-2"
              >
                <LogOut size={16} />
                <span>Logout</span>
              </Button>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button variant="outline">Log in</Button>
              </Link>
              <Link href="/register">
                <Button className="bg-indigo-600 hover:bg-indigo-700">
                  Sign up
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
