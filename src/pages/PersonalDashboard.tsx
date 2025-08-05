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

  const addGoal = () => {
    if (!newGoal.title.trim()) return;

    const goal: StudyGoal = {
      id: Date.now().toString(),
      title: newGoal.title,
      description: newGoal.description,
      target_hours: newGoal.target_hours,
      current_hours: 0,
      deadline: newGoal.deadline,
      status: 'active',
      created_at: new Date().toISOString()
    };

    setGoals(prev => [goal, ...prev]);
    setNewGoal({ title: '', description: '', target_hours: 10, deadline: '' });
    setShowNewGoal(false);
    toast.success('Goal created successfully!');
  };

  const addStudySession = () => {
    if (!newSession.title.trim() || !newSession.subject.trim()) return;

    const session: StudySession = {
      id: Date.now().toString(),
      title: newSession.title,
      subject: newSession.subject,
      duration: newSession.duration,
      notes: newSession.notes,
      completed_at: new Date().toISOString()
    };

    setRecentSessions(prev => [session, ...prev.slice(0, 4)]);

    // Update goal progress if there's a matching goal
    setGoals(prev => prev.map(goal => {
      if (goal.title.toLowerCase().includes(newSession.subject.toLowerCase()) ||
          newSession.subject.toLowerCase().includes(goal.title.toLowerCase())) {
        return {
          ...goal,
          current_hours: goal.current_hours + (newSession.duration / 60)
        };
      }
      return goal;
    }));

    setNewSession({ title: '', subject: '', duration: 60, notes: '' });
    setShowNewSession(false);
    toast.success('Study session recorded!');
  };

  const deleteGoal = (id: string) => {
    setGoals(prev => prev.filter(goal => goal.id !== id));
    toast.success('Goal deleted!');
  };

  const toggleGoalStatus = (id: string) => {
    setGoals(prev => prev.map(goal =>
      goal.id === id
        ? { ...goal, status: goal.status === 'completed' ? 'active' : 'completed' }
        : goal
    ));
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const totalStudyHours = recentSessions.reduce((total, session) => total + session.duration, 0) / 60;
  const completedGoals = goals.filter(goal => goal.status === 'completed').length;
  const progressPercentage = goals.length > 0 ? (completedGoals / goals.length) * 100 : 0;

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
                      <p className="text-2xl font-bold">{goals.filter(g => g.status === 'active').length}</p>
                      <p className="text-sm text-muted-foreground">Active Goals</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-card to-card/80 border-border/50">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-8 w-8 text-primary" />
                    <div>
                      <p className="text-2xl font-bold">{totalStudyHours.toFixed(1)}h</p>
                      <p className="text-sm text-muted-foreground">Study Hours</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-card to-card/80 border-border/50">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-8 w-8 text-primary" />
                    <div>
                      <p className="text-2xl font-bold">{progressPercentage.toFixed(0)}%</p>
                      <p className="text-sm text-muted-foreground">Goals Completed</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Study Goals */}
            <Card className="bg-gradient-to-br from-card to-card/80 border-border/50">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Study Goals</CardTitle>
                    <CardDescription>Track your learning objectives</CardDescription>
                  </div>
                  <Button onClick={() => setShowNewGoal(true)} size="sm" className="bg-gradient-primary">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Goal
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {showNewGoal && (
                  <Card className="border-2 border-dashed border-primary/50">
                    <CardContent className="p-4 space-y-3">
                      <Input
                        placeholder="Goal title..."
                        value={newGoal.title}
                        onChange={(e) => setNewGoal(prev => ({ ...prev, title: e.target.value }))}
                      />
                      <Input
                        placeholder="Description..."
                        value={newGoal.description}
                        onChange={(e) => setNewGoal(prev => ({ ...prev, description: e.target.value }))}
                      />
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <Label>Target Hours</Label>
                          <Input
                            type="number"
                            value={newGoal.target_hours}
                            onChange={(e) => setNewGoal(prev => ({ ...prev, target_hours: parseInt(e.target.value) || 0 }))}
                          />
                        </div>
                        <div>
                          <Label>Deadline</Label>
                          <Input
                            type="date"
                            value={newGoal.deadline}
                            onChange={(e) => setNewGoal(prev => ({ ...prev, deadline: e.target.value }))}
                          />
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button onClick={addGoal} size="sm" className="bg-gradient-primary">
                          Create Goal
                        </Button>
                        <Button onClick={() => setShowNewGoal(false)} variant="outline" size="sm">
                          Cancel
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {goals.length === 0 ? (
                  <div className="text-center py-6">
                    <Target className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground">No goals set yet</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {goals.slice(0, 3).map((goal) => (
                      <div key={goal.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleGoalStatus(goal.id)}
                          className="p-1"
                        >
                          {goal.status === 'completed' ?
                            <CheckCircle className="h-5 w-5 text-green-500" /> :
                            <Circle className="h-5 w-5 text-muted-foreground" />
                          }
                        </Button>
                        <div className="flex-1">
                          <h4 className={`font-medium ${goal.status === 'completed' ? 'line-through text-muted-foreground' : ''}`}>
                            {goal.title}
                          </h4>
                          <div className="flex items-center space-x-2 mt-1">
                            <Progress
                              value={Math.min((goal.current_hours / goal.target_hours) * 100, 100)}
                              className="flex-1 h-2"
                            />
                            <span className="text-xs text-muted-foreground">
                              {goal.current_hours.toFixed(1)}/{goal.target_hours}h
                            </span>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteGoal(goal.id)}
                          className="p-1 text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Study Sessions */}
            <Card className="bg-gradient-to-br from-card to-card/80 border-border/50">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Recent Study Sessions</CardTitle>
                    <CardDescription>Log your learning activities</CardDescription>
                  </div>
                  <Button onClick={() => setShowNewSession(true)} size="sm" className="bg-gradient-primary">
                    <Plus className="h-4 w-4 mr-2" />
                    Log Session
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {showNewSession && (
                  <Card className="border-2 border-dashed border-primary/50">
                    <CardContent className="p-4 space-y-3">
                      <Input
                        placeholder="Session title..."
                        value={newSession.title}
                        onChange={(e) => setNewSession(prev => ({ ...prev, title: e.target.value }))}
                      />
                      <div className="grid grid-cols-2 gap-2">
                        <Input
                          placeholder="Subject/Topic..."
                          value={newSession.subject}
                          onChange={(e) => setNewSession(prev => ({ ...prev, subject: e.target.value }))}
                        />
                        <div>
                          <Label>Duration (minutes)</Label>
                          <Input
                            type="number"
                            value={newSession.duration}
                            onChange={(e) => setNewSession(prev => ({ ...prev, duration: parseInt(e.target.value) || 0 }))}
                          />
                        </div>
                      </div>
                      <Input
                        placeholder="Notes (optional)..."
                        value={newSession.notes}
                        onChange={(e) => setNewSession(prev => ({ ...prev, notes: e.target.value }))}
                      />
                      <div className="flex gap-2">
                        <Button onClick={addStudySession} size="sm" className="bg-gradient-primary">
                          Log Session
                        </Button>
                        <Button onClick={() => setShowNewSession(false)} variant="outline" size="sm">
                          Cancel
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {recentSessions.length === 0 ? (
                  <div className="text-center py-6">
                    <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground">No study sessions logged yet</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {recentSessions.map((session) => (
                      <div key={session.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                        <BookOpen className="h-5 w-5 text-primary" />
                        <div className="flex-1">
                          <h4 className="font-medium">{session.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            {session.subject} • {session.duration} minutes
                          </p>
                          {session.notes && (
                            <p className="text-xs text-muted-foreground mt-1">{session.notes}</p>
                          )}
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {new Date(session.completed_at).toLocaleDateString()}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-gradient-to-br from-card to-card/80 border-border/50">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Access your learning tools</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Button onClick={() => navigate('/resources')} variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                    <BookOpen className="h-6 w-6" />
                    <div className="text-center">
                      <div className="font-medium">Learning Resources</div>
                      <div className="text-xs text-muted-foreground">Manage your study materials</div>
                    </div>
                  </Button>
                  <Button onClick={() => navigate('/groups')} variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                    <User className="h-6 w-6" />
                    <div className="text-center">
                      <div className="font-medium">Study Groups</div>
                      <div className="text-xs text-muted-foreground">Organize your subjects</div>
                    </div>
                  </Button>
                  <Button onClick={() => navigate('/ai')} variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                    <Target className="h-6 w-6" />
                    <div className="text-center">
                      <div className="font-medium">AI Assistant</div>
                      <div className="text-xs text-muted-foreground">Get study help</div>
                    </div>
                  </Button>
                  <Button onClick={() => navigate('/analytics')} variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                    <TrendingUp className="h-6 w-6" />
                    <div className="text-center">
                      <div className="font-medium">Analytics</div>
                      <div className="text-xs text-muted-foreground">Track your progress</div>
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
