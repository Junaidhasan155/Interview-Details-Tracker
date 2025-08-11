import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Target, 
  Clock, 
  Star, 
  Calendar,
  Brain,
  Trophy,
  Users,
  BookOpen,
  Code,
  CheckCircle,
  AlertTriangle,
  Zap,
  Award,
  Eye,
  Download,
  RefreshCw,
  Activity,
  PieChart,
  LineChart
} from 'lucide-react';

interface AnalyticsData {
  studyMetrics: StudyMetrics;
  performanceMetrics: PerformanceMetrics;
  progressMetrics: ProgressMetrics;
  timeMetrics: TimeMetrics;
  skillMetrics: SkillMetrics;
  comparisonMetrics: ComparisonMetrics;
  trends: TrendData[];
  insights: Insight[];
}

interface StudyMetrics {
  totalStudyHours: number;
  studyDaysStreak: number;
  maxStreak: number;
  avgSessionLength: number;
  completedSessions: number;
  totalSessions: number;
  weeklyGoalProgress: number;
  monthlyGoalProgress: number;
}

interface PerformanceMetrics {
  questionsAnswered: number;
  correctAnswers: number;
  averageTime: number;
  improvementRate: number;
  strongestTopics: string[];
  weakestTopics: string[];
  recentPerformance: number;
  overallAccuracy: number;
}

interface ProgressMetrics {
  skillLevels: { [skill: string]: number };
  achievements: { unlocked: number; total: number };
  milestones: { completed: number; total: number };
  courseProgress: { completed: number; total: number };
  certifications: number;
}

interface TimeMetrics {
  peakProductivityHour: number;
  mostActiveDay: string;
  timeByCategory: { [category: string]: number };
  weeklyDistribution: number[];
  monthlyComparison: { current: number; previous: number };
}

interface SkillMetrics {
  technicalSkills: { [skill: string]: { level: number; progress: number } };
  softSkills: { [skill: string]: { level: number; progress: number } };
  languageProficiency: { [language: string]: number };
  frameworkKnowledge: { [framework: string]: number };
}

interface ComparisonMetrics {
  industryAverage: number;
  peerComparison: number;
  topPercentile: number;
  improvementVsAverage: number;
}

interface TrendData {
  date: string;
  value: number;
  category: string;
}

interface Insight {
  type: 'success' | 'warning' | 'info' | 'achievement';
  title: string;
  description: string;
  actionable: boolean;
  recommendation?: string;
}

