import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, FileText, X, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CertificateUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "single" | "bulk";
}

export const CertificateUploadModal = ({ isOpen, onClose, mode }: CertificateUploadModalProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const [studentName, setStudentName] = useState("");
  const [program, setProgram] = useState("");
  const [issueDate, setIssueDate] = useState("");
  const [notes, setNotes] = useState("");
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [uploading, setUploading] = useState<boolean>(false);
  const [uploadSuccess, setUploadSuccess] = useState<boolean>(false);

  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);
    setFiles([...files, ...selectedFiles]);
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const simulateUpload = () => {
    return new Promise<void>((resolve) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.floor(Math.random() * 15) + 5; // Random increment
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
          resolve();
        }
        setUploadProgress(progress);
      }, 200);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (files.length === 0) {
      toast({
        title: "No Files Selected",
        description: "Please select at least one certificate to upload.",
        variant: "destructive",
      });
      return;
    }

    if (mode === "single" && (!studentName || !program)) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);
    setUploadProgress(0);
    setUploadSuccess(false);

    await simulateUpload(); // Simulate upload progress

    setUploading(false);
    setUploadSuccess(true);

    toast({
      title: mode === "single" ? "Certificate Uploaded" : "Bulk Upload Complete",
      description: mode === "single"
        ? "Certificate has been uploaded successfully!"
        : `${files.length} certificates have been processed successfully!`,
    });

    // Reset form after short delay to show success
    setTimeout(() => {
      setFiles([]);
      setStudentName("");
      setProgram("");
      setIssueDate("");
      setNotes("");
      setUploadProgress(0);
      setUploadSuccess(false);
      onClose();
    }, 1500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto p-6 space-y-6">
        <DialogHeader className="text-center">
          <DialogTitle className="flex items-center justify-center space-x-2 text-lg font-semibold">
            <Upload className="h-5 w-5" />
            <span>{mode === "single" ? "Upload Certificate" : "Bulk Upload Certificates"}</span>
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground mt-1">
            {mode === "single"
              ? "Upload a single certificate with detailed information."
              : "Upload multiple certificates at once."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* File Upload Section */}
          <div className="space-y-2">
            <Label>{mode === "single" ? "Certificate File" : "Certificate Files"}</Label>
            <div className="border-2 border-dashed border-muted rounded-xl p-6 text-center hover:border-primary transition-colors cursor-pointer relative">
              <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
              <Input
                type="file"
                multiple={mode === "bulk"}
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileChange}
                className="opacity-0 absolute w-full h-full top-0 left-0 cursor-pointer"
              />
              <p className="text-sm text-muted-foreground mt-2">
                {mode === "single"
                  ? "Select a certificate file"
                  : "Drag & drop or select multiple certificate files"}
              </p>
            </div>

            {files.length > 0 && (
              <div className="space-y-2 mt-2">
                <Label>Selected Files</Label>
                {files.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-muted rounded-lg shadow-sm">
                    <div className="flex items-center space-x-2">
                      {file.type.startsWith("image/") ? (
                        <img
                          src={URL.createObjectURL(file)}
                          alt={file.name}
                          className="h-8 w-8 object-cover rounded"
                        />
                      ) : (
                        <FileText className="h-5 w-5" />
                      )}
                      <span className="text-sm font-medium truncate">{file.name}</span>
                      <span className="text-xs text-muted-foreground">
                        ({(file.size / 1024 / 1024).toFixed(2)} MB)
                      </span>
                    </div>
                    <Button type="button" variant="ghost" size="sm" onClick={() => removeFile(index)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {mode === "single" && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="student-name">Student Name *</Label>
                  <Input
                    id="student-name"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    placeholder="Full name of student"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="issue-date">Issue Date</Label>
                  <Input
                    id="issue-date"
                    type="date"
                    value={issueDate}
                    onChange={(e) => setIssueDate(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="program">Program/Degree *</Label>
                <Select value={program} onValueChange={setProgram}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select program type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bachelor">Bachelor's Degree</SelectItem>
                    <SelectItem value="master">Master's Degree</SelectItem>
                    <SelectItem value="phd">PhD</SelectItem>
                    <SelectItem value="diploma">Diploma</SelectItem>
                    <SelectItem value="certificate">Certificate</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notes (Optional)</Label>
                <Textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Any additional notes or comments"
                  rows={3}
                />
              </div>
            </div>
          )}

          {/* Upload Progress */}
          {uploading && (
            <div className="w-full bg-muted rounded-full h-3 overflow-hidden mt-2">
              <div
                className="bg-indigo-500 h-3 rounded-full transition-all"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          )}

          {uploadSuccess && (
            <div className="flex items-center space-x-2 text-green-600 font-semibold mt-2 justify-center animate-bounce">
              <CheckCircle className="h-6 w-6" />
              <span>Upload Successful!</span>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-2 pt-4">
            <Button
              type="submit"
              className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white shadow-lg"
              disabled={uploading}
            >
              <Upload className="h-4 w-4" />
              {mode === "single" ? "Upload Certificate" : "Upload All"}
            </Button>
            <Button type="button" variant="outline" onClick={onClose} className="flex-1 sm:flex-none">
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
