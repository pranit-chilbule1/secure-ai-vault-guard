
import React, { useState } from 'react';
import { Shield, Key, Lock, Eye, EyeOff, Database, Settings, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface VaultLayoutProps {
  children: React.ReactNode;
}

const VaultLayout: React.FC<VaultLayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  
  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <div 
        className={cn(
          "bg-vault-DEFAULT text-white border-r border-vault-400 transition-all duration-300",
          collapsed ? "w-16" : "w-64"
        )}
      >
        <div className="p-4 flex items-center justify-between border-b border-vault-400">
          <h1 className={cn("font-bold text-lg transition-opacity", collapsed ? "opacity-0 w-0" : "opacity-100")}>
            SecureVault
          </h1>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setCollapsed(!collapsed)} 
            className="text-white hover:bg-vault-300/20"
          >
            {collapsed ? <Key className="h-5 w-5" /> : <Lock className="h-5 w-5" />}
          </Button>
        </div>
        
        <nav className="p-2">
          <ul className="space-y-2">
            <li>
              <Button 
                variant="ghost" 
                className={cn(
                  "w-full justify-start text-white hover:bg-vault-300/20",
                  !collapsed ? "px-4" : "px-0 justify-center"
                )}
              >
                <Key className="h-5 w-5 mr-2" />
                {!collapsed && <span>Passwords</span>}
              </Button>
            </li>
            <li>
              <Button 
                variant="ghost" 
                className={cn(
                  "w-full justify-start text-white hover:bg-vault-300/20",
                  !collapsed ? "px-4" : "px-0 justify-center"
                )}
              >
                <Shield className="h-5 w-5 mr-2" />
                {!collapsed && <span>Security</span>}
              </Button>
            </li>
            <li>
              <Button 
                variant="ghost" 
                className={cn(
                  "w-full justify-start text-white hover:bg-vault-300/20",
                  !collapsed ? "px-4" : "px-0 justify-center"
                )}
              >
                <Database className="h-5 w-5 mr-2" />
                {!collapsed && <span>Vault</span>}
              </Button>
            </li>
            <li>
              <Button 
                variant="ghost" 
                className={cn(
                  "w-full justify-start text-white hover:bg-vault-300/20",
                  !collapsed ? "px-4" : "px-0 justify-center"
                )}
              >
                <Search className="h-5 w-5 mr-2" />
                {!collapsed && <span>Browse</span>}
              </Button>
            </li>
            <li>
              <Button 
                variant="ghost" 
                className={cn(
                  "w-full justify-start text-white hover:bg-vault-300/20",
                  !collapsed ? "px-4" : "px-0 justify-center"
                )}
              >
                <Settings className="h-5 w-5 mr-2" />
                {!collapsed && <span>Settings</span>}
              </Button>
            </li>
          </ul>
        </nav>
      </div>
      
      {/* Main content */}
      <div className="flex-1 overflow-y-auto">
        {children}
      </div>
    </div>
  );
};

export default VaultLayout;
