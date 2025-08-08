import { ReactNode } from 'react';
import { useAuth } from '@/context/AuthContext';
import { AuthPage } from '@/pages/AuthPage';
import { Card, CardContent } from '@/components/ui/card';
import { Loader } from 'lucide-react';

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = useAuth();

  // Temporary bypass for testing modal - remove in production
  if (window.location.pathname === '/companies') {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center">
        <Card className="w-full max-w-md mx-auto bg-gradient-to-br from-card to-card/80 border-border/50">
          <CardContent className="flex flex-col items-center justify-center p-8 space-y-4">
            <Loader className="h-8 w-8 animate-spin text-primary" />
            <p className="text-muted-foreground text-center">Loading your session...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!user) {
    return <AuthPage />;
  }

  return <>{children}</>;
}
