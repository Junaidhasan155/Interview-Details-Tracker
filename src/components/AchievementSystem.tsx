import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import { Trophy, Star, Target, BookOpen, Calendar, Brain, Code, Users, CheckCircle, Lock, TrendingUp } from 'lucide-react';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'study' | 'practice' | 'consistency' | 'mastery' | 'social';
  tier: 'bronze' | 'silver' | 'gold' | 'platinum';
  requirement: {
    type: 'count' | 'streak' | 'percentage' | 'time';
    target: number;
    metric: string;
  };
  isUnlocked: boolean;
  unlockedAt?: string;
  progress: number;
  isSecret?: boolean;
}

const ACHIEVEMENT_DEFINITIONS: Omit<Achievement, 'isUnlocked' | 'unlockedAt' | 'progress'>[] = [
  // Study Achievements
  {
    id: 'first-question',
    title: 'First Steps',
    description: 'Add your first interview question to the Question Bank',
    icon: '🎯',
    category: 'study',
    tier: 'bronze',
    requirement: { type: 'count', target: 1, metric: 'questions_added' }
  },
  {
    id: 'question-collector',
    title: 'Question Collector',
    description: 'Add 25 interview questions to your Question Bank',
    icon: '📚',
    category: 'study',
    tier: 'silver',
    requirement: { type: 'count', target: 25, metric: 'questions_added' }
  },
  {
    id: 'question-master',
    title: 'Question Master',
    description: 'Add 100 interview questions to your Question Bank',
    icon: '🎓',
    category: 'study',
    tier: 'gold',
    requirement: { type: 'count', target: 100, metric: 'questions_added' }
  },
  
  // Practice Achievements
  {
    id: 'first-practice',
    title: 'Getting Started',
    description: 'Complete your first practice session',
    icon: '💪',
    category: 'practice',
    tier: 'bronze',
    requirement: { type: 'count', target: 1, metric: 'questions_practiced' }
  },
  {
    id: 'practice-warrior',
    title: 'Practice Warrior',
    description: 'Practice 50 interview questions',
    icon: '⚔️',
    category: 'practice',
    tier: 'silver',
    requirement: { type: 'count', target: 50, metric: 'questions_practiced' }
  },
  {
    id: 'practice-legend',
    title: 'Practice Legend',
    description: 'Practice 200 interview questions',
    icon: '🏆',
    category: 'practice',
    tier: 'gold',
    requirement: { type: 'count', target: 200, metric: 'questions_practiced' }
  },
  
  // Consistency Achievements
  {
    id: 'weekly-warrior',
    title: 'Weekly Warrior',
    description: 'Study for 7 consecutive days',
    icon: '🔥',
    category: 'consistency',
    tier: 'bronze',
    requirement: { type: 'streak', target: 7, metric: 'study_days' }
  },
  {
    id: 'monthly-master',
    title: 'Monthly Master',
    description: 'Study for 30 consecutive days',
    icon: '📅',
    category: 'consistency',
    tier: 'silver',
    requirement: { type: 'streak', target: 30, metric: 'study_days' }
  },
  {
    id: 'habit-hero',
    title: 'Habit Hero',
    description: 'Study for 100 consecutive days',
    icon: '🌟',
    category: 'consistency',
    tier: 'gold',
    requirement: { type: 'streak', target: 100, metric: 'study_days' }
  },
  
  // Mastery Achievements
  {
    id: 'perfect-score',
    title: 'Perfect Score',
    description: 'Get 100% completion rate on practice sessions',
    icon: '💯',
    category: 'mastery',
    tier: 'silver',
    requirement: { type: 'percentage', target: 100, metric: 'completion_rate' }
  },
  {
    id: 'time-master',
    title: 'Time Master',
    description: 'Spend 50 hours studying',
    icon: '⏰',
    category: 'mastery',
    tier: 'gold',
    requirement: { type: 'time', target: 50, metric: 'study_hours' }
  },
  
  // Study Calendar Achievements
  {
    id: 'scheduler',
    title: 'The Scheduler',
    description: 'Schedule your first study session',
    icon: '📋',
    category: 'study',
    tier: 'bronze',
    requirement: { type: 'count', target: 1, metric: 'sessions_scheduled' }
  },
  {
    id: 'planner',
    title: 'Master Planner',
    description: 'Schedule 20 study sessions',
    icon: '🗓️',
    category: 'study',
    tier: 'silver',
    requirement: { type: 'count', target: 20, metric: 'sessions_scheduled' }
  },
  
  // Secret Achievements
  {
    id: 'night-owl',
    title: 'Night Owl',
    description: 'Study after midnight',
    icon: '🦉',
    category: 'consistency',
    tier: 'bronze',
    requirement: { type: 'count', target: 1, metric: 'night_sessions' },
    isSecret: true
  },
  {
    id: 'early-bird',
    title: 'Early Bird',
    description: 'Study before 6 AM',
    icon: '🐦',
    category: 'consistency',
    tier: 'bronze',
    requirement: { type: 'count', target: 1, metric: 'early_sessions' },
    isSecret: true
  }
];

