import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, ExternalLink, Settings, Database, Mail } from 'lucide-react';

export function QuickAuthFix() {
  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Settings className="h-5 w-5" />
            <span>Fix "Invalid Credentials" Error</span>
          </CardTitle>
          <CardDescription>
            Quick steps to fix the authentication issue in your Supabase project
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          
          <Alert className="border-destructive bg-destructive/5">
            <Mail className="h-4 w-4" />
            <AlertDescription>
              <strong>Root Cause:</strong> Your Supabase project has "Email Confirmation" enabled, 
              but users are trying to sign in immediately after signup without confirming their email.
            </AlertDescription>
          </Alert>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span>Solution 1: Disable Email Confirmation (Recommended for now)</span>
            </h3>
            
            <div className="bg-muted p-4 rounded-lg space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-medium">Step 1: Open Supabase Dashboard</span>
                <Badge variant="outline">Required</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Go to your Supabase project dashboard at supabase.com
              </p>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => window.open('https://supabase.com/dashboard', '_blank')}
                className="flex items-center space-x-2"
              >
                <ExternalLink className="h-4 w-4" />
                <span>Open Supabase Dashboard</span>
              </Button>
            </div>

            <div className="bg-muted p-4 rounded-lg space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-medium">Step 2: Navigate to Authentication Settings</span>
                <Badge variant="outline">Required</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Click: <strong>Authentication</strong> → <strong>Settings</strong> in the left sidebar
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-medium">Step 3: Disable Email Confirmation</span>
                <Badge variant="outline">Required</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Find <strong>"Enable email confirmations"</strong> and turn it <strong>OFF</strong>
              </p>
              <div className="bg-background p-3 rounded border">
                <code className="text-sm">
                  ☑️ Enable email confirmations → ❌ Enable email confirmations
                </code>
              </div>
            </div>

            <div className="bg-muted p-4 rounded-lg space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-medium">Step 4: Save Changes</span>
                <Badge variant="outline">Required</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Click <strong>Save</strong> at the bottom of the settings page
              </p>
            </div>
          </div>

          <Alert className="border-green-500 bg-green-50">
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              <strong>After completing these steps:</strong>
              <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                <li>New signups will automatically be confirmed</li>
                <li>Users can sign in immediately after creating an account</li>
                <li>No email verification required</li>
                <li>The "invalid credentials" error should be fixed</li>
              </ul>
            </AlertDescription>
          </Alert>

          <div className="border-t pt-4">
            <h3 className="text-lg font-semibold mb-3">Alternative: Keep Email Confirmation Enabled</h3>
            <p className="text-sm text-muted-foreground mb-3">
              If you want to keep email confirmation for security, you'll need to:
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>Set up proper email templates in Supabase</li>
              <li>Configure SMTP settings</li>
              <li>Add email verification flow to your app</li>
              <li>Handle unconfirmed users gracefully</li>
            </ul>
          </div>

          <Alert>
            <Database className="h-4 w-4" />
            <AlertDescription>
              <strong>Database Note:</strong> The null values you see in your database are in the 
              user_metadata field, which is normal. The actual user data is stored there as JSON.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
}
