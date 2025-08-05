import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  User,
  Settings,
  BookOpen,
  Target,
  TrendingUp,
  Calendar,
  LogOut,
  Edit,
  Save,
  X,
  Plus,
  Clock,
  CheckCircle,
  Circle,
  Trash2
} from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  role?: string;
  class?: string;
  school?: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

interface StudyGoal {
  id: string;
  title: string;
  description: string;
  target_hours: number;
  current_hours: number;
  deadline: string;
  status: 'active' | 'completed' | 'paused';
  created_at: string;
}

interface StudySession {
  id: string;
  title: string;
  subject: string;
  duration: number; // minutes
  notes?: string;
  completed_at: string;
}

export function PersonalDashboard() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    full_name: '',
    role: '',
    class: '',
    school: ''
  });
  const [loading, setLoading] = useState(true);
  const [goals, setGoals] = useState<StudyGoal[]>([]);
  const [recentSessions, setRecentSessions] = useState<StudySession[]>([]);
  const [showNewGoal, setShowNewGoal] = useState(false);
  const [showNewSession, setShowNewSession] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    target_hours: 10,
    deadline: ''
  });
  const [newSession, setNewSession] = useState({
    title: '',
    subject: '',
    duration: 60,
    notes: ''
  });

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      // First try to get from profiles table
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .single();

      if (data) {
        setProfile(data);
        setEditForm({
          full_name: data.full_name || '',
          role: data.role || '',
          class: data.class || '',
          school: data.school || ''
        });
      } else {
        // If no profile exists, create one from user metadata
        const userProfile = {
          id: user?.id || '',
          email: user?.email || '',
          full_name: user?.user_metadata?.full_name || '',
          role: user?.user_metadata?.current_position || '',
          class: user?.user_metadata?.experience_years || '',
          school: user?.user_metadata?.industry || '',
          avatar_url: user?.user_metadata?.avatar_url || '',
          created_at: user?.created_at || new Date().toISOString(),
          updated_at: new Date().toISOString()
        };

        setProfile(userProfile);
        setEditForm({
          full_name: userProfile.full_name,
          role: userProfile.role,
          class: userProfile.class,
          school: userProfile.school
        });
      }
    } catch (error: any) {
      // If profiles table doesn't exist, fall back to user metadata
      const userProfile = {
        id: user?.id || '',
        email: user?.email || '',
        full_name: user?.user_metadata?.full_name || '',
        role: user?.user_metadata?.current_position || '',
        class: user?.user_metadata?.experience_years || '',
        school: user?.user_metadata?.industry || '',
        avatar_url: user?.user_metadata?.avatar_url || '',
        created_at: user?.created_at || new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      setProfile(userProfile);
      setEditForm({
        full_name: userProfile.full_name,
        role: userProfile.role,
        class: userProfile.class,
        school: userProfile.school
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async () => {
    try {
      setLoading(true);

      // Try to update or insert profile
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user?.id,
          email: user?.email,
          ...editForm,
          updated_at: new Date().toISOString()
        });

      if (error && !error.message.includes('relation "profiles" does not exist')) {
        throw error;
      }

      // Update local state regardless of database result
      setProfile(prev => prev ? { ...prev, ...editForm, updated_at: new Date().toISOString() } : null);
      setIsEditing(false);
      toast.success('Profile updated successfully!');
    } catch (error: any) {
      // Still update local state if database fails
      setProfile(prev => prev ? { ...prev, ...editForm, updated_at: new Date().toISOString() } : null);
      setIsEditing(false);
      toast.success('Profile updated locally!');
    } finally {
      setLoading(false);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Avatar className="h-10 w-10">
                <AvatarImage src={profile?.avatar_url} />
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {profile?.full_name ? getInitials(profile.full_name) : 'U'}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-xl font-semibold">Welcome back, {profile?.full_name || 'User'}!</h1>
                <p className="text-sm text-muted-foreground">{profile?.email}</p>
              </div>
            </div>
            <Button
              variant="outline"
              onClick={signOut}
              className="flex items-center space-x-2"
            >
              <LogOut className="h-4 w-4" />
              <span>Sign Out</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <Card className="bg-gradient-to-br from-card to-card/80 border-border/50">
              <CardHeader className="text-center">
                <Avatar className="h-24 w-24 mx-auto mb-4">
                  <AvatarImage src={profile?.avatar_url} />
                  <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                    {profile?.full_name ? getInitials(profile.full_name) : 'U'}
                  </AvatarFallback>
                </Avatar>
                <CardTitle className="flex items-center justify-center space-x-2">
                  <span>{profile?.full_name || 'Anonymous User'}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsEditing(!isEditing)}
                    className="p-1 h-auto"
                  >
                    {isEditing ? <X className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
                  </Button>
                </CardTitle>
                <CardDescription>{profile?.email}</CardDescription>
                {profile?.role && (
                  <Badge variant="secondary" className="w-fit mx-auto">
                    {profile.role}
                  </Badge>
                )}
              </CardHeader>
              <CardContent className="space-y-4">
                {isEditing ? (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="full_name">Full Name</Label>
                      <Input
                        id="full_name"
                        value={editForm.full_name}
                        onChange={(e) => setEditForm(prev => ({ ...prev, full_name: e.target.value }))}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="role">Role</Label>
                      <Select value={editForm.role} onValueChange={(value) => setEditForm(prev => ({ ...prev, role: value }))}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="student">Student</SelectItem>
                          <SelectItem value="teacher">Teacher</SelectItem>
                          <SelectItem value="professional">Professional</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="class">Class/Grade</Label>
                      <Input
                        id="class"
                        value={editForm.class}
                        onChange={(e) => setEditForm(prev => ({ ...prev, class: e.target.value }))}
                        placeholder="12th Grade"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="school">School/Institution</Label>
                      <Input
                        id="school"
                        value={editForm.school}
                        onChange={(e) => setEditForm(prev => ({ ...prev, school: e.target.value }))}
                        placeholder="Your school or institution"
                        className="mt-1"
                      />
                    </div>
                    <Button 
                      onClick={handleUpdateProfile} 
                      className="w-full bg-gradient-primary hover:opacity-90"
                      disabled={loading}
                    >
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {profile?.class && (
                      <div className="flex items-center space-x-2">
                        <BookOpen className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{profile.class}</span>
                      </div>
                    )}
                    {profile?.school && (
                      <div className="flex items-center space-x-2">
                        <Settings className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{profile.school}</span>
                      </div>
                    )}
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        Joined {new Date(profile?.created_at || '').toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Dashboard Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-gradient-to-br from-card to-card/80 border-border/50">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <Target className="h-8 w-8 text-primary" />
                    <div>
                      <p className="text-2xl font-bold">0</p>
                      <p className="text-sm text-muted-foreground">Active Goals</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-card to-card/80 border-border/50">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <BookOpen className="h-8 w-8 text-primary" />
                    <div>
                      <p className="text-2xl font-bold">0</p>
                      <p className="text-sm text-muted-foreground">Study Sessions</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-card to-card/80 border-border/50">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-8 w-8 text-primary" />
                    <div>
                      <p className="text-2xl font-bold">0%</p>
                      <p className="text-sm text-muted-foreground">Progress</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card className="bg-gradient-to-br from-card to-card/80 border-border/50">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your latest learning activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <User className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Welcome to Your Dashboard!</h3>
                  <p className="text-muted-foreground mb-4">
                    Start your learning journey by creating your first study session or setting a goal.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button className="bg-gradient-primary hover:opacity-90">
                      <Target className="mr-2 h-4 w-4" />
                      Set a Goal
                    </Button>
                    <Button variant="outline">
                      <BookOpen className="mr-2 h-4 w-4" />
                      Start Learning
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
