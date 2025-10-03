import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, MessageCircle, Clock, Send, Globe, Twitter, Linkedin, Facebook, Youtube, HeadphonesIcon, AlertCircle, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

interface ContactSupportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactSupportModal({ isOpen, onClose }: ContactSupportModalProps) {
  const [onlineAgents, setOnlineAgents] = useState(3);
  const [chatCountdown, setChatCountdown] = useState(5 * 60); // 5 minutes

  // Countdown timer
  useEffect(() => {
    const interval = setInterval(() => {
      setChatCountdown(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2,"0")}:${s.toString().padStart(2,"0")}`;
  };

  const cardHover = "hover:shadow-xl hover:-translate-y-1 transition-all duration-300";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] p-0 rounded-2xl overflow-hidden">
        <DialogHeader className="px-8 pt-8 pb-4 border-b">
          <DialogTitle className="text-2xl flex items-center gap-2 font-bold">
            <HeadphonesIcon className="h-6 w-6 text-primary" />
            Contact Support
          </DialogTitle>
          <DialogDescription className="text-muted-foreground mt-1">
            We're here to help! Choose your preferred way to reach us
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-[calc(90vh-120px)] relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="px-8 pb-24 space-y-6"
          >
            {/* Quick Contact Cards */}
            <div className="grid md:grid-cols-3 gap-6">
              {/* Email Support */}
              <Card className={`border-2 border-transparent ${cardHover}`}>
                <CardHeader className="pb-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg font-semibold">Email Support</CardTitle>
                  <CardDescription className="text-sm text-muted-foreground">Response within 2-4 hours</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <a href="mailto:support@certverify.com" className="text-primary hover:underline">
                      support@certverify.com
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Badge className="bg-secondary/20 text-secondary px-2 py-0.5 rounded">General</Badge>
                    <span className="text-muted-foreground">Inquiries</span>
                  </div>
                  <Button className="w-full mt-3 hover:scale-105 transition-all" size="sm">
                    <Mail className="h-4 w-4 mr-2" /> Send Email
                  </Button>
                </CardContent>
              </Card>

              {/* Phone Support */}
              <Card className={`border-2 border-transparent ${cardHover}`}>
                <CardHeader className="pb-3">
                  <div className="w-12 h-12 rounded-full bg-verification-success/10 flex items-center justify-center mb-2">
                    <Phone className="h-6 w-6 text-verification-success" />
                  </div>
                  <CardTitle className="text-lg font-semibold">Phone Support</CardTitle>
                  <CardDescription className="text-sm text-muted-foreground">Available 24/7</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <a href="tel:+919876543210" className="text-primary hover:underline font-semibold">
                      +91 98765 43210
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Toll-free: 1800 123 4567</span>
                  </div>
                  <Button className="w-full mt-3 hover:scale-105 transition-all" size="sm" variant="outline">
                    <Phone className="h-4 w-4 mr-2" /> Call Now
                  </Button>
                </CardContent>
              </Card>

              {/* Live Chat */}
              <Card className={`border-2 border-transparent ${cardHover}`}>
                <CardHeader className="pb-3">
                  <div className="w-12 h-12 rounded-full bg-verification-pending/10 flex items-center justify-center mb-2">
                    <MessageCircle className="h-6 w-6 text-verification-pending" />
                  </div>
                  <CardTitle className="text-lg font-semibold">Live Chat</CardTitle>
                  <CardDescription className="text-sm text-muted-foreground">Instant response</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-verification-success flex items-center gap-1 animate-pulse">
                      <CheckCircle2 className="h-3 w-3" /> Online
                    </Badge>
                    <span className="text-xs text-muted-foreground">{onlineAgents} agents available</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Next agent available at:{" "}
                    {new Date(Date.now() + chatCountdown * 1000).toLocaleTimeString("en-IN", {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                      timeZone: "Asia/Kolkata",
                    })}{" "}
                    IST
                  </p>
                  <Button className="w-full mt-3 hover:scale-105 transition-all" size="sm" variant="outline">
                    <MessageCircle className="h-4 w-4 mr-2" /> Start Chat
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form with Floating Labels */}
            <Card className={`${cardHover} relative`}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-semibold">
                  <Send className="h-5 w-5 text-primary" /> Send Us a Message
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  Fill out the form and we'll respond promptly
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-6 relative">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="relative">
                      <Input placeholder=" " className="peer" />
                      <label className="absolute left-3 top-2 text-sm text-muted-foreground peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 transition-all">
                        Full Name *
                      </label>
                    </div>
                    <div className="relative">
                      <Input type="email" placeholder=" " className="peer" />
                      <label className="absolute left-3 top-2 text-sm text-muted-foreground peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 transition-all">
                        Email Address *
                      </label>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="relative">
                      <Input type="tel" placeholder=" " className="peer" />
                      <label className="absolute left-3 top-2 text-sm text-muted-foreground peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 transition-all">
                        Phone Number
                      </label>
                    </div>
                    <div className="relative">
                      <Input placeholder=" " className="peer" />
                      <label className="absolute left-3 top-2 text-sm text-muted-foreground peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 transition-all">
                        Subject *
                      </label>
                    </div>
                  </div>

                  <div className="relative">
                    <select className="w-full p-2 border rounded-md bg-background">
                      <option>Technical Support</option>
                      <option>Billing Questions</option>
                      <option>Account Issues</option>
                      <option>Verification Help</option>
                      <option>Feature Request</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div className="relative">
                    <Textarea placeholder=" " rows={5} className="peer" />
                    <label className="absolute left-3 top-2 text-sm text-muted-foreground peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 transition-all">
                      Message *
                    </label>
                  </div>

                  {/* Sticky Send Button */}
                  <div className="sticky bottom-0 bg-white pt-4">
                    <Button className="w-full hover:scale-105 transition-all" size="lg">
                      <Send className="h-4 w-4 mr-2" /> Send Message
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Connect With Social Animated Buttons */}
            <div className="grid grid-cols-4 gap-4 mt-6">
              {[
                { icon: Twitter, label: "Twitter", color: "from-blue-400 to-blue-600" },
                { icon: Linkedin, label: "LinkedIn", color: "from-blue-500 to-blue-700" },
                { icon: Facebook, label: "Facebook", color: "from-blue-600 to-blue-800" },
                { icon: Youtube, label: "YouTube", color: "from-red-500 to-red-700" },
              ].map((social, idx) => (
                <Button
                  key={idx}
                  className={`w-full justify-start bg-gradient-to-r ${social.color} text-white hover:scale-105 transition-all`}
                >
                  <social.icon className="h-4 w-4 mr-2" /> {social.label}
                </Button>
              ))}
            </div>

            {/* Emergency Support Card */}
            <Card className="border-verification-failed/50 bg-verification-failed/5 animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <AlertCircle className="h-5 w-5 text-verification-failed" />
                  Emergency Support
                </CardTitle>
                <CardDescription>
                  For critical issues requiring immediate attention
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-background rounded-lg">
                  <div>
                    <p className="font-semibold">24/7 Emergency Hotline</p>
                    <p className="text-sm text-muted-foreground">Critical security issues & system outages</p>
                  </div>
                  <Button
  variant="destructive"
  size="sm"
  onClick={() => window.location.href = "tel:+919999911111"}
>
  <Phone className="h-4 w-4 mr-2" />
  +91 99999 11111
</Button>

                </div>
                <p className="text-xs text-muted-foreground">
                  * Use emergency contact only for critical issues affecting system operations or security breaches
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
