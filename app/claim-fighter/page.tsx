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
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { Spotlight } from "@/components/ui/spotlight";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import {
  Shield,
  FileText,
  AlertTriangle,
  CheckCircle2,
  ClipboardCheck,
  Send,
  Loader2,
  Clock,
  MailOpen,
  Phone,
} from "lucide-react";

// Sample AI response for demonstration
const aiResponse = `It looks like your claim may have been denied because the provider was out-of-network. If the care was urgent or emergent, you're likely still covered. You can submit an appeal by providing proof of medical necessity and indicating that you had no choice in the provider used.`;

// Sample appeal letter for demonstration
const appealLetter = `To Whom It May Concern,

I am writing to formally appeal the denial of my insurance claim. The medical care I received was necessary and aligns with the benefits outlined in my plan. I believe this claim was denied in error.

Please find the details of the claim below:
- Claim Number: CLM-2025-04103138
- Claim Reason: Out-of-network provider used during emergency care
- Date of Service: 2025-02-10
- Provider: ER at Mountain Health

I was experiencing severe chest pain and difficulty breathing, which I reasonably believed required immediate medical attention. According to my plan documents, emergency services are covered regardless of network status when a prudent layperson would believe they are experiencing an emergency medical condition.

I request that this denial be reviewed and reversed based on the emergency nature of the services provided.

Sincerely,
Alex Smith
Policy #: 202504103138`;

const statuses = ["Pending", "Under Review", "Approved"];

