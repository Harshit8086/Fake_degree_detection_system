import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useToast } from "@/hooks/use-toast";
import { useModals } from "@/hooks/useModals";
import { CertificateUploadModal } from "@/components/modals/CertificateUploadModal";
import { CertificateDetailsModal } from "@/components/modals/CertificateDetailsModal";
import { UserGuideModal } from "@/components/modals/UserGuideModal";
import { ContactSupportModal } from "@/components/modals/ContactSupportModal";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AppHeader } from "@/components/layout/AppHeader";
import { 
  Shield, Upload, FileText, Clock, CheckCircle, XCircle, AlertTriangle,
  Bell, LogOut, Search, Filter, Calendar, Download
} from "lucide-react";

interface Verification {
  id: string;
  certificateTitle: string;
  studentName: string;
  institution: string;
  status: "verified" | "pending" | "failed";
  uploadDate: string;
  verificationDate?: string;
}

const VerifierDashboard = () => {
  const { t } = useTranslation();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [userGuideOpen, setUserGuideOpen] = useState(false);
  const [contactSupportOpen, setContactSupportOpen] = useState(false);
  const { toast } = useToast();
  const { certificateUploadModal, certificateDetailsModal } = useModals();
  
  const mockVerifications: Verification[] = [
    {
      id: "V001",
      certificateTitle: "Bachelor of Science in Computer Science",
      studentName: "Rohit Raj",
      institution: "Birla Institute of Technology - Mesra",
      status: "verified",
      uploadDate: "2025-01-15",
      verificationDate: "2025-01-15"
    },
    {
      id: "V002",
      certificateTitle: "MBA in Business Administration",
      studentName: "Riya Roy",
      institution: "Ranchi University",
      status: "pending",
      uploadDate: "2025-01-14"
    },
    {
      id: "V003",
      certificateTitle: "Master of Arts in Psychology",
      studentName: "Raushan Raj",
      institution: "Amity University Jharkhand",
      status: "failed",
      uploadDate: "2025-01-13",
      verificationDate: "2025-01-13"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "verified":
        return "bg-verification-success text-white";
      case "pending":
        return "bg-verification-pending text-white";
      case "failed":
        return "bg-verification-failed text-white";
      default:
        return "bg-muted";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "verified":
        return <CheckCircle className="h-4 w-4" />;
      case "pending":
        return <Clock className="h-4 w-4" />;
      case "failed":
        return <XCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      toast({
        title: "File Selected",
        description: `${file.name} is ready for verification.`,
      });
    }
  };

  const handleStartVerification = () => {
    if (!selectedFile) return;
    
    toast({
      title: "Verification Started",
      description: "Your certificate is being processed...",
    });
    
    setTimeout(() => {
      toast({
        title: "Verification Complete",
        description: "Certificate verified successfully!",
      });
      setSelectedFile(null);
    }, 3000);
  };

  const handleBulkUpload = () => {
    certificateUploadModal.open("bulk");
  };

  const handleExport = () => {
    toast({
      title: "Exporting Data",
      description: "Your verification history is being exported...",
    });
  };

  const handleFilter = () => {
    toast({
      title: "Filter Options",
      description: "Advanced filter options will open here.",
    });
  };

  const handleViewDetails = (verificationId: string) => {
    const verification = mockVerifications.find(v => v.id === verificationId);
    if (verification) {
      certificateDetailsModal.open({
        id: verification.id,
        studentName: verification.studentName,
        program: verification.certificateTitle,
        institution: verification.institution,
        status: verification.status,
        uploadDate: verification.uploadDate,
        verificationDate: verification.verificationDate,
      });
    }
  };

  const handleUploadCertificate = () => {
    certificateUploadModal.open("single");
  };

  const stats = {
    totalVerifications: mockVerifications.length,
    verified: mockVerifications.filter(v => v.status === "verified").length,
    pending: mockVerifications.filter(v => v.status === "pending").length,
    failed: mockVerifications.filter(v => v.status === "failed").length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/10 to-background">
      {/* Header */}
      <AppHeader 
        badge={{ text: t('verifier.title'), variant: "verifier" }}
        showSearch={true}
        showUserControls={true}
        userName="Rohit Gain"
        userEmail="RohitGain@company.com"
        userRole="verifier"
      />

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { title: "Total Verifications", value: stats.totalVerifications, color: "bg-gray-100", icon: Shield },
            { title: "Verified", value: stats.verified, color: "bg-verification-success/20", icon: CheckCircle },
            { title: "Pending", value: stats.pending, color: "bg-verification-pending/20", icon: Clock },
            { title: "Failed", value: stats.failed, color: "bg-verification-failed/20", icon: XCircle },
          ].map((card) => (
            <Card key={card.title} className="border-l-4 border-l-primary shadow hover:shadow-lg transition rounded-xl">
              <CardHeader className="flex items-center space-x-2 pb-2">
                <card.icon className="h-5 w-5 text-muted-foreground" />
                <CardTitle className="text-sm font-medium text-muted-foreground">{card.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${card.color.includes("success") ? "text-verification-success" : ""}`}>
                  {card.value}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Upload Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Upload className="h-5 w-5 text-role-verifier" />
                  <span>Certificate Upload</span>
                </CardTitle>
                <CardDescription>
                  Upload a certificate for instant verification using our AI-powered OCR system
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div 
                  className="border-2 border-dashed border-muted rounded-xl p-8 text-center hover:border-role-verifier/80 hover:bg-role-verifier/5 transition cursor-pointer"
                  onClick={() => document.querySelector<HTMLInputElement>('input[type="file"]')?.click()}
                >
                  <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4 animate-bounce-slow" />
                  <p className="text-sm text-muted-foreground mb-2">
                    Drag & drop your certificate or click to browse
                  </p>
                  <Input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  {selectedFile && (
                    <div className="mt-4 p-3 bg-muted/50 rounded-lg flex items-center justify-between">
                      <span className="text-sm font-medium truncate">{selectedFile.name}</span>
                      <span className="text-xs text-muted-foreground">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</span>
                    </div>
                  )}
                </div>
                
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button 
                    className="bg-role-verifier hover:bg-role-verifier/90 flex-1 sm:flex-none rounded-lg" 
                    disabled={!selectedFile}
                    onClick={handleStartVerification}
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Start Verification
                  </Button>
                  <Button variant="outline" className="flex-1 sm:flex-none rounded-lg" onClick={handleBulkUpload}>
                    <Upload className="h-4 w-4 mr-2" />
                    Bulk Upload
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Verification History */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between mb-3">
                  <CardTitle>Verification History</CardTitle>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button variant="outline" size="sm" onClick={handleFilter}>
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleExport}>
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search verifications..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="max-w-sm"
                  />
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {mockVerifications.map((v) => (
                  <Card key={v.id} className="p-4 hover:shadow-lg transition rounded-xl">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <h4 className="font-semibold text-sm">{v.certificateTitle}</h4>
                        <div className="flex items-center space-x-2">
                          <Badge className={`${getStatusColor(v.status)} px-2 py-1 text-xs flex items-center space-x-1`}>
                            {getStatusIcon(v.status)}
                            <span className="capitalize">{v.status}</span>
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">Student: {v.studentName}</p>
                        <p className="text-xs text-muted-foreground">Institution: {v.institution}</p>
                        <div className="flex space-x-3 text-xs text-muted-foreground">
                          <span>ID: {v.id}</span>
                          <span>Uploaded: {v.uploadDate}</span>
                          {v.verificationDate && <span>Verified: {v.verificationDate}</span>}
                        </div>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => handleViewDetails(v.id)}>View</Button>
                    </div>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button className="w-full justify-start bg-role-verifier hover:bg-role-verifier/90 transition rounded-lg" onClick={() => document.querySelector<HTMLInputElement>('input[type="file"]')?.click()}>
                  <Upload className="h-4 w-4 mr-2" /> Upload Certificate
                </Button>
                <Button variant="outline" className="w-full justify-start rounded-lg transition" onClick={handleBulkUpload}>
                  <FileText className="h-4 w-4 mr-2" /> Bulk Verification
                </Button>
                <Button variant="outline" className="w-full justify-start rounded-lg transition" onClick={() => toast({ title: "Schedule Verification", description: "Scheduling feature coming soon!" })}>
                  <Calendar className="h-4 w-4 mr-2" /> Schedule Verification
                </Button>
              </CardContent>
            </Card>

            {/* Alerts */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5 text-verification-pending" />
                  <span>Recent Alerts</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-verification-failed/10 rounded-lg border border-verification-failed/20">
                  <p className="text-sm font-medium text-verification-failed">Fraud Detected</p>
                  <p className="text-xs text-muted-foreground">Certificate V003 flagged for irregularities</p>
                </div>
                <div className="p-3 bg-verification-pending/10 rounded-lg border border-verification-pending/20">
                  <p className="text-sm font-medium text-verification-pending">Pending Review</p>
                  <p className="text-xs text-muted-foreground">2 certificates awaiting manual review</p>
                </div>
                <div className="p-3 bg-verification-success/10 rounded-lg border border-verification-success/20">
                  <p className="text-sm font-medium text-verification-success">Batch Complete</p>
                  <p className="text-xs text-muted-foreground">15 certificates verified successfully</p>
                </div>
              </CardContent>
            </Card>

            {/* Help & Support */}
            <Card>
              <CardHeader>
                <CardTitle>Help & Support</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start rounded-lg" onClick={() => setUserGuideOpen(true)}>
                  <FileText className="h-4 w-4 mr-2" /> User Guide
                </Button>
                <Button variant="outline" className="w-full justify-start rounded-lg" onClick={() => setContactSupportOpen(true)}>
                  <Bell className="h-4 w-4 mr-2" /> Contact Support
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Modals */}
        <CertificateUploadModal
          isOpen={certificateUploadModal.isOpen}
          onClose={certificateUploadModal.close}
          mode={certificateUploadModal.mode}
        />
        <CertificateDetailsModal
          isOpen={certificateDetailsModal.isOpen}
          onClose={certificateDetailsModal.close}
          certificate={certificateDetailsModal.certificate}
        />
        <UserGuideModal
          isOpen={userGuideOpen}
          onClose={() => setUserGuideOpen(false)}
        />
        <ContactSupportModal
          isOpen={contactSupportOpen}
          onClose={() => setContactSupportOpen(false)}
        />
      </div>
    </div>
  );
};

export default VerifierDashboard;
