
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Shield, Search } from 'lucide-react';
import { toast } from 'sonner';

interface WebsiteSecurityInfo {
  url: string;
  isSecure: boolean;
  protocol: string;
  hasHttps: boolean;
  loading: boolean;
}

const SecureBrowsing: React.FC = () => {
  const [url, setUrl] = useState('');
  const [securityInfo, setSecurityInfo] = useState<WebsiteSecurityInfo | null>(null);

  const checkWebsiteSecurity = (urlToCheck: string) => {
    // Format the URL if needed
    if (!urlToCheck.startsWith('http://') && !urlToCheck.startsWith('https://')) {
      urlToCheck = 'https://' + urlToCheck;
    }

    let formattedUrl;
    try {
      formattedUrl = new URL(urlToCheck);
    } catch (error) {
      toast.error('Invalid URL format');
      return;
    }

    // Set loading state
    setSecurityInfo({
      url: formattedUrl.toString(),
      loading: true,
      isSecure: false,
      protocol: '',
      hasHttps: false
    });

    // In a real app, you would make an API call to check the website security
    // Here we'll simulate that with a timeout
    setTimeout(() => {
      const hasHttps = formattedUrl.protocol === 'https:';
      
      setSecurityInfo({
        url: formattedUrl.toString(),
        isSecure: hasHttps,
        protocol: formattedUrl.protocol,
        hasHttps,
        loading: false
      });

      if (hasHttps) {
        toast.success('Website uses HTTPS encryption');
      } else {
        toast.error('Website does not use secure HTTPS');
      }
    }, 1500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) {
      toast.error('Please enter a URL');
      return;
    }
    
    checkWebsiteSecurity(url);
  };

  return (
    <Card className="secure-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          <span>Secure Browsing</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <Input 
            placeholder="Enter website URL (e.g., example.com)" 
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <Button type="submit">
            <Search className="h-4 w-4 mr-2" />
            Check
          </Button>
        </form>

        {securityInfo && (
          <div className="mt-4 p-3 rounded border bg-muted/30">
            {securityInfo.loading ? (
              <div className="flex justify-center">
                <div className="animate-pulse">Checking security...</div>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="text-sm">
                  <span className="font-medium">URL:</span> {securityInfo.url}
                </div>
                <div className="text-sm">
                  <span className="font-medium">Protocol:</span> {securityInfo.protocol}
                </div>
                <div className="flex items-center">
                  <div 
                    className={`w-3 h-3 rounded-full mr-2 ${securityInfo.isSecure ? 'bg-green-500' : 'bg-red-500'}`}
                  />
                  <span className={`text-sm font-medium ${securityInfo.isSecure ? 'text-green-500' : 'text-red-500'}`}>
                    {securityInfo.isSecure ? 'Secure Connection' : 'Insecure Connection'}
                  </span>
                </div>
                <div className="text-sm mt-2">
                  {securityInfo.isSecure ? (
                    <p className="text-green-500">
                      This website uses HTTPS encryption, which helps protect your data during transmission.
                    </p>
                  ) : (
                    <p className="text-red-500">
                      This website does not use HTTPS encryption. Your data may not be secure during transmission.
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        <div className="pt-4 text-xs text-muted-foreground">
          <p>Tips for secure browsing:</p>
          <ul className="list-disc pl-4 space-y-1 mt-1">
            <li>Always look for the padlock icon in your browser</li>
            <li>Verify that websites use HTTPS before entering sensitive information</li>
            <li>Be cautious of websites with security warnings</li>
            <li>Use unique passwords for different websites</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default SecureBrowsing;
