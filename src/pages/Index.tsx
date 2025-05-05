
import React, { useState, useEffect } from 'react';
import VaultLayout from '@/components/VaultLayout';
import PasswordItem, { PasswordItemProps } from '@/components/PasswordItem';
import PasswordGenerator from '@/components/PasswordGenerator';
import SecurityInsights from '@/components/SecurityInsights';
import SecureBrowsing from '@/components/SecureBrowsing';
import AddPasswordModal from '@/components/AddPasswordModal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Shield, Plus, Search, Key } from 'lucide-react';
import { getAllPasswords, getSecurityInsights } from '@/services/vaultService';
import { toast } from 'sonner';

const Index: React.FC = () => {
  const [passwords, setPasswords] = useState<PasswordItemProps[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [securityStats, setSecurityStats] = useState({
    totalPasswords: 0,
    weakPasswords: 0,
    reusedPasswords: 0,
    oldPasswords: 0,
    securityScore: 0
  });

  // Load passwords from vault service
  const loadPasswords = () => {
    try {
      const allPasswords = getAllPasswords();
      setPasswords(allPasswords);
      
      // Update security insights
      const insights = getSecurityInsights();
      setSecurityStats(insights);
    } catch (error) {
      console.error('Error loading passwords:', error);
      toast.error('Failed to load your passwords');
    }
  };

  // Initialize on first load
  useEffect(() => {
    loadPasswords();
  }, []);

  // Filter passwords based on search term
  const filteredPasswords = passwords.filter(
    password => 
      password.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      password.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      password.url.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <VaultLayout>
      <div className="p-6">
        <div className="flex flex-col space-y-6">
          {/* Header with Welcome and Stats */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold">Welcome to SecureVault</h1>
              <p className="text-muted-foreground">Your personal secure password manager</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-vault-300/20 p-2 rounded-md flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                <div className="text-sm">
                  Security Score: <span className="font-bold">{securityStats.securityScore}%</span>
                </div>
              </div>
              <div className="bg-vault-300/20 p-2 rounded-md flex items-center gap-2">
                <Key className="h-5 w-5 text-primary" />
                <div className="text-sm">
                  Passwords: <span className="font-bold">{passwords.length}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Search and Add Password */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search passwords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Button onClick={() => setIsAddModalOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Password
            </Button>
          </div>

          {/* Main Content: Two-column layout for desktop */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Password List Column */}
            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredPasswords.length > 0 ? (
                  filteredPasswords.map((password) => (
                    <PasswordItem key={password.id} {...password} />
                  ))
                ) : (
                  <div className="md:col-span-2 text-center p-8 border border-dashed rounded-lg bg-muted/30">
                    {searchTerm ? (
                      <>
                        <p className="text-lg font-medium">No passwords match your search</p>
                        <p className="text-muted-foreground">Try a different search term</p>
                      </>
                    ) : (
                      <>
                        <p className="text-lg font-medium">No passwords found</p>
                        <p className="text-muted-foreground">Add your first password to get started</p>
                        <Button 
                          variant="outline" 
                          className="mt-4" 
                          onClick={() => setIsAddModalOpen(true)}
                        >
                          <Plus className="mr-2 h-4 w-4" />
                          Add Password
                        </Button>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar Tools Column */}
            <div className="space-y-6">
              <PasswordGenerator />
              <SecurityInsights {...securityStats} />
              <SecureBrowsing />
            </div>
          </div>
        </div>
      </div>

      {/* Add Password Modal */}
      <AddPasswordModal
        open={isAddModalOpen}
        onOpenChange={setIsAddModalOpen}
        onPasswordAdded={loadPasswords}
      />
    </VaultLayout>
  );
};

export default Index;
