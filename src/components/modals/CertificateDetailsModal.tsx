import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Shield, Calendar, User, GraduationCap, Building2, 
  CheckCircle, Clock, XCircle, Download, Share, Eye, Copy, Check 
} from "lucide-react";

interface CertificateDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  certificate: {
    id: string;
    studentName: string;
    program: string;
    institution: string;
    status: "verified" | "pending" | "failed" | "issued" | "revoked";
    uploadDate?: string;
    issueDate?: string;
    verificationDate?: string;
    blockchainHash?: string;
  } | null;
}

export const CertificateDetailsModal = ({ isOpen, onClose, certificate }: CertificateDetailsModalProps) => {
  const previewRef = useRef<HTMLDivElement>(null);
  const [isDownloadSuccess, setDownloadSuccess] = useState(false);
  const [isShareOpen, setShareOpen] = useState(false);

  if (!certificate) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "verified":
      case "issued":
        return "bg-verification-success text-white animate-pulse";
      case "pending":
        return "bg-verification-pending text-white animate-bounce";
      case "failed":
      case "revoked":
        return "bg-verification-failed text-white";
      default:
        return "bg-muted";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "verified":
      case "issued":
        return <CheckCircle className="h-4 w-4" />;
      case "pending":
        return <Clock className="h-4 w-4 animate-spin" />;
      case "failed":
      case "revoked":
        return <XCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const handleCopyHash = () => {
    if (certificate.blockchainHash) {
      navigator.clipboard.writeText(certificate.blockchainHash);
      alert("Blockchain hash copied!");
    }
  };

  const handleDownload = () => {
    // Replace with actual download logic
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 2000);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const card = previewRef.current;
    if (!card) return;
    const { left, top, width, height } = card.getBoundingClientRect();
    const x = e.clientX - left - width / 2;
    const y = e.clientY - top - height / 2;
    card.style.transform = `rotateY(${x / 20}deg) rotateX(${-y / 20}deg) scale(1.03)`;
  };

  const handleMouseLeave = () => {
    const card = previewRef.current;
    if (!card) return;
    card.style.transform = "rotateY(0deg) rotateX(0deg) scale(1)";
  };

  const shareOptions = [
    { label: "WhatsApp", action: () => alert("Share via WhatsApp") },
    { label: "Email", action: () => alert("Share via Email") },
    { label: "Copy Link", action: () => { navigator.clipboard.writeText(window.location.href); alert("Link copied!"); } }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl p-6">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2 text-lg font-semibold">
            <Shield className="h-5 w-5 text-primary" />
            <span>Certificate Details</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 relative">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h3 className="text-2xl font-bold">{certificate.program}</h3>
              <p className="text-sm text-muted-foreground">Certificate ID: {certificate.id}</p>
            </div>
            <Badge className={`flex items-center space-x-1 px-3 py-1 rounded-full ${getStatusColor(certificate.status)}`}>
              {getStatusIcon(certificate.status)}
              <span className="capitalize">{certificate.status}</span>
            </Badge>
          </div>

          <Separator />

          {/* Certificate Preview with 3D tilt */}
          <div
            ref={previewRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="bg-white/20 backdrop-blur-md rounded-2xl p-8 border border-white/10 shadow-lg transition-transform duration-300 cursor-pointer"
          >
            <div className="text-center space-y-4">
              <Shield className="h-16 w-16 text-primary mx-auto" />
              <div>
                <h4 className="text-2xl font-bold">{certificate.program}</h4>
                <p className="text-lg text-muted-foreground">Awarded to</p>
                <p className="text-3xl font-extrabold text-primary">{certificate.studentName}</p>
                <p className="text-muted-foreground mt-2">Issued by {certificate.institution}</p>
              </div>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <User className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Student</p>
                  <p className="text-sm text-muted-foreground">{certificate.studentName}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <GraduationCap className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Program</p>
                  <p className="text-sm text-muted-foreground">{certificate.program}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Building2 className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Institution</p>
                  <p className="text-sm text-muted-foreground">{certificate.institution}</p>
                </div>
              </div>
            </div>

            {/* Sticky Upload & Verification Dates */}
            <div className="space-y-4 sticky top-6 bg-white/80 backdrop-blur-md p-4 rounded-lg border border-muted/20 shadow-md z-10">
              {certificate.uploadDate && (
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Upload Date</p>
                    <p className="text-sm text-muted-foreground">{certificate.uploadDate}</p>
                  </div>
                </div>
              )}
              {certificate.verificationDate && (
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-verification-success" />
                  <div>
                    <p className="text-sm font-medium">Verification Date</p>
                    <p className="text-sm text-muted-foreground">{certificate.verificationDate}</p>
                  </div>
                </div>
              )}
              {certificate.blockchainHash && (
                <div className="flex items-center space-x-3">
                  <Shield className="h-5 w-5 text-primary" />
                  <div className="flex items-center space-x-1">
                    <p className="text-xs text-muted-foreground font-mono break-all">{certificate.blockchainHash}</p>
                    <Button variant="ghost" size="icon" onClick={() => {
                      navigator.clipboard.writeText(certificate.blockchainHash);
                      alert("Blockchain hash copied!");
                    }}>
                      <Copy className="h-4 w-4 text-muted-foreground hover:text-primary" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-2 pt-4 border-t">
            {/* Download with success animation */}
            <Button
              className={`flex-1 flex items-center justify-center bg-primary text-white transform transition-all duration-200 ${isDownloadSuccess ? "bg-green-500" : "hover:bg-primary/80"} `}
              onClick={handleDownload}
            >
              {isDownloadSuccess ? <Check className="h-5 w-5 mr-2 animate-bounce" /> : <Download className="h-4 w-4 mr-2" />}
              {isDownloadSuccess ? "Downloaded!" : "Download Certificate"}
            </Button>

            {/* Share Dropdown */}
            <div className="relative flex-1">
              <Button
                variant="outline"
                className="flex-1 flex justify-center items-center hover:bg-muted/10 transition-all duration-200"
                onClick={() => setShareOpen(!isShareOpen)}
              >
                <Share className="h-4 w-4 mr-2" /> Share
              </Button>
              {isShareOpen && (
                <div className="absolute top-full left-0 mt-1 w-full bg-white rounded-lg shadow-lg z-20">
                  {[
                    { label: "WhatsApp", action: () => alert("Share via WhatsApp") },
                    { label: "Email", action: () => alert("Share via Email") },
                    { label: "Copy Link", action: () => { navigator.clipboard.writeText(window.location.href); alert("Link copied!"); } }
                  ].map((option) => (
                    <button
                      key={option.label}
                      className="w-full text-left px-4 py-2 hover:bg-muted/20 transition-colors"
                      onClick={() => { option.action(); setShareOpen(false); }}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <Button variant="outline" className="flex-1 hover:bg-muted/10 transform hover:scale-105 transition-all duration-200">
              <Eye className="h-4 w-4 mr-2" /> View Full Document
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
