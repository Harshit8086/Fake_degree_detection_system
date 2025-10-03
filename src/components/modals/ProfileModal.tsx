import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Camera, Save } from "lucide-react";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
  userEmail: string;
  userRole: string;
}

export const ProfileModal = ({ isOpen, onClose, userName, userEmail, userRole }: ProfileModalProps) => {
  const [formData, setFormData] = useState({
    name: userName,
    email: userEmail,
    phone: "+91 98765 43210", // default Indian number
    organization: "TechCorp Inc.",
    bio: "Experienced certificate verifier with 5+ years in document authentication.",
  });

  const getInitials = (name: string) => {
    return name.split(" ").map(n => n[0]).join("").toUpperCase();
  };

  const handleSave = () => {
    console.log("Saving profile:", formData);
    onClose();
  };

  // Mask input to Indian number format: +91 XXXXX XXXXX
  const handlePhoneChange = (value: string) => {
    // Remove all non-digit characters except leading +91
    let digits = value.replace(/[^\d]/g, "");
    if (!digits.startsWith("91")) digits = "91" + digits.slice(0, 10);

    // Limit to 10 digits after country code
    digits = digits.slice(0, 12);

    // Format: +91 98765 43210
    let formatted = "+";
    formatted += digits.slice(0, 2) + " ";
    if (digits.length > 2) formatted += digits.slice(2, 7);
    if (digits.length > 7) formatted += " " + digits.slice(7, 12);

    setFormData({ ...formData, phone: formatted });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="
          w-full h-full sm:h-auto sm:max-h-[90vh] sm:max-w-md
          flex flex-col rounded-none sm:rounded-lg
          p-4 sm:p-6
        "
      >
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Update your personal information and preferences.
          </DialogDescription>
        </DialogHeader>

        {/* Scrollable content */}
        <div className="overflow-y-auto flex-grow space-y-6 pr-2 sm:max-h-[70vh]">
          {/* Avatar */}
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <Avatar className="h-20 w-20 sm:h-24 sm:w-24">
                <AvatarImage src="" alt={userName} />
                <AvatarFallback className="bg-primary/10 text-primary font-medium text-lg sm:text-xl">
                  {getInitials(userName)}
                </AvatarFallback>
              </Avatar>
              <Button
                size="icon"
                variant="outline"
                className="absolute -bottom-2 -right-2 h-8 w-8 sm:h-10 sm:w-10 rounded-full"
              >
                <Camera className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </div>
          </div>

          {/* Form fields */}
          <div className="space-y-4">
            {[
              { label: "Full Name", id: "name", type: "text", value: formData.name },
              { label: "Email", id: "email", type: "email", value: formData.email },
              { label: "Organization", id: "organization", type: "text", value: formData.organization },
            ].map((field) => (
              <div key={field.id} className="space-y-2">
                <Label htmlFor={field.id}>{field.label}</Label>
                <Input
                  id={field.id}
                  type={field.type}
                  value={field.value}
                  onChange={(e) =>
                    setFormData({ ...formData, [field.id]: e.target.value })
                  }
                />
              </div>
            ))}

            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                type="text"
                value={formData.phone}
                onChange={(e) => handlePhoneChange(e.target.value)}
                placeholder="+91 XXXXX XXXXX"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                placeholder="Tell us about yourself..."
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                rows={3}
              />
            </div>
          </div>
        </div>

        {/* Sticky footer */}
        <div className="flex justify-end space-x-2 mt-4 sm:mt-6">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            <Save className="h-4 w-4 mr-2 sm:h-5 sm:w-5" />
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
