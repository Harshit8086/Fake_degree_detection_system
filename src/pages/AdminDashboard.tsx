import { useState, useEffect } from "react";
import { AppHeader } from "@/components/layout/AppHeader";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

import { 
  TrendingUp, BarChart3, Settings, Lock, FileText, 
  CheckCircle, Eye, AlertTriangle 
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const AdminDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTab, setSelectedTab] = useState("overview");
  const { toast } = useToast();
  const [chartData, setChartData] = useState<{ name: string; verifications: number }[]>([]);

  useEffect(() => {
    const generateMockData = () => {
      const data = [];
      for (let i = 1; i <= 12; i++) {
        data.push({ name: `Week ${i}`, verifications: Math.floor(Math.random() * 2000 + 500) });
      }
      setChartData(data);
    };
    generateMockData();
    const interval = setInterval(generateMockData, 5000);
    return () => clearInterval(interval);
  }, []);

  const mockFraudAlerts = [
    { id: "FA001", certificateId: "CERT-123456", type: "Duplicate Certificate", riskLevel: "critical", detectedAt: "2025-01-15 14:45:00", status: "open" },
    { id: "FA002", certificateId: "CERT-789012", type: "Invalid Institution Signature", riskLevel: "high", detectedAt: "2025-01-15 13:30:00", status: "investigating" },
  ];

  const mockAuditLogs = [
    { id: "AL001", action: "Certificate Verification", user: "RohitGain@company.com", timestamp: "2024-01-15 14:30:00", severity: "low" },
    { id: "AL002", action: "Fraud Detection Alert", user: "SomyoRanjan@company.com", timestamp: "2024-01-15 13:45:00", severity: "high" },
  ];

  const stats = {
    totalUsers: 1247,
    activeInstitutions: 89,
    monthlyVerifications: 12850,
    fraudDetectionRate: 99.7,
    openAlerts: mockFraudAlerts.filter(alert => alert.status === "open").length,
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "bg-red-500 text-white";
      case "medium": return "bg-yellow-400 text-white";
      case "low": return "bg-green-500 text-white";
      default: return "bg-gray-300";
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "critical": return "bg-red-600 text-white";
      case "high": return "bg-orange-500 text-white";
      case "medium": return "bg-yellow-400 text-white";
      case "low": return "bg-green-500 text-white";
      default: return "bg-gray-300";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "resolved": return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "investigating": return <Eye className="h-5 w-5 text-yellow-500" />;
      case "open": return <AlertTriangle className="h-5 w-5 text-red-500" />;
      default: return <AlertTriangle className="h-5 w-5 text-gray-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AppHeader
        badge={{ text: "Admin Dashboard", variant: "admin" }}
        showSearch
        showUserControls
        userName="Jharkhand Academic Council"
        userEmail="JAC.admin@certifypro.com"
        userRole="admin"
      />

      <div className="container mx-auto px-4 py-8 space-y-8">

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {[
            { title: "Total Users", value: stats.totalUsers.toLocaleString(), description: "Across all roles", color: "border-blue-500" },
            { title: "Active Institutions", value: stats.activeInstitutions, description: "Verified institutions", color: "border-purple-500" },
            { title: "Monthly Verifications", value: stats.monthlyVerifications.toLocaleString(), description: "This month", color: "border-indigo-500" },
            { title: "Fraud Detection", value: `${stats.fraudDetectionRate}%`, description: "Accuracy rate", color: "border-green-500" },
            { title: "Open Alerts", value: stats.openAlerts, description: "Requires attention", color: "border-red-500" },
          ].map((card, idx) => (
            <Card key={idx} className={`border-l-4 ${card.color} rounded-xl shadow hover:shadow-lg transition`}>
              <CardContent>
                <p className="text-sm font-medium text-gray-500">{card.title}</p>
                <p className="text-2xl font-bold mt-1">{card.value}</p>
                <p className="text-xs text-gray-400">{card.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid grid-cols-4 bg-white rounded-xl shadow p-1">
            <TabsTrigger value="overview" className="rounded-xl">Overview</TabsTrigger>
            <TabsTrigger value="fraud" className="rounded-xl">Fraud Detection</TabsTrigger>
            <TabsTrigger value="audit" className="rounded-xl">Audit Logs</TabsTrigger>
            <TabsTrigger value="management" className="rounded-xl">Management</TabsTrigger>
          </TabsList>

          {/* Overview */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="rounded-xl shadow hover:shadow-lg transition">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5 text-blue-500" /> System Health
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { label: "API Response Time", value: "125ms", color: "bg-green-500" },
                    { label: "Blockchain Sync", value: "100%", color: "bg-green-500" },
                    { label: "Certificate Queue", value: "42 pending", color: "bg-yellow-400" },
                  ].map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center">
                      <span className="text-sm">{item.label}</span>
                      <Badge className={`${item.color} text-white`}>{item.value}</Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="rounded-xl shadow hover:shadow-lg transition h-64">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="h-5 w-5 text-purple-500" /> Verifications (Live)
                  </CardTitle>
                </CardHeader>
                <CardContent className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip contentStyle={{ borderRadius: 8, backgroundColor: "#f9f9f9" }} />
                      <Line type="monotone" dataKey="verifications" stroke="#6366F1" strokeWidth={3} dot={{ r: 3 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Fraud Detection */}
          <TabsContent value="fraud" className="space-y-6">
            <div className="flex justify-between items-center mb-4">
              <Input placeholder="Search Certificate ID..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="max-w-xs" />
              <div className="flex space-x-2">
                <Button variant="outline">Filter</Button>
                <Button variant="secondary">Export</Button>
              </div>
            </div>
            <ScrollArea className="h-96">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mockFraudAlerts.filter(alert => alert.certificateId.includes(searchTerm)).map(alert => (
                  <Card key={alert.id} className="border-l-4 border-red-500 rounded-xl shadow hover:shadow-lg transition">
                    <CardHeader>
                      <CardTitle className="flex justify-between items-center">
                        <span>{alert.certificateId}</span>
                        <Badge className={getRiskColor(alert.riskLevel)}>{alert.riskLevel.toUpperCase()}</Badge>
                      </CardTitle>
                      <CardDescription>{alert.type} - Detected at {alert.detectedAt}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex justify-end gap-2">
                      <Button size="sm" variant="outline">Investigate</Button>
                      <Button size="sm" variant="destructive">Block</Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          {/* Audit Logs */}
          <TabsContent value="audit" className="space-y-6">
            <ScrollArea className="h-96">
              <div className="space-y-4">
                {mockAuditLogs.map(log => (
                  <Card key={log.id} className="rounded-xl shadow hover:shadow-lg transition">
                    <CardHeader>
                      <CardTitle className="flex justify-between items-center">
                        <span>{log.action}</span>
                        <Badge className={getSeverityColor(log.severity)}>{log.severity.toUpperCase()}</Badge>
                      </CardTitle>
                      <CardDescription>By {log.user} at {log.timestamp}</CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          {/* Management */}
          <TabsContent value="management" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { title: "System Settings", desc: "Manage platform configuration, roles, and permissions.", icon: <Settings className="h-5 w-5 text-gray-500" />, btn: "Open Settings" },
                { title: "Security Policies", desc: "Define authentication, verification, and fraud rules.", icon: <Lock className="h-5 w-5 text-gray-500" />, btn: "Manage Policies" },
                { title: "Compliance Reports", desc: "Generate regulatory and internal compliance reports.", icon: <FileText className="h-5 w-5 text-gray-500" />, btn: "Generate Report" },
              ].map((item, idx) => (
                <Card key={idx} className="rounded-xl shadow hover:shadow-lg transition">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">{item.icon} {item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                    <Button className="mt-2" size="sm">{item.btn}</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
