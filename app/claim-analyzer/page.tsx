"use client";
import { useState, useRef } from "react";
import type React from "react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { Spotlight } from "@/components/ui/spotlight";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import {
  FileUp,
  FileText,
  XCircle,
  AlertTriangle,
  DollarSign,
  Calendar,
  Building,
  User,
  Stethoscope,
  ArrowRight,
  Loader2,
} from "lucide-react";

// Sample claim data for demonstration
const sampleClaimData = {
  claimNumber: "CLM-2025-04103138",
  dateOfService: "2025-02-10",
  provider: "Mountain Health Emergency Room",
  serviceType: "Emergency Care",
  chargedAmount: 3850.75,
  allowedAmount: 2100.0,
  patientResponsibility: 1750.75,
  status: "Denied",
  reason: "Out-of-network provider used for non-emergency care",
  codeDetails: [
    {
      code: "99285",
      description: "Emergency Department Visit, High Complexity",
      status: "Denied",
    },
    {
      code: "71045",
      description: "X-ray, Chest, Single View",
      status: "Denied",
    },
    {
      code: "J1885",
      description: "Ketorolac Tromethamine Injection",
      status: "Denied",
    },
  ],
  appealRecommendation: true,
  appealReason:
    "This claim may be eligible for appeal if the care was urgent or if you had no choice in the provider used.",
};

