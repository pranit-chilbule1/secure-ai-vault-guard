
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Shield, AlertTriangle, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

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
  const getScoreColor = () => {
    if (securityScore < 50) return 'bg-red-500';
    if (securityScore < 80) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <Card className="secure-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          <span>Security Insights</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm">Security Score</span>
            <span className="text-sm font-medium">{securityScore}%</span>
          </div>
          <Progress value={securityScore} className={getScoreColor()} />
        </div>

        <Separator />

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 text-sm">
              <AlertTriangle className={`h-4 w-4 ${weakPasswords > 0 ? 'text-red-500' : 'text-green-500'}`} />
              <span>Weak Passwords</span>
            </div>
            <span className={`text-sm font-medium ${weakPasswords > 0 ? 'text-red-500' : 'text-green-500'}`}>
              {weakPasswords}/{totalPasswords}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 text-sm">
              <AlertTriangle className={`h-4 w-4 ${reusedPasswords > 0 ? 'text-yellow-500' : 'text-green-500'}`} />
              <span>Reused Passwords</span>
            </div>
            <span className={`text-sm font-medium ${reusedPasswords > 0 ? 'text-yellow-500' : 'text-green-500'}`}>
              {reusedPasswords}/{totalPasswords}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 text-sm">
              <AlertTriangle className={`h-4 w-4 ${oldPasswords > 0 ? 'text-yellow-500' : 'text-green-500'}`} />
              <span>Old Passwords (>90 days)</span>
            </div>
            <span className={`text-sm font-medium ${oldPasswords > 0 ? 'text-yellow-500' : 'text-green-500'}`}>
              {oldPasswords}/{totalPasswords}
            </span>
          </div>
        </div>

        <Separator />

        <div className="pt-2">
          <Button variant="outline" className="w-full">
            Run Security Scan
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SecurityInsights;
