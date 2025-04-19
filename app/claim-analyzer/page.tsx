"use client"
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const claimExplanation = `This claim was denied due to services provided by an out-of-network provider. According to your plan, only emergency out-of-network services are covered. Since this was not classified as an emergency, the claim was rejected.`;

export default function ClaimAnalyzer() {
  const [uploaded, setUploaded] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);
  const [showFightPrompt, setShowFightPrompt] = useState(false);

  const handleUpload = () => {
    setUploaded(true);
    setAnalyzed(false);
    setShowFightPrompt(false);
  };

  const handleAnalyze = () => {
    setAnalyzed(true);
    setShowFightPrompt(true);
  };

  return (
    <div className="max-w-xl mx-auto p-6 space-y-6 text-gray-800">
      <h1 className="text-3xl font-bold text-center text-indigo-600">🧠 Claim Analyzer</h1>
      <p className="text-center text-sm text-gray-500 mb-4">Upload a claim file to understand what happened.</p>

      <Card>
        <CardContent className="space-y-4">
          <h2 className="text-xl font-semibold text-blue-600">Upload Your Claim</h2>
          <Input type="file" onChange={handleUpload} />
          {uploaded && <p className="text-green-600">✅ Claim uploaded successfully</p>}
          {uploaded && (
            <Button onClick={handleAnalyze} className="mt-2">Analyze Claim</Button>
          )}
        </CardContent>
      </Card>

      {analyzed && (
        <Card>
          <CardContent className="space-y-2">
            <h2 className="text-xl font-semibold text-rose-600">Claim Analysis Result</h2>
            <p className="text-gray-700 whitespace-pre-wrap">{claimExplanation}</p>
            <p className="font-bold text-red-500 mt-2">❌ Status: Denied</p>
          </CardContent>
        </Card>
      )}

      {showFightPrompt && (
        <Card>
          <CardContent className="space-y-4 text-center">
            <h2 className="text-xl font-semibold text-yellow-600">Want to Fight This Denial?</h2>
            <Button onClick={() => window.location.href = "/claim-fighter"} className="bg-red-500 hover:bg-red-600 text-white">
              Yes, Help Me Appeal 💪
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
