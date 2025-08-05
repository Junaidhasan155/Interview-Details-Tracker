import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { supabase } from '@/lib/supabase';
import { TestTube, Bug, Users, Database, AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import { toast } from 'sonner';

export function AuthDebug() {
  const [email, setEmail] = useState('test@example.com');
  const [password, setPassword] = useState('test123456');
  const [fullName, setFullName] = useState('Test User');
  const [loading, setLoading] = useState(false);
  const [debugLog, setDebugLog] = useState<string[]>([]);

  const addLog = (message: string, type: 'info' | 'success' | 'error' = 'info') => {
    const timestamp = new Date().toLocaleTimeString();
    const logEntry = `[${timestamp}] ${type.toUpperCase()}: ${message}`;
    setDebugLog(prev => [...prev, logEntry]);
    console.log(logEntry);
  };

  const clearLog = () => {
    setDebugLog([]);
    console.clear();
  };

  const testSignUp = async () => {
    try {
      setLoading(true);
      clearLog();
      
      addLog('🚀 Starting signup test...');
      addLog(`Testing with: ${email} / ${password}`);
      addLog(`Full name: ${fullName}`);
      
      // Test signup
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            current_position: 'Test Position',
            industry: 'Technology',
            experience_years: '1-2 years',
            target_role: 'Developer'
          }
        }
      });

      addLog('📊 Signup response received');
      addLog(`User created: ${!!data.user}`);
      addLog(`Session created: ${!!data.session}`);
      addLog(`User ID: ${data.user?.id || 'None'}`);
      addLog(`User email: ${data.user?.email || 'None'}`);
      addLog(`Email confirmed: ${data.user?.email_confirmed_at ? 'Yes' : 'No'}`);
      addLog(`User metadata: ${JSON.stringify(data.user?.user_metadata || {})}`);

      if (error) {
        addLog(`❌ Signup error: ${error.message}`, 'error');
        addLog(`Error code: ${error.status}`);
        throw error;
      }

      if (data.user && !data.session) {
        addLog('⚠️ User created but no session - email confirmation likely required', 'error');
        addLog('This is why you get "invalid credentials" when trying to sign in');
      } else if (data.user && data.session) {
        addLog('✅ User created and auto-signed in', 'success');
      }

      toast.success('Signup test completed - check debug log');

    } catch (error: any) {
      addLog(`💥 Signup test failed: ${error.message}`, 'error');
      toast.error(`Test failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const testSignIn = async () => {
    try {
      setLoading(true);
      addLog('🔑 Testing sign in...');
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        addLog(`❌ Sign in failed: ${error.message}`, 'error');
        addLog(`This is the "invalid credentials" error you're seeing`);
        
        if (error.message.includes('Invalid login credentials')) {
          addLog('💡 This usually means email confirmation is required', 'info');
        }
        
        throw error;
      }

      addLog('✅ Sign in successful!', 'success');
      addLog(`Session: ${!!data.session}`);
      addLog(`User: ${data.user?.email}`);

    } catch (error: any) {
      addLog(`💥 Sign in failed: ${error.message}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  const checkSupabaseConfig = async () => {
    try {
      addLog('🔍 Checking Supabase configuration...');
      addLog(`Supabase URL: ${supabase.supabaseUrl}`);
      
      // Check current session
      const { data: { session } } = await supabase.auth.getSession();
      addLog(`Current session: ${session ? 'Active' : 'None'}`);
      addLog(`Current user: ${session?.user?.email || 'None'}`);
      
      // Check if we can access the auth admin (this will fail, but gives us info)
      try {
        const { data, error } = await supabase.auth.getUser();
        addLog(`Auth check: ${error ? 'Failed' : 'Success'}`);
      } catch (e: any) {
        addLog(`Auth error: ${e.message}`);
      }

      toast.info('Configuration check completed');
      
    } catch (error: any) {
      addLog(`💥 Config check failed: ${error.message}`, 'error');
    }
  };

  const testFullFlow = async () => {
    setLoading(true);
    clearLog();
    
    addLog('🔄 Testing complete auth flow...');
    
    // First try to sign out any existing session
    await supabase.auth.signOut();
    addLog('🚪 Signed out any existing session');
    
    // Test signup
    await testSignUp();
    
    // Wait a moment
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Test signin
    await testSignIn();
    
    setLoading(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Bug className="h-5 w-5" />
            <span>Authentication Debug Tool</span>
          </CardTitle>
          <CardDescription>
            Debug Supabase authentication issues and test the signup/signin flow
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              <strong>Debugging "Invalid Credentials" Error:</strong> This usually happens when 
              Supabase requires email confirmation but the user tries to sign in before confirming.
            </AlertDescription>
          </Alert>

          {/* Test Credentials */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Test Email</Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="test@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label>Test Password</Label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="test123456"
              />
            </div>
            <div className="space-y-2">
              <Label>Full Name</Label>
              <Input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Test User"
              />
            </div>
          </div>

          {/* Test Buttons */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Button 
              onClick={checkSupabaseConfig}
              variant="outline"
              disabled={loading}
              className="flex items-center space-x-2"
            >
              <Database className="h-4 w-4" />
              <span>Check Config</span>
            </Button>
            
            <Button 
              onClick={testSignUp}
              disabled={loading}
              className="flex items-center space-x-2"
            >
              <Users className="h-4 w-4" />
              <span>Test Signup</span>
            </Button>
            
            <Button 
              onClick={testSignIn}
              variant="outline"
              disabled={loading}
              className="flex items-center space-x-2"
            >
              <CheckCircle className="h-4 w-4" />
              <span>Test Signin</span>
            </Button>
            
            <Button 
              onClick={testFullFlow}
              variant="secondary"
              disabled={loading}
              className="flex items-center space-x-2"
            >
              <TestTube className="h-4 w-4" />
              <span>Full Test</span>
            </Button>
          </div>

          {/* Debug Log */}
          {debugLog.length > 0 && (
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label>Debug Log</Label>
                <Button variant="ghost" size="sm" onClick={clearLog}>
                  Clear Log
                </Button>
              </div>
              <div className="bg-muted p-4 rounded-lg max-h-96 overflow-y-auto">
                <pre className="text-xs whitespace-pre-wrap font-mono">
                  {debugLog.join('\n')}
                </pre>
              </div>
            </div>
          )}

          {/* Solutions */}
          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              <strong>Common Solutions:</strong>
              <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                <li><strong>Disable email confirmation:</strong> In Supabase Dashboard → Authentication → Settings → "Enable email confirmations" = OFF</li>
                <li><strong>Or handle confirmation:</strong> Keep email confirmation but add proper email verification flow</li>
                <li><strong>Check user metadata:</strong> Ensure profile data is being saved to user_metadata</li>
                <li><strong>Manual confirmation:</strong> Manually confirm users in Supabase auth table</li>
              </ul>
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
}
