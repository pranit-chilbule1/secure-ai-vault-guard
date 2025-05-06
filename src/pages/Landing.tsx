
import React, { useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Shield, Lock, ArrowRight, CheckCircle, Bell, Eye, BriefcaseIcon, Fingerprint, AlertTriangle, LogIn } from "lucide-react";
import { Link } from 'react-router-dom';
import Logo from '@/components/Logo';

const Landing: React.FC = () => {
  const orbRef = useRef<HTMLDivElement>(null);

  // Orb movement effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!orbRef.current) return;
      
      const { clientX, clientY } = e;
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      
      // Calculate percentage of movement (limited range to keep subtle)
      const moveX = (clientX / windowWidth - 0.5) * 20;
      const moveY = (clientY / windowHeight - 0.5) * 20;
      
      orbRef.current.style.transform = `translate(${moveX}px, ${moveY}px)`;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* Hero Section */}
      <header className="relative py-16 md:py-24 overflow-hidden">
        {/* Background gradient orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div ref={orbRef} className="absolute -top-[30%] -left-[10%] w-[70%] h-[70%] rounded-full bg-gradient-to-br from-primary/20 to-transparent blur-[120px] transition-transform duration-[400ms] ease-out"></div>
          <div className="absolute -bottom-[40%] -right-[10%] w-[80%] h-[80%] rounded-full bg-gradient-to-bl from-vault-200/30 to-transparent blur-[140px]"></div>
        </div>

        {/* Navbar */}
        <nav className="container mx-auto px-6 mb-12">
          <div className="flex justify-between items-center">
            <Logo size="md" />
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm font-medium hover:text-primary transition-colors">Features</a>
              <a href="#how-it-works" className="text-sm font-medium hover:text-primary transition-colors">How It Works</a>
              <a href="#pricing" className="text-sm font-medium hover:text-primary transition-colors">Pricing</a>
            </div>
            <div className="flex items-center gap-3">
              <Button asChild variant="outline">
  <a href="https://passwordmanager-ten.vercel.app/" target="_blank" rel="noopener noreferrer">
    <LogIn className="mr-2 h-4 w-4" />
    Login
  </a>
</Button>

              <Button asChild variant="default" className="hidden sm:flex">
  <a href="https://passwordmanager-ten.vercel.app/" target="_blank" rel="noopener noreferrer">
    Get Started
    <ArrowRight className="ml-2 h-4 w-4" />
  </a>
