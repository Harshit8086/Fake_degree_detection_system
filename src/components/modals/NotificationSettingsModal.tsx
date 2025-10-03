import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Save, Bell, Mail, Smartphone, AlertCircle, CheckCircle, Shield } from "lucide-react";

interface NotificationSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationSettingsModal = ({ isOpen, onClose }: NotificationSettingsModalProps) => {
  const [notifications, setNotifications] = useState({
    emailEnabled: true,
    pushEnabled: false,
    smsEnabled: false,
    verificationSuccess: true,
    verificationFailed: true,
    fraudAlert: true,
    systemMaintenance: true,
    weeklyReport: false,
    frequency: "immediate",
    quietHours: true,
  });

  const handleSave = () => {
    console.log("Saving notification settings:", notifications);
    onClose();
  };

  const updateSetting = (key: string, value: boolean | string) => {
    setNotifications({ ...notifications, [key]: value });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[80vh] flex flex-col">
        {/* Sticky Header */}
        <div className="sticky top-0 bg-white z-10 p-4 border-b shadow-sm">
          <DialogHeader>
            <DialogTitle>Notification Preferences</DialogTitle>
            <DialogDescription>
              Configure how and when you receive notifications.
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-4 py-2 space-y-6">
          {/* Delivery Methods */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Bell className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-medium">Delivery Methods</h3>
            </div>
            <div className="space-y-3 pl-6">
              {/* Email */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Mail
                    className={`h-4 w-4 transition-transform transition-colors duration-200
                      ${notifications.emailEnabled ? 'text-green-500' : 'text-gray-400'}
                      hover:scale-110 hover:text-opacity-80`}
                  />
                  <Label htmlFor="email-enabled" className="text-sm">Email notifications</Label>
                </div>
                <Switch
                  id="email-enabled"
                  checked={notifications.emailEnabled}
                  onCheckedChange={(checked) => updateSetting('emailEnabled', checked)}
                />
              </div>

              {/* Push */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Smartphone
                    className={`h-4 w-4 transition-transform transition-colors duration-200
                      ${notifications.pushEnabled ? 'text-green-500' : 'text-gray-400'}
                      hover:scale-110 hover:text-opacity-80`}
                  />
                  <Label htmlFor="push-enabled" className="text-sm">Push notifications</Label>
                </div>
                <Switch
                  id="push-enabled"
                  checked={notifications.pushEnabled}
                  onCheckedChange={(checked) => updateSetting('pushEnabled', checked)}
                />
              </div>

              {/* SMS */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Smartphone
                    className={`h-4 w-4 transition-transform transition-colors duration-200
                      ${notifications.smsEnabled ? 'text-green-500' : 'text-gray-400'}
                      hover:scale-110 hover:text-opacity-80`}
                  />
                  <Label htmlFor="sms-enabled" className="text-sm">SMS notifications</Label>
                </div>
                <Switch
                  id="sms-enabled"
                  checked={notifications.smsEnabled}
                  onCheckedChange={(checked) => updateSetting('smsEnabled', checked)}
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Notification Types */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-medium">Notification Types</h3>
            </div>
            <div className="space-y-3 pl-6">
              {/* Verification Success */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <CheckCircle
                    className={`h-4 w-4 transition-transform transition-colors duration-200
                      ${notifications.verificationSuccess ? 'text-green-500' : 'text-gray-400'}
                      hover:scale-110 hover:text-opacity-80`}
                  />
                  <Label className="text-sm">Verification success</Label>
                </div>
                <Switch
                  checked={notifications.verificationSuccess}
                  onCheckedChange={(checked) => updateSetting('verificationSuccess', checked)}
                />
              </div>

              {/* Verification Failed */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <AlertCircle
                    className={`h-4 w-4 transition-transform transition-colors duration-200
                      ${notifications.verificationFailed ? 'text-red-500' : 'text-gray-400'}
                      hover:scale-110 hover:text-opacity-80`}
                  />
                  <Label className="text-sm">Verification failed</Label>
                </div>
                <Switch
                  checked={notifications.verificationFailed}
                  onCheckedChange={(checked) => updateSetting('verificationFailed', checked)}
                />
              </div>

              {/* Fraud Alerts */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Shield
                    className={`h-4 w-4 transition-transform transition-colors duration-200
                      ${notifications.fraudAlert ? 'text-green-500' : 'text-gray-400'}
                      hover:scale-110 hover:text-opacity-80`}
                  />
                  <Label className="text-sm">Fraud alerts</Label>
                </div>
                <Switch
                  checked={notifications.fraudAlert}
                  onCheckedChange={(checked) => updateSetting('fraudAlert', checked)}
                />
              </div>

              {/* System Maintenance */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Bell
                    className={`h-4 w-4 transition-transform transition-colors duration-200
                      ${notifications.systemMaintenance ? 'text-green-500' : 'text-gray-400'}
                      hover:scale-110 hover:text-opacity-80`}
                  />
                  <Label className="text-sm">System maintenance</Label>
                </div>
                <Switch
                  checked={notifications.systemMaintenance}
                  onCheckedChange={(checked) => updateSetting('systemMaintenance', checked)}
                />
              </div>

              {/* Weekly Reports */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Mail
                    className={`h-4 w-4 transition-transform transition-colors duration-200
                      ${notifications.weeklyReport ? 'text-green-500' : 'text-gray-400'}
                      hover:scale-110 hover:text-opacity-80`}
                  />
                  <Label className="text-sm">Weekly reports</Label>
                </div>
                <Switch
                  checked={notifications.weeklyReport}
                  onCheckedChange={(checked) => updateSetting('weeklyReport', checked)}
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Preferences */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Preferences</h3>
            <div className="space-y-3">
              {/* Notification Frequency */}
              <div className="space-y-2">
                <Label className="text-sm">Notification frequency</Label>
                <Select
                  value={notifications.frequency}
                  onValueChange={(value) => updateSetting('frequency', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="immediate">Immediate</SelectItem>
                    <SelectItem value="hourly">Hourly digest</SelectItem>
                    <SelectItem value="daily">Daily digest</SelectItem>
                    <SelectItem value="weekly">Weekly digest</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Quiet Hours */}
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-sm">Quiet hours</Label>
                  <p className="text-xs text-muted-foreground">
                    No notifications between 10 PM - 8 AM
                  </p>
                </div>
                <Switch
                  checked={notifications.quietHours}
                  onCheckedChange={(checked) => updateSetting('quietHours', checked)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer always at bottom */}
        <div className="mt-auto bg-white p-4 border-t shadow-sm flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Save Preferences
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

