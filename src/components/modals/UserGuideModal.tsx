import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Upload,
  FileCheck,
  Shield,
  AlertTriangle,
  CheckCircle,
  Clock,
  XCircle,
  Search,
  Download,
  Users,
  FileText,
  HelpCircle,
  Zap,
  TrendingUp,
  Lock,
  Eye
} from "lucide-react";
import { useState } from "react";

interface UserGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function UserGuideModal({ isOpen, onClose }: UserGuideModalProps) {
  const [searchTerm, setSearchTerm] = useState("");

  // FAQ Data
  const faqs = [
    { q: "How long does verification take?", a: "Most verifications complete within 15-30 seconds. Complex documents may take 24-48 hours." },
    { q: "What file formats are supported?", a: "We accept PDF, JPG, JPEG, and PNG formats. PDF is recommended. Maximum file size is 10MB." },
    { q: "Is my data secure?", a: "All data is encrypted using bank-level AES-256 security." },
    { q: "Can I verify international certificates?", a: "Yes, certificates from worldwide institutions are supported." },
    { q: "What happens if verification fails?", a: "Contact the issuing institution or upload additional supporting documents." },
    { q: "How many certificates can I verify at once?", a: "Bulk upload supports up to 50 certificates per batch." },
    { q: "Can I export verification reports?", a: "Yes, reports can be exported in PDF or CSV format." }
  ];

  const filteredFaqs = faqs.filter(f => f.q.toLowerCase().includes(searchTerm.toLowerCase()));

  // Getting Started Steps
  const steps = [
    { step: 1, icon: Upload, title: "Upload Certificate", description: "Upload a certificate image or PDF file. Supported formats: PDF, JPG, PNG. Max size: 10MB.", color: "bg-blue-500 text-white" },
    { step: 2, icon: Search, title: "AI Processing", description: "AI extracts data using OCR and analyzes signatures and security features.", color: "bg-purple-500 text-white" },
    { step: 3, icon: Shield, title: "Blockchain Verification", description: "Cross-reference with blockchain and institutional databases.", color: "bg-green-500 text-white" },
    { step: 4, icon: CheckCircle, title: "Get Results", description: "Instant verification results including authenticity score.", color: "bg-emerald-500 text-white" }
  ];

  // Verification Statuses
  const statuses = [
    {
      icon: CheckCircle,
      status: "Verified",
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
      description: "Certificate has been successfully verified and authenticated.",
      details: [
        "Certificate matches institutional records",
        "Digital signature is valid",
        "No signs of tampering detected",
        "Issuing institution confirmed"
      ],
      action: "Certificate is authentic and can be accepted with confidence."
    },
    {
      icon: Clock,
      status: "Pending",
      color: "text-yellow-500",
      bgColor: "bg-yellow-50",
      description: "Verification is in progress or awaiting manual review.",
      details: [
        "AI processing is currently running",
        "Waiting for institutional database response",
        "Requires manual verification by expert",
        "Additional documentation requested"
      ],
      action: "Please wait for the verification to complete. You'll be notified when ready."
    },
    {
      icon: XCircle,
      status: "Failed",
      color: "text-red-600",
      bgColor: "bg-red-50",
      description: "Certificate could not be verified or shows signs of irregularities.",
      details: [
        "Certificate doesn't match records",
        "Signs of document tampering detected",
        "Issuing institution cannot be verified",
        "Invalid or forged signatures"
      ],
      action: "Contact the institution directly or request additional documentation."
    },
    {
      icon: AlertTriangle,
      status: "Under Review",
      color: "text-amber-500",
      bgColor: "bg-amber-50",
      description: "Certificate flagged for additional manual verification.",
      details: [
        "Unusual patterns detected",
        "Institution verification pending",
        "Security expert review required",
        "Cross-reference checks in progress"
      ],
      action: "A specialist will review within 24-48 hours. Check back later."
    }
  ];

  // Single Verification Steps
  const singleVerificationSteps = [
    {
      step: 1,
      title: "Navigate to Upload Section",
      description: "Find the 'Certificate Upload' section on your dashboard. It's located in the main content area."
    },
    {
      step: 2,
      title: "Select Your File",
      description: "Click the upload area or drag & drop your certificate file. Ensure it's in PDF, JPG, or PNG format."
    },
    {
      step: 3,
      title: "Review File Details",
      description: "Check the file name and size displayed. Make sure it's the correct document before proceeding."
    },
    {
      step: 4,
      title: "Start Verification",
      description: "Click 'Start Verification' button. The AI will process your certificate and provide results within seconds."
    }
  ];

