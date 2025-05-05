
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Copy, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

const PasswordGenerator: React.FC = () => {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [strength, setStrength] = useState<'weak' | 'medium' | 'strong'>('medium');

  const generatePassword = () => {
    let charset = '';
    if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeNumbers) charset += '0123456789';
    if (includeSymbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';

    if (charset === '') {
      toast.error('Please select at least one character type');
      return;
    }

    let newPassword = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      newPassword += charset[randomIndex];
    }

    setPassword(newPassword);
    calculateStrength(newPassword);
  };

  const calculateStrength = (pass: string) => {
    // Simple strength calculation
    let score = 0;
    
    // Length contribution (up to 5 points)
    score += Math.min(5, Math.floor(pass.length / 4));
    
    // Character variety contribution
    if (/[a-z]/.test(pass)) score += 1;
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^a-zA-Z0-9]/.test(pass)) score += 2;
    
    // Set strength based on score
    if (score < 6) {
      setStrength('weak');
    } else if (score < 9) {
      setStrength('medium');
    } else {
      setStrength('strong');
    }
  };

  const copyToClipboard = () => {
    if (password) {
      navigator.clipboard.writeText(password);
      toast.success('Password copied to clipboard');
    }
  };

  useEffect(() => {
    generatePassword();
  }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols]);

  return (
    <Card className="secure-card">
      <CardHeader>
        <CardTitle className="text-lg">Password Generator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative">
          <div className="font-mono bg-background border rounded-md p-3 pr-20 overflow-x-auto whitespace-nowrap">
            {password || 'Click generate to create a password'}
          </div>
          <div className="absolute right-2 top-2 flex space-x-1">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={generatePassword}
              className="h-8 w-8"
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={copyToClipboard}
              className="h-8 w-8"
              disabled={!password}
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm">Password Length: {length}</span>
            <span 
              className={cn(
                "text-sm font-medium px-2 rounded",
                strength === 'weak' ? "text-red-500" : 
                strength === 'medium' ? "text-yellow-500" : "text-green-500"
              )}
            >
              {strength.charAt(0).toUpperCase() + strength.slice(1)}
            </span>
          </div>
          <Slider
            value={[length]}
            min={8}
            max={32}
            step={1}
            onValueChange={(value) => setLength(value[0])}
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm">Include Uppercase</span>
            <Switch checked={includeUppercase} onCheckedChange={setIncludeUppercase} />
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm">Include Lowercase</span>
            <Switch checked={includeLowercase} onCheckedChange={setIncludeLowercase} />
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm">Include Numbers</span>
            <Switch checked={includeNumbers} onCheckedChange={setIncludeNumbers} />
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm">Include Symbols</span>
            <Switch checked={includeSymbols} onCheckedChange={setIncludeSymbols} />
          </div>
        </div>

        <div className="pt-2">
          <Button 
            className="w-full" 
            onClick={generatePassword}
          >
            Generate New Password
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PasswordGenerator;
