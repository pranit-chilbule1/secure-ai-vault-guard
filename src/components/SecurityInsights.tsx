
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, AlertTriangle, KeyRound } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface SecurityInsightsProps {
  totalPasswords: number;
  weakPasswords: number;
  reusedPasswords: number;
  oldPasswords: number;
  securityScore: number;
}

const SecurityInsights: React.FC<SecurityInsightsProps> = ({
  totalPasswords,
  weakPasswords,
  reusedPasswords,
  oldPasswords,
  securityScore
}) => {
  // Determine the security score color
  const getScoreColor = () => {
    if (securityScore >= 80) return 'bg-green-500';
    if (securityScore >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <Card className="border border-border bg-secondary/50">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          Security Insights
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Security Score */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Security Score</span>
            <span className={`text-sm font-medium ${
              securityScore >= 80 ? 'text-green-500' : 
              securityScore >= 50 ? 'text-yellow-500' : 
              'text-red-500'
            }`}>{securityScore}%</span>
          </div>
          <Progress 
            value={securityScore} 
            className={`h-2 ${getScoreColor()}`}
          />
        </div>

        {/* Password Status */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 text-sm">
              <KeyRound className={`h-4 w-4 ${totalPasswords === 0 ? 'text-yellow-500' : 'text-green-500'}`} />
              <span>Total Passwords</span>
            </div>
            <span className={`text-sm font-medium ${totalPasswords === 0 ? 'text-yellow-500' : 'text-green-500'}`}>
              {totalPasswords}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 text-sm">
              <AlertTriangle className={`h-4 w-4 ${weakPasswords > 0 ? 'text-red-500' : 'text-green-500'}`} />
              <span>Weak Passwords</span>
            </div>
            <span className={`text-sm font-medium ${weakPasswords > 0 ? 'text-red-500' : 'text-green-500'}`}>
              {weakPasswords}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 text-sm">
              <AlertTriangle className={`h-4 w-4 ${reusedPasswords > 0 ? 'text-red-500' : 'text-green-500'}`} />
              <span>Reused Passwords</span>
            </div>
            <span className={`text-sm font-medium ${reusedPasswords > 0 ? 'text-red-500' : 'text-green-500'}`}>
              {reusedPasswords}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 text-sm">
              <AlertTriangle className={`h-4 w-4 ${oldPasswords > 0 ? 'text-yellow-500' : 'text-green-500'}`} />
              <span>Old Passwords (&gt;90 days)</span>
            </div>
            <span className={`text-sm font-medium ${oldPasswords > 0 ? 'text-yellow-500' : 'text-green-500'}`}>
              {oldPasswords}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SecurityInsights;
