"use client";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";

interface MobileMenuProps {
  isLoggedIn: boolean;
  onLogout: () => void;
}

export default function MobileMenu({ isLoggedIn, onLogout }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="md:hidden">
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleMenu}
        className="relative z-50"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-white dark:bg-gray-900 pt-16"
          >
            <div className="container mx-auto px-4 py-8 flex flex-col space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-indigo-600">Plans</h3>
                <div className="space-y-2 pl-2">
                  <Link
                    href="/plan"
                    className="block py-2"
                    onClick={toggleMenu}
                  >
                    Current Plan
                  </Link>
                  <Link
                    href="/recommend"
                    className="block py-2"
                    onClick={toggleMenu}
                  >
                    Recommended Plans
                  </Link>
                  <Link
                    href="/switch"
                    className="block py-2"
                    onClick={toggleMenu}
                  >
                    Switch Plans
                  </Link>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-indigo-600">
                  Services
                </h3>
                <div className="space-y-2 pl-2">
                  <Link
                    href="/chat"
                    className="block py-2"
                    onClick={toggleMenu}
                  >
                    AI Chat Assistant
                  </Link>
                  <Link
                    href="/claim-analyzer"
                    className="block py-2"
                    onClick={toggleMenu}
                  >
                    Claim Analyzer
                  </Link>
                  <Link
                    href="/claim-fighter"
                    className="block py-2"
                    onClick={toggleMenu}
                  >
                    Claim Fighter
                  </Link>
                  <Link
                    href="/recommend"
                    className="block py-2"
                    onClick={toggleMenu}
                  >
                    Plan Recommendations
                  </Link>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-indigo-600">
                  Resources
                </h3>
                <div className="space-y-2 pl-2">
                  <Link href="/faq" className="block py-2" onClick={toggleMenu}>
                    FAQ
                  </Link>
                  <Link
                    href="/glossary"
                    className="block py-2"
                    onClick={toggleMenu}
                  >
                    Insurance Glossary
                  </Link>
                  <Link
                    href="/blog"
                    className="block py-2"
                    onClick={toggleMenu}
                  >
                    Blog
                  </Link>
                  <Link
                    href="/contact"
                    className="block py-2"
                    onClick={toggleMenu}
                  >
                    Contact Support
                  </Link>
                </div>
              </div>

              <div className="pt-6 border-t">
                {isLoggedIn ? (
                  <div className="space-y-4">
                    <Link href="/profile" onClick={toggleMenu}>
                      <Button variant="outline" className="w-full">
                        Profile
                      </Button>
                    </Link>
                    <Button
                      onClick={() => {
                        onLogout();
                        toggleMenu();
                      }}
                      className="w-full bg-indigo-600 hover:bg-indigo-700"
                    >
                      Logout
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Link href="/login" onClick={toggleMenu}>
                      <Button variant="outline" className="w-full">
                        Log in
                      </Button>
                    </Link>
                    <Link href="/register" onClick={toggleMenu}>
                      <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
                        Sign up
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
