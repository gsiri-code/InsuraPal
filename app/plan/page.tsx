"use client"
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

export default function PlanSummary() {
  return (
    <div className="max-w-4xl mx-auto p-6 text-gray-800">
      <h1 className="text-3xl font-bold text-center mb-6 text-yellow-600">✨ KP CO Gold 1500/20 Plan Summary ✨</h1>

      <Card>
        <CardContent>
          <Table className="text-sm">
            <TableHeader>
              <TableRow className="bg-yellow-100 text-yellow-800">
                <TableHead colSpan={2} className="text-xl font-semibold text-center py-4">Plan Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow><TableCell>Plan Type</TableCell><TableCell>HMO</TableCell></TableRow>
              <TableRow><TableCell>Coverage</TableCell><TableCell>Individual / Family</TableCell></TableRow>
              <TableRow><TableCell>Availability</TableCell><TableCell>Select counties in Colorado (Adams, Denver, Boulder, etc.)</TableCell></TableRow>
              <TableRow><TableCell>Referral Required</TableCell><TableCell>Yes (self-referral allowed for some specialists)</TableCell></TableRow>
            </TableBody>

            <TableHeader>
              <TableRow className="bg-pink-100 text-pink-800">
                <TableHead colSpan={2} className="text-xl font-semibold text-center py-4">Costs & Limits</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow><TableCell>Deductible</TableCell><TableCell>$1,500 Individual / $3,000 Family</TableCell></TableRow>
              <TableRow><TableCell>Out-of-Pocket Max</TableCell><TableCell>$8,500 Individual / $17,000 Family</TableCell></TableRow>
              <TableRow><TableCell>Other Deductibles</TableCell><TableCell>$50 Pediatric Dental, $195 Prescription Drugs</TableCell></TableRow>
            </TableBody>

            <TableHeader>
              <TableRow className="bg-green-100 text-green-800">
                <TableHead colSpan={2} className="text-xl font-semibold text-center py-4">Common Services (In-Network)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow><TableCell>Primary Care Visit</TableCell><TableCell>$20 (no deductible)</TableCell></TableRow>
              <TableRow><TableCell>Specialist Visit</TableCell><TableCell>$60 + 25% for additional services</TableCell></TableRow>
              <TableRow><TableCell>Preventive Care</TableCell><TableCell>No charge</TableCell></TableRow>
              <TableRow><TableCell>Diagnostic Tests</TableCell><TableCell>25% coinsurance</TableCell></TableRow>
              <TableRow><TableCell>Generic Drugs</TableCell><TableCell>$10 retail, $20 mail order</TableCell></TableRow>
              <TableRow><TableCell>Preferred Brand Drugs</TableCell><TableCell>$40 retail, $80 mail order</TableCell></TableRow>
              <TableRow><TableCell>Non-Preferred/Specialty Drugs</TableCell><TableCell>25% coinsurance</TableCell></TableRow>
              <TableRow><TableCell>Urgent Care</TableCell><TableCell>$75 per visit</TableCell></TableRow>
              <TableRow><TableCell>Emergency Room</TableCell><TableCell>25% coinsurance</TableCell></TableRow>
              <TableRow><TableCell>Hospital Stay</TableCell><TableCell>25% coinsurance</TableCell></TableRow>
            </TableBody>

            <TableHeader>
              <TableRow className="bg-blue-100 text-blue-800">
                <TableHead colSpan={2} className="text-xl font-semibold text-center py-4">Extra Coverage & Benefits</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow><TableCell>Mental Health</TableCell><TableCell>$20 individual / $10 group (no deductible)</TableCell></TableRow>
              <TableRow><TableCell>Rehabilitation</TableCell><TableCell>$20 per visit, limits apply</TableCell></TableRow>
              <TableRow><TableCell>Habilitation</TableCell><TableCell>$20 per visit, limits apply</TableCell></TableRow>
              <TableRow><TableCell>Children’s Dental & Vision</TableCell><TableCell>Covered with specific limits</TableCell></TableRow>
              <TableRow><TableCell>Hospice</TableCell><TableCell>No charge</TableCell></TableRow>
              <TableRow><TableCell>Home Health</TableCell><TableCell>25% coinsurance</TableCell></TableRow>
              <TableRow><TableCell>Durable Medical Equipment</TableCell><TableCell>25% coinsurance</TableCell></TableRow>
            </TableBody>

            <TableHeader>
              <TableRow className="bg-rose-100 text-rose-800">
                <TableHead colSpan={2} className="text-xl font-semibold text-center py-4">Good to Know 💡</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow><TableCell>Use In-Network Providers</TableCell><TableCell>You’ll pay less and avoid surprise bills</TableCell></TableRow>
              <TableRow><TableCell>Preventive Services</TableCell><TableCell>Free, even before deductible is met</TableCell></TableRow>
              <TableRow><TableCell>Out-of-Network Coverage</TableCell><TableCell>Usually not covered</TableCell></TableRow>
              <TableRow><TableCell>Not Covered</TableCell><TableCell>Adult dental/vision, cosmetic surgery, weight loss programs</TableCell></TableRow>
              <TableRow><TableCell>Language Help</TableCell><TableCell>Free assistance in many languages</TableCell></TableRow>
              <TableRow><TableCell>Member Support</TableCell><TableCell>Call 1-855-249-5005 for any questions</TableCell></TableRow>
            </TableBody>
          </Table>

          <div className="text-center mt-6 space-y-4">
            <div>
              <Button 
                className="bg-blue-500 hover:bg-blue-600 text-white text-lg"
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = './KP-CO-Gold-1500-Plan-Summary.pdf';
                  link.download = 'KP-CO-Gold-1500-Plan-Summary.pdf';
                  link.click();
                }}
              >
                📄 Download Full PDF
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
