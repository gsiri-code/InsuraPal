"use client"
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function SwitchToMedicare() {
  const [step, setStep] = useState(1);

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6 text-gray-800">
      <h1 className="text-3xl font-bold text-center text-red-600">🔄 Switch from Kaiser Permanente Gold 1500/20 to Original Medicare</h1>
      <p className="text-center text-sm text-gray-500 mb-6">
        Here’s how you can disenroll from the Kaiser Permanente Gold 1500/20 plan and switch to Original Medicare.
      </p>

      {step === 1 && (
        <Card>
          <CardContent className="space-y-4">
            <h2 className="text-xl font-semibold text-purple-600">Step 1: Know When You Can Switch</h2>
            <p>You can switch to Original Medicare during:</p>
            <ul className="list-disc ml-6">
              <li>October 15 – December 7 (Open Enrollment)</li>
              <li>January 1 – March 31 (Medicare Advantage Open Enrollment)</li>
            </ul>
            <Button onClick={() => setStep(2)}>Next</Button>
          </CardContent>
        </Card>
      )}

      {step === 2 && (
        <Card>
          <CardContent className="space-y-4">
            <h2 className="text-xl font-semibold text-blue-600">Step 2: Fill Out the Disenrollment Form</h2>
            <p>You’ll need to complete the official CMS-1763 form to leave your Kaiser Permanente plan.</p>
            <a
              className="text-blue-500 underline"
              href="https://www.cms.gov/medicare/cms-forms/cms-forms/downloads/cms1763.pdf"
              target="_blank"
            >
              📄 Download CMS-1763 (PDF)
            </a>
            <Button onClick={() => setStep(3)}>Next</Button>
          </CardContent>
        </Card>
      )}

      {step === 3 && (
        <Card>
          <CardContent className="space-y-4">
            <h2 className="text-xl font-semibold text-green-600">Step 3: Submit the Form</h2>
            <ul className="list-disc ml-6">
              <li>📫 Mail to your local Social Security Office</li>
              <li>📞 Or call 1-800-MEDICARE (1-800-633-4227)</li>
              <li>🏢 Or visit your local Social Security office in person</li>
            </ul>
            <Button onClick={() => setStep(4)}>Next</Button>
          </CardContent>
        </Card>
      )}

      {step === 4 && (
        <Card>
          <CardContent className="space-y-4">
            <h2 className="text-xl font-semibold text-yellow-600">Step 4: Consider Additional Coverage</h2>
            <p>Once back on Original Medicare, you may also want:</p>
            <ul className="list-disc ml-6">
              <li>Part D (Drug Coverage)</li>
              <li>Medigap (Supplemental Insurance)</li>
            </ul>
            <p className="text-center text-green-600 font-bold">🎉 You’re all set to switch from Kaiser Permanente Gold 1500/20 to Original Medicare!</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
