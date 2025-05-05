
import React from 'react';
import { Button } from "@/components/ui/button";
import { Shield, Lock, ArrowRight, CheckCircle } from "lucide-react";
import { Link } from 'react-router-dom';

const Landing: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-primary/10 via-background to-background"></div>
        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 bg-primary/10 p-3 rounded-full">
              <Shield className="h-12 w-12 text-primary animate-pulse-slow" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              SecureVault
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mb-8">
              Your personal AI-powered password manager for maximum security and peace of mind
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <Link to="/app">
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-vault-DEFAULT">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Advanced Security Features</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Protect your digital life with cutting-edge security tools
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="secure-card flex flex-col items-center text-center p-6">
              <div className="bg-primary/10 p-3 rounded-full mb-4">
                <Lock className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Secure Password Storage</h3>
              <p className="text-muted-foreground">
                Military-grade encryption keeps your passwords safe from prying eyes
              </p>
            </div>

            {/* Feature 2 */}
            <div className="secure-card flex flex-col items-center text-center p-6">
              <div className="bg-primary/10 p-3 rounded-full mb-4">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">AI Security Analysis</h3>
              <p className="text-muted-foreground">
                Get smart insights about your password strength and security risks
              </p>
            </div>

            {/* Feature 3 */}
            <div className="secure-card flex flex-col items-center text-center p-6">
              <div className="bg-primary/10 p-3 rounded-full mb-4">
                <CheckCircle className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Password Generator</h3>
              <p className="text-muted-foreground">
                Create strong, unique passwords with our advanced generator tool
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-secondary relative overflow-hidden">
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-primary/5 via-secondary to-secondary"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to secure your digital life?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Start managing your passwords securely with SecureVault today.
            </p>
            <Button size="lg" asChild>
              <Link to="/app">
                Get Started Now <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-vault-DEFAULT border-t border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <Shield className="h-6 w-6 text-primary mr-2" />
              <span className="text-lg font-bold">SecureVault</span>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">
                &copy; {new Date().getFullYear()} SecureVault. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
