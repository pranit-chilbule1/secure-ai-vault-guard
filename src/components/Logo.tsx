
import React from 'react';
import { Shield, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ 
  size = 'md', 
  showText = true,
  className
}) => {
  const sizes = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-3xl'
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="relative">
        <Shield className={cn(sizes[size], "text-primary animate-pulse-slow")} />
        <Lock className={cn(
          sizes[size], 
          "text-primary/90 absolute top-0 left-0 transform scale-[0.55] translate-x-[45%] translate-y-[45%]"
        )} />
      </div>
      {showText && (
        <span className={cn("font-bold tracking-tight", textSizes[size])}>
          SecureVault
        </span>
      )}
    </div>
  );
};

export default Logo;
