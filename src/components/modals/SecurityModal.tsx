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
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Save, Shield, Key, Smartphone, AlertTriangle } from "lucide-react";

interface SecurityModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SecurityModal = ({ isOpen, onClose }: SecurityModalProps) => {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [sessionTimeout, setSessionTimeout] = useState(true);
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const handleSave = () => {
    console.log("Saving security settings");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-lg max-h-[90vh] sm:max-h-[80vh] flex flex-col rounded-lg p-4">
        <DialogHeader>
          <DialogTitle>Security Settings</DialogTitle>
          <DialogDescription>
            Manage your account security and authentication preferences.
          </DialogDescription>
        </DialogHeader>

        {/* Scrollable content */}
        <div className="overflow-y-auto flex-grow space-y-6 pr-2 sm:max-h-[65vh]">
          {/* Account Status */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-4 w-4 text-verification-success" />
              <h3 className="text-sm font-medium">Account Status</h3>
            </div>
            <div className="pl-6 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Email verified</span>
                <Badge className="bg-verification-success/10 text-verification-success">
                  Verified
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Account type</span>
                <Badge className="bg-role-verifier/10 text-role-verifier">
                  Verifier
                </Badge>
              </div>
            </div>
          </div>

          <Separator />

          {/* Two-Factor Authentication */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Smartphone className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-medium">Two-Factor Authentication</h3>
            </div>
            <div className="pl-6 space-y-3">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-sm">Enable 2FA</Label>
                  <p className="text-xs text-muted-foreground">
                    Add an extra layer of security to your account
                  </p>
                </div>
                <Switch
                  checked={twoFactorEnabled}
                  onCheckedChange={setTwoFactorEnabled}
                />
              </div>
              {twoFactorEnabled && (
                <div className="flex items-center space-x-2 p-3 bg-verification-success/5 rounded-lg">
                  <Shield className="h-4 w-4 text-verification-success" />
                  <span className="text-sm text-verification-success">
                    2FA is active
                  </span>
                </div>
              )}
            </div>
          </div>

          <Separator />

          {/* Session Management */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-medium">Session Management</h3>
            </div>
            <div className="pl-6 space-y-3">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-sm">Auto-logout after inactivity</Label>
                  <p className="text-xs text-muted-foreground">
                    Automatically sign out after 30 minutes of inactivity
                  </p>
                </div>
                <Switch
                  checked={sessionTimeout}
                  onCheckedChange={setSessionTimeout}
                />
              </div>
              <Button variant="outline" className="w-full">
                <Key className="h-4 w-4 mr-2" />
                End all other sessions
              </Button>
            </div>
          </div>

          <Separator />

          {/* Change Password */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Key className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-medium">Change Password</h3>
            </div>
            <div className="pl-6 space-y-3">
              <div className="space-y-2">
                <Label htmlFor="current-password" className="text-sm">
                  Current password
                </Label>
                <Input
                  id="current-password"
                  type="password"
                  value={passwords.current}
                  onChange={(e) =>
                    setPasswords({ ...passwords, current: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password" className="text-sm">
                  New password
                </Label>
                <Input
                  id="new-password"
                  type="password"
                  value={passwords.new}
                  onChange={(e) =>
                    setPasswords({ ...passwords, new: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password" className="text-sm">
                  Confirm new password
                </Label>
                <Input
                  id="confirm-password"
                  type="password"
                  value={passwords.confirm}
                  onChange={(e) =>
                    setPasswords({ ...passwords, confirm: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
        </div>

        {/* Sticky footer */}
        <div className="flex justify-end space-x-2 mt-4 sm:mt-6">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};



