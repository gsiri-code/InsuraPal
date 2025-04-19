"use client";
import { useState, useEffect } from "react";
import type React from "react";

import Link from "next/link";
import { Shield } from "lucide-react";
import { supabase } from "@/libs/supabase";
import Cookies from "js-cookie";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function RegisterPage() {
  const [providers, setProviders] = useState<string[]>([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    birthday: "",
    insuranceProvider: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = Cookies.get("supabase-auth-token");
    if (token) {
      window.location.href = "/";
    }

    // Fetch providers
    const fetchProviders = async () => {
      try {
        const res = await fetch("/api/providers");
        const providers = await res.json();
        const providerNames = providers.data.map(
          (provider: any) => provider.name
        );
        setProviders(providerNames || []);
      } catch (err) {
        console.error("Failed to load providers", err);
      }
    };

    fetchProviders();
  }, []);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
      });

      if (signUpError) {
        setError(signUpError.message);
        return;
      }

      const user = data.user;
      if (user) {
        const { error: insertError } = await supabase.from("profiles").insert([
          {
            user_id: user.id,
            name: form.name,
            birthday: form.birthday,
            insurance_provider: form.insuranceProvider,
          },
        ]);

        if (insertError) {
          setError(insertError.message);
          return;
        }
      }

      const { data: loginData, error: loginError } =
        await supabase.auth.signInWithPassword({
          email: form.email,
          password: form.password,
        });

      if (loginError) {
        setError(loginError.message);
        return;
      }

      Cookies.set(
        "supabase-auth-token",
        loginData.session?.access_token || "",
        { expires: 7 }
      );
      window.location.href = "/";
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSelectChange = (value: string) => {
    setForm({ ...form, insuranceProvider: value });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white dark:from-gray-900 dark:to-gray-800 flex flex-col">
      {/* Header */}
      <header className="border-b bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 py-4 flex items-center">
          <Link href="/" className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-indigo-600" />
            <span className="text-xl font-bold">InsuraPalmain</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4 md:p-8">
        <Card className="w-full max-w-md shadow-xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              Create an account
            </CardTitle>
            <CardDescription className="text-center">
              Enter your details below to create your account and get started
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 text-red-700 text-sm">
                <p>{error}</p>
              </div>
            )}
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="birthday">Date of Birth</Label>
                <Input
                  id="birthday"
                  name="birthday"
                  type="date"
                  value={form.birthday}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="insuranceProvider">
                  Current Insurance Provider
                </Label>
                <Select
                  value={form.insuranceProvider}
                  onValueChange={handleSelectChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a provider" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">
                      -- Select a provider --
                    </SelectItem>
                    {providers.map((provider) => (
                      <SelectItem key={provider} value={provider}>
                        {provider}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700"
                disabled={loading}
              >
                {loading ? "Creating account..." : "Create account"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-center text-sm">
              By creating an account, you agree to our{" "}
              <Link href="#" className="text-indigo-600 hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="#" className="text-indigo-600 hover:underline">
                Privacy Policy
              </Link>
            </div>
            <div className="text-center text-sm">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-indigo-600 hover:underline font-medium"
              >
                Sign in
              </Link>
            </div>
          </CardFooter>
        </Card>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-sm text-gray-500 dark:text-gray-400">
        <p>
          &copy; {new Date().getFullYear()} InsuraPalmain. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
