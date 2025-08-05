import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { supabase } from '@/lib/supabase';
import { Mail, TestTube, AlertCircle, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

export function EmailDebug() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [debugInfo, setDebugInfo] = useState<string[]>([]);

  const addDebugInfo = (message: string) => {
    setDebugInfo(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const testEmailVerification = async () => {
    if (!email.trim()) {
      toast.error('Please enter an email address');
      return;
    }

    try {
      setLoading(true);
      setDebugInfo([]);
      
      addDebugInfo('Starting email verification test...');
      addDebugInfo(`Testing with email: ${email}`);
      addDebugInfo(`Current URL: ${window.location.origin}`);
      
      // Test signup with email verification
      const { data, error } = await supabase.auth.signUp({
        email,
        password: 'temp123456', // Temporary password for testing
        options: {
          data: { full_name: 'Test User' },
          emailRedirectTo: `${window.location.origin}/auth/callback`
        }
      });

      addDebugInfo(`Signup response received`);
      addDebugInfo(`User created: ${!!data.user}`);
      addDebugInfo(`Session created: ${!!data.session}`);
      addDebugInfo(`Email verification required: ${!data.session && !!data.user}`);

      if (error) {
        addDebugInfo(`Error: ${error.message}`);
        addDebugInfo(`Error code: ${error.status}`);
        throw error;
      }

      if (data.user && !data.session) {
        addDebugInfo('✅ Email verification flow initiated');
        addDebugInfo('📧 Verification email should be sent');
        toast.success('Test signup created! Check if verification email arrives.');
      } else if (data.user && data.session) {
        addDebugInfo('⚠️ User auto-confirmed (email verification disabled)');
        toast.warning('Email verification appears to be disabled in Supabase');
      }

    } catch (error: any) {
      addDebugInfo(`❌ Test failed: ${error.message}`);
      toast.error(`Test failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const testPasswordReset = async () => {
    if (!email.trim()) {
      toast.error('Please enter an email address');
      return;
    }

    try {
      setLoading(true);
      addDebugInfo('Testing password reset email...');
      
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`
      });

      if (error) {
        addDebugInfo(`Password reset error: ${error.message}`);
        throw error;
      }

      addDebugInfo('✅ Password reset email request sent');
      toast.success('Password reset test completed! Check if email arrives.');

    } catch (error: any) {
      addDebugInfo(`❌ Password reset test failed: ${error.message}`);
      toast.error(`Password reset test failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const checkSupabaseConfig = () => {
    addDebugInfo('🔍 Checking Supabase configuration...');
    addDebugInfo(`Supabase URL: ${supabase.supabaseUrl}`);
    addDebugInfo(`Auth configured: ${!!supabase.auth}`);
    addDebugInfo(`Local storage available: ${typeof localStorage !== 'undefined'}`);
    
    // Check if we're in development or production
    addDebugInfo(`Environment: ${process.env.NODE_ENV || 'development'}`);
    addDebugInfo(`Protocol: ${window.location.protocol}`);
    addDebugInfo(`Domain: ${window.location.hostname}`);
    
    toast.info('Configuration check completed - see debug info below');
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <TestTube className="h-5 w-5" />
          <span>Email Debug Tool</span>
        </CardTitle>
        <CardDescription>
          Test email functionality and debug Supabase email configuration
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <strong>Important:</strong> This tool creates test accounts. Use a test email address.
            Make sure your Supabase project has email authentication properly configured.
          </AlertDescription>
        </Alert>

        <div className="space-y-2">
          <Label htmlFor="test-email">Test Email Address</Label>
          <Input
            id="test-email"
            type="email"
            placeholder="test@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Button 
            onClick={checkSupabaseConfig}
            variant="outline"
            disabled={loading}
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            Check Config
          </Button>
          
          <Button 
            onClick={testEmailVerification}
            disabled={loading || !email.trim()}
          >
            <Mail className="h-4 w-4 mr-2" />
            Test Verification
          </Button>
          
          <Button 
            onClick={testPasswordReset}
            variant="outline"
            disabled={loading || !email.trim()}
          >
            <Mail className="h-4 w-4 mr-2" />
            Test Reset
          </Button>
        </div>

        {debugInfo.length > 0 && (
          <div className="space-y-2">
            <Label>Debug Information</Label>
            <div className="bg-muted p-4 rounded-lg max-h-60 overflow-y-auto">
              <pre className="text-xs whitespace-pre-wrap font-mono">
                {debugInfo.join('\n')}
              </pre>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setDebugInfo([])}
            >
              Clear Debug Info
            </Button>
          </div>
        )}

        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <strong>If emails aren't arriving:</strong>
            <ol className="list-decimal list-inside mt-2 space-y-1 text-sm">
              <li>Check your Supabase project's Authentication settings</li>
              <li>Verify email templates are configured</li>
              <li>Check if SMTP is properly set up (or using Supabase's default)</li>
              <li>Look in spam/junk folders</li>
              <li>Try with a different email provider (Gmail, Yahoo, etc.)</li>
              <li>Check Supabase logs for email delivery errors</li>
            </ol>
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
}
