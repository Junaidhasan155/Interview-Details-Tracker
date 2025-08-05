import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AIAssistant } from '@/components/AIAssistant';
import { AISettings } from '@/components/AISettings';
import { SmartResourceCard } from '@/components/SmartResourceCard';
import { Resource } from '@/types/resource';
import { Group } from '@/types/group';
import { EnhancedAIService } from '@/services/EnhancedAIService';
import { 
  Brain, 
  Settings, 
  Sparkles, 
  FileText, 
  Lightbulb, 
  Target, 
  TrendingUp,
  Zap,
  Calendar,
  Star,
  ChevronRight,
  BookOpen
} from 'lucide-react';

interface AIDashboardProps {
  resources: Resource[];
  groups: Group[];
  onEditResource: (id: string, resource: Omit<Resource, 'id' | 'createdAt' | 'updatedAt'>) => void;
}

export function AIDashboard({ resources, groups, onEditResource }: AIDashboardProps) {
  const [activeTab, setActiveTab] = useState('insights');
  const [studyPlan, setStudyPlan] = useState<any>(null)
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    generateInsights()
  }, [resources, groups])

  const generateInsights = async () => {
    setLoading(true)
    try {
      const aiSuggestions = await EnhancedAIService.generateResourceSuggestions(resources, groups)
      const personalizedPlan = EnhancedAIService.generateStudyPlan(resources, groups)
      
      setSuggestions(aiSuggestions)
      setStudyPlan(personalizedPlan)
    } catch (error) {
      console.error('Error generating insights:', error)
    } finally {
      setLoading(false)
    }
  }

  // Quick stats
  const completedCount = resources.filter(r => r.status === 'completed').length
  const inProgressCount = resources.filter(r => r.status === 'in-progress').length
  const highPriorityCount = resources.filter(r => r.priority === 'high').length
  const completionRate = resources.length > 0 ? (completedCount / resources.length) * 100 : 0

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <div className="p-3 rounded-full bg-gradient-primary">
            <Sparkles className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">AI-Powered Study Hub</h1>
            <p className="text-muted-foreground">
              Supercharge your interview preparation with artificial intelligence
            </p>
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="insights">
            <TrendingUp className="h-4 w-4 mr-2" />
            AI Insights
          </TabsTrigger>
          <TabsTrigger value="assistant">
            <Brain className="h-4 w-4 mr-2" />
            AI Assistant
          </TabsTrigger>
          <TabsTrigger value="resources">
            <FileText className="h-4 w-4 mr-2" />
            Smart Resources
          </TabsTrigger>
          <TabsTrigger value="settings">
            <Settings className="h-4 w-4 mr-2" />
            AI Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="insights">
          {loading ? (
            <div className="text-center py-12">
              <Sparkles className="h-12 w-12 mx-auto mb-4 animate-spin text-primary" />
              <p>Analyzing your study patterns...</p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="shadow-card">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <Target className="h-8 w-8 text-primary" />
                      <div>
                        <p className="text-2xl font-bold">{resources.length}</p>
                        <p className="text-sm text-muted-foreground">Total Resources</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-card">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <TrendingUp className="h-8 w-8 text-success" />
                      <div>
                        <p className="text-2xl font-bold">{completionRate.toFixed(1)}%</p>
                        <p className="text-sm text-muted-foreground">Completion Rate</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-card">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <Brain className="h-8 w-8 text-info" />
                      <div>
                        <p className="text-2xl font-bold">{inProgressCount}</p>
                        <p className="text-sm text-muted-foreground">In Progress</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-card">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <Star className="h-8 w-8 text-warning" />
                      <div>
                        <p className="text-2xl font-bold">{highPriorityCount}</p>
                        <p className="text-sm text-muted-foreground">High Priority</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Enhanced AI Features */}
              <div className="grid gap-6 md:grid-cols-2">
                {/* Resource Suggestions */}
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="h-5 w-5 text-info" />
                      Smart Suggestions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {suggestions.map((suggestion, index) => (
                        <div key={index} className="flex items-center gap-2 p-2 rounded bg-accent/30">
                          <BookOpen className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{suggestion}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Study Plan */}
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-success" />
                      Personalized Study Plan
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {studyPlan && (
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium text-sm mb-2">Daily Goals</h4>
                          <div className="space-y-1">
                            {studyPlan.dailyGoals.map((goal: string, index: number) => (
                              <div key={index} className="flex items-center gap-2 text-xs">
                                <Target className="h-3 w-3 text-primary" />
                                <span>{goal}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-medium text-sm mb-2">Weekly Milestones</h4>
                          <div className="space-y-1">
                            {studyPlan.weeklyMilestones.map((milestone: string, index: number) => (
                              <div key={index} className="flex items-center gap-2 text-xs">
                                <Star className="h-3 w-3 text-warning" />
                                <span>{milestone}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* AI Recommendations */}
              {studyPlan && (
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Lightbulb className="h-5 w-5 text-warning" />
                      AI Recommendations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {studyPlan.recommendations.map((rec: string, index: number) => (
                        <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-accent/50">
                          <ChevronRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                          <p className="text-sm">{rec}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </TabsContent>

        <TabsContent value="assistant">
          <AIAssistant />
        </TabsContent>

        <TabsContent value="resources">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((resource) => (
              <SmartResourceCard
                key={resource.id}
                resource={resource}
                onUpdate={onEditResource}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="settings">
          <AISettings />
        </TabsContent>
      </Tabs>
    </div>
  );
}