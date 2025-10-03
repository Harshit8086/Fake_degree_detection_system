import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { AppHeader } from "@/components/layout/AppHeader";
import { useModals } from "@/hooks/useModals";
import { CertificateUploadModal } from "@/components/modals/CertificateUploadModal";
import { CertificateDetailsModal } from "@/components/modals/CertificateDetailsModal";
import IssueCertificateModal from "@/components/modals/IssueCertificateModal";
import ReportsModal from "@/components/modals/ReportsModal";
import InstitutionSettingsModal from "@/components/modals/InstitutionSettingsModal";
import { 
  Shield, Upload, BarChart3, FileText, Users, TrendingUp, Clock, CheckCircle, Settings, Download, Plus
} from "lucide-react";

interface Certificate {
  id: string;
  studentName: string;
  program: string;
  issueDate: string;
  status: "issued" | "pending" | "revoked";
  blockchainHash?: string;
}

const InstitutionDashboard = () => {
  const { t } = useTranslation();
  const [blockchainEnabled, setBlockchainEnabled] = useState(true);
  const [digitalSignature, setDigitalSignature] = useState(true);
  const { toast } = useToast();
  const modals = useModals();

  const [issueCertificateModal, setIssueCertificateModal] = useState(false);
  const [reportsModal, setReportsModal] = useState(false);
  const [settingsModal, setSettingsModal] = useState(false);

  const handleIssueNewCertificate = () => setIssueCertificateModal(true);
  const handleBulkUpload = () => modals.certificateUploadModal.open("bulk");
  const handleExportData = () => toast({ title: "Exporting Data", description: "Your certificate data is being exported..." });
  const handleViewCertificate = (certId: string) => {
    const certificate = mockCertificates.find(cert => cert.id === certId);
    if (certificate) modals.certificateDetailsModal.open(certificate);
  };
  const handleViewReports = () => setReportsModal(true);
  const handleSettings = () => setSettingsModal(true);

  const mockCertificates: Certificate[] = [
    { id: "CERT001", studentName: "Sachin Yadav", program: "B.Sc. Computer Science", issueDate: "2024-01-15", status: "issued", blockchainHash: "0x1a2b3c..." },
    { id: "CERT002", studentName: "Karthik Kumar", program: "MBA", issueDate: "2024-01-10", status: "pending" },
    { id: "CERT003", studentName: "Anita Gupta", program: "B.A. Psychology", issueDate: "2024-01-05", status: "issued", blockchainHash: "0x4d5e6f..." }
  ];

  const stats = {
    totalIssued: mockCertificates.filter(c => c.status === "issued").length,
    pending: mockCertificates.filter(c => c.status === "pending").length,
    verificationRequests: 45,
    monthlyGrowth: 12.5
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "issued": return "bg-verification-success text-white";
      case "pending": return "bg-verification-pending text-white";
      case "revoked": return "bg-verification-failed text-white";
      default: return "bg-muted";
    }
  };

  // Animated chart simulation
  const [chartData, setChartData] = useState<number[]>([]);
  useEffect(() => {
    const interval = setInterval(() => {
      setChartData(Array.from({ length: 7 }, () => Math.floor(Math.random() * 20) + 10));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/10 to-background">
      <AppHeader 
        badge={{ text: t('institution.title'), variant: "institution" }}
        showSearch
        showUserControls
        userName="Sarah Institution"
        userEmail="admin@university.edu"
        userRole="institution"
      />

      <div className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { title: "Certificates Issued", value: stats.totalIssued, color: "border-l-role-institution" },
            { title: "Pending Approvals", value: stats.pending, color: "border-l-verification-pending" },
            { title: "Verification Requests", value: stats.verificationRequests, color: "border-l-primary" },
            { title: "Growth Rate", value: `+${stats.monthlyGrowth}%`, color: "border-l-accent" }
          ].map((stat, i) => (
            <Card key={i} className={`border-l-4 ${stat.color} hover:shadow-lg transition-shadow duration-200 rounded-xl`}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className={`text-2xl font-bold ${stat.color.includes("accent") ? "text-accent" : ""}`}>{stat.value}</div>
                <p className="text-xs text-muted-foreground">This month</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Certificate Management */}
            <Card className="rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-200">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="h-5 w-5 text-role-institution" />
                  <span>Certificate Management</span>
                </CardTitle>
                <CardDescription>Issue and manage digital certificates with blockchain verification</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 p-6">
                {[
                  { title: "Blockchain Verification", desc: "Enable immutable blockchain records for all certificates", checked: blockchainEnabled, setChecked: setBlockchainEnabled },
                  { title: "Digital Signature", desc: "Automatically sign certificates with institutional seal", checked: digitalSignature, setChecked: setDigitalSignature }
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-4 border rounded-lg hover:shadow transition-shadow duration-150">
                    <div className="space-y-1">
                      <h4 className="font-medium text-base">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                    <Switch checked={item.checked} onCheckedChange={item.setChecked} />
                  </div>
                ))}

                <div className="flex flex-wrap gap-2">
                  <Button className="bg-role-institution hover:bg-role-institution/90 transition-all duration-200 hover:scale-105 shadow-sm rounded-lg" onClick={handleIssueNewCertificate}>
                    <Plus className="h-4 w-4 mr-2" /> Issue New Certificate
                  </Button>
                  <Button variant="outline" onClick={handleBulkUpload} className="transition-all duration-200 hover:scale-105 shadow-sm rounded-lg">
                    <Upload className="h-4 w-4 mr-2" /> Bulk Upload
                  </Button>
                  <Button variant="outline" onClick={handleExportData} className="transition-all duration-200 hover:scale-105 shadow-sm rounded-lg">
                    <Download className="h-4 w-4 mr-2" /> Export Data
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Certificates */}
            <Card className="rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-200">
              <CardHeader className="flex items-center justify-between">
                <CardTitle>Recent Certificates</CardTitle>
                <Button variant="outline" size="sm" onClick={() => toast({ title: "View All", description: "Opening complete certificate list..." })}>View All</Button>
              </CardHeader>
              <CardContent className="space-y-4 p-6">
                {mockCertificates.map(cert => (
                  <div key={cert.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors flex justify-between items-center">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="font-semibold text-sm">{cert.program}</h4>
                        <Badge className={`rounded-full px-2 py-1 text-xs font-semibold flex items-center ${getStatusColor(cert.status)}`}>
                          {cert.status === "issued" && <CheckCircle className="h-4 w-4 mr-1" />}
                          {cert.status === "pending" && <Clock className="h-4 w-4 mr-1" />}
                          {cert.status === "revoked" && <Shield className="h-4 w-4 mr-1" />}
                          <span className="capitalize">{cert.status}</span>
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">Student: {cert.studentName}</p>
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <span>ID: {cert.id}</span>
                        <span>Issued: {cert.issueDate}</span>
                        {cert.blockchainHash && (
                          <span className="flex items-center space-x-1"><Shield className="h-3 w-3" /><span>Blockchain: {cert.blockchainHash}</span></span>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleViewCertificate(cert.id)}>View</Button>
                      <Button variant="outline" size="sm"><Settings className="h-4 w-4" /></Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Animated Analytics */}
            <Card className="rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-200">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5 text-role-institution" /> Issuance Analytics
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="h-64 w-full flex items-end gap-2">
                  {chartData.map((val, i) => (
                    <div key={i} className="bg-role-institution rounded-sm transition-all duration-700" style={{ height: `${val * 3}px`, width: "12%", minWidth: "12%" }}></div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-2 text-center">Certificate issuance trends over the past week</p>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-200">
              <CardHeader><CardTitle className="text-lg">Quick Actions</CardTitle></CardHeader>
              <CardContent className="space-y-3 p-6">
                <Button className="w-full justify-start bg-role-institution hover:bg-role-institution/90 transition-all duration-200 hover:scale-105 shadow-sm rounded-lg" onClick={handleIssueNewCertificate}><Plus className="h-4 w-4 mr-2" /> Issue Certificate</Button>
                <Button variant="outline" onClick={handleBulkUpload} className="w-full justify-start transition-all duration-200 hover:scale-105 shadow-sm rounded-lg"><Upload className="h-4 w-4 mr-2" /> Bulk Upload</Button>
                <Button variant="outline" onClick={handleViewReports} className="w-full justify-start transition-all duration-200 hover:scale-105 shadow-sm rounded-lg"><BarChart3 className="h-4 w-4 mr-2" /> View Reports</Button>
                <Button variant="outline" onClick={handleSettings} className="w-full justify-start transition-all duration-200 hover:scale-105 shadow-sm rounded-lg"><Settings className="h-4 w-4 mr-2" /> Settings</Button>
              </CardContent>
            </Card>

            <Card className="rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-200">
              <CardHeader><CardTitle className="text-lg flex items-center space-x-2"><Users className="h-5 w-5 text-primary" /> Verification Requests</CardTitle></CardHeader>
              <CardContent className="space-y-3 p-6">
                <div className="p-3 bg-primary/10 rounded-lg border border-primary/20">
                  <p className="text-sm font-medium">New Request</p>
                  <p className="text-xs text-muted-foreground">Rohit Raj - Computer Science Degree</p>
                  <p className="text-xs text-muted-foreground">Requested by: TechCorp HR</p>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-sm font-medium">Pending Review</p>
                  <p className="text-xs text-muted-foreground">Riya Roy - MBA Degree</p>
                  <p className="text-xs text-muted-foreground">Requested by: StartupXYZ</p>
                </div>
                <Button variant="outline" className="w-full text-sm" onClick={() => toast({ title: "View Requests", description: "Opening verification requests..." })}>View All Requests</Button>
              </CardContent>
            </Card>

            <Card className="rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-200">
              <CardHeader><CardTitle className="text-lg">System Status</CardTitle></CardHeader>
              <CardContent className="space-y-3 p-6">
                {["Blockchain Network", "Digital Signature", "API Status"].map((item, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className="text-sm">{item}</span>
                    <Badge className="bg-verification-success text-white">Active</Badge>
                  </div>
                ))}
                <div className="flex items-center justify-between">
                  <span className="text-sm">Storage</span>
                  <Badge variant="outline">85% Used</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Modals */}
      <CertificateUploadModal isOpen={modals.certificateUploadModal.isOpen} onClose={modals.certificateUploadModal.close} mode={modals.certificateUploadModal.mode} />
      <CertificateDetailsModal isOpen={modals.certificateDetailsModal.isOpen} onClose={modals.certificateDetailsModal.close} certificate={modals.certificateDetailsModal.certificate} />
      <IssueCertificateModal isOpen={issueCertificateModal} onClose={() => setIssueCertificateModal(false)} />
      <ReportsModal isOpen={reportsModal} onClose={() => setReportsModal(false)} />
      <InstitutionSettingsModal isOpen={settingsModal} onClose={() => setSettingsModal(false)} />
    </div>
  );
};

export default InstitutionDashboard;
