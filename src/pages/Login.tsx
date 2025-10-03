import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Shield, ArrowLeft, Mail, Chrome, UserCheck, Building2, Crown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [role, setRole] = useState("verifier");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [twoFACode, setTwoFACode] = useState("");
  const [showTwoFA, setShowTwoFA] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate login process
    if (role === "institution" || role === "admin") {
      setShowTwoFA(true);
      toast({
        title: "2FA Required",
        description: "Please enter your 2-step verification to complete login.",
      });
      return;
    }
    
    // Navigate to role-specific dashboard
    const dashboardRoute = role === "verifier" ? "/verifier-dashboard" : 
                          role === "institution" ? "/institution-dashboard" : 
                          "/admin-dashboard";
    
    navigate(dashboardRoute);
    toast({
      title: "Login Successful",
      description: `Welcome to your ${role} dashboard!`,
    });
  };

  const handleTwoFAVerification = (e: React.FormEvent) => {
    e.preventDefault();
    
    const dashboardRoute = role === "institution" ? "/institution-dashboard" : "/admin-dashboard";
    navigate(dashboardRoute);
    toast({
      title: "Login Successful",
      description: `Welcome to your ${role} dashboard!`,
    });
  };

  const getRoleIcon = (roleType: string) => {
    switch (roleType) {
      case "verifier":
        return <UserCheck className="h-5 w-5" />;
      case "institution":
        return <Building2 className="h-5 w-5" />;
      case "admin":
        return <Crown className="h-5 w-5" />;
      default:
        return <UserCheck className="h-5 w-5" />;
    }
  };

  const getRoleColor = (roleType: string) => {
    switch (roleType) {
      case "verifier":
        return "text-role-verifier";
      case "institution":
        return "text-role-institution";
      case "admin":
        return "text-role-admin";
      default:
        return "text-role-verifier";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2 mb-6 text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </Link>
          
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Shield className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              CertifyPro
            </span>
          </div>
          <h1 className="text-2xl font-bold">Welcome Back</h1>
          <p className="text-muted-foreground">Sign in to your account</p>
        </div>

        <Card className="shadow-xl border-0 bg-card/50 backdrop-blur-sm">
          <CardHeader className="space-y-1">
            <CardTitle className="text-xl text-center">Login</CardTitle>
            <CardDescription className="text-center">
              Choose your role and enter your credentials
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {!showTwoFA ? (
              <>
                {/* Role Selection */}
                <Tabs value={role} onValueChange={setRole} className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="verifier" className="flex items-center space-x-1">
                      <UserCheck className="h-4 w-4" />
                      <span className="hidden sm:inline">Verifier</span>
                    </TabsTrigger>
                    <TabsTrigger value="institution" className="flex items-center space-x-1">
                      <Building2 className="h-4 w-4" />
                      <span className="hidden sm:inline">Institution</span>
                    </TabsTrigger>
                    <TabsTrigger value="admin" className="flex items-center space-x-1">
                      <Crown className="h-4 w-4" />
                      <span className="hidden sm:inline">Admin</span>
                    </TabsTrigger>
                  </TabsList>
                </Tabs>

                {/* Login Form */}
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className={`w-full ${
                      role === "verifier" ? "bg-role-verifier hover:bg-role-verifier/90" :
                      role === "institution" ? "bg-role-institution hover:bg-role-institution/90" :
                      "bg-role-admin hover:bg-role-admin/90"
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      {getRoleIcon(role)}
                      <span>Sign In as {role.charAt(0).toUpperCase() + role.slice(1)}</span>
                    </div>
                  </Button>
                </form>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                  </div>
                </div>

                <Button variant="outline" className="w-full">
                  <Chrome className="mr-2 h-4 w-4" />
                  Sign in with Google
                </Button>

                <div className="text-center text-sm">
                  <span className="text-muted-foreground">Don't have an account? </span>
                  <Link to="/signup" className="text-primary hover:underline font-medium">
                    Sign up
                  </Link>
                </div>
              </>
            ) : (
              /* 2FA Form */
              <form onSubmit={handleTwoFAVerification} className="space-y-4">
                <div className="text-center mb-4">
                  <div className={`inline-flex items-center space-x-2 ${getRoleColor(role)}`}>
                    {getRoleIcon(role)}
                    <span className="font-medium">2FA Required for {role.charAt(0).toUpperCase() + role.slice(1)}</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="twofa">Authentication Code</Label>
                  <Input
                    id="twofa"
                    type="text"
                    placeholder="Enter 6-digit code"
                    value={twoFACode}
                    onChange={(e) => setTwoFACode(e.target.value)}
                    maxLength={6}
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    Enter the 6-digit code from your authenticator app
                  </p>
                </div>

                <Button 
                  type="submit" 
                  className={`w-full ${
                    role === "institution" ? "bg-role-institution hover:bg-role-institution/90" :
                    "bg-role-admin hover:bg-role-admin/90"
                  }`}
                >
                  Verify & Sign In
                </Button>

                <Button 
                  type="button" 
                  variant="outline" 
                  className="w-full"
                  onClick={() => setShowTwoFA(false)}
                >
                  Back to Login
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;