export default function ClaimFighter() {
  const [claim, setClaim] = useState({
    claimNumber: "",
    denialReason: "",
    dateOfService: "",
    provider: "",
    details: "",
    appealReason: "",
  });
  const [fileUploaded, setFileUploaded] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [aiResponseText, setAiResponseText] = useState("");
  const [showAiResponse, setShowAiResponse] = useState(false);
  const [showAppealLetter, setShowAppealLetter] = useState(false);
  const [statusIndex, setStatusIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("details");
  const [letterCopied, setLetterCopied] = useState(false);
  const [appealSubmitted, setAppealSubmitted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileUploaded(true);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setClaim((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setClaim((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckClaim = (e: React.FormEvent) => {
    e.preventDefault();
    setAnalyzing(true);
    setShowAiResponse(false);
    setShowAppealLetter(false);

    // Add delay before showing AI response
    setTimeout(() => {
      setAnalyzing(false);
      setShowAiResponse(true);
      setAiResponseText(aiResponse);

      // Add delay before showing appeal letter
      setTimeout(() => {
        setShowAppealLetter(true);
      }, 1000);
    }, 2500);
  };

  const handleCopyLetter = () => {
    navigator.clipboard.writeText(appealLetter);
    setLetterCopied(true);
    setTimeout(() => setLetterCopied(false), 2000);
  };

  const handleSubmitAppeal = () => {
    setAppealSubmitted(true);
    nextStatus();
  };

  const nextStatus = () => {
    setStatusIndex((i) => Math.min(i + 1, statuses.length - 1));
  };

  const denialReasons = [
    "Out-of-network provider",
    "Service not covered",
    "Prior authorization required",
    "Medical necessity not established",
    "Coding error",
    "Duplicate claim",
    "Other",
  ];

  const appealReasons = [
    "Emergency situation",
    "No in-network providers available",
    "Was told provider was in-network",
    "Service should be covered under my plan",
    "Medical necessity can be proven",
    "Other",
  ];

  const aiResponseWords = aiResponse.split(" ").map((word) => ({ text: word }));

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white dark:from-gray-900 dark:to-gray-800 relative">
      <BackgroundBeams className="opacity-20" />

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="mb-10 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 flex items-center justify-center gap-3">
              <Shield className="h-8 w-8 text-red-600" />
              Claim Fighter
            </h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Let's figure out what happened with your denied claim and help you
              fight back with a professional appeal.
            </p>
          </div>

          <div className="space-y-8">
            <Spotlight className="group">
              <Card className="border-red-200 dark:border-red-900/30 shadow-xl overflow-hidden">
                <CardHeader className="py-5 bg-gradient-to-r from-red-500 to-red-700 text-white">
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Step 1: Upload your EOB
                  </CardTitle>
                  <CardDescription className="text-red-100">
                    Upload your Explanation of Benefits (EOB) document from your
                    insurance company
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div
                      className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
                        fileUploaded
                          ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                          : "border-gray-300 dark:border-gray-700 hover:border-red-500 dark:hover:border-red-500"
                      }`}
                      onClick={() => fileInputRef.current?.click()}
                    >
                      {fileUploaded ? (
                        <div className="flex flex-col items-center">
                          <CheckCircle2 className="h-12 w-12 text-green-500 mb-2" />
                          <p className="font-medium text-green-700 dark:text-green-300">
                            EOB uploaded successfully
                          </p>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center">
                          <FileText className="h-12 w-12 text-gray-400 mb-2" />
                          <p className="font-medium mb-1">
                            Click to upload your EOB
                          </p>
                          <p className="text-sm text-gray-500">
                            PDF, JPG, or PNG files accepted
                          </p>
                        </div>
                      )}
                      <Input
                        ref={fileInputRef}
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Spotlight>

            <Spotlight className="group">
              <Card className="border-purple-200 dark:border-purple-900/30 shadow-xl overflow-hidden">
                <CardHeader className="py-5 bg-gradient-to-r from-purple-500 to-purple-700 text-white">
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    Step 2: Tell us about the denial
                  </CardTitle>
                  <CardDescription className="text-purple-100">
                    Provide details about your denied claim so we can help you
                    create an effective appeal
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <form onSubmit={handleCheckClaim} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="dateOfService">Date of Service</Label>
                        <Input
                          id="dateOfService"
                          name="dateOfService"
                          type="date"
                          value={claim.dateOfService}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="denialReason">Denial Reason</Label>
                        <Select
                          value={claim.denialReason}
                          onValueChange={(value) =>
                            handleSelectChange("denialReason", value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select denial reason" />
                          </SelectTrigger>
                          <SelectContent>
                            {denialReasons.map((reason) => (
                              <SelectItem key={reason} value={reason}>
                                {reason}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="details">
                        Briefly describe what happened
                      </Label>
                      <Textarea
                        id="details"
                        name="details"
                        placeholder="Explain the circumstances of your medical visit and why you believe the claim should be covered..."
                        value={claim.details}
                        onChange={handleInputChange}
                        className="min-h-[100px]"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="appealReason">Reason for Appeal</Label>
                      <Select
                        value={claim.appealReason}
                        onValueChange={(value) =>
                          handleSelectChange("appealReason", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select appeal reason" />
                        </SelectTrigger>
                        <SelectContent>
                          {appealReasons.map((reason) => (
                            <SelectItem key={reason} value={reason}>
                              {reason}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex justify-center pt-4">
                      <Button
                        type="submit"
                        className="bg-purple-600 hover:bg-purple-700 flex items-center gap-2"
                        disabled={analyzing}
                      >
                        {analyzing ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Analyzing Your Claim...
                          </>
                        ) : (
                          <>
                            <AlertTriangle className="h-4 w-4" />
                            Analyze My Claim
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </Spotlight>

            {analyzing && (
              <Card className="border-blue-200 dark:border-blue-900/30 shadow-xl overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center justify-center py-8">
                    <Loader2 className="h-12 w-12 text-blue-600 animate-spin mb-4" />
                    <h3 className="text-xl font-semibold mb-2">
                      Analyzing Your Claim
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-center max-w-md">
                      We're reviewing your claim details and preparing
                      personalized appeal recommendations...
                    </p>
                    <div className="w-full max-w-md mt-6">
                      <Progress value={65} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {showAiResponse && (
              <Spotlight className="group">
                <Card className="border-green-200 dark:border-green-900/30 shadow-xl overflow-hidden">
                  <CardHeader className="py-5 bg-gradient-to-r from-green-500 to-green-700 text-white">
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5" />
                      Step 3: AI Insight
                    </CardTitle>
                    <CardDescription className="text-green-100">
                      Our AI has analyzed your claim and provided
                      recommendations
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <TypewriterEffect words={aiResponseWords} />
                    </div>
                  </CardContent>
                </Card>
              </Spotlight>
            )}

            {showAppealLetter && (
              <Spotlight className="group">
                <Card className="border-blue-200 dark:border-blue-900/30 shadow-xl overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-700 text-white">
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Step 4: Appeal Letter
                    </CardTitle>
                    <CardDescription className="text-blue-100">
                      We've drafted an appeal letter based on your claim details
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <Tabs defaultValue="preview" className="w-full">
                      <TabsList className="grid grid-cols-2 mb-6">
                        <TabsTrigger
                          value="preview"
                          className="text-sm md:text-base"
                        >
                          Preview
                        </TabsTrigger>
                        <TabsTrigger
                          value="edit"
                          className="text-sm md:text-base"
                        >
                          Edit Letter
                        </TabsTrigger>
                      </TabsList>

                      <TabsContent value="preview" className="space-y-4">
                        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm">
                          <pre className="whitespace-pre-wrap font-sans text-sm">
                            {appealLetter}
                          </pre>
                        </div>
                        <div className="flex justify-center">
                          <Button
                            onClick={handleCopyLetter}
                            className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
                          >
                            {letterCopied ? (
                              <>
                                <CheckCircle2 className="h-4 w-4" />
                                Copied to Clipboard
                              </>
                            ) : (
                              <>
                                <ClipboardCheck className="h-4 w-4" />
                                Copy Appeal Letter
                              </>
                            )}
                          </Button>
                        </div>
                      </TabsContent>

                      <TabsContent value="edit" className="space-y-4">
                        <Textarea
                          value={appealLetter}
                          className="min-h-[400px] font-mono text-sm"
                          onChange={(e) => {
                            // In a real app, you would update the letter state here
                          }}
                        />
                        <div className="flex justify-center">
                          <Button
                            onClick={handleCopyLetter}
                            className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
                          >
                            {letterCopied ? (
                              <>
                                <CheckCircle2 className="h-4 w-4" />
                                Copied to Clipboard
                              </>
                            ) : (
                              <>
                                <ClipboardCheck className="h-4 w-4" />
                                Copy Appeal Letter
                              </>
                            )}
                          </Button>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </Spotlight>
            )}

            {showAppealLetter && (
              <Spotlight className="group">
                <Card className="border-amber-200 dark:border-amber-900/30 shadow-xl overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-amber-500 to-amber-700 text-white">
                    <CardTitle className="flex items-center gap-2">
                      <Send className="h-5 w-5" />
                      Step 5: Submit Your Appeal
                    </CardTitle>
                    <CardDescription className="text-amber-100">
                      Choose how you want to submit your appeal and track its
                      status
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    {!appealSubmitted ? (
                      <div className="space-y-6">
                        <h3 className="text-lg font-semibold">
                          Submission Options
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <Card className="border-2 hover:border-amber-500 transition-colors cursor-pointer">
                            <CardContent className="p-6 flex flex-col items-center text-center">
                              <MailOpen className="h-10 w-10 text-amber-600 mb-3" />
                              <h4 className="font-medium mb-2">Mail</h4>
                              <p className="text-sm text-gray-500">
                                Print and mail your appeal letter to your
                                insurance company
                              </p>
                            </CardContent>
                          </Card>
                          <Card className="border-2 hover:border-amber-500 transition-colors cursor-pointer">
                            <CardContent className="p-6 flex flex-col items-center text-center">
                              <Phone className="h-10 w-10 text-amber-600 mb-3" />
                              <h4 className="font-medium mb-2">Phone</h4>
                              <p className="text-sm text-gray-500">
                                Call your insurance company and reference your
                                appeal letter
                              </p>
                            </CardContent>
                          </Card>
                          <Card className="border-2 border-amber-500 bg-amber-50 dark:bg-amber-900/20">
                            <CardContent className="p-6 flex flex-col items-center text-center">
                              <Send className="h-10 w-10 text-amber-600 mb-3" />
                              <h4 className="font-medium mb-2">
                                Online Portal
                              </h4>
                              <p className="text-sm text-gray-500">
                                Submit your appeal through your insurance
                                company's online portal
                              </p>
                            </CardContent>
                          </Card>
                        </div>

                        <div className="flex justify-center mt-6">
                          <Button
                            onClick={handleSubmitAppeal}
                            className="bg-amber-600 hover:bg-amber-700 flex items-center gap-2"
                          >
                            <Send className="h-4 w-4" />
                            Submit Appeal
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border-l-4 border-green-500 flex items-start gap-3">
                          <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                          <div>
                            <h4 className="font-medium text-green-800 dark:text-green-400">
                              Appeal Submitted
                            </h4>
                            <p className="mt-1">
                              Your appeal has been submitted successfully. You
                              can track its status below.
                            </p>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold flex items-center gap-2">
                            <Clock className="h-5 w-5 text-amber-600" />
                            Appeal Status
                          </h3>
                          <div className="space-y-2">
                            <div className="flex justify-between items-center mb-2">
                              <span className="font-medium">
                                Status: {statuses[statusIndex]}
                              </span>
                              <span className="text-sm text-gray-500">
                                Updated: {new Date().toLocaleDateString()}
                              </span>
                            </div>
                            <Progress
                              value={(statusIndex + 1) * 33.33}
                              className="h-3"
                            />
                            <div className="flex justify-between text-sm text-gray-500 mt-1">
                              <span>Submitted</span>
                              <span>Under Review</span>
                              <span>Decision</span>
                            </div>
                          </div>

                          <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg">
                            <h4 className="font-medium mb-2">Next Steps</h4>
                            <p className="text-sm">
                              Your insurance company typically takes 30-60 days
                              to review appeals. We'll notify you when there's
                              an update to your appeal status.
                            </p>
                          </div>

                          {statusIndex < statuses.length - 1 && (
                            <div className="flex justify-center mt-4">
                              <Button
                                onClick={nextStatus}
                                variant="outline"
                                className="border-amber-500 text-amber-700"
                              >
                                Simulate Next Status
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </Spotlight>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