</Button>

            </div>
          </div>
        </nav>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 animate-fade-in">
                <Shield className="h-4 w-4" />
                <span>Your data, your control</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
                Secure Your Digital Life With
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-vault-200 block mt-2">
                  AI-Powered Protection
                </span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                SecureVault provides military-grade encryption combined with intelligent analysis to safeguard your passwords, detect vulnerabilities, and keep your online identity secure.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="group" asChild>
                  <Link to="/app">
                    Get Started 
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg">
                  Watch Demo
                </Button>
              </div>
              
              <div className="flex items-center gap-8 mt-12">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className={`w-10 h-10 rounded-full border-2 border-background bg-vault-${i*100} flex items-center justify-center`}>
                      <span className="text-xs font-bold text-white">{i}</span>
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-sm font-medium">Trusted by 10,000+ users</p>
                  <div className="flex text-yellow-500 mt-1">
                    {[1, 2, 3, 4, 5].map(i => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex-1 relative">
              <div className="bg-secondary/80 backdrop-blur-sm border border-border/50 rounded-2xl p-6 shadow-xl relative z-10 animate-fade-in">
                <div className="absolute -top-3 -right-3 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
                  AI Protected
                </div>
                <div className="flex items-center gap-3 mb-6">
                  <Shield className="h-8 w-8 text-primary" />
                  <div>
                    <h3 className="font-bold">Security Dashboard</h3>
                    <p className="text-xs text-muted-foreground">Your security score is 86%</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-background/50 border border-border/50">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Strong Passwords</p>
                        <p className="text-xs text-muted-foreground">15 passwords</p>
                      </div>
                    </div>
                    <span className="text-sm font-bold text-green-500">86%</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 rounded-lg bg-background/50 border border-border/50">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center">
                        <AlertTriangle className="h-4 w-4 text-yellow-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Reused Passwords</p>
                        <p className="text-xs text-muted-foreground">3 passwords</p>
                      </div>
                    </div>
                    <span className="text-sm font-bold text-yellow-500">27%</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 rounded-lg bg-background/50 border border-border/50">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                        <Bell className="h-4 w-4 text-blue-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Data Breach Alerts</p>
                        <p className="text-xs text-muted-foreground">No breaches found</p>
                      </div>
                    </div>
                    <span className="text-sm font-bold text-blue-500">100%</span>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute top-1/2 -right-12 transform -translate-y-1/2 w-24 h-24 rounded-full bg-primary/30 blur-xl"></div>
              <div className="absolute -bottom-12 left-1/3 transform -translate-x-1/2 w-32 h-32 rounded-full bg-vault-200/30 blur-xl"></div>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section id="features" className="py-20 bg-vault-DEFAULT relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:30px_30px]"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-vault-200">
                Smart Security
              </span> Features
            </h2>
            <p className="text-lg text-muted-foreground">
              Advanced tools powered by AI to keep your digital identity secure
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="secure-card group relative hover:scale-[1.02] transition-all duration-300 ease-out">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="flex flex-col items-center text-center p-6 relative z-10">
                <div className="bg-primary/10 p-3 rounded-full mb-4 group-hover:bg-primary/20 transition-colors">
                  <Lock className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Zero-Knowledge Encryption</h3>
                <p className="text-muted-foreground">
                  Your data is encrypted and decrypted locally on your device, ensuring no one but you can access your passwords
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="secure-card group relative hover:scale-[1.02] transition-all duration-300 ease-out">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="flex flex-col items-center text-center p-6 relative z-10">
                <div className="bg-primary/10 p-3 rounded-full mb-4 group-hover:bg-primary/20 transition-colors">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">AI Security Analysis</h3>
                <p className="text-muted-foreground">
                  Advanced AI algorithms analyze your passwords, identifying vulnerabilities and suggesting improvements
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="secure-card group relative hover:scale-[1.02] transition-all duration-300 ease-out">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="flex flex-col items-center text-center p-6 relative z-10">
                <div className="bg-primary/10 p-3 rounded-full mb-4 group-hover:bg-primary/20 transition-colors">
                  <Eye className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Breach Monitoring</h3>
                <p className="text-muted-foreground">
                  Continuous monitoring for data breaches with real-time alerts when your information appears in a leak
                </p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="secure-card group relative hover:scale-[1.02] transition-all duration-300 ease-out">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="flex flex-col items-center text-center p-6 relative z-10">
                <div className="bg-primary/10 p-3 rounded-full mb-4 group-hover:bg-primary/20 transition-colors">
                  <CheckCircle className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Smart Password Generator</h3>
                <p className="text-muted-foreground">
                  Create strong, unique passwords with adaptive complexity based on site requirements
                </p>
              </div>
            </div>

            {/* Feature 5 */}
            <div className="secure-card group relative hover:scale-[1.02] transition-all duration-300 ease-out">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="flex flex-col items-center text-center p-6 relative z-10">
                <div className="bg-primary/10 p-3 rounded-full mb-4 group-hover:bg-primary/20 transition-colors">
                  <BriefcaseIcon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Cross-Platform Sync</h3>
                <p className="text-muted-foreground">
                  Securely access your vault from any device with real-time synchronization
                </p>
              </div>
            </div>

            {/* Feature 6 */}
            <div className="secure-card group relative hover:scale-[1.02] transition-all duration-300 ease-out">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="flex flex-col items-center text-center p-6 relative z-10">
                <div className="bg-primary/10 p-3 rounded-full mb-4 group-hover:bg-primary/20 transition-colors">
                  <Fingerprint className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Biometric Authentication</h3>
                <p className="text-muted-foreground">
                  Unlock your vault securely with fingerprint or face recognition on supported devices
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-background relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How SecureVault Works</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Simple, secure, and smart password management in three easy steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="relative">
              <div className="absolute top-0 left-6 h-full w-px bg-gradient-to-b from-primary/60 to-transparent md:hidden"></div>
              <div className="flex flex-col items-center text-center">
                <div className="relative z-10 mb-6">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold text-lg">1</div>
                </div>
                <h3 className="text-xl font-semibold mb-3">Store Your Passwords</h3>
                <p className="text-muted-foreground">
                  Add your existing passwords or create new ones with our smart generator. Import from browsers or other managers with ease.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="absolute top-0 left-6 h-full w-px bg-gradient-to-b from-primary/60 to-transparent md:hidden"></div>
              <div className="flex flex-col items-center text-center">
                <div className="relative z-10 mb-6">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold text-lg">2</div>
                </div>
                <h3 className="text-xl font-semibold mb-3">Analyze Security Risks</h3>
                <p className="text-muted-foreground">
                  Our AI identifies weak, reused, or exposed passwords and gives you actionable recommendations to improve.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div>
              <div className="flex flex-col items-center text-center">
                <div className="relative z-10 mb-6">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold text-lg">3</div>
                </div>
                <h3 className="text-xl font-semibold mb-3">Access Securely Anywhere</h3>
                <p className="text-muted-foreground">
                  Unlock your vault with biometrics, use auto-fill features, and sync across all your devices seamlessly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-vault-300/10">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Trusted by Thousands</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Here's what our users say about SecureVault
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-background/50 backdrop-blur-sm p-6 rounded-xl border border-border/50 shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-lg font-bold text-primary">JD</span>
                </div>
                <div>
                  <h4 className="font-semibold">Jessica Davis</h4>
                  <p className="text-sm text-muted-foreground">Product Manager</p>
                </div>
              </div>
              <div className="flex text-yellow-500 mb-4">
                {[1, 2, 3, 4, 5].map(i => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                  </svg>
                ))}
              </div>
              <p className="text-muted-foreground">
                "The AI security analysis is a game-changer. It identified several weak passwords I'd been using for years and helped me strengthen my online security."
              </p>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-background/50 backdrop-blur-sm p-6 rounded-xl border border-border/50 shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-lg font-bold text-primary">MJ</span>
                </div>
                <div>
                  <h4 className="font-semibold">Michael Johnson</h4>
                  <p className="text-sm text-muted-foreground">Software Engineer</p>
                </div>
              </div>
              <div className="flex text-yellow-500 mb-4">
                {[1, 2, 3, 4, 5].map(i => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                  </svg>
                ))}
              </div>
              <p className="text-muted-foreground">
                "As a developer working with multiple systems, SecureVault's cross-platform sync and biometric authentication make my workflow seamless and secure."
              </p>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-background/50 backdrop-blur-sm p-6 rounded-xl border border-border/50 shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-lg font-bold text-primary">SW</span>
                </div>
                <div>
                  <h4 className="font-semibold">Sarah Wilson</h4>
                  <p className="text-sm text-muted-foreground">Digital Marketer</p>
                </div>
              </div>
              <div className="flex text-yellow-500 mb-4">
                {[1, 2, 3, 4, 5].map(i => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                  </svg>
                ))}
              </div>
              <p className="text-muted-foreground">
                "I received a data breach alert within minutes of a major leak. SecureVault helped me change my compromised passwords quickly, potentially saving me from identity theft."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-vault-DEFAULT relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent"></div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-vault-200/10 rounded-full filter blur-3xl"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to secure your digital life?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of users who trust SecureVault to protect their online identity.
            </p>
            <Button size="lg" className="group animate-pulse-slow" asChild>
              <Link to="/app">
                Start Your Free Trial 
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <p className="text-sm text-muted-foreground mt-6">
              No credit card required. 14-day free trial.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-vault-DEFAULT border-t border-border">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <Logo className="mb-4" />
              <p className="text-sm text-muted-foreground mb-4">
                Secure password management with AI-powered protection.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Features</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Pricing</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Security</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Business</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Blog</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Help Center</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Guides</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Events</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">About</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Careers</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Contact</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Partners</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm text-muted-foreground">
                &copy; {new Date().getFullYear()} SecureVault. All rights reserved.
              </p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy Policy</a>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Terms of Service</a>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Cookie Policy</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
