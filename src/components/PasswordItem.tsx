
import React, { useState } from 'react';
import { Eye, EyeOff, Copy, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

export interface PasswordItemProps {
  id: string;
  title: string;
  username: string;
  password: string;
  url: string;
  strength: 'weak' | 'medium' | 'strong';
  lastUpdated: string;
}

const PasswordItem: React.FC<PasswordItemProps> = ({
  title,
  username,
  password,
  url,
  strength,
  lastUpdated
}) => {
  const [showPassword, setShowPassword] = useState(false);
  
  const handleCopyPassword = () => {
    navigator.clipboard.writeText(password);
    toast.success('Password copied to clipboard');
  };

  const handleCopyUsername = () => {
    navigator.clipboard.writeText(username);
    toast.success('Username copied to clipboard');
  };

  const getStrengthColor = () => {
    switch (strength) {
      case 'weak':
        return 'bg-red-500 text-white';
      case 'medium':
        return 'bg-yellow-500 text-black';
      case 'strong':
        return 'bg-green-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  return (
    <Card className="secure-card animate-fade-in">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
          <Badge className={getStrengthColor()}>
            {strength.charAt(0).toUpperCase() + strength.slice(1)}
          </Badge>
        </div>
        <CardDescription className="text-sm text-muted-foreground">
          Last updated: {lastUpdated}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3 py-0">
        <div className="flex flex-col space-y-1">
          <div className="text-xs text-muted-foreground">Username</div>
          <div className="flex items-center justify-between">
            <div className="font-mono text-sm truncate max-w-[200px]">{username}</div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleCopyUsername}
              className="h-7 w-7"
            >
              <Copy className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
        
        <div className="flex flex-col space-y-1">
          <div className="text-xs text-muted-foreground">Password</div>
          <div className="flex items-center justify-between">
            <div className="font-mono text-sm truncate max-w-[200px]">
              {showPassword ? password : '••••••••••••'}
            </div>
            <div className="flex space-x-1">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setShowPassword(!showPassword)}
                className="h-7 w-7"
              >
                {showPassword ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handleCopyPassword}
                className="h-7 w-7"
              >
                <Copy className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="text-xs flex items-center gap-1 ml-auto" 
          onClick={() => window.open(url.startsWith('http') ? url : `https://${url}`, '_blank')}
        >
          <ExternalLink className="h-3 w-3" />
          Visit Site
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PasswordItem;
