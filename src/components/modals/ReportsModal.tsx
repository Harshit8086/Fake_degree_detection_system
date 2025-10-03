import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import {
  BarChart3, TrendingUp, Users, FileText, Calendar as CalendarIcon, Download, Filter, PieChart, Activity, Award, Shield
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import CountUp from "react-countup";
import { motion, AnimatePresence } from "framer-motion";
import { ResponsiveContainer, PieChart as RePieChart, Pie, Cell, Tooltip as ReTooltip, BarChart, Bar, LineChart, Line, XAxis, YAxis } from "recharts";

interface ReportsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ReportsModal = ({ isOpen, onClose }: ReportsModalProps) => {
  const [selectedReport, setSelectedReport] = useState("overview");
  const [dateRange, setDateRange] = useState({ from: new Date(2024, 0, 1), to: new Date() });
  const [reportPeriod, setReportPeriod] = useState("month");
  const { toast } = useToast();

  const reportTypes = [
    { id: "overview", name: "Overview Report", icon: BarChart3, description: "Complete certificate issuance overview" },
    { id: "certificates", name: "Certificate Analytics", icon: Award, description: "Detailed certificate statistics" },
    { id: "verification", name: "Verification Report", icon: Shield, description: "Verification requests and responses" },
    { id: "students", name: "Student Analytics", icon: Users, description: "Student enrollment and completion data" },
    { id: "blockchain", name: "Blockchain Report", icon: Activity, description: "Blockchain verification statistics" },
    { id: "compliance", name: "Compliance Report", icon: FileText, description: "Regulatory compliance overview" },
  ];

  const mockData = {
    overview: { totalCertificates: 1247, monthlyGrowth: 12.5, verificationRequests: 456, activeStudents: 892, completionRate: 87.3, avgProcessingTime: "2.4 days" },
    certificates: [
      { program: "Computer Science", issued: 345, pending: 12, percentage: 27.7 },
      { program: "Business Administration", issued: 289, pending: 8, percentage: 23.2 },
      { program: "Psychology", issued: 198, pending: 15, percentage: 15.9 },
      { program: "Engineering", issued: 156, pending: 9, percentage: 12.5 },
      { program: "Data Science", issued: 134, pending: 6, percentage: 10.7 },
      { program: "Others", issued: 125, pending: 4, percentage: 10.0 },
    ],
    verification: { totalRequests: 2156, verified: 2089, pending: 45, failed: 22, avgResponseTime: "4.2 hours" },
    students: [
      { name: "Priya Sharma", enrolled: 120, completed: 110 },
      { name: "Rakesh Patel", enrolled: 90, completed: 80 },
      { name: "Surendra Verma", enrolled: 75, completed: 70 },
      { name: "Niyta Das", enrolled: 60, completed: 55 },
    ],
    blockchain: { certificatesVerified: 1247,successRate: 99.8,avgVerificationTime: "12 seconds",certificatesIssued: 890,systemUptime: "99.95%"},
   compliance: [
  { regulation: "UGC Guidelines", status: "Compliant" },
  { regulation: "AICTE Regulations", status: "Compliant" },
  { regulation: "NAAC Accreditation", status: "In Progress" },
  { regulation: "NIRF Reporting", status: "Compliant" },
  { regulation: "NEP 2020 Alignment", status: "Partially Compliant" },
  { regulation: "IT Act 2000", status: "Compliant" }
],
  };

  const COLORS = ["#4ade80", "#facc15", "#f87171", "#60a5fa", "#a78bfa", "#f472b6"];

  const handleExportReport = () => toast({ title: "Exporting Report", description: `${reportTypes.find(r => r.id === selectedReport)?.name} is being exported...` });
  const handleScheduleReport = () => toast({ title: "Report Scheduled", description: "Automated report delivery has been configured." });

  // ------------------- Render Functions -------------------
  const renderOverviewReport = () => (
    <div className="space-y-6">
      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardContent className="p-4 flex items-center space-x-2">
            <Award className="h-8 w-8 text-role-institution" />
            <div>
              <p className="text-2xl font-bold"><CountUp end={mockData.overview.totalCertificates} duration={1.5} /></p>
              <p className="text-sm text-muted-foreground">Total Certificates</p>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardContent className="p-4 flex items-center space-x-2">
            <TrendingUp className="h-8 w-8 text-verification-success" />
            <div>
              <p className="text-2xl font-bold text-verification-success">
                +<CountUp end={mockData.overview.monthlyGrowth} duration={1.5} decimals={1} />%
              </p>
              <p className="text-sm text-muted-foreground">Monthly Growth</p>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardContent className="p-4 flex items-center space-x-2">
            <Shield className="h-8 w-8 text-primary" />
            <div>
              <p className="text-2xl font-bold"><CountUp end={mockData.overview.verificationRequests} duration={1.5} /></p>
              <p className="text-sm text-muted-foreground">Verifications</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Key Metrics */}
      <Card>
        <CardHeader><CardTitle>Key Metrics</CardTitle></CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Active Students</span>
                <Badge variant="secondary">{mockData.overview.activeStudents}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>Completion Rate</span>
                <Badge className="bg-verification-success text-white">{mockData.overview.completionRate}%</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>Avg Processing Time</span>
                <Badge variant="outline">{mockData.overview.avgProcessingTime}</Badge>
              </div>
            </div>

            <div className="h-32 rounded-lg flex items-center justify-center">
              <ResponsiveContainer width="100%" height={120}>
                <RePieChart>
                  <Pie
                    data={[
                      { name: "Completed", value: mockData.overview.completionRate },
                      { name: "Remaining", value: 100 - mockData.overview.completionRate },
                    ]}
                    innerRadius={40} outerRadius={60} dataKey="value"
                  >
                    <Cell key="completed" fill="#4ade80" />
                    <Cell key="remaining" fill="#f87171" />
                  </Pie>
                  <ReTooltip />
                </RePieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderCertificateReport = () => (
    <div className="space-y-6">
      {/* Certificates with progress bars & bar chart */}
      <Card>
        <CardHeader><CardTitle>Certificates by Program</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockData.certificates.map((program, index) => (
              <motion.div
                key={program.program}
                className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors duration-200"
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}
              >
                <div className="flex-1 space-y-1">
                  <h4 className="font-medium">{program.program}</h4>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span>Issued: {program.issued}</span>
                    <span>Pending: {program.pending}</span>
                  </div>
                  <div className="w-full bg-muted h-2 rounded-full mt-1 overflow-hidden">
                    <div className="h-2 bg-role-institution transition-all duration-500" style={{ width: `${program.percentage}%` }} />
                  </div>
                </div>
                <div className="text-right">
                  <Badge className="bg-role-institution text-white">{program.percentage}%</Badge>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="h-40 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockData.certificates}>
                <XAxis dataKey="program" />
                <YAxis />
                <ReTooltip />
                <Bar dataKey="issued" fill="#4ade80" name="Issued" />
                <Bar dataKey="pending" fill="#facc15" name="Pending" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderVerificationReport = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {["verified", "pending", "failed"].map((key) => (
          <Card key={key} className="hover:shadow-lg transition-shadow duration-300">
            <CardContent className="text-center p-4">
              <p className={`text-3xl font-bold ${key === "verified" ? "text-verification-success" : key === "pending" ? "text-verification-pending" : "text-verification-failed"}`}>
                {mockData.verification[key]}
              </p>
              <p className="text-sm text-muted-foreground">{key === "verified" ? "Successfully Verified" : key === "pending" ? "Pending Verification" : "Failed Verifications"}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card>
        <CardHeader><CardTitle>Verification Statistics</CardTitle></CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={[
              { day: "Mon", requests: 300, verified: 290 },
              { day: "Tue", requests: 400, verified: 370 },
              { day: "Wed", requests: 350, verified: 340 },
              { day: "Thu", requests: 420, verified: 400 },
              { day: "Fri", requests: 380, verified: 370 },
            ]}>
              <XAxis dataKey="day" />
              <YAxis />
              <ReTooltip />
              <Line type="monotone" dataKey="requests" stroke="#60a5fa" name="Requests" />
              <Line type="monotone" dataKey="verified" stroke="#4ade80" name="Verified" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );

  const renderStudentAnalyticsReport = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader><CardTitle>Student Enrollment & Completion</CardTitle></CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={mockData.students}>
              <XAxis dataKey="name" />
              <YAxis />
              <ReTooltip />
              <Bar dataKey="enrolled" fill="#60a5fa" name="Enrolled" />
              <Bar dataKey="completed" fill="#4ade80" name="Completed" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>Completion Rates</CardTitle></CardHeader>
        <CardContent>
          {mockData.students.map((s, i) => (
            <motion.div key={s.name} className="flex items-center justify-between mb-2">
              <span>{s.name}</span>
              <div className="w-2/3 bg-muted h-2 rounded-full overflow-hidden">
                <div className="h-2 bg-verification-success" style={{ width: `${(s.completed / s.enrolled) * 100}%` }} />
              </div>
              <span className="ml-2">{Math.round((s.completed / s.enrolled) * 100)}%</span>
            </motion.div>
          ))}
        </CardContent>
      </Card>
    </div>
  );

  const renderBlockchainReport = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {["certificatesVerified", "successRate", "systemUptime"].map((key) => (
          <Card key={key} className="hover:shadow-lg transition-shadow duration-300">
            <CardContent className="text-center p-4">
              <p className="text-3xl font-bold text-primary">
                {key === "successRate" || key === "networkUptime" ? `${mockData.blockchain[key]}%` : mockData.blockchain[key]}
              </p>
              <p className="text-sm text-muted-foreground">
                {key === "totalHashes" ? "Total Hashes" : key === "successRate" ? "Success Rate" : "Network Uptime"}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
<Card>
  <CardHeader>
    <CardTitle>Certificates Issued Trend</CardTitle>
  </CardHeader>
  <CardContent>
    <ResponsiveContainer width="100%" height={200}>
      <BarChart
        data={[
          { year: "2020", certificates: 320 },
          { year: "2021", certificates: 450 },
          { year: "2022", certificates: 610 },
          { year: "2023", certificates: 740 },
          { year: "2024", certificates: 890 },
        ]}
      >
        <XAxis dataKey="year" />
        <YAxis />
        <ReTooltip />
        <Bar dataKey="certificates" fill="#4f46e5" name="Certificates Issued" />
      </BarChart>
    </ResponsiveContainer>
  </CardContent>
</Card>
    </div>
  );

  const renderComplianceReport = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader><CardTitle>Compliance Status</CardTitle></CardHeader>
        <CardContent>
          {mockData.compliance.map((item, index) => (
            <motion.div key={index} className="flex justify-between p-3 border rounded-lg mb-2" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }}>
              <span>{item.regulation}</span>
              <Badge className={item.status === "Compliant" ? "bg-verification-success text-white" : "bg-f87171 text-white"}>{item.status}</Badge>
            </motion.div>
          ))}
        </CardContent>
      </Card>
    </div>
  );

  const renderReportContent = () => {
    switch (selectedReport) {
      case "overview": return renderOverviewReport();
      case "certificates": return renderCertificateReport();
      case "verification": return renderVerificationReport();
      case "students": return renderStudentAnalyticsReport();
      case "blockchain": return renderBlockchainReport();
      case "compliance": return renderComplianceReport();
      default: return renderOverviewReport();
    }
  };

  // ------------------- Main Component -------------------
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] animate-scale-in">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <BarChart3 className="h-6 w-6 text-role-institution" />
            <span>Analytics & Reports</span>
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col lg:flex-row gap-6 h-[75vh]">
          {/* Sidebar */}
<div className="lg:w-[25%] flex-shrink-0 space-y-4 overflow-auto max-h-[75vh]">
  <Card>
    <CardHeader>
      <CardTitle className="text-lg">Report Types</CardTitle>
    </CardHeader>
    <CardContent className="space-y-2">
      {reportTypes.map(report => {
        const Icon = report.icon;
        return (
          <Button
            key={report.id}
            variant={selectedReport === report.id ? "default" : "ghost"}
            className="w-full justify-start transition-all duration-200 hover:scale-[1.02]"
            onClick={() => setSelectedReport(report.id)}
          >
            <Icon className="h-4 w-4 mr-2" />
            {report.name}
          </Button>
        );
      })}
    </CardContent>
  </Card>

  {/* Filters */}
  <Card className="overflow-hidden">
    <CardHeader>
      <CardTitle className="text-lg flex items-center space-x-2">
        <Filter className="h-5 w-5" />
        <span>Filters</span>
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-4 overflow-auto max-h-[50vh]">
      {/* Period Select */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Period</label>
        <Select value={reportPeriod} onValueChange={setReportPeriod}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">This Week</SelectItem>
            <SelectItem value="month">This Month</SelectItem>
            <SelectItem value="quarter">This Quarter</SelectItem>
            <SelectItem value="year">This Year</SelectItem>
            <SelectItem value="custom">Custom Range</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Date Range */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Date Range</label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal",
                !dateRange && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dateRange?.from
                ? dateRange.to
                  ? `${format(dateRange.from, "LLL dd, y")} - ${format(dateRange.to, "LLL dd, y")}`
                  : format(dateRange.from, "LLL dd, y")
                : "Pick a date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={dateRange?.from}
              selected={dateRange}
              onSelect={(range) => {
                if (range?.from && range?.to) setDateRange({ from: range.from, to: range.to });
              }}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
      </div>
    </CardContent>
  </Card>
</div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            <ScrollArea className="h-full">
              <div className="space-y-6 p-1">
                {/* Header */}
                <Card>
                  <CardHeader className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-xl">{reportTypes.find(r => r.id === selectedReport)?.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{reportTypes.find(r => r.id === selectedReport)?.description}</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={handleScheduleReport}>Schedule</Button>
                      <Button size="sm" onClick={handleExportReport}><Download className="h-4 w-4 mr-2" />Export</Button>
                    </div>
                  </CardHeader>
                </Card>

                {/* Report Content */}
                <AnimatePresence mode="wait">{renderReportContent()}</AnimatePresence>
              </div>
            </ScrollArea>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReportsModal;
