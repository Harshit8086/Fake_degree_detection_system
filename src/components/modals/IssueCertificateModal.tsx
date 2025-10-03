import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { CalendarIcon, Upload, Shield, FileText, Award } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface IssueCertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const IssueCertificateModal = ({ isOpen, onClose }: IssueCertificateModalProps) => {
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    studentName: "",
    studentEmail: "",
    studentId: "",
    program: "",
    specialization: "",
    gpa: "",
    credits: "",
    honors: "",
    issueDate: new Date(),
    graduationDate: undefined as Date | undefined,
    notes: "",
  });

  const [settings, setSettings] = useState({
    blockchainVerification: true,
    digitalSignature: true,
    emailNotification: true,
    publicVerification: true,
  });

  const [templateFile, setTemplateFile] = useState<File | null>(null);

  const programs = [
    "Bachelor of Science in Computer Science",
    "Bachelor of Arts in Psychology",
    "Master of Business Administration",
    "Bachelor of Engineering",
    "Master of Science in Data Science",
    "PhD in Computer Science",
    "Certificate in Web Development",
    "Diploma in Digital Marketing",
  ];

  const honorsList = [
    "First Class with Distinction",
  "First Class",
  "Second Class",
  "Pass Class",
  "Gold Medal",
  "Merit Certificate",
  "University Rank Holder",
  "Academic Excellence Award",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.studentName || !formData.studentEmail || !formData.program) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Certificate Issued Successfully!",
      description: `Certificate for ${formData.studentName} has been created.`,
    });

    // Reset form
    setFormData({
      studentName: "",
      studentEmail: "",
      studentId: "",
      program: "",
      specialization: "",
      gpa: "",
      credits: "",
      honors: "",
      issueDate: new Date(),
      graduationDate: undefined,
      notes: "",
    });
    setTemplateFile(null);
    onClose();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setTemplateFile(file);
      toast({
        title: "Template Uploaded",
        description: `Template "${file.name}" has been uploaded.`,
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] p-0 flex flex-col">
        {/* Header */}
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2 p-4 border-b">
            <Award className="h-6 w-6 text-role-institution" />
            <span>Issue New Certificate</span>
          </DialogTitle>
        </DialogHeader>

        {/* Scrollable Form */}
        <ScrollArea className="flex-1 overflow-auto p-4">
          <form id="issueCertificateForm" onSubmit={handleSubmit} className="space-y-6">
            {/* Student Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <FileText className="h-5 w-5" /> Student Information
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="studentName">Student Name *</Label>
                  <Input
                    id="studentName"
                    placeholder="Enter full name"
                    value={formData.studentName}
                    onChange={(e) => setFormData(prev => ({ ...prev, studentName: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="studentEmail">Email Address *</Label>
                  <Input
                    id="studentEmail"
                    type="email"
                    placeholder="student@university.edu"
                    value={formData.studentEmail}
                    onChange={(e) => setFormData(prev => ({ ...prev, studentEmail: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="studentId">Student ID</Label>
                  <Input
                    id="studentId"
                    placeholder="Student ID number"
                    value={formData.studentId}
                    onChange={(e) => setFormData(prev => ({ ...prev, studentId: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gpa">GPA</Label>
                  <Input
                    id="gpa"
                    placeholder="3.85"
                    value={formData.gpa}
                    onChange={(e) => setFormData(prev => ({ ...prev, gpa: e.target.value }))}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Academic Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Academic Information</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="program">Program *</Label>
                  <Select value={formData.program} onValueChange={(value) => setFormData(prev => ({ ...prev, program: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select program" />
                    </SelectTrigger>
                    <SelectContent>
                      {programs.map((program) => (
                        <SelectItem key={program} value={program}>{program}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="specialization">Specialization</Label>
                  <Input
                    id="specialization"
                    placeholder="Major/Specialization"
                    value={formData.specialization}
                    onChange={(e) => setFormData(prev => ({ ...prev, specialization: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="credits">Total Credits</Label>
                  <Input
                    id="credits"
                    placeholder="120"
                    value={formData.credits}
                    onChange={(e) => setFormData(prev => ({ ...prev, credits: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="honors">Honors/Recognition</Label>
                  <Select value={formData.honors} onValueChange={(value) => setFormData(prev => ({ ...prev, honors: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select honors" />
                    </SelectTrigger>
                    <SelectContent>
                      {honorsList.map((honor) => (
                        <SelectItem key={honor} value={honor}>{honor}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Additional Notes */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Additional Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Add any special notes..."
                  value={formData.notes}
                  onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                  className="min-h-[100px]"
                />
              </CardContent>
            </Card>
          </form>
        </ScrollArea>

        {/* Footer always at bottom */}
        <div className="bg-white p-4 border-t shadow flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" form="issueCertificateForm">
            <Award className="h-4 w-4 mr-2" />
            Issue Certificate
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default IssueCertificateModal;