export function AdvancedAnalyticsDashboard() {
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'quarter' | 'year'>('month');
  const [selectedMetric, setSelectedMetric] = useState<'study' | 'performance' | 'skills' | 'time'>('study');
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Generate mock analytics data based on actual stored data
  useEffect(() => {
    const generateAnalytics = () => {
      setIsLoading(true);

      // Get data from localStorage
      const questions = JSON.parse(localStorage.getItem('interview-questions') || '[]');
      const sessions = JSON.parse(localStorage.getItem('study-sessions') || '[]');
      const flashcards = JSON.parse(localStorage.getItem('flashcards') || '[]');
      const achievements = JSON.parse(localStorage.getItem('achievements') || '[]');
      const challenges = JSON.parse(localStorage.getItem('code-challenges') || '[]');
      const experiences = JSON.parse(localStorage.getItem('interview-experiences') || '[]');

      // Calculate actual metrics
      const totalQuestions = questions.length;
      const practicedQuestions = questions.filter((q: any) => q.isPracticed).length;
      const totalSessions = sessions.length;
      const completedSessions = sessions.filter((s: any) => s.isCompleted).length;
      const totalFlashcards = flashcards.length;
      const reviewedFlashcards = flashcards.filter((f: any) => f.reviewCount > 0).length;
      const totalChallenges = challenges.length;
      const solvedChallenges = challenges.filter((c: any) => c.isCompleted).length;
      const totalExperiences = experiences.length;
      const passedExperiences = experiences.filter((e: any) => e.outcome === 'passed').length;

      // Calculate study hours from sessions
      const totalStudyHours = sessions.reduce((total: number, session: any) => {
        if (session.isCompleted) {
          const start = new Date(`1970-01-01T${session.startTime}`);
          const end = new Date(`1970-01-01T${session.endTime}`);
          const duration = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
          return total + duration;
        }
        return total;
      }, 0);

      // Generate insights based on actual data
      const insights: Insight[] = [];

      if (practicedQuestions / totalQuestions > 0.8) {
        insights.push({
          type: 'success',
          title: 'Excellent Question Practice',
          description: `You've practiced ${((practicedQuestions / totalQuestions) * 100).toFixed(1)}% of your questions!`,
          actionable: false
        });
      }

      if (completedSessions / totalSessions < 0.5 && totalSessions > 0) {
        insights.push({
          type: 'warning',
          title: 'Session Completion Rate Low',
          description: 'Consider scheduling shorter, more manageable study sessions.',
          actionable: true,
          recommendation: 'Try 25-minute focused sessions with 5-minute breaks.'
        });
      }

      if (totalStudyHours > 20) {
        insights.push({
          type: 'achievement',
          title: 'Study Marathon!',
          description: `You've logged ${totalStudyHours.toFixed(1)} hours of study time!`,
          actionable: false
        });
      }

      if (solvedChallenges / totalChallenges > 0.6 && totalChallenges > 0) {
        insights.push({
          type: 'success',
          title: 'Coding Skills Strong',
          description: `${((solvedChallenges / totalChallenges) * 100).toFixed(1)}% challenge completion rate is excellent!`,
          actionable: false
        });
      }

      if (passedExperiences / totalExperiences > 0.7 && totalExperiences > 0) {
        insights.push({
          type: 'success',
          title: 'Interview Success Rate',
          description: `${((passedExperiences / totalExperiences) * 100).toFixed(1)}% interview success rate - keep it up!`,
          actionable: false
        });
      }

      const mockAnalytics: AnalyticsData = {
        studyMetrics: {
          totalStudyHours: Math.max(totalStudyHours, 0),
          studyDaysStreak: Math.min(Math.floor(completedSessions / 2), 15),
          maxStreak: Math.min(Math.floor(completedSessions / 1.5), 25),
          avgSessionLength: totalSessions > 0 ? totalStudyHours * 60 / totalSessions : 0,
          completedSessions,
          totalSessions,
          weeklyGoalProgress: Math.min((totalStudyHours / 10) * 100, 100),
          monthlyGoalProgress: Math.min((totalStudyHours / 40) * 100, 100)
        },
        performanceMetrics: {
          questionsAnswered: practicedQuestions,
          correctAnswers: Math.floor(practicedQuestions * 0.75),
          averageTime: 180 + Math.random() * 120,
          improvementRate: 15 + Math.random() * 10,
          strongestTopics: ['React', 'JavaScript', 'System Design'],
          weakestTopics: ['Algorithms', 'Database Design'],
          recentPerformance: 75 + Math.random() * 20,
          overallAccuracy: totalQuestions > 0 ? (practicedQuestions / totalQuestions) * 100 : 0
        },
        progressMetrics: {
          skillLevels: {
            'Frontend': 75 + Math.random() * 20,
            'Backend': 60 + Math.random() * 25,
            'System Design': 50 + Math.random() * 30,
            'Algorithms': 40 + Math.random() * 35
          },
          achievements: { 
            unlocked: achievements.filter((a: any) => a.isUnlocked).length, 
            total: achievements.length 
          },
          milestones: { completed: Math.floor(totalSessions * 0.6), total: totalSessions || 10 },
          courseProgress: { completed: solvedChallenges, total: totalChallenges || 20 },
          certifications: Math.floor(passedExperiences * 0.8)
        },
        timeMetrics: {
          peakProductivityHour: 14 + Math.floor(Math.random() * 4),
          mostActiveDay: ['Monday', 'Wednesday', 'Saturday'][Math.floor(Math.random() * 3)],
          timeByCategory: {
            'Technical': totalStudyHours * 0.4,
            'Behavioral': totalStudyHours * 0.3,
            'System Design': totalStudyHours * 0.2,
            'Practice': totalStudyHours * 0.1
          },
          weeklyDistribution: Array.from({ length: 7 }, () => Math.random() * 10),
          monthlyComparison: { current: totalStudyHours, previous: totalStudyHours * 0.8 }
        },
        skillMetrics: {
          technicalSkills: {
            'JavaScript': { level: 85, progress: 5 },
            'React': { level: 78, progress: 8 },
            'Node.js': { level: 70, progress: 12 },
            'Python': { level: 65, progress: 15 },
            'System Design': { level: 55, progress: 20 }
          },
          softSkills: {
            'Communication': { level: 80, progress: 3 },
            'Leadership': { level: 70, progress: 10 },
            'Problem Solving': { level: 85, progress: 2 },
            'Teamwork': { level: 75, progress: 8 }
          },
          languageProficiency: {
            'JavaScript': 90,
            'TypeScript': 75,
            'Python': 65,
            'Java': 50
          },
          frameworkKnowledge: {
            'React': 85,
            'Node.js': 70,
            'Express': 65,
            'Next.js': 60
          }
        },
        comparisonMetrics: {
          industryAverage: 65,
          peerComparison: 78,
          topPercentile: 90,
          improvementVsAverage: 15
        },
        trends: [
          { date: '2024-01-01', value: 60, category: 'performance' },
          { date: '2024-01-08', value: 65, category: 'performance' },
          { date: '2024-01-15', value: 70, category: 'performance' },
          { date: '2024-01-22', value: 75, category: 'performance' },
          { date: '2024-01-29', value: 80, category: 'performance' }
        ],
        insights
      };

      setAnalytics(mockAnalytics);
      setIsLoading(false);
    };

    generateAnalytics();
  }, [timeRange]);

  const refreshData = () => {
    setAnalytics(null);
    setIsLoading(true);
    // Trigger re-calculation
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  if (isLoading || !analytics) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <RefreshCw className="h-8 w-8 animate-spin text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Analyzing your data...</p>
          </div>
        </div>
      </div>
    );
  }

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'success': return CheckCircle;
      case 'warning': return AlertTriangle;
      case 'achievement': return Trophy;
      default: return Eye;
    }
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'success': return 'text-green-600 bg-green-50 border-green-200';
      case 'warning': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'achievement': return 'text-purple-600 bg-purple-50 border-purple-200';
      default: return 'text-blue-600 bg-blue-50 border-blue-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Advanced Analytics</h2>
          <p className="text-muted-foreground">Deep insights into your interview preparation progress</p>
        </div>

        <div className="flex gap-2">
          <Select value={timeRange} onValueChange={(value: any) => setTimeRange(value)}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" onClick={refreshData}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>

          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Study Hours</CardTitle>
            <Clock className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-700">
              {analytics.studyMetrics.totalStudyHours.toFixed(1)}h
            </div>
            <p className="text-xs text-blue-600">
              {analytics.timeMetrics.monthlyComparison.current > analytics.timeMetrics.monthlyComparison.previous ? '+' : ''}
              {((analytics.timeMetrics.monthlyComparison.current - analytics.timeMetrics.monthlyComparison.previous) / analytics.timeMetrics.monthlyComparison.previous * 100).toFixed(1)}% vs last month
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Accuracy Rate</CardTitle>
            <Target className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-700">
              {analytics.performanceMetrics.overallAccuracy.toFixed(1)}%
            </div>
            <p className="text-xs text-green-600">
              <TrendingUp className="h-3 w-3 inline mr-1" />
              +{analytics.performanceMetrics.improvementRate.toFixed(1)}% improvement
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
            <Zap className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-700">
              {analytics.studyMetrics.studyDaysStreak} days
            </div>
            <p className="text-xs text-purple-600">
              Max: {analytics.studyMetrics.maxStreak} days
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Skill Level</CardTitle>
            <Brain className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-700">
              {Object.values(analytics.progressMetrics.skillLevels).reduce((a, b) => a + b, 0) / Object.values(analytics.progressMetrics.skillLevels).length}%
            </div>
            <p className="text-xs text-orange-600">
              Average across all skills
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Insights & Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Key Insights & Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {analytics.insights.map((insight, index) => {
              const Icon = getInsightIcon(insight.type);
              return (
                <div 
                  key={index}
                  className={`p-4 rounded-lg border ${getInsightColor(insight.type)}`}
                >
                  <div className="flex items-start gap-3">
                    <Icon className="h-5 w-5 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <h3 className="font-medium mb-1">{insight.title}</h3>
                      <p className="text-sm opacity-90 mb-2">{insight.description}</p>
                      {insight.recommendation && (
                        <p className="text-xs font-medium">
                          💡 {insight.recommendation}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Detailed Analytics Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Study Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Study Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Weekly Goal</span>
                <span className="text-sm text-muted-foreground">
                  {analytics.studyMetrics.weeklyGoalProgress.toFixed(1)}%
                </span>
              </div>
              <Progress value={analytics.studyMetrics.weeklyGoalProgress} className="h-2" />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Monthly Goal</span>
                <span className="text-sm text-muted-foreground">
                  {analytics.studyMetrics.monthlyGoalProgress.toFixed(1)}%
                </span>
              </div>
              <Progress value={analytics.studyMetrics.monthlyGoalProgress} className="h-2" />
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {analytics.studyMetrics.completedSessions}
                </div>
                <div className="text-xs text-muted-foreground">Sessions Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {analytics.studyMetrics.avgSessionLength.toFixed(0)}m
                </div>
                <div className="text-xs text-muted-foreground">Avg Session Length</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Skill Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Skill Development
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(analytics.skillMetrics.technicalSkills).map(([skill, data]) => (
              <div key={skill}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">{skill}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">
                      +{data.progress}%
                    </span>
                    <span className="text-sm font-medium">
                      {data.level.toFixed(0)}%
                    </span>
                  </div>
                </div>
                <Progress value={data.level} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Performance Analytics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Performance Analytics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-muted rounded-lg">
                <div className="text-xl font-bold">
                  {analytics.performanceMetrics.questionsAnswered}
                </div>
                <div className="text-xs text-muted-foreground">Questions Answered</div>
              </div>
              <div className="text-center p-3 bg-muted rounded-lg">
                <div className="text-xl font-bold">
                  {(analytics.performanceMetrics.averageTime / 60).toFixed(1)}m
                </div>
                <div className="text-xs text-muted-foreground">Avg Response Time</div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-2">Strongest Topics</h4>
              <div className="flex flex-wrap gap-1">
                {analytics.performanceMetrics.strongestTopics.map((topic, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {topic}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-2">Areas for Improvement</h4>
              <div className="flex flex-wrap gap-1">
                {analytics.performanceMetrics.weakestTopics.map((topic, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {topic}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Time Analysis */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Time Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="text-sm font-medium mb-3">Study Time by Category</h4>
              {Object.entries(analytics.timeMetrics.timeByCategory).map(([category, hours]) => {
                const percentage = (hours / analytics.studyMetrics.totalStudyHours) * 100;
                return (
                  <div key={category} className="mb-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm">{category}</span>
                      <span className="text-sm text-muted-foreground">
                        {hours.toFixed(1)}h ({percentage.toFixed(0)}%)
                      </span>
                    </div>
                    <Progress value={percentage} className="h-2" />
                  </div>
                );
              })}
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="text-center p-3 bg-muted rounded-lg">
                <div className="text-lg font-bold">
                  {analytics.timeMetrics.peakProductivityHour}:00
                </div>
                <div className="text-xs text-muted-foreground">Peak Hour</div>
              </div>
              <div className="text-center p-3 bg-muted rounded-lg">
                <div className="text-lg font-bold">
                  {analytics.timeMetrics.mostActiveDay}
                </div>
                <div className="text-xs text-muted-foreground">Most Active Day</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Achievements & Milestones */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5" />
            Achievements & Milestones
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-600 mb-2">
                {analytics.progressMetrics.achievements.unlocked}
              </div>
              <div className="text-sm text-muted-foreground mb-2">Achievements Unlocked</div>
              <Progress 
                value={(analytics.progressMetrics.achievements.unlocked / analytics.progressMetrics.achievements.total) * 100} 
                className="h-2" 
              />
              <div className="text-xs text-muted-foreground mt-1">
                {analytics.progressMetrics.achievements.unlocked} / {analytics.progressMetrics.achievements.total}
              </div>
            </div>

            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {analytics.progressMetrics.milestones.completed}
              </div>
              <div className="text-sm text-muted-foreground mb-2">Milestones Reached</div>
              <Progress 
                value={(analytics.progressMetrics.milestones.completed / analytics.progressMetrics.milestones.total) * 100} 
                className="h-2" 
              />
              <div className="text-xs text-muted-foreground mt-1">
                {analytics.progressMetrics.milestones.completed} / {analytics.progressMetrics.milestones.total}
              </div>
            </div>

            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {analytics.progressMetrics.courseProgress.completed}
              </div>
              <div className="text-sm text-muted-foreground mb-2">Challenges Solved</div>
              <Progress 
                value={(analytics.progressMetrics.courseProgress.completed / analytics.progressMetrics.courseProgress.total) * 100} 
                className="h-2" 
              />
              <div className="text-xs text-muted-foreground mt-1">
                {analytics.progressMetrics.courseProgress.completed} / {analytics.progressMetrics.courseProgress.total}
              </div>
            </div>

            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {analytics.progressMetrics.certifications}
              </div>
              <div className="text-sm text-muted-foreground mb-2">Interview Passes</div>
              <div className="flex justify-center">
                <Award className="h-8 w-8 text-purple-600" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Comparison with Peers */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Performance Comparison
          </CardTitle>
          <CardDescription>
            See how you compare with industry averages and peers
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold mb-1">
                {analytics.comparisonMetrics.industryAverage}%
              </div>
              <div className="text-sm text-muted-foreground">Industry Average</div>
            </div>

            <div className="text-center">
              <div className="text-2xl font-bold mb-1 text-blue-600">
                {analytics.comparisonMetrics.peerComparison}%
              </div>
              <div className="text-sm text-muted-foreground">Your Score</div>
              <div className="text-xs text-green-600 mt-1">
                +{analytics.comparisonMetrics.peerComparison - analytics.comparisonMetrics.industryAverage}% above average
              </div>
            </div>

            <div className="text-center">
              <div className="text-2xl font-bold mb-1 text-yellow-600">
                {analytics.comparisonMetrics.topPercentile}%
              </div>
              <div className="text-sm text-muted-foreground">Top 10%</div>
            </div>

            <div className="text-center">
              <div className="text-2xl font-bold mb-1 text-green-600">
                +{analytics.comparisonMetrics.improvementVsAverage}%
              </div>
              <div className="text-sm text-muted-foreground">Your Improvement</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
