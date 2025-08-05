import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase } from '@/lib/supabase';
import { User, Session } from '@supabase/supabase-js';
import { toast } from 'sonner';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, userData: UserProfile) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>;
  forceConfirmUser: (email: string, password: string) => Promise<void>;
}

interface UserProfile {
  full_name: string;
  current_position?: string;
  industry?: string;
  experience_years?: string;
  target_role?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSigningUp, setIsSigningUp] = useState(false);

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    };

    getInitialSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        // Don't update auth state during signup to prevent dashboard flash
        if (isSigningUp) {
          console.log('Ignoring auth state change during signup:', event);
          return;
        }

        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);

        if (event === 'SIGNED_IN') {
          toast.success('Successfully signed in!');
        } else if (event === 'SIGNED_OUT') {
          toast.success('Successfully signed out!');
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [isSigningUp]);

  const signUp = async (email: string, password: string, userData: UserProfile) => {
    try {
      setLoading(true);
      setIsSigningUp(true); // Prevent auth state changes during signup

      console.log('Starting signup with data:', { email, userData });

      // First create the account
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData
        }
      });

      console.log('Signup response:', { data, error });

      if (error) throw error;

      // Check if user was created
      if (data.user) {
        console.log('User created:', {
          id: data.user.id,
          email: data.user.email,
          emailConfirmed: data.user.email_confirmed_at,
          metadata: data.user.user_metadata
        });

        // If user has a session, immediately clear auth state to prevent dashboard flash
        if (data.session) {
          console.log('User auto-confirmed, clearing auth state to prevent dashboard flash');
          // Immediately clear local auth state
          setUser(null);
          setSession(null);
          // Then sign out from Supabase
          await supabase.auth.signOut();
          toast.success('Account created successfully! Please sign in with your credentials.');
        } else {
          console.log('User created but no session');
          toast.success('Account created successfully! Please sign in with your credentials.');
        }
      } else {
        toast.success('Account created successfully! Please sign in with your credentials.');
      }
    } catch (error: any) {
      console.error('Signup error:', error);
      toast.error(error.message || 'Failed to create account');
      throw error;
    } finally {
      setLoading(false);
      setIsSigningUp(false); // Re-enable auth state changes
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);

      console.log('Attempting sign in for:', email);

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      console.log('Sign in response:', { data, error });

      if (error) {
        console.error('Sign in error:', error);

        if (error.message.includes('Email not confirmed')) {
          console.log('Email not confirmed error detected');
          throw new Error('UNCONFIRMED_EMAIL');
        } else if (error.message.includes('Invalid login credentials')) {
          console.log('Invalid credentials error - treating as unconfirmed email');
          // Most "Invalid login credentials" errors for just-created accounts are due to unconfirmed email
          throw new Error('UNCONFIRMED_EMAIL');
        } else if (error.message.includes('Too many requests')) {
          throw new Error('Too many login attempts. Please wait a moment before trying again.');
        } else {
          throw error;
        }
      }

      if (!data.session) {
        throw new Error('Sign in failed. Please try again.');
      }

      console.log('Sign in successful:', {
        userId: data.user?.id,
        email: data.user?.email
      });

    } catch (error: any) {
      console.error('Sign in failed:', error);

      if (error.message === 'UNCONFIRMED_EMAIL') {
        // Don't show toast here, let the component handle it
        throw error;
      } else {
        toast.error(error.message || 'Failed to sign in');
        throw error;
      }
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error: any) {
      toast.error(error.message || 'Failed to sign out');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    try {
      if (!user) throw new Error('No user logged in');

      const { error } = await supabase
        .from('profiles')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (error) throw error;
      toast.success('Profile updated successfully!');
    } catch (error: any) {
      toast.error(error.message || 'Failed to update profile');
      throw error;
    }
  };

  const forceConfirmUser = async (email: string, password: string) => {
    try {
      setLoading(true);

      console.log('Attempting force confirmation for:', email);

      // Strategy 1: Try to sign in again (sometimes works after a delay)
      console.log('Strategy 1: Retry sign in...');
      const { data: retryData, error: retryError } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (retryData.session) {
        console.log('Retry successful!');
        toast.success('Successfully signed in! (Retry worked)');
        return;
      }

      // Strategy 2: Create a new signup to trigger confirmation
      console.log('Strategy 2: Re-signup to trigger confirmation...');
      const { data: signupData, error: signupError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: 'Auto Confirmed User',
            confirmed_at: new Date().toISOString(),
            force_confirm: true
          }
        }
      });

      console.log('Re-signup response:', { signupData, signupError });

      // Strategy 3: Try signing in one more time
      console.log('Strategy 3: Final sign in attempt...');
      const { data: finalData, error: finalError } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (finalData.session) {
        console.log('Final attempt successful!');
        toast.success('Successfully confirmed and signed in!');
        return;
      }

      // If all strategies fail, show helpful message
      if (finalError) {
        console.log('All strategies failed:', finalError.message);
        throw new Error('Auto-confirmation failed. Please disable email confirmation in your Supabase dashboard: Authentication → Settings → "Enable email confirmations" = OFF');
      }

    } catch (error: any) {
      console.error('Force confirmation failed:', error);
      toast.error(error.message || 'Force confirmation failed');
      throw error;
    } finally {
      setLoading(false);
    }
  };





  const value = {
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    updateProfile,
    forceConfirmUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
