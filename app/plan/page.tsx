"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Shield,
  Download,
  Star,
  DollarSign,
  Stethoscope,
  Building,
  Phone,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";

export default function PlanSummary() {
  const [activeTab, setActiveTab] = useState("details");

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-indigo-600">
            Kaiser Permanente Gold 1500/20
          </h1>
          <p className="text-gray-500 mt-1">Plan ID: KP-CO-G1500-2025</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
            <Star className="h-4 w-4 fill-green-500 text-green-500" />
            <span>4.2/5 Rating</span>
          </div>
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => {
              const link = document.createElement("a");
              link.href = "./KP-CO-Gold-1500-Plan-Summary.pdf";
              link.download = "KP-CO-Gold-1500-Plan-Summary.pdf";
              link.click();
            }}
          >
            <Download className="h-4 w-4" />
            <span>Download PDF</span>
          </Button>
        </div>
      </div>

      {/* Plan Overview Card */}
      <Card className="border-indigo-200 shadow-md overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-500 to-indigo-700 p-6 text-white">
          <div className="flex flex-col md:flex-row justify-between gap-6">
            <div className="flex items-center gap-3">
              <Shield className="h-10 w-10" />
              <div>
                <h2 className="text-xl font-bold">HMO Plan</h2>
                <p className="text-indigo-100">Kaiser Permanente Network</p>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              <div>
                <p className="text-indigo-200 text-sm">Monthly Premium</p>
                <p className="text-2xl font-bold flex items-center">
                  <DollarSign className="h-5 w-5" />
                  450.00
                </p>
              </div>
              <div>
                <p className="text-indigo-200 text-sm">Annual Deductible</p>
                <p className="text-2xl font-bold flex items-center">
                  <DollarSign className="h-5 w-5" />
                  1,500
                </p>
              </div>
              <div>
                <p className="text-indigo-200 text-sm">Primary Care Visit</p>
                <p className="text-2xl font-bold flex items-center">
                  <DollarSign className="h-5 w-5" />
                  20
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Tabs */}
      <Tabs
        defaultValue="details"
        className="w-full"
        onValueChange={setActiveTab}
      >
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="details" className="text-sm md:text-base">
            Plan Details
          </TabsTrigger>
          <TabsTrigger value="coverage" className="text-sm md:text-base">
            Coverage
          </TabsTrigger>
          <TabsTrigger value="network" className="text-sm md:text-base">
            Network
          </TabsTrigger>
          <TabsTrigger value="faq" className="text-sm md:text-base">
            FAQ
          </TabsTrigger>
        </TabsList>

        {/* Plan Details Tab */}
        <TabsContent value="details" className="space-y-6">
          <Card>
            <CardHeader className="bg-gray-50 border-b">
              <CardTitle className="text-xl text-gray-800">
                Plan Information
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium w-1/3">
                      Plan Type
                    </TableCell>
                    <TableCell>HMO (Health Maintenance Organization)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Coverage</TableCell>
                    <TableCell>Individual / Family</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Availability</TableCell>
                    <TableCell>
                      Select counties in Colorado (Adams, Denver, Boulder, etc.)
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      Referral Required
                    </TableCell>
                    <TableCell>
                      Yes (self-referral allowed for some specialists)
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Plan Year</TableCell>
                    <TableCell>January 1, 2025 - December 31, 2025</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="bg-gray-50 border-b">
              <CardTitle className="text-xl text-gray-800">
                Costs & Limits
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium w-1/3">
                      Deductible
                    </TableCell>
                    <TableCell>$1,500 Individual / $3,000 Family</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      Out-of-Pocket Maximum
                    </TableCell>
                    <TableCell>$8,500 Individual / $17,000 Family</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      Other Deductibles
                    </TableCell>
                    <TableCell>
                      $50 Pediatric Dental, $195 Prescription Drugs
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Coinsurance</TableCell>
                    <TableCell>
                      25% for most services after deductible
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Coverage Tab */}
        <TabsContent value="coverage" className="space-y-6">
          <Card>
            <CardHeader className="bg-gray-50 border-b">
              <CardTitle className="text-xl text-gray-800">
                Medical Services
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-100">
                    <TableHead className="w-1/3">Service</TableHead>
                    <TableHead>What You Pay (In-Network)</TableHead>
                    <TableHead>What You Pay (Out-of-Network)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">
                      Primary Care Visit
                    </TableCell>
                    <TableCell className="text-green-700">$20 copay</TableCell>
                    <TableCell className="text-red-600">Not covered</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      Specialist Visit
                    </TableCell>
                    <TableCell className="text-green-700">$60 copay</TableCell>
                    <TableCell className="text-red-600">Not covered</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      Preventive Care
                    </TableCell>
                    <TableCell className="text-green-700">No charge</TableCell>
                    <TableCell className="text-red-600">Not covered</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      Diagnostic Tests
                    </TableCell>
                    <TableCell>25% coinsurance</TableCell>
                    <TableCell className="text-red-600">Not covered</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Urgent Care</TableCell>
                    <TableCell>$75 per visit</TableCell>
                    <TableCell>$75 per visit</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      Emergency Room
                    </TableCell>
                    <TableCell>25% coinsurance</TableCell>
                    <TableCell>25% coinsurance</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Hospital Stay</TableCell>
                    <TableCell>25% coinsurance</TableCell>
                    <TableCell className="text-red-600">Not covered</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="bg-gray-50 border-b">
              <CardTitle className="text-xl text-gray-800">
                Prescription Drugs
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-100">
                    <TableHead className="w-1/3">Type</TableHead>
                    <TableHead>Retail (30-day supply)</TableHead>
                    <TableHead>Mail Order (90-day supply)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Generic Drugs</TableCell>
                    <TableCell>$10 copay</TableCell>
                    <TableCell>$20 copay</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      Preferred Brand Drugs
                    </TableCell>
                    <TableCell>$40 copay</TableCell>
                    <TableCell>$80 copay</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      Non-Preferred Brand Drugs
                    </TableCell>
                    <TableCell>25% coinsurance</TableCell>
                    <TableCell>25% coinsurance</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      Specialty Drugs
                    </TableCell>
                    <TableCell>25% coinsurance</TableCell>
                    <TableCell>Not available</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Network Tab */}
        <TabsContent value="network" className="space-y-6">
          <Card>
            <CardHeader className="bg-gray-50 border-b">
              <CardTitle className="text-xl text-gray-800">
                Network Information
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Building className="h-8 w-8 text-indigo-600 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold">
                      Kaiser Permanente Integrated Network
                    </h3>
                    <p className="text-gray-600 mt-1">
                      This plan uses Kaiser Permanente's integrated care
                      network, which includes hospitals, medical offices, and
                      providers that work exclusively with Kaiser Permanente.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Stethoscope className="h-8 w-8 text-indigo-600 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold">
                      Provider Selection
                    </h3>
                    <p className="text-gray-600 mt-1">
                      You must choose a primary care physician (PCP) from the
                      Kaiser network. Your PCP will coordinate your care and
                      provide referrals to specialists when needed.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <AlertCircle className="h-8 w-8 text-indigo-600 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold">
                      Out-of-Network Coverage
                    </h3>
                    <p className="text-gray-600 mt-1">
                      This plan generally does not cover care from providers
                      outside the Kaiser Permanente network, except in
                      emergencies or when prior authorization is obtained.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Phone className="h-8 w-8 text-indigo-600 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold">Find a Provider</h3>
                    <p className="text-gray-600 mt-1">
                      To find a provider in the Kaiser Permanente network, visit
                      their website or call member services at 1-855-249-5005.
                    </p>
                    <Button variant="outline" className="mt-2">
                      <Link
                        href="https://healthy.kaiserpermanente.org/colorado/doctors-locations"
                        target="_blank"
                      >
                        Search Provider Directory
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="bg-gray-50 border-b">
              <CardTitle className="text-xl text-gray-800">
                Service Area
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <p className="text-gray-600">
                  This plan is available in the following Colorado counties:
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {[
                    "Adams",
                    "Arapahoe",
                    "Boulder",
                    "Broomfield",
                    "Denver",
                    "Douglas",
                    "El Paso",
                    "Jefferson",
                    "Larimer",
                    "Pueblo",
                    "Weld",
                  ].map((county) => (
                    <div
                      key={county}
                      className="bg-gray-100 px-3 py-2 rounded-md text-center"
                    >
                      {county}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* FAQ Tab */}
        <TabsContent value="faq" className="space-y-6">
          <Card>
            <CardHeader className="bg-gray-50 border-b">
              <CardTitle className="text-xl text-gray-800">
                Frequently Asked Questions
              </CardTitle>
            </CardHeader>
            <CardContent className="divide-y">
              <div className="py-4">
                <h3 className="text-lg font-semibold text-indigo-700">
                  How do I find a doctor in the network?
                </h3>
                <p className="text-gray-600 mt-2">
                  You can search for in-network providers on the Kaiser
                  Permanente website or by calling member services at
                  1-855-249-5005. You can also use the Kaiser Permanente mobile
                  app to find doctors near you.
                </p>
              </div>
              <div className="py-4">
                <h3 className="text-lg font-semibold text-indigo-700">
                  Do I need a referral to see a specialist?
                </h3>
                <p className="text-gray-600 mt-2">
                  Yes, for most specialists, you'll need a referral from your
                  primary care physician. However, you can self-refer to certain
                  specialists like optometrists, psychiatrists, and OB/GYNs.
                </p>
              </div>
              <div className="py-4">
                <h3 className="text-lg font-semibold text-indigo-700">
                  What happens if I need emergency care while traveling?
                </h3>
                <p className="text-gray-600 mt-2">
                  Emergency care is covered anywhere in the world. If you
                  receive emergency care outside the Kaiser Permanente network,
                  you may need to pay upfront and submit a claim for
                  reimbursement. For urgent care when traveling, call the 24/7
                  Away from Home Travel Line at 951-268-3900.
                </p>
              </div>
              <div className="py-4">
                <h3 className="text-lg font-semibold text-indigo-700">
                  How do I get my prescriptions filled?
                </h3>
                <p className="text-gray-600 mt-2">
                  You can fill prescriptions at any Kaiser Permanente pharmacy
                  or use the mail-order pharmacy service for maintenance
                  medications. The mail-order service offers a 90-day supply for
                  the cost of a 60-day supply.
                </p>
              </div>
              <div className="py-4">
                <h3 className="text-lg font-semibold text-indigo-700">
                  What preventive services are covered at no cost?
                </h3>
                <p className="text-gray-600 mt-2">
                  Preventive services covered at no cost include annual
                  check-ups, immunizations, screenings for cancer and other
                  conditions, and well-child visits. These services are covered
                  even before you meet your deductible.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
        <Button className="bg-indigo-600 hover:bg-indigo-700">
          <Link href="/recommend">Compare With Other Plans</Link>
        </Button>
        <Button variant="outline">
          <Link href="/switch">Switch Plans</Link>
        </Button>
      </div>
    </div>
  );
}
