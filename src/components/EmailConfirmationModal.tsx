import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/context/AuthContext';
import { 
  Mail, 
  Settings, 
  ExternalLink, 
  CheckCircle, 
  AlertTriangle,
  RefreshCw,
  Database
} from 'lucide-react';
import { toast } from 'sonner';

interface EmailConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  email: string;
  password: string;
}

export function EmailConfirmationModal({ 
  isOpen, 
  onClose, 
  email, 
  password 
}: EmailConfirmationModalProps) {
  const [loading, setLoading] = useState(false);
  const { forceConfirmUser, signIn } = useAuth();

  const handleRetrySignIn = async () => {
    try {
      setLoading(true);
      await signIn(email, password);
      onClose();
    } catch (error) {
      // Error handled in auth context
    } finally {
      setLoading(false);
    }
  };

  const handleForceConfirm = async () => {
    try {
      setLoading(true);
      await forceConfirmUser(email, password);
      onClose();
    } catch (error) {
      // Error handled in auth context
    } finally {
      setLoading(false);
    }
  };

  const openSupabaseDashboard = () => {
    window.open('https://supabase.com/dashboard', '_blank');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Mail className="h-5 w-5" />
            <span>Email Confirmation Required</span>
          </DialogTitle>
          <DialogDescription>
            Your account was created but needs email confirmation before you can sign in.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <Alert className="border-yellow-500 bg-yellow-50">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <strong>Account created but not confirmed:</strong> Your Supabase project requires 
              email confirmation, but you haven't confirmed your email address yet.
            </AlertDescription>
          </Alert>

          {/* Quick Solutions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <RefreshCw className="h-4 w-4" />
                  <span>Try Again</span>
                </CardTitle>
                <CardDescription>
                  Check if your email got confirmed automatically
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  onClick={handleRetrySignIn}
                  disabled={loading}
                  className="w-full"
                >
                  {loading ? 'Checking...' : 'Retry Sign In'}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4" />
                  <span>Force Confirm</span>
                </CardTitle>
                <CardDescription>
                  Attempt automatic confirmation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  onClick={handleForceConfirm}
                  disabled={loading}
                  variant="outline"
                  className="w-full"
                >
                  {loading ? 'Confirming...' : 'Auto-Confirm'}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Manual Solutions */}
          <Card className="border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="h-5 w-5" />
                <span>Manual Fix in Supabase Dashboard</span>
              </CardTitle>
              <CardDescription>
                The most reliable solution is to disable email confirmation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div>
                    <div className="font-medium">Step 1: Open Supabase Dashboard</div>
                    <div className="text-sm text-muted-foreground">Go to your project settings</div>
                  </div>
                  <Badge variant="outline">Required</Badge>
                </div>

                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div>
                    <div className="font-medium">Step 2: Authentication → Settings</div>
                    <div className="text-sm text-muted-foreground">Navigate to auth settings</div>
                  </div>
                  <Badge variant="outline">Required</Badge>
                </div>

                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div>
                    <div className="font-medium">Step 3: Disable "Enable email confirmations"</div>
                    <div className="text-sm text-muted-foreground">Turn OFF email confirmation</div>
                  </div>
                  <Badge variant="outline">Required</Badge>
                </div>

                <Button 
                  onClick={openSupabaseDashboard}
                  variant="outline"
                  className="w-full flex items-center space-x-2"
                >
                  <ExternalLink className="h-4 w-4" />
                  <span>Open Supabase Dashboard</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Alternative: Manual Confirmation */}
          <Alert>
            <Database className="h-4 w-4" />
            <AlertDescription>
              <strong>Alternative:</strong> In your Supabase dashboard, go to Authentication → Users, 
              find user <code className="bg-muted px-1 rounded">{email}</code> and manually confirm them 
              by clicking the user and updating their email_confirmed_at field.
            </AlertDescription>
          </Alert>

          {/* Close Button */}
          <div className="flex justify-end">
            <Button variant="ghost" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
