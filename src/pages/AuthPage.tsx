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
                <strong>Having trouble signing in?</strong> Use "Forgot password" if you need
                email verification help or to reset your password. If emails aren't arriving,
                check your spam folder and try again in a few minutes.
              </>
            ) : (
              <>
                <strong>Quick Start:</strong> After creating your account, you may need to verify
                your email before signing in. Check your inbox and spam folder - emails may take
                a few minutes to arrive.
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
