import { useState } from 'react';
import { LoginForm } from '@/components/auth/LoginForm';
import { SignUpForm } from '@/components/auth/SignUpForm';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';

export function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-4">
        {/* Info Alert */}
        <Alert className="bg-primary/5 border-primary/20">
          <Info className="h-4 w-4" />
          <AlertDescription className="text-sm">
            {isLogin ? (
              <>
                <strong>Having trouble signing in?</strong> Try the demo account for instant access,
                or use "Forgot password" if you need email verification help.
              </>
            ) : (
              <>
                <strong>Quick Start:</strong> After creating your account, you may need to verify
                your email before signing in. Check your inbox for a verification link.
              </>
            )}
          </AlertDescription>
        </Alert>

        {/* Auth Forms */}
        {isLogin ? (
          <LoginForm onToggleMode={() => setIsLogin(false)} />
        ) : (
          <SignUpForm onToggleMode={() => setIsLogin(true)} />
        )}
      </div>
    </div>
  );
}
