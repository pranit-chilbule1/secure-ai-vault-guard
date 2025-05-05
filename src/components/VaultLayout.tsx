
import React, { useState } from 'react';
import { Shield, Key, Lock, Eye, EyeOff, Database, Settings, Search, BarChartIcon, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Logo from '@/components/Logo';
import { Link } from 'react-router-dom';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  collapsed?: boolean;
  onClick?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, active = false, collapsed = false, onClick }) => (
  <Button 
    variant="ghost" 
    className={cn(
      "w-full justify-start text-white hover:bg-vault-300/20 relative group",
      active ? "bg-vault-300/30" : "",
      !collapsed ? "px-4" : "px-0 justify-center"
    )}
    onClick={onClick}
  >
    <div className={cn(
      "absolute left-0 top-0 h-full w-1 bg-primary opacity-0 transition-opacity",
      active ? "opacity-100" : "group-hover:opacity-50"
    )}></div>
    {icon}
    {!collapsed && <span>{label}</span>}
    {collapsed && (
      <div className="absolute left-full ml-2 px-2 py-1 bg-vault-DEFAULT text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        {label}
      </div>
    )}
  </Button>
);

interface VaultLayoutProps {
  children: React.ReactNode;
}

const VaultLayout: React.FC<VaultLayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('passwords');
  
  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <div 
        className={cn(
          "bg-vault-DEFAULT text-white border-r border-vault-400 transition-all duration-300 flex flex-col",
          collapsed ? "w-16" : "w-64"
        )}
      >
        <div className="p-4 flex items-center justify-between border-b border-vault-400">
          <div className={cn("transition-opacity", collapsed ? "opacity-0 w-0" : "opacity-100")}>
            <Logo size="sm" />
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setCollapsed(!collapsed)} 
            className="text-white hover:bg-vault-300/20"
          >
            {collapsed ? <Key className="h-5 w-5" /> : <Lock className="h-5 w-5" />}
          </Button>
        </div>
        
        <div className="p-2 flex-1">
          <div className="space-y-1">
            <NavItem 
              icon={<Key className="h-5 w-5 mr-2 text-white" />} 
              label="Passwords" 
              active={activeTab === 'passwords'}
              collapsed={collapsed}
              onClick={() => setActiveTab('passwords')}
            />
            <NavItem 
              icon={<Shield className="h-5 w-5 mr-2 text-white" />} 
              label="Security" 
              active={activeTab === 'security'}
              collapsed={collapsed}
              onClick={() => setActiveTab('security')}
            />
            <NavItem 
              icon={<BarChartIcon className="h-5 w-5 mr-2 text-white" />} 
              label="Analytics" 
              active={activeTab === 'analytics'}
              collapsed={collapsed}
              onClick={() => setActiveTab('analytics')}
            />
            <NavItem 
              icon={<Database className="h-5 w-5 mr-2 text-white" />} 
              label="Vault" 
              active={activeTab === 'vault'}
              collapsed={collapsed}
              onClick={() => setActiveTab('vault')}
            />
            <NavItem 
              icon={<Search className="h-5 w-5 mr-2 text-white" />} 
              label="Browse" 
              active={activeTab === 'browse'}
              collapsed={collapsed}
              onClick={() => setActiveTab('browse')}
            />
          </div>
          
          <div className="mt-8 pt-4 border-t border-vault-400">
            <div className="space-y-1">
              <NavItem 
                icon={<Settings className="h-5 w-5 mr-2 text-white" />} 
                label="Settings" 
                active={activeTab === 'settings'}
                collapsed={collapsed}
                onClick={() => setActiveTab('settings')}
              />
              <Button 
                variant="ghost" 
                className={cn(
                  "w-full justify-start text-white hover:bg-vault-300/20",
                  !collapsed ? "px-4" : "px-0 justify-center"
                )}
                asChild
              >
                <Link to="/">
                  <LogOut className="h-5 w-5 mr-2" />
                  {!collapsed && <span>Log Out</span>}
                </Link>
              </Button>
            </div>
          </div>
        </div>
        
        <div className="mt-auto p-4 border-t border-vault-400">
          <div className={cn("flex items-center", collapsed && "justify-center")}>
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-sm font-bold text-primary">JD</span>
            </div>
            {!collapsed && (
              <div className="ml-3">
                <p className="text-sm font-medium">Jessica Davis</p>
                <p className="text-xs text-white/60">Pro Plan</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1 overflow-y-auto">
        {children}
      </div>
    </div>
  );
};

export default VaultLayout;
