"use client"
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const airesponse = `It looks like your claim may have been denied because the provider was out-of-network. If the care was urgent or emergent, you're likely still covered. You can submit an appeal by providing proof of medical necessity and indicating that you had no choice in the provider used.`;

const appealletter = `To Whom It May Concern,\n\nI am writing to formally appeal the denial of my insurance claim. The medical care I received was necessary and aligns with the benefits outlined in my plan. I believe this claim was denied in error.\n\nPlease find the details of the claim below:\n- Claim Reason: Out-of-network provider used during emergency care\n- Date of Service: 2025-02-10\n- Provider: ER at Mountain Health\n\nI request that this denial be reviewed and reversed.\n\nSincerely,\nAlex Smith\nPolicy #: 202504103138`;

const statuses = ["Pending", "Under Review", "Approved"];

export default function ClaimFighter() {
  const [claim, setClaim] = useState({ reason: '', details: '' });
  const [uploaded, setUploaded] = useState(false);
  const [aiResponse, setAiResponse] = useState("");
  const [statusIndex, setStatusIndex] = useState(0);

  const handleCheckClaim = (e) => {
    e.preventDefault();
    setAiResponse(airesponse);
  };

  const nextStatus = () => {
    setStatusIndex((i) => Math.min(i + 1, statuses.length - 1));
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6 text-gray-800">
      <h1 className="text-3xl font-bold text-center text-red-500">🛡️ Claim Fighter</h1>
      <p className="text-center text-sm text-gray-500 mb-6">Let’s figure out what happened and help you fight back.</p>

      <Card>
        <CardContent className="space-y-4">
          <h2 className="text-xl font-semibold text-pink-600">Step 1: Upload your EOB</h2>
          <Input type="file" onChange={() => setUploaded(true)} />
          {uploaded && <p className="text-green-600">✅ EOB uploaded successfully</p>}
        </CardContent>
      </Card>

      <Card>
        <CardContent className="space-y-4">
          <h2 className="text-xl font-semibold text-purple-600">Step 2: Tell us about the denial</h2>
          <form onSubmit={handleCheckClaim} className="space-y-4">
            <Input
              placeholder="Claim denial reason"
              value={claim.reason}
              onChange={(e) => setClaim({ ...claim, reason: e.target.value })}
              required
            />
            <Textarea
              placeholder="Briefly describe what happened"
              value={claim.details}
              onChange={(e) => setClaim({ ...claim, details: e.target.value })}
              required
            />
            <Button type="submit">Analyze My Claim</Button>
          </form>
        </CardContent>
      </Card>

      {aiResponse && (
        <Card>
          <CardContent className="space-y-4">
            <h2 className="text-xl font-semibold text-green-600">Step 3: AI Insight</h2>
            <p className="text-gray-700 whitespace-pre-wrap">{aiResponse}</p>
          </CardContent>
        </Card>
      )}

      {aiResponse && (
        <Card>
          <CardContent className="space-y-4">
            <h2 className="text-xl font-semibold text-blue-600">Step 4: Appeal Letter</h2>
            <Textarea readOnly value={appealletter} className="h-48" />
            <Button onClick={() => navigator.clipboard.writeText(appealletter)}>
              📋 Copy Appeal Letter
            </Button>
          </CardContent>
        </Card>
      )}

      {aiResponse && (
        <Card>
          <CardContent className="space-y-4">
            <h2 className="text-xl font-semibold text-yellow-600">Step 5: Track Your Claim</h2>
            <p className="text-center font-medium">Status: {statuses[statusIndex]}</p>
            <Progress value={(statusIndex + 1) * 33.33} className="h-3" />
            {statusIndex < statuses.length - 1 && (
              <div className="text-center">
                <Button onClick={nextStatus} className="mt-2">Next Status</Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}