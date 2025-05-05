
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Shield, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-vault-DEFAULT text-white">
      <div className="text-center p-8 bg-vault-400/50 rounded-lg border border-vault-300/30 backdrop-blur-sm max-w-md">
        <div className="flex justify-center mb-6">
          <Shield className="h-16 w-16 text-primary animate-pulse-slow" />
        </div>
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-gray-300 mb-6">
          This area of the vault is secured and cannot be accessed
        </p>
        <Button 
          variant="default" 
          size="lg"
          className="mt-2"
          onClick={() => window.location.href = '/'}
        >
          <Home className="mr-2 h-5 w-5" />
          Return to Vault
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
