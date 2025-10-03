import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Bell, 
  CheckCircle, 
  AlertTriangle, 
  Shield, 
  FileText, 
  Users,
  Clock
} from "lucide-react";

interface Notification {
  id: string;
  type: "success" | "warning" | "info" | "error";
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

interface NotificationsDropdownProps {
  notifications?: Notification[];
}

export const NotificationsDropdown = ({ notifications: propNotifications }: NotificationsDropdownProps) => {
  const [notifications] = useState<Notification[]>(
    propNotifications || [
      {
        id: "1",
        type: "success",
        title: "Certificate Verified",
        message: "Bachelor's degree verification completed",
        timestamp: "2 min ago",
        read: false
      },
      {
        id: "2",
        type: "warning",
        title: "Fraud Alert",
        message: "Suspicious activity detected on certificate #12345",
        timestamp: "5 min ago",
        read: false
      },
      {
        id: "3",
        type: "info",
        title: "New Institution",
        message: "Tech University has joined the platform",
        timestamp: "1 hour ago",
        read: true
      },
      {
        id: "4",
        type: "error",
        title: "Verification Failed",
        message: "Unable to verify certificate due to invalid signature",
        timestamp: "2 hours ago",
        read: true
      }
    ]
  );

  const unreadCount = notifications.filter(n => !n.read).length;

  const getIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-verification-success" />;
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-verification-pending" />;
      case "error":
        return <Shield className="h-4 w-4 text-verification-failed" />;
      case "info":
        return <FileText className="h-4 w-4 text-primary" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge 
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-verification-failed text-white text-xs"
            >
              {unreadCount > 9 ? "9+" : unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80" align="end">
        <DropdownMenuLabel className="flex items-center justify-between">
          <span>Notifications</span>
          <Badge variant="secondary" className="bg-primary/10 text-primary">
            {unreadCount} new
          </Badge>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <ScrollArea className="h-80">
          <div className="space-y-2 p-2">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`flex items-start space-x-3 p-3 rounded-lg transition-colors cursor-pointer hover:bg-muted/50 ${
                  !notification.read ? 'bg-primary/5 border border-primary/10' : ''
                }`}
              >
                <div className="flex-shrink-0 mt-0.5">
                  {getIcon(notification.type)}
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium leading-none">
                      {notification.title}
                    </p>
                    {!notification.read && (
                      <div className="h-2 w-2 bg-primary rounded-full" />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {notification.message}
                  </p>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Clock className="h-3 w-3 mr-1" />
                    {notification.timestamp}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        <DropdownMenuSeparator />
        <div className="p-2">
          <Button variant="ghost" className="w-full text-sm">
            View all notifications
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};