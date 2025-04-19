'use client'
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, MessageCircle, FileText, Award } from "lucide-react";
import {useState,useEffect} from 'react'
import { supabase } from "@/libs/supabase";
import {WorldMap} from "@/components/ui/world-map";
import { motion } from "motion/react";

export default function LandingPage() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
      const checkUser = async () => {
        const { data } = await supabase.auth.getUser();
        console.log(data)
        if (data.user) {
          setIsLoggedIn(true);
        }
      };
      checkUser();
    }, []);
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <header className="border-b bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-8 w-8 text-indigo-600" />
            <span className="text-xl font-bold">InsuraPalmain</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/plan"
              className="text-gray-600 hover:text-indigo-600 dark:text-gray-300"
            >
              Plan Details
            </Link>
            <Link
              href="/chat"
              className="text-gray-600 hover:text-indigo-600 dark:text-gray-300"
            >
              AI Chat
            </Link>
            <Link
              href="/claim-analyzer"
              className="text-gray-600 hover:text-indigo-600 dark:text-gray-300"
            >
              Claim Analyzer
            </Link>
            <Link
              href="/recommend"
              className="text-gray-600 hover:text-indigo-600 dark:text-gray-300"
            >
              Recommendations
            </Link>
          </nav>
          {isLoggedIn ? (
            <div></div>
          ) : (
            <div className="flex items-center gap-3">
              <Link href="/login">
                <Button variant="outline">Log in</Button>
              </Link>
              <Link href="/register">
                <Button className="bg-indigo-600 hover:bg-indigo-700">
                  Sign up
                </Button>
              </Link>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-indigo-50 to-white dark:from-gray-900 dark:to-gray-800 py-16 md:py-24">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
              Simplify Your <span className="text-indigo-600">Insurance</span>{" "}
              Journey
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Understand your coverage, analyze claims, and find the best plans
              for your needs with our AI-powered platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/register">
                <Button className="bg-indigo-600 hover:bg-indigo-700 text-lg px-8 py-6">
                  Get Started
                </Button>
              </Link>
              <Link href="/chat">
                <Button variant="outline" className="text-lg px-8 py-6">
                  Try AI Chat
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative h-[400px] rounded-xl overflow-hidden shadow-2xl">
            <Image
              src="/healthcare.png"
              alt="Insurance consultation"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Everything You Need to Manage Your Insurance
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-t-4 border-t-indigo-500">
              <CardContent className="pt-6">
                <div className="mb-4">
                  <MessageCircle className="h-10 w-10 text-indigo-500" />
                </div>
                <h3 className="text-xl font-bold mb-2">AI Insurance Chat</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Get instant answers about your coverage, benefits, and policy
                  details from our AI assistant.
                </p>
              </CardContent>
            </Card>

            <Card className="border-t-4 border-t-rose-500">
              <CardContent className="pt-6">
                <div className="mb-4">
                  <FileText className="h-10 w-10 text-rose-500" />
                </div>
                <h3 className="text-xl font-bold mb-2">Claim Analyzer</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Upload your claim documents and get an instant analysis of why
                  it was approved or denied.
                </p>
              </CardContent>
            </Card>

            <Card className="border-t-4 border-t-yellow-500">
              <CardContent className="pt-6">
                <div className="mb-4">
                  <Award className="h-10 w-10 text-yellow-500" />
                </div>
                <h3 className="text-xl font-bold mb-2">Plan Recommendations</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Discover insurance plans that better match your needs, budget,
                  and healthcare requirements.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            How InsuraPalmain Works
          </h2>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-indigo-100 dark:bg-indigo-900 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                  1
                </span>
              </div>
              <h3 className="text-xl font-bold mb-2">Create Account</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Sign up and enter your insurance details
              </p>
            </div>

            <div className="text-center">
              <div className="bg-indigo-100 dark:bg-indigo-900 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                  2
                </span>
              </div>
              <h3 className="text-xl font-bold mb-2">Explore Your Plan</h3>
              <p className="text-gray-600 dark:text-gray-400">
                View detailed information about your coverage
              </p>
            </div>

            <div className="text-center">
              <div className="bg-indigo-100 dark:bg-indigo-900 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                  3
                </span>
              </div>
              <h3 className="text-xl font-bold mb-2">Analyze Claims</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Upload claims to understand approvals and denials
              </p>
            </div>

            <div className="text-center">
              <div className="bg-indigo-100 dark:bg-indigo-900 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                  4
                </span>
              </div>
              <h3 className="text-xl font-bold mb-2">Get Recommendations</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Discover better plans based on your profile
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Global Coverage Map */}
      <div className="py-40 dark:bg-gray-900 bg-white w-full">
        <div className="max-w-7xl mx-auto text-center">
          <p className="font-bold text-xl md:text-4xl dark:text-white text-black">
            Global{" "}
            <span className="text-indigo-500">
              {"Coverage".split("").map((word, idx) => (
                <motion.span
                  key={idx}
                  className="inline-block"
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 2.5, delay: idx * 0.04 }}
                >
                  {word}
                </motion.span>
              ))}
            </span>
          </p>
          <p className="text-sm md:text-lg text-neutral-500 max-w-2xl mx-auto py-4">
            Access your insurance information and support from anywhere in the world.
            InsuraPalmain provides global coverage and assistance for travelers and 
            international residents.
          </p>
        </div>
        <WorldMap
          animate={true}
          animationDuration={3}
          dots={[
            {
              start: {
                lat: 64.2008,
                lng: -149.4937,
              }, // Alaska (Fairbanks)
              end: {
                lat: 34.0522,
                lng: -118.2437,
              }, // Los Angeles
            },
            {
              start: { lat: 64.2008, lng: -149.4937 }, // Alaska (Fairbanks)
              end: { lat: -15.7975, lng: -47.8919 }, // Brazil (Brasília)
            },
            {
              start: { lat: -15.7975, lng: -47.8919 }, // Brazil (Brasília)
              end: { lat: 38.7223, lng: -9.1393 }, // Lisbon
            },
            {
              start: { lat: 51.5074, lng: -0.1278 }, // London
              end: { lat: 28.6139, lng: 77.209 }, // New Delhi
            },
            {
              start: { lat: 28.6139, lng: 77.209 }, // New Delhi
              end: { lat: 43.1332, lng: 131.9113 }, // Vladivostok
            },
            {
              start: { lat: 28.6139, lng: 77.209 }, // New Delhi
              end: { lat: -1.2921, lng: 36.8219 }, // Nairobi
            },
          ]}
        />
      </div>

      {/* Testimonials */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            What Our Users Say
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-gray-200 mr-4"></div>
                  <div>
                    <h4 className="font-bold">Sarah Johnson</h4>
                    <p className="text-sm text-gray-500">
                      Kaiser Permanente Member
                    </p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  "InsuraPalmain helped me understand why my claim was denied
                  and guided me through the appeal process. I got my claim
                  approved!"
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-gray-200 mr-4"></div>
                  <div>
                    <h4 className="font-bold">Michael Chen</h4>
                    <p className="text-sm text-gray-500">
                      UnitedHealthcare Member
                    </p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  "The AI chat answered all my questions about my coverage
                  instantly. No more waiting on hold with customer service!"
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-gray-200 mr-4"></div>
                  <div>
                    <h4 className="font-bold">Emily Rodriguez</h4>
                    <p className="text-sm text-gray-500">Medicare Recipient</p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  "I saved over $200 a month by switching to a plan that
                  InsuraPalmain recommended. It matched my needs perfectly."
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-indigo-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Take Control of Your Insurance?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of users who have simplified their insurance
            experience with InsuraPalmain.
          </p>
          <Link href="/register">
            <Button className="bg-white text-indigo-600 hover:bg-gray-100 text-lg px-8 py-6">
              Create Your Free Account
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Shield className="h-6 w-6 text-indigo-400" />
                <span className="text-xl font-bold">InsuraPalmain</span>
              </div>
              <p className="text-gray-400">
                Simplifying insurance management with AI-powered tools and
                personalized recommendations.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4">Features</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/chat" className="text-gray-400 hover:text-white">
                    AI Chat
                  </Link>
                </li>
                <li>
                  <Link
                    href="/claim-analyzer"
                    className="text-gray-400 hover:text-white"
                  >
                    Claim Analyzer
                  </Link>
                </li>
                <li>
                  <Link
                    href="/recommend"
                    className="text-gray-400 hover:text-white"
                  >
                    Plan Recommendations
                  </Link>
                </li>
                <li>
                  <Link href="/plan" className="text-gray-400 hover:text-white">
                    Plan Details
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>
              &copy; {new Date().getFullYear()} InsuraPalmain. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
