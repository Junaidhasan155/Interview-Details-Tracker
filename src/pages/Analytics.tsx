import { useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Resource } from "@/types/resource"
import { Group } from "@/types/group"
import { 
  BarChart3, 
  Clock, 
  Target, 
  TrendingUp, 
  Calendar,
  Award,
  Activity,
  CheckCircle
} from "lucide-react"
import { format, subDays, startOfWeek, endOfWeek } from "date-fns"

interface AnalyticsProps {
  resources: Resource[]
  groups: Group[]
}

export function Analytics({ resources, groups }: AnalyticsProps) {
  const analytics = useMemo(() => {
    const total = resources.length
    const completed = resources.filter(r => r.status === 'completed').length
    const inProgress = resources.filter(r => r.status === 'in-progress').length
    const notStarted = resources.filter(r => r.status === 'not-started').length
    
    const totalTimeSpent = resources.reduce((acc, r) => acc + (r.timeSpent || 0), 0)
    const averageTimePerResource = total > 0 ? totalTimeSpent / total : 0
    
    const completionRate = total > 0 ? (completed / total) * 100 : 0
    
    const highPriorityResources = resources.filter(r => r.priority === 'high')
    const highPriorityCompleted = highPriorityResources.filter(r => r.status === 'completed').length
    
    const thisWeekStart = startOfWeek(new Date())
    const thisWeekEnd = endOfWeek(new Date())
    const resourcesCompletedThisWeek = resources.filter(r => 
      r.status === 'completed' && 
      r.updatedAt >= thisWeekStart && 
      r.updatedAt <= thisWeekEnd
    ).length
    
    const overdue = resources.filter(r => 
      r.dueDate && 
      new Date() > r.dueDate && 
      r.status !== 'completed'
    ).length
    
    const typeDistribution = resources.reduce((acc, r) => {
      acc[r.type] = (acc[r.type] || 0) + 1
      return acc
    }, {} as Record<string, number>)
    
    const tagFrequency = resources.reduce((acc, r) => {
      r.tags.forEach(tag => {
        acc[tag] = (acc[tag] || 0) + 1
      })
      return acc
    }, {} as Record<string, number>)
    
    const topTags = Object.entries(tagFrequency)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
    
    const recentActivity = resources
      .filter(r => r.lastAccessedAt)
      .sort((a, b) => (b.lastAccessedAt?.getTime() || 0) - (a.lastAccessedAt?.getTime() || 0))
      .slice(0, 5)

    const groupStats = groups.map(group => {
      const groupResources = resources.filter(r => r.groupId === group.id)
      const groupCompleted = groupResources.filter(r => r.status === 'completed').length
      const groupProgress = groupResources.length > 0 ? (groupCompleted / groupResources.length) * 100 : 0
      return {
        ...group,
        resourceCount: groupResources.length,
        completedCount: groupCompleted,
        progress: groupProgress
      }
    }).sort((a, b) => b.progress - a.progress)
    
    return {
      total,
      completed,
      inProgress,
      notStarted,
      totalTimeSpent,
      averageTimePerResource,
      completionRate,
      highPriorityResources: highPriorityResources.length,
      highPriorityCompleted,
      resourcesCompletedThisWeek,
      overdue,
      typeDistribution,
      topTags,
      recentActivity,
      groupStats
    }
  }, [resources, groups])

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
        <p className="text-muted-foreground">
          Track your learning progress and productivity insights
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Resources</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.total}</div>
            <p className="text-xs text-muted-foreground">
              {analytics.completed} completed
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.completionRate.toFixed(1)}%</div>
            <Progress value={analytics.completionRate} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Time Invested</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatTime(analytics.totalTimeSpent)}</div>
            <p className="text-xs text-muted-foreground">
              Avg: {formatTime(Math.round(analytics.averageTimePerResource))} per resource
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Week</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.resourcesCompletedThisWeek}</div>
            <p className="text-xs text-muted-foreground">
              Resources completed
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Progress Breakdown */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Progress Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Completed</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm">{analytics.completed}</span>
                  <Badge variant="success">{((analytics.completed / analytics.total) * 100).toFixed(0)}%</Badge>
                </div>
              </div>
              <Progress value={(analytics.completed / analytics.total) * 100} className="h-2" />
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">In Progress</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm">{analytics.inProgress}</span>
                  <Badge variant="warning">{((analytics.inProgress / analytics.total) * 100).toFixed(0)}%</Badge>
                </div>
              </div>
              <Progress value={(analytics.inProgress / analytics.total) * 100} className="h-2" />
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Not Started</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm">{analytics.notStarted}</span>
                  <Badge variant="outline">{((analytics.notStarted / analytics.total) * 100).toFixed(0)}%</Badge>
                </div>
              </div>
              <Progress value={(analytics.notStarted / analytics.total) * 100} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Top Groups Performance */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              Group Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analytics.groupStats.slice(0, 5).map((group, index) => (
                <div key={group.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-sm font-medium">#{index + 1}</div>
                    <div>
                      <div className="font-medium text-sm">{group.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {group.completedCount}/{group.resourceCount} resources
                      </div>
                    </div>
                  </div>
                  <Badge variant={group.progress === 100 ? "success" : group.progress > 50 ? "warning" : "outline"}>
                    {group.progress.toFixed(0)}%
                  </Badge>
                </div>
              ))}
              {analytics.groupStats.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No groups created yet
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Top Tags */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              Popular Tags
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {analytics.topTags.map(([tag, count]) => (
                <div key={tag} className="flex items-center justify-between">
                  <Badge variant="secondary">{tag}</Badge>
                  <span className="text-sm text-muted-foreground">{count} resources</span>
                </div>
              ))}
              {analytics.topTags.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No tags added yet
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Resource Types */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Resource Types
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(analytics.typeDistribution).map(([type, count]) => (
                <div key={type} className="flex items-center justify-between">
                  <span className="text-sm font-medium capitalize">{type}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{count}</span>
                    <div className="w-20 bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full"
                        style={{ width: `${(count / analytics.total) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alerts */}
      {(analytics.overdue > 0 || analytics.highPriorityResources > analytics.highPriorityCompleted) && (
        <Card className="shadow-card border-warning/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-warning">
              <Calendar className="h-5 w-5" />
              Attention Required
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {analytics.overdue > 0 && (
              <p className="text-sm">
                <span className="font-medium text-destructive">{analytics.overdue}</span> overdue resources need attention
              </p>
            )}
            {analytics.highPriorityResources > analytics.highPriorityCompleted && (
              <p className="text-sm">
                <span className="font-medium text-warning">
                  {analytics.highPriorityResources - analytics.highPriorityCompleted}
                </span> high-priority resources are incomplete
              </p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}