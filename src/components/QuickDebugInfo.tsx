import { useState } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, ExternalLink, RefreshCw, Settings } from 'lucide-react';

interface QuickDebugInfoProps {
  email: string;
  error: string;
}

export function QuickDebugInfo({ email, error }: QuickDebugInfoProps) {
  const [showDetails, setShowDetails] = useState(false);

  const openSupabaseAuth = () => {
    window.open('https://supabase.com/dashboard', '_blank');
  };

  const isEmailConfirmationError = error.includes('Invalid login credentials') || 
                                   error.includes('Email not confirmed') ||
                                   error.includes('email confirmation');

  if (!isEmailConfirmationError) {
    return null;
  }

  return (
    <Alert className="mt-4 border-orange-300 bg-orange-50">
      <AlertTriangle className="h-4 w-4" />
      <AlertDescription>
        <div className="space-y-3">
          <div>
            <strong>Email Confirmation Issue Detected</strong>
            <p className="text-sm mt-1">
              Account <code className="bg-muted px-1 rounded">{email}</code> exists but needs confirmation.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button
              size="sm"
              onClick={openSupabaseAuth}
              className="flex items-center space-x-1"
            >
              <ExternalLink className="h-3 w-3" />
              <span>Fix in Supabase</span>
            </Button>
            
            <Button
              size="sm"
              variant="outline"
              onClick={() => setShowDetails(!showDetails)}
            >
              <Settings className="h-3 w-3 mr-1" />
              {showDetails ? 'Hide' : 'Show'} Fix Steps
            </Button>
          </div>

          {showDetails && (
            <Card className="mt-3 border-dashed">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Quick Fix Steps</CardTitle>
                <CardDescription className="text-xs">
                  Follow these steps in your Supabase dashboard
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 pt-0">
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="text-xs">1</Badge>
                  <span className="text-xs">Go to Authentication → Settings</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="text-xs">2</Badge>
                  <span className="text-xs">Turn OFF "Enable email confirmations"</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="text-xs">3</Badge>
                  <span className="text-xs">Save changes and try signing in again</span>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </AlertDescription>
    </Alert>
  );
}
