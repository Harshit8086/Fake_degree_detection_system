import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useViewportScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { AppHeader } from "@/components/layout/AppHeader";
import { Shield, Building2, UserCheck, Crown, ArrowRight, CheckCircle } from "lucide-react";

const Landing = () => {
  const [institutionCount, setInstitutionCount] = useState(0);
  useEffect(() => {
    let count = 0;
    const target = 500;
    const interval = setInterval(() => {
      count += 5;
      if (count > target) count = target;
      setInstitutionCount(count);
      if (count === target) clearInterval(interval);
    }, 20);
    return () => clearInterval(interval);
  }, []);

  const [particles, setParticles] = useState([]);
  useEffect(() => {
    const particleCount = 35;
    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * 300,
      size: Math.random() * 12 + 8,
      delay: Math.random() * 5,
      color: ["#F59E0B", "#3B82F6", "#10B981"][i % 3],
    }));
    setParticles(newParticles);
  }, []);

  const { scrollY } = useViewportScroll();
  const wave1Y = useTransform(scrollY, [0, 500], [0, 50]);
  const wave2Y = useTransform(scrollY, [0, 500], [0, 100]);
  const wave3Y = useTransform(scrollY, [0, 500], [0, 150]);

  const roles = [
    {
      title: "Verifier",
      desc: "For HR professionals, recruiters, and verification specialists",
      icon: UserCheck,
      features: ["Upload & verify certificates", "Bulk verification tools", "Real-time fraud alerts"],
      color: "role-verifier",
      bgClass: "bg-role-verifier",
      hoverClass: "hover:bg-role-verifier/90",
      link: "/signup?role=verifier",
    },
    {
      title: "Institution",
      desc: "For universities, schools, and certification bodies",
      icon: Building2,
      features: ["Issue digital certificates", "Blockchain verification", "Analytics & reporting"],
      color: "role-institution",
      bgClass: "bg-role-institution",
      hoverClass: "hover:bg-role-institution/90",
      link: "/signup?role=institution",
    },
    {
      title: "Administrator",
      desc: "For system administrators and compliance officers",
      icon: Crown,
      features: ["System-wide oversight", "Fraud trend analysis", "Audit logs & compliance"],
      color: "role-admin",
      bgClass: "bg-role-admin",
      hoverClass: "hover:bg-role-admin/90",
      link: "/signup?role=admin",
    },
  ];

  const features = [
    { icon: Shield, title: "Blockchain Security", desc: "Immutable verification records", color: "primary" },
    { icon: UserCheck, title: "AI Fraud Detection", desc: "99.9% accuracy", color: "accent" },
    { icon: CheckCircle, title: "Instant Verification", desc: "Real-time validation", color: "success" },
    { icon: Building2, title: "Institution Trust", desc: "Trusted by 500+ organizations", color: "role-institution" },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-background via-secondary/20 to-background">
      {/* Floating particles */}
      {particles.map((p, idx) => (
        <motion.div
          key={idx}
          initial={{ y: p.y, opacity: 0.7 }}
          animate={{ y: [p.y, p.y + 50, p.y], x: [p.x, p.x + 30, p.x] }}
          transition={{ repeat: Infinity, duration: 8 + Math.random() * 4, delay: p.delay, ease: "easeInOut" }}
          className="absolute rounded-full pointer-events-none"
          style={{ width: p.size, height: p.size, backgroundColor: p.color }}
        />
      ))}

      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0 z-0 opacity-10 blur-3xl animate-gradient-slow pointer-events-none"
        animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
        transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
      />

      {/* Scroll-animated SVG Waves */}
      {[{ id: 1, y: wave1Y, gradient: "waveGradient1", d: "M0,64L48,85.3C96,107,192,149,288,181.3C384,213,480,235,576,218.7C672,203,768,149,864,138.7C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,0L0,0Z", colors: ["#3B82F6", "#10B981"] },
        { id: 2, y: wave2Y, gradient: "waveGradient2", d: "M0,192L48,186.7C96,181,192,171,288,165.3C384,160,480,160,576,165.3C672,171,768,181,864,192C960,203,1056,213,1152,192C1248,171,1344,117,1392,90.7L1440,64L1440,0L0,0Z", colors: ["#F59E0B", "#3B82F6"] },
        { id: 3, y: wave3Y, gradient: "waveGradient3", d: "M0,160L48,138.7C96,117,192,75,288,85.3C384,96,480,160,576,181.3C672,203,768,181,864,165.3C960,149,1056,139,1152,154.7C1248,171,1344,213,1392,234.7L1440,256L1440,0L0,0Z", colors: ["#F472B6", "#3B82F6"] }
      ].map(wave => (
        <motion.svg key={wave.id} className={`absolute top-${wave.id * 10} left-0 w-full h-64 pointer-events-none`} style={{ y: wave.y }} viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path fill={`url(#${wave.gradient})`} d={wave.d}></path>
          <defs>
            <linearGradient id={wave.gradient} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor={wave.colors[0]} stopOpacity={0.3} />
              <stop offset="100%" stopColor={wave.colors[1]} stopOpacity={0.3} />
            </linearGradient>
          </defs>
        </motion.svg>
      ))}

      {/* Header */}
      <AppHeader />

      {/* Hero Section */}
      <section className="relative z-10 text-center py-28 px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="inline-flex items-center space-x-2 bg-primary/20 text-primary px-3 py-2 rounded-full text-sm font-medium mb-4"
        >
          <CheckCircle className="h-4 w-4" />
          <span>Trusted by {institutionCount}+ Institutions</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent"
        >
          Secure Certificate Verification Platform
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-3xl mx-auto"
        >
          Blockchain-powered certificate verification with AI-driven fraud detection. Trusted by educational institutions, government agencies, and organizations worldwide.
        </motion.p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" asChild className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-lg hover:shadow-xl transition-all w-full sm:w-auto">
            <Link to="/signup">
              Start Verification <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild className="w-full sm:w-auto">
            <Link to="/login">Access Dashboard</Link>
          </Button>
        </div>
      </section>

      {/* Role Cards Section */}
      <section className="py-24 px-4 bg-gradient-to-r from-background via-secondary/10 to-background">
        <div className="container mx-auto text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Choose Your Role</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Access tailored dashboards for your verification needs</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {roles.map((role, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05, rotateY: 5 }}
              transition={{ duration: 0.4 }}
              className={`bg-background border-l-4 border-l-${role.color} rounded-xl shadow-lg p-6 flex flex-col justify-between hover:shadow-2xl transition-all`}
            >
              <CardHeader className="pb-4">
                <div className={`w-16 h-16 flex items-center justify-center rounded-lg ${role.bgClass}/20 mb-4`}>
                  <role.icon className={`h-8 w-8 text-${role.color} animate-bounce-slow`} />
                </div>
                <CardTitle className="text-xl">{role.title}</CardTitle>
                <CardDescription className="text-sm text-muted-foreground">{role.desc}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 mt-4">
                {role.features.map((feature, i) => (
                  <div key={i} className="flex items-center text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4 mr-2 text-success animate-bounce-slow" />
                    {feature}
                  </div>
                ))}
                <Link to={role.link} className="w-full block">
                  <Button className={`w-full mt-4 ${role.bgClass} ${role.hoverClass}`}>
                    Get Started
                  </Button>
                </Link>
              </CardContent>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4">
        <div className="container mx-auto text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Why Choose CertifyPro?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Advanced security, blockchain technology, and AI-powered verification
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-10 max-w-6xl mx-auto">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              className="text-center p-6 bg-background rounded-xl shadow hover:shadow-2xl transition-all"
            >
              <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 bg-${feature.color}/20`}>
                <feature.icon className={`h-10 w-10 text-${feature.color} animate-bounce-slow`} />
              </div>
              <h3 className="font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer Section */}
      <footer className="border-t bg-muted/30 py-12 px-4 relative">
        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-primary to-accent opacity-10 blur-xl rotate-12 pointer-events-none"></div>
        <div className="container mx-auto grid md:grid-cols-4 gap-8 relative z-10">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Shield className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold">CertifyPro</span>
            </div>
            <p className="text-sm text-muted-foreground">Secure, reliable certificate verification platform trusted worldwide.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Platform</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/login" className="hover:text-primary transition-colors">Login</Link></li>
              <li><Link to="/signup" className="hover:text-primary transition-colors">Sign Up</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Security</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>support@certifypro.com</li>
              <li>+91 123-456-7890</li>
            </ul>
          </div>
        </div>
        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground relative z-10">
          &copy; 2024 CertifyPro. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Landing;