  // Best Practices
  const bestPractices = [
    {
      title: "File Quality",
      tips: [
        "Use high-resolution scans (minimum 300 DPI)",
        "Ensure all text is clearly readable",
        "Avoid shadows, glare, or distortion",
        "Use original documents when possible"
      ]
    },
    {
      title: "File Format",
      tips: [
        "PDF format is recommended for best results",
        "Keep file size under 10MB",
        "Avoid password-protected PDFs",
        "Use standard compression formats"
      ]
    },
    {
      title: "Document Preparation",
      tips: [
        "Include all pages of multi-page certificates",
        "Ensure seals and signatures are visible",
        "Remove any handwritten notes or marks",
        "Flatten any form fields in PDFs"
      ]
    },
    {
      title: "Verification Best Practices",
      tips: [
        "Verify certificates as soon as you receive them",
        "Keep verification reports for your records",
        "Re-verify if documents are more than 1 year old",
        "Cross-check with institution if status is unclear"
      ]
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] p-0 rounded-2xl overflow-hidden shadow-xl">
        <DialogHeader className="px-6 pt-6 pb-4 border-b bg-gradient-to-r from-blue-50 to-blue-100">
          <DialogTitle className="text-2xl flex items-center gap-2 font-bold">
            <FileText className="h-6 w-6 text-role-verifier" /> Complete User Guide
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Learn how to effectively use the Certificate Verification System
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-[calc(90vh-120px)]">
          <div className="px-6 pb-6">
            <Tabs defaultValue="getting-started" className="w-full">
              <TabsList className="grid w-full grid-cols-5 mb-6 gap-2">
                <TabsTrigger value="getting-started" className="flex items-center gap-2"><Zap className="h-4 w-4"/>Getting Started</TabsTrigger>
                <TabsTrigger value="verification" className="flex items-center gap-2"><FileCheck className="h-4 w-4"/>Verification</TabsTrigger>
                <TabsTrigger value="statuses" className="flex items-center gap-2"><Shield className="h-4 w-4"/>Statuses</TabsTrigger>
                <TabsTrigger value="best-practices" className="flex items-center gap-2"><TrendingUp className="h-4 w-4"/>Best Practices</TabsTrigger>
                <TabsTrigger value="faq" className="flex items-center gap-2"><HelpCircle className="h-4 w-4"/>FAQ</TabsTrigger>
              </TabsList>

              {/* Getting Started */}
              <TabsContent value="getting-started" className="space-y-6 animate-fade-in">
                {steps.map((step) => (
                  <Card key={step.step} className="flex gap-4 p-4 rounded-xl border bg-white hover:shadow-xl transition-all duration-300">
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center ${step.color}`}>
                      <step.icon className="h-7 w-7"/>
                    </div>
                    <div>
                      <h4 className="font-semibold">{step.title}</h4>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                    </div>
                  </Card>
                ))}
              </TabsContent>

              {/* Verification */}
              <TabsContent value="verification" className="space-y-6 animate-fade-in">
                <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-r from-white to-green-50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Upload className="h-5 w-5 text-primary" /> Single Certificate Verification</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {singleVerificationSteps.map((s) => (
                      <details key={s.step} className="p-4 border rounded-xl bg-white hover:shadow-lg transition-all duration-300">
                        <summary className="flex items-center gap-2 cursor-pointer font-semibold">Step {s.step}: {s.title}</summary>
                        <p className="text-sm text-muted-foreground mt-2 ml-6">{s.description}</p>
                      </details>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Statuses */}
              <TabsContent value="statuses" className="space-y-6 animate-fade-in">
                {statuses.map((s, idx) => (
                  <Card key={idx} className={`p-4 rounded-xl ${s.bgColor} border hover:shadow-lg transition-all duration-300`}>
                    <div className="flex items-center gap-3">
                      <s.icon className={`h-6 w-6 ${s.color}`} />
                      <div>
                        <Badge className={s.color}>{s.status}</Badge>
                        <p className="text-sm font-medium mt-1">{s.description}</p>
                      </div>
                    </div>
                    <div className="ml-9 mt-3">
                      <h5 className="text-sm font-semibold mb-2">Common Reasons:</h5>
                      <ul className="space-y-1">
                        {s.details.map((d, i) => (
                          <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                            <span className="text-primary mt-0.5">•</span><span>{d}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-3 p-2 bg-background/50 rounded text-xs">
                        <strong>Recommended Action:</strong> {s.action}
                      </div>
                    </div>
                  </Card>
                ))}
              </TabsContent>

              {/* Best Practices */}
              <TabsContent value="best-practices" className="space-y-6 animate-fade-in">
                {bestPractices.map((bp, idx) => (
                  <Card key={idx} className="p-4 border rounded-xl bg-muted/30 hover:shadow-lg transition-all duration-300">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-primary" /> {bp.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {bp.tips.map((tip, i) => (
                          <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                            <span className="text-primary mt-1">✓</span>
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              {/* FAQ */}
              <TabsContent value="faq" className="space-y-6 animate-fade-in">
                <input
                  type="text"
                  placeholder="Search FAQ..."
                  className="w-full p-2 border rounded-lg mb-4"
                  onChange={e => setSearchTerm(e.target.value)}
                />
                {filteredFaqs.map((faq, idx) => (
                  <details key={idx} className="p-4 border rounded-xl bg-white hover:shadow-lg transition-all duration-300">
                    <summary className="flex items-center gap-2 cursor-pointer font-semibold">
                      <HelpCircle className="h-4 w-4 text-primary"/> {faq.q}
                    </summary>
                    <p className="text-sm text-muted-foreground mt-2 ml-6">{faq.a}</p>
                  </details>
                ))}
              </TabsContent>
            </Tabs>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