export default function ClaimAnalyzer() {
  const [file, setFile] = useState<File | null>(null);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [showFightPrompt, setShowFightPrompt] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setFileUploaded(true);
      setAnalyzed(false);
      setShowFightPrompt(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
      setFileUploaded(true);
      setAnalyzed(false);
      setShowFightPrompt(false);
    }
  };

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleAnalyze = () => {
    setAnalyzing(true);
    // Simulate analysis delay
    setTimeout(() => {
      setAnalyzing(false);
      setAnalyzed(true);
      setShowFightPrompt(true);
      setActiveTab("overview");
    }, 2500);
  };

  const handleReset = () => {
    setFile(null);
    setFileUploaded(false);
    setAnalyzed(false);
    setShowFightPrompt(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const claimExplanationWords = [
    { text: "This" },
    { text: "claim" },
    { text: "was" },
    { text: "denied" },
    { text: "due" },
    { text: "to" },
    { text: "services" },
    { text: "provided" },
    { text: "by" },
    { text: "an" },
    { text: "out-of-network" },
    { text: "provider." },
    { text: "According" },
    { text: "to" },
    { text: "your" },
    { text: "plan," },
    { text: "only" },
    { text: "emergency" },
    { text: "out-of-network" },
    { text: "services" },
    { text: "are" },
    { text: "covered." },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white dark:from-gray-900 dark:to-gray-800 relative">
      <BackgroundBeams className="opacity-20" />

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="mb-10 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 flex items-center justify-center gap-3">
              <FileText className="h-8 w-8 text-indigo-600" />
              Claim Analyzer
            </h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Upload your insurance claim documents to understand what happened
              and get recommendations on next steps.
            </p>
          </div>

          <Spotlight className="group">
            <Card className="border-indigo-200 dark:border-indigo-900/30 shadow-xl overflow-hidden">
              <CardHeader className=" py-5 bg-gradient-to-r from-indigo-500 to-indigo-700 text-white">
                <CardTitle >Upload Your Claim</CardTitle>
                <CardDescription className="text-indigo-100">
                  We accept PDF, JPG, or PNG files of your Explanation of
                  Benefits (EOB) or claim documents
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                {!fileUploaded ? (
                  <div
                    className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-8 text-center cursor-pointer hover:border-indigo-500 dark:hover:border-indigo-500 transition-colors"
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    onClick={handleUploadClick}
                  >
                    <FileUp className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                    <h3 className="text-lg font-medium mb-2">
                      Drag and drop your claim file here
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                      or click to browse your files
                    </p>
                    <Input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <Button variant="outline" className="mx-auto">
                      Select File
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="flex items-center gap-4 p-4 bg-indigo-50 dark:bg-indigo-950/30 rounded-lg">
                      <FileText className="h-8 w-8 text-indigo-600" />
                      <div className="flex-1">
                        <p className="font-medium">{file?.name}</p>
                        <p className="text-sm text-gray-500">
                          {file?.size
                            ? `${(file.size / 1024).toFixed(2)} KB`
                            : ""}
                        </p>
                      </div>
                      <Button variant="ghost" size="sm" onClick={handleReset}>
                        Remove
                      </Button>
                    </div>

                    <div className="flex justify-center">
                      <Button
                        onClick={handleAnalyze}
                        className="bg-indigo-600 hover:bg-indigo-700 flex items-center gap-2"
                        disabled={analyzing}
                      >
                        {analyzing ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Analyzing Claim...
                          </>
                        ) : (
                          <>
                            <Stethoscope className="h-4 w-4" />
                            Analyze Claim
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </Spotlight>

          {analyzing && (
            <div className="mt-8">
              <Card className="border-indigo-200 dark:border-indigo-900/30 shadow-xl overflow-hidden">
                <CardContent className="p-6 flex flex-col items-center justify-center">
                  <Loader2 className="h-12 w-12 text-indigo-600 animate-spin mb-4" />
                  <h3 className="text-xl font-semibold mb-2">
                    Analyzing Your Claim
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-center">
                    We're reviewing your claim document and extracting relevant
                    information...
                  </p>
                </CardContent>
              </Card>
            </div>
          )}

          {analyzed && (
            <div className="mt-8 space-y-6">
              <Card className="border-indigo-200   dark:border-indigo-900/30 shadow-xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r py-5 from-rose-500 to-rose-700 text-white">
                  <div className="flex items-center gap-3">
                    <XCircle className="h-6 w-6" />
                    <CardTitle>Claim Analysis Result</CardTitle>
                  </div>
                  <CardDescription className="text-rose-100">
                    We've analyzed your claim and found the following
                    information
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <Tabs
                    defaultValue={activeTab}
                    onValueChange={setActiveTab}
                    className="w-full"
                  >
                    <div className="px-6 pt-6">
                      <TabsList className="grid grid-cols-3 mb-6">
                        <TabsTrigger
                          value="overview"
                          className="text-sm md:text-base"
                        >
                          Overview
                        </TabsTrigger>
                        <TabsTrigger
                          value="details"
                          className="text-sm md:text-base"
                        >
                          Claim Details
                        </TabsTrigger>
                        <TabsTrigger
                          value="codes"
                          className="text-sm md:text-base"
                        >
                          Procedure Codes
                        </TabsTrigger>
                      </TabsList>
                    </div>

                    <TabsContent value="overview" className="p-6 pt-0">
                      <div className="space-y-6">
                        <div className="flex items-center justify-between p-4 bg-rose-50 dark:bg-rose-950/30 rounded-lg">
                          <div className="flex items-center gap-3">
                            <XCircle className="h-6 w-6 text-rose-600" />
                            <span className="font-bold text-rose-600">
                              Status: Denied
                            </span>
                          </div>
                          <div className="text-sm text-gray-500">
                            Claim #: {sampleClaimData.claimNumber}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <h3 className="text-lg font-semibold">Explanation</h3>
                          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <TypewriterEffect words={claimExplanationWords} />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                              <Calendar className="h-5 w-5 text-indigo-600" />
                              <h4 className="font-medium">Date of Service</h4>
                            </div>
                            <p>{sampleClaimData.dateOfService}</p>
                          </div>
                          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                              <Building className="h-5 w-5 text-indigo-600" />
                              <h4 className="font-medium">Provider</h4>
                            </div>
                            <p>{sampleClaimData.provider}</p>
                          </div>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="details" className="p-6 pt-0">
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                              <User className="h-5 w-5 text-indigo-600" />
                              <h4 className="font-medium">Service Type</h4>
                            </div>
                            <p>{sampleClaimData.serviceType}</p>
                          </div>
                          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                              <Building className="h-5 w-5 text-indigo-600" />
                              <h4 className="font-medium">
                                Provider Network Status
                              </h4>
                            </div>
                            <p className="text-rose-600">Out-of-Network</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                              <DollarSign className="h-5 w-5 text-indigo-600" />
                              <h4 className="font-medium">Charged Amount</h4>
                            </div>
                            <p className="text-lg font-semibold">
                              ${sampleClaimData.chargedAmount.toFixed(2)}
                            </p>
                          </div>
                          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                              <DollarSign className="h-5 w-5 text-indigo-600" />
                              <h4 className="font-medium">Allowed Amount</h4>
                            </div>
                            <p className="text-lg font-semibold">
                              ${sampleClaimData.allowedAmount.toFixed(2)}
                            </p>
                          </div>
                          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                              <DollarSign className="h-5 w-5 text-indigo-600" />
                              <h4 className="font-medium">
                                Your Responsibility
                              </h4>
                            </div>
                            <p className="text-lg font-semibold text-rose-600">
                              $
                              {sampleClaimData.patientResponsibility.toFixed(2)}
                            </p>
                          </div>
                        </div>

                        <div className="p-4 bg-amber-50 dark:bg-amber-950/30 rounded-lg border-l-4 border-amber-500">
                          <div className="flex items-start gap-3">
                            <AlertTriangle className="h-6 w-6 text-amber-600 flex-shrink-0 mt-1" />
                            <div>
                              <h4 className="font-medium text-amber-800 dark:text-amber-400">
                                Denial Reason
                              </h4>
                              <p className="mt-1">{sampleClaimData.reason}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="codes" className="p-6 pt-0">
                      <div className="space-y-6">
                        <h3 className="text-lg font-semibold">
                          Procedure & Diagnosis Codes
                        </h3>
                        <div className="overflow-x-auto">
                          <table className="w-full border-collapse">
                            <thead>
                              <tr className="bg-gray-100 dark:bg-gray-800">
                                <th className="px-4 py-3 text-left">Code</th>
                                <th className="px-4 py-3 text-left">
                                  Description
                                </th>
                                <th className="px-4 py-3 text-left">Status</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                              {sampleClaimData.codeDetails.map(
                                (code, index) => (
                                  <tr
                                    key={index}
                                    className="hover:bg-gray-50 dark:hover:bg-gray-800/50"
                                  >
                                    <td className="px-4 py-3 font-medium">
                                      {code.code}
                                    </td>
                                    <td className="px-4 py-3">
                                      {code.description}
                                    </td>
                                    <td className="px-4 py-3">
                                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-200">
                                        {code.status}
                                      </span>
                                    </td>
                                  </tr>
                                )
                              )}
                            </tbody>
                          </table>
                        </div>

                        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <h4 className="font-medium mb-2">
                            What These Codes Mean
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            These procedure codes represent the specific
                            services provided during your visit. All codes were
                            denied because they were performed by an
                            out-of-network provider without prior authorization.
                          </p>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>

              {showFightPrompt && (
                <Card className="border-indigo-200 dark:border-indigo-900/30 shadow-xl overflow-hidden">
                  <CardHeader className="py-5 bg-gradient-to-r from-amber-500 to-amber-700 text-white">
                    <div className="flex items-center gap-3">
                      <AlertTriangle className="h-6 w-6" />
                      <CardTitle>Appeal Recommendation</CardTitle>
                    </div>
                    <CardDescription className="text-amber-100">
                      Based on our analysis, you may be able to appeal this
                      claim
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <p>
                        This claim was denied because you used an out-of-network
                        provider. However, you may have grounds for appeal if:
                      </p>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>The care was urgent or emergent in nature</li>
                        <li>
                          You had no reasonable access to in-network providers
                        </li>
                        <li>
                          You were told by your insurance that this provider was
                          in-network
                        </li>
                        <li>
                          The service was pre-authorized by your insurance
                        </li>
                      </ul>

                      <div className="flex justify-center mt-6">
                        <Button
                          onClick={() =>
                            (window.location.href = "/claim-fighter")
                          }
                          className="bg-amber-600 hover:bg-amber-700 flex items-center gap-2"
                        >
                          Fight This Denial
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