interface UserStats {
  questions_added: number;
  questions_practiced: number;
  study_days_streak: number;
  completion_rate: number;
  study_hours: number;
  sessions_scheduled: number;
  night_sessions: number;
  early_sessions: number;
  total_study_days: number;
}

export function AchievementSystem() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [userStats, setUserStats] = useState<UserStats>({
    questions_added: 0,
    questions_practiced: 0,
    study_days_streak: 0,
    completion_rate: 0,
    study_hours: 0,
    sessions_scheduled: 0,
    night_sessions: 0,
    early_sessions: 0,
    total_study_days: 0
  });
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showSecrets, setShowSecrets] = useState(false);

  // Load achievements and stats from localStorage
  useEffect(() => {
    const savedAchievements = localStorage.getItem('achievements');
    const savedStats = localStorage.getItem('user-stats');

    if (savedAchievements) {
      setAchievements(JSON.parse(savedAchievements));
    } else {
      // Initialize achievements
      const initialAchievements = ACHIEVEMENT_DEFINITIONS.map(def => ({
        ...def,
        isUnlocked: false,
        progress: 0
      }));
      setAchievements(initialAchievements);
      localStorage.setItem('achievements', JSON.stringify(initialAchievements));
    }

    if (savedStats) {
      setUserStats(JSON.parse(savedStats));
    }

    // Load actual stats from other localStorage items
    updateStatsFromStorage();
  }, []);

  // Save achievements when they change
  useEffect(() => {
    if (achievements.length > 0) {
      localStorage.setItem('achievements', JSON.stringify(achievements));
    }
  }, [achievements]);

  // Update stats from various localStorage sources
  const updateStatsFromStorage = () => {
    const questions = JSON.parse(localStorage.getItem('interview-questions') || '[]');
    const sessions = JSON.parse(localStorage.getItem('study-sessions') || '[]');
    
    const newStats: UserStats = {
      questions_added: questions.length,
      questions_practiced: questions.filter((q: any) => q.isPracticed).length,
      study_days_streak: calculateStreak(sessions),
      completion_rate: calculateCompletionRate(questions),
      study_hours: calculateStudyHours(sessions),
      sessions_scheduled: sessions.length,
      night_sessions: sessions.filter((s: any) => isNightSession(s)).length,
      early_sessions: sessions.filter((s: any) => isEarlySession(s)).length,
      total_study_days: calculateTotalStudyDays(sessions)
    };

    setUserStats(newStats);
    localStorage.setItem('user-stats', JSON.stringify(newStats));

    // Check for new achievements
    checkAchievements(newStats);
  };

  const calculateStreak = (sessions: any[]): number => {
    if (sessions.length === 0) return 0;
    
    const completedSessions = sessions
      .filter(s => s.isCompleted)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    if (completedSessions.length === 0) return 0;
    
    let streak = 0;
    const today = new Date();
    let currentDate = new Date(today);
    
    for (const session of completedSessions) {
      const sessionDate = new Date(session.date);
      const daysDiff = Math.floor((currentDate.getTime() - sessionDate.getTime()) / (1000 * 60 * 60 * 24));
      
      if (daysDiff === streak) {
        streak++;
        currentDate = new Date(sessionDate);
      } else if (daysDiff === streak + 1) {
        streak++;
        currentDate = new Date(sessionDate);
      } else {
        break;
      }
    }
    
    return streak;
  };

  const calculateCompletionRate = (questions: any[]): number => {
    if (questions.length === 0) return 0;
    const practiced = questions.filter(q => q.isPracticed).length;
    return Math.round((practiced / questions.length) * 100);
  };

  const calculateStudyHours = (sessions: any[]): number => {
    return sessions
      .filter(s => s.isCompleted)
      .reduce((total, session) => {
        const start = new Date(`1970-01-01T${session.startTime}`);
        const end = new Date(`1970-01-01T${session.endTime}`);
        const duration = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
        return total + duration;
      }, 0);
  };

  const calculateTotalStudyDays = (sessions: any[]): number => {
    const uniqueDates = new Set(
      sessions
        .filter(s => s.isCompleted)
        .map(s => s.date)
    );
    return uniqueDates.size;
  };

  const isNightSession = (session: any): boolean => {
    if (!session.isCompleted) return false;
    const hour = parseInt(session.startTime.split(':')[0]);
    return hour >= 22 || hour <= 5;
  };

  const isEarlySession = (session: any): boolean => {
    if (!session.isCompleted) return false;
    const hour = parseInt(session.startTime.split(':')[0]);
    return hour >= 5 && hour <= 6;
  };

  const checkAchievements = (stats: UserStats) => {
    setAchievements(prev => prev.map(achievement => {
      const statValue = stats[achievement.requirement.metric as keyof UserStats] as number;
      const progress = Math.min(100, (statValue / achievement.requirement.target) * 100);
      
      const wasUnlocked = achievement.isUnlocked;
      const isNowUnlocked = statValue >= achievement.requirement.target;
      
      if (!wasUnlocked && isNowUnlocked) {
        // Achievement unlocked!
        toast.success(`🏆 Achievement Unlocked: ${achievement.title}!`, {
          description: achievement.description,
          duration: 5000
        });
      }
      
      return {
        ...achievement,
        progress,
        isUnlocked: isNowUnlocked,
        unlockedAt: isNowUnlocked && !wasUnlocked ? new Date().toISOString() : achievement.unlockedAt
      };
    }));
  };

  // Refresh stats when component is focused
  useEffect(() => {
    const handleFocus = () => updateStatsFromStorage();
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'bronze': return 'bg-amber-600';
      case 'silver': return 'bg-gray-400';
      case 'gold': return 'bg-yellow-500';
      case 'platinum': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'study': return BookOpen;
      case 'practice': return Target;
      case 'consistency': return Calendar;
      case 'mastery': return Trophy;
      case 'social': return Users;
      default: return Star;
    }
  };

  const filteredAchievements = achievements.filter(achievement => {
    if (!showSecrets && achievement.isSecret && !achievement.isUnlocked) return false;
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'unlocked') return achievement.isUnlocked;
    return achievement.category === selectedCategory;
  });

  const unlockedCount = achievements.filter(a => a.isUnlocked).length;
  const totalCount = achievements.length;
  const overallProgress = totalCount > 0 ? (unlockedCount / totalCount) * 100 : 0;

  const categories = [
    { id: 'all', label: 'All', icon: Star },
    { id: 'unlocked', label: 'Unlocked', icon: CheckCircle },
    { id: 'study', label: 'Study', icon: BookOpen },
    { id: 'practice', label: 'Practice', icon: Target },
    { id: 'consistency', label: 'Consistency', icon: Calendar },
    { id: 'mastery', label: 'Mastery', icon: Trophy }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Achievements</h2>
          <p className="text-muted-foreground">Track your interview preparation milestones</p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowSecrets(!showSecrets)}
        >
          {showSecrets ? <Lock className="h-4 w-4 mr-2" /> : <Star className="h-4 w-4 mr-2" />}
          {showSecrets ? 'Hide Secrets' : 'Show Secrets'}
        </Button>
      </div>

      {/* Overall Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-500" />
            Overall Progress
          </CardTitle>
          <CardDescription>
            {unlockedCount} of {totalCount} achievements unlocked
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span>Achievement Progress</span>
              <span>{overallProgress.toFixed(1)}%</span>
            </div>
            <Progress value={overallProgress} className="h-2" />
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{userStats.questions_added}</div>
                <div className="text-xs text-muted-foreground">Questions Added</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{userStats.questions_practiced}</div>
                <div className="text-xs text-muted-foreground">Questions Practiced</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{userStats.study_days_streak}</div>
                <div className="text-xs text-muted-foreground">Day Streak</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{userStats.study_hours.toFixed(1)}h</div>
                <div className="text-xs text-muted-foreground">Study Hours</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => {
          const Icon = category.icon;
          const count = category.id === 'all' 
            ? achievements.length 
            : category.id === 'unlocked'
            ? unlockedCount
            : achievements.filter(a => a.category === category.id).length;
            
          return (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
              className="flex items-center gap-2"
            >
              <Icon className="h-4 w-4" />
              {category.label}
              <Badge variant="secondary" className="ml-1 text-xs">
                {count}
              </Badge>
            </Button>
          );
        })}
      </div>

      {/* Achievements Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAchievements.map((achievement) => {
          const CategoryIcon = getCategoryIcon(achievement.category);
          
          return (
            <Card 
              key={achievement.id} 
              className={`transition-all duration-200 hover:shadow-md ${
                achievement.isUnlocked 
                  ? 'border-green-500 bg-green-50 dark:bg-green-950' 
                  : achievement.isSecret && !showSecrets
                  ? 'border-dashed opacity-50'
                  : ''
              }`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <div className="text-2xl">{achievement.icon}</div>
                    <div className="flex-1">
                      <CardTitle className="text-base flex items-center gap-2">
                        {achievement.isSecret && !achievement.isUnlocked ? '???' : achievement.title}
                        {achievement.isUnlocked && (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        )}
                      </CardTitle>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${getTierColor(achievement.tier)} text-white border-none`}
                    >
                      {achievement.tier}
                    </Badge>
                    <div className="flex items-center gap-1">
                      <CategoryIcon className="h-3 w-3 text-muted-foreground" />
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">
                  {achievement.isSecret && !achievement.isUnlocked 
                    ? 'Hidden achievement - keep exploring to unlock!' 
                    : achievement.description
                  }
                </p>
                
                {!achievement.isUnlocked && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span>Progress</span>
                      <span>{achievement.progress.toFixed(0)}%</span>
                    </div>
                    <Progress value={achievement.progress} className="h-1" />
                    <div className="text-xs text-muted-foreground">
                      {Math.floor((achievement.progress / 100) * achievement.requirement.target)} / {achievement.requirement.target} {achievement.requirement.metric.replace('_', ' ')}
                    </div>
                  </div>
                )}

                {achievement.isUnlocked && achievement.unlockedAt && (
                  <div className="text-xs text-green-600 mt-2">
                    Unlocked {new Date(achievement.unlockedAt).toLocaleDateString()}
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredAchievements.length === 0 && (
        <div className="text-center py-12">
          <Trophy className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No achievements found</h3>
          <p className="text-muted-foreground">
            Try adjusting your filters or start studying to unlock achievements!
          </p>
        </div>
      )}

      {/* Refresh Button */}
      <div className="flex justify-center">
        <Button 
          variant="outline" 
          onClick={updateStatsFromStorage}
          className="flex items-center gap-2"
        >
          <TrendingUp className="h-4 w-4" />
          Refresh Progress
        </Button>
      </div>
    </div>
  );
}
