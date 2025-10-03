import React, { useState, useRef, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Settings, Shield, Bell, Palette, Globe, Mail, Smartphone, Upload, Save, Download } from "lucide-react";
import QRCode from "react-qr-code";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Badge } from "@/components/ui/badge";

interface InstitutionSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const InstitutionSettingsModal = ({ isOpen, onClose }: InstitutionSettingsModalProps) => {
  const { toast } = useToast();

  // -------------------- States --------------------
  const [institutionData, setInstitutionData] = useState({
    name: "Indian Institute of Excellence",
    shortName: "IIE",
    website: "https://www.iie.ac.in",
    email: "admin@iie.ac.in",
    phone: "+91 98765 43210",
    address: "123 Knowledge Road, Sector 15, New Delhi, Delhi 110001",
    description: "Leading institution for digital education and innovation in India.",
    accreditation: "UGC-2025",
    logo: null as File | null
  });

  const [securitySettings, setSecuritySettings] = useState({
    blockchainEnabled: true,
    digitalSignature: true,
    twoFactorAuth: true,
    apiAccess: true,
    auditLogging: true,
    dataEncryption: true,
    sessionTimeout: "30",
    passwordComplexity: "high",
    ipWhitelisting: false
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    certificateIssued: true,
    verificationRequest: true,
    systemAlerts: true,
    weeklyReports: true,
    monthlyReports: true,
    securityAlerts: true
  });

  const [integrationSettings, setIntegrationSettings] = useState({
    sisIntegration: false,
    lmsIntegration: true,
    apiEnabled: true,
    webhooksEnabled: false,
    singleSignOn: false,
    ldapIntegration: false
  });

  const [templateSettings, setTemplateSettings] = useState({
    defaultTemplate: "modern",
    allowCustomTemplates: true,
    watermark: true,
    institutionSeal: true,
    digitalBadges: true,
    qrCodeVerification: true
  });

  const [studentName, setStudentName] = useState("John Doe");
  const [courseName, setCourseName] = useState("React Development Course");

  const [certificateId, setCertificateId] = useState<string>("");
  const certificateRef = useRef<HTMLDivElement>(null);

