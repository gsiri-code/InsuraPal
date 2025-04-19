"use client";
import { useEffect, useState } from "react";
import type React from "react";
import { supabase } from "@/libs/supabase";
import Cookie from "js-cookie";
import {
  Shield,
  User,
  MapPin,
  Calendar,
  Building,
  DollarSign,
  Tag,
  Save,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
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
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Spotlight } from "@/components/ui/spotlight";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { BackgroundBeams } from "@/components/ui/background-beams";

const ProfilePage = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [providers, setProviders] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState("personal");
  const [profile, setProfile] = useState({
    name: "",
    location: "",
    birthday: "",
    insurance_provider: "",
    international: false,
    income_level: "",
    tags: "",
  });
  const [message, setMessage] = useState({ text: "", type: "" });

  useEffect(() => {
    const fetchProfileAndProviders = async () => {
      try {
        setLoading(true);

        // Fetch providers first
        const providerRes = await fetch("/api/providers").then((res) =>
          res.json()
        );
        const providerNames = providerRes.data.map((provider) => provider.name);
        setProviders(providerNames || []);

        // Get user data using the exact same approach as in Recommend page
        const { data: userData, error: userError } =
          await supabase.auth.getUser(Cookie.get("supabase-auth-token"));

        if (userError || !userData.user) {
          console.error("Error fetching user:", userError);
          window.location.href = "/login";
          return;
        }

        // Get profile data using the exact same approach as in Recommend page
        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select()
          .eq("user_id", userData.user.id);

        if (profileError) {
          console.error("Error fetching profile:", profileError);
        }

        // If profile exists, use it to populate the form
        if (profileData && profileData.length > 0) {
          console.log("Profile data loaded:", profileData[0]);
          setProfile({
            name: profileData[0].name || "",
            location: profileData[0].location || "",
            birthday: profileData[0].birthday || "",
            insurance_provider: profileData[0].insurance_provider || "",
            international: profileData[0].international || false,
            income_level: profileData[0].income_level?.toString() || "",
            tags: profileData[0].tags || "",
          });
        } else {
          console.log("No profile data found, using empty values");
        }
      } catch (error) {
        console.error("Error loading profile:", error);
        setMessage({ text: "Failed to load profile data", type: "error" });
      } finally {
        setLoading(false);
      }
    };

    fetchProfileAndProviders();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;
    const checked =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;

    setProfile((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSwitchChange = (checked: boolean) => {
    setProfile((prev) => ({
      ...prev,
      international: checked,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage({ text: "", type: "" });
    setSaving(true);

    try {
      // Get user data using the same approach as in the fetch
      const { data: userData, error: userError } = await supabase.auth.getUser(
        Cookie.get("supabase-auth-token")
      );

      if (userError || !userData.user) {
        setMessage({
          text: "You must be logged in to update your profile",
          type: "error",
        });
        return;
      }

      const { error } = await supabase.from("profiles").upsert({
        user_id: userData.user.id,
        ...profile,
        income_level: Number.parseFloat(profile.income_level) || 0,
        tags: profile.tags,
      });

      if (error) {
        throw error;
      }

      setMessage({ text: "Profile updated successfully!", type: "success" });
    } catch (error) {
      console.error("Error updating profile:", error);
      setMessage({ text: "Failed to update profile", type: "error" });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-indigo-600 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100">
            Loading your profile
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Please wait while we fetch your information...
          </p>
        </div>
      </div>
    );
  }

  const profileFeatures = [
    {
      title: "Personal Information",
      description: "Manage your basic personal details and contact information",
      icon: <User className="h-8 w-8 text-indigo-600" />,
    },
    {
      title: "Insurance Details",
      description:
        "View and update your insurance provider and coverage information",
      icon: <Shield className="h-8 w-8 text-indigo-600" />,
    },
    {
      title: "Financial Information",
      description:
        "Update your income level and financial details for better recommendations",
      icon: <DollarSign className="h-8 w-8 text-indigo-600" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white dark:from-gray-900 dark:to-gray-800 relative">
      <BackgroundBeams className="opacity-20" />

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="mb-10 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Your Profile
            </h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Manage your personal information and insurance preferences to get
              the most out of InsuraPalmain.
            </p>
          </div>

          <HoverEffect items={profileFeatures} className="mb-12" />

          <Spotlight className="group p-6 md:p-8">
            <Tabs
              defaultValue={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid grid-cols-3 mb-8">
                <TabsTrigger value="personal" className="text-sm md:text-base">
                  Personal
                </TabsTrigger>
                <TabsTrigger value="insurance" className="text-sm md:text-base">
                  Insurance
                </TabsTrigger>
                <TabsTrigger
                  value="preferences"
                  className="text-sm md:text-base"
                >
                  Preferences
                </TabsTrigger>
              </TabsList>

              <form onSubmit={handleSubmit}>
                {message.text && (
                  <div
                    className={`mb-6 p-4 rounded-md ${
                      message.type === "success"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {message.text}
                  </div>
                )}

                <TabsContent value="personal" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <User className="h-5 w-5 text-indigo-600" />
                        Personal Information
                      </CardTitle>
                      <CardDescription>
                        Update your basic personal information used across
                        InsuraPalmain services.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="name"
                            name="name"
                            value={profile.name}
                            onChange={handleChange}
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="location"
                            name="location"
                            value={profile.location}
                            onChange={handleChange}
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="birthday">Date of Birth</Label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="birthday"
                            name="birthday"
                            type="date"
                            value={profile.birthday}
                            onChange={handleChange}
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="insurance" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Shield className="h-5 w-5 text-indigo-600" />
                        Insurance Details
                      </CardTitle>
                      <CardDescription>
                        Manage your insurance provider and coverage information.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="insurance_provider">
                          Insurance Provider
                        </Label>
                        <div className="relative">
                          <Building className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Select
                            value={profile.insurance_provider || "default"}
                            onValueChange={(value) =>
                              handleSelectChange("insurance_provider", value)
                            }
                          >
                            <SelectTrigger className="pl-10">
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
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="international">
                            International Coverage
                          </Label>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Enable if you need coverage while traveling
                            internationally
                          </p>
                        </div>
                        <Switch
                          id="international"
                          checked={profile.international}
                          onCheckedChange={handleSwitchChange}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="preferences" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Tag className="h-5 w-5 text-indigo-600" />
                        Preferences & Tags
                      </CardTitle>
                      <CardDescription>
                        Set your preferences and add tags to help us provide
                        better recommendations.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="income_level">
                          Annual Income (USD)
                        </Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="income_level"
                            name="income_level"
                            type="number"
                            step="0.01"
                            value={profile.income_level}
                            onChange={handleChange}
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="tags">Tags (comma-separated)</Label>
                        <textarea
                          id="tags"
                          name="tags"
                          value={profile.tags}
                          onChange={handleChange}
                          className="w-full min-h-[100px] p-3 rounded-md border border-gray-300 dark:border-gray-700 bg-background focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          placeholder="e.g. student, remote worker, chronic condition"
                        />
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Enter tags that describe your needs, separated by
                          commas
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <div className="mt-6 flex justify-end">
                  <Button
                    type="submit"
                    className="bg-indigo-600 hover:bg-indigo-700 flex items-center gap-2"
                    disabled={saving}
                  >
                    {saving ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Save className="h-4 w-4" />
                    )}
                    {saving ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              </form>
            </Tabs>
          </Spotlight>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