  // -------------------- Handlers --------------------
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setInstitutionData(prev => ({ ...prev, logo: file }));
      toast({ title: "Logo Uploaded", description: "Institution logo has been updated." });
    }
  };

  const handleSave = async () => {
    try {
      toast({ title: "Settings Saved", description: "All institution settings have been updated successfully." });
      onClose();
    } catch (error) {
      toast({ title: "Error Saving Settings", description: "There was a problem saving the institution settings.", variant: "destructive" });
    }
  };

  const generateCertificateId = async (student: string, course: string, issuedOn: string) => {
    const data = `${student}-${course}-${issuedOn}-${institutionData.shortName}`;
    const hashBuffer = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(data));
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
  };

  const updateCertificateId = async () => {
    const id = await generateCertificateId(studentName, courseName, new Date().toISOString());
    setCertificateId(id);
  };

  useEffect(() => {
    updateCertificateId();
  }, [studentName, courseName, institutionData.shortName]);

  const generateVerificationUrl = (id: string) => `https://yourdomain.com/verify?id=${id}`;

  const downloadCertificate = async () => {
    if (!certificateRef.current) return;
    const canvas = await html2canvas(certificateRef.current, { scale: 2, useCORS: true });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({ orientation: "landscape", unit: "px", format: [canvas.width, canvas.height] });
    pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
    pdf.save(`${studentName}_Certificate.pdf`);
  };

  // -------------------- Render --------------------
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] animate-scale-in">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Settings className="h-6 w-6 text-[#0096ff]" />
            <span>Institution Settings</span>
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="general" className="h-[75vh]">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="general" className="flex items-center space-x-2"><Settings className="h-4 w-4" /><span className="hidden sm:block">General</span></TabsTrigger>
            <TabsTrigger value="security" className="flex items-center space-x-2"><Shield className="h-4 w-4" /><span className="hidden sm:block">Security</span></TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center space-x-2"><Bell className="h-4 w-4" /><span className="hidden sm:block">Notifications</span></TabsTrigger>
            <TabsTrigger value="integrations" className="flex items-center space-x-2"><Globe className="h-4 w-4" /><span className="hidden sm:block">Integrations</span></TabsTrigger>
            <TabsTrigger value="templates" className="flex items-center space-x-2"><Palette className="h-4 w-4" /><span className="hidden sm:block">Templates</span></TabsTrigger>
          </TabsList>

          <ScrollArea className="h-[calc(100%-60px)] mt-4 space-y-4">

            {/* -------------------- GENERAL -------------------- */}
            <TabsContent value="general" className="space-y-6">
              <Card className="hover:scale-[1.02] hover:shadow-lg transition-all duration-200">
                <CardHeader><CardTitle>Institution Information</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { id: "name", label: "Institution Name", value: institutionData.name, key: "name" },
                      { id: "website", label: "Website", value: institutionData.website, key: "website" },
                      { id: "email", label: "Email", value: institutionData.email, key: "email" },
                      { id: "phone", label: "Phone", value: institutionData.phone, key: "phone" },
                      { id: "accreditation", label: "Accreditation ID", value: institutionData.accreditation, key: "accreditation" }
                    ].map(field => (
                      <div key={field.id} className="space-y-2">
                        <Label htmlFor={field.id}>{field.label}</Label>
                        <Input id={field.id} value={field.value} onChange={e => setInstitutionData(prev => ({ ...prev, [field.key]: e.target.value }))} />
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2">
                    <Label>Address</Label>
                    <Textarea value={institutionData.address} onChange={e => setInstitutionData(prev => ({ ...prev, address: e.target.value }))} />
                  </div>

                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea value={institutionData.description} onChange={e => setInstitutionData(prev => ({ ...prev, description: e.target.value }))} />
                  </div>

                  <div className="space-y-2">
                    <Label>Institution Logo</Label>
                    <div className="border-2 border-dashed rounded-lg p-6 text-center">
                      <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                      <div className="mt-4">
                        <label htmlFor="logo-upload" className="cursor-pointer">
                          <span className="text-sm text-muted-foreground">Upload institution logo</span>
                          <input id="logo-upload" type="file" className="hidden" accept=".png,.jpg,.jpeg,.svg" onChange={handleLogoUpload} />
                        </label>
                      </div>
                      {institutionData.logo && <div className="mt-2 flex flex-col items-center"><Badge variant="secondary">{institutionData.logo.name}</Badge><img src={URL.createObjectURL(institutionData.logo)} alt="Logo" className="h-16 w-16 object-contain rounded-md shadow mt-2" /></div>}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* -------------------- SECURITY -------------------- */}
            <TabsContent value="security" className="space-y-6">
              <Card className="hover:scale-[1.02] hover:shadow-lg transition-all duration-200">
                <CardHeader><CardTitle>Security Settings</CardTitle></CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 {Object.keys(securitySettings).map(key => {
  const value = securitySettings[key as keyof typeof securitySettings];
  // Only render Switch for boolean fields
  if (typeof value !== "boolean") return null;

  return (
    <div key={key} className="flex items-center justify-between p-3 border rounded-lg">
      <div>
        <h4 className="font-medium">{key}</h4>
      </div>
      <Switch
        checked={value}
        onCheckedChange={checked =>
          setSecuritySettings(prev => ({ ...prev, [key]: checked }))
        }
      />
    </div>
  );
})}

                </CardContent>
              </Card>
            </TabsContent>

            {/* -------------------- NOTIFICATIONS -------------------- */}
            <TabsContent value="notifications" className="space-y-6">
              <Card className="hover:scale-[1.02] hover:shadow-lg transition-all duration-200">
                <CardHeader><CardTitle>Notification Settings</CardTitle></CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.keys(notificationSettings).map(key => (
                    <div key={key} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{key}</h4>
                      </div>
                      <Switch checked={notificationSettings[key as keyof typeof notificationSettings]} onCheckedChange={checked => setNotificationSettings(prev => ({ ...prev, [key]: checked }))} />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            {/* -------------------- INTEGRATIONS -------------------- */}
            <TabsContent value="integrations" className="space-y-6">
              <Card className="hover:scale-[1.02] hover:shadow-lg transition-all duration-200">
                <CardHeader><CardTitle>Integrations</CardTitle></CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.keys(integrationSettings).map(key => (
                    <div key={key} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{key}</h4>
                      </div>
                      <Switch checked={integrationSettings[key as keyof typeof integrationSettings]} onCheckedChange={checked => setIntegrationSettings(prev => ({ ...prev, [key]: checked }))} />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            {/* -------------------- TEMPLATES & CERTIFICATE -------------------- */}
            <TabsContent value="templates" className="space-y-6">
              <Card className="hover:scale-[1.02] hover:shadow-lg transition-all duration-200">
                <CardHeader><CardTitle>Certificate Templates & Live Preview</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="space-y-2">
                      <Label>Student Name</Label>
                      <Input value={studentName} onChange={e => setStudentName(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label>Course Name</Label>
                      <Input value={courseName} onChange={e => setCourseName(e.target.value)} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Default Template</Label>
                    <Select value={templateSettings.defaultTemplate} onValueChange={value => setTemplateSettings(prev => ({ ...prev, defaultTemplate: value }))}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="classic">Classic</SelectItem>
                        <SelectItem value="modern">Modern</SelectItem>
                        <SelectItem value="elegant">Elegant</SelectItem>
                        <SelectItem value="professional">Professional</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div ref={certificateRef} className="mt-4 p-4 border rounded-lg relative bg-white max-w-md mx-auto shadow-lg">
                    {templateSettings.watermark && <div className="absolute inset-0 flex items-center justify-center text-6xl text-gray-200 opacity-10 pointer-events-none">{institutionData.shortName}</div>}
                    {institutionData.logo && <img src={URL.createObjectURL(institutionData.logo)} alt="Logo" className="h-16 w-16 mx-auto mb-2 object-contain" />}
                    <div className="text-center">
                      <h2 className="text-xl font-bold">{institutionData.name}</h2>
                      <p className="text-sm">{institutionData.description}</p>
                      <h3 className="mt-4 text-lg font-semibold">Certificate of Completion</h3>
                      <p className="text-sm mt-1">This certifies that</p>
                      <p className="font-bold text-lg mt-1">{studentName}</p>
                      <p className="mt-1 text-sm">has successfully completed the</p>
                      <p className="font-medium mt-1">{courseName}</p>
                    </div>
                    {templateSettings.qrCodeVerification && certificateId && (
                      <div className="absolute bottom-2 right-2 text-center">
                        <QRCode value={generateVerificationUrl(certificateId)} size={64} bgColor="#fff" fgColor="#000" />
                        <p className="text-[8px] break-all mt-1">{certificateId.slice(0, 20)}...</p>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-end mt-4">
                    <Button className="bg-[#16537e] hover:bg-[#2986cc] text-white" onClick={downloadCertificate}><Download className="h-4 w-4 mr-2" /> Download PDF</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

          </ScrollArea>
        </Tabs>

        {/* Footer */}
        <div className="flex justify-end space-x-3 pt-4 border-t">
          <Button variant="outline" className="border-[#138808] text-[#138808] hover:bg-[#138808]/10" onClick={onClose}>Cancel</Button>
          <Button className="bg-[#16537e] hover:bg-[#2986cc] text-white" onClick={handleSave}><Save className="h-4 w-4 mr-2" /> Save Settings</Button>
        </div>

      </DialogContent>
    </Dialog>
  );
};

export default InstitutionSettingsModal;
