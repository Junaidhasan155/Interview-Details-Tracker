import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Group } from "@/types/group"
import { Resource } from "@/types/resource"
import { 
  Edit, 
  Trash2, 
  Calendar, 
  Users, 
  Target, 
  Clock 
} from "lucide-react"
import { format } from "date-fns"

interface GroupCardProps {
  group: Group
  resources: Resource[]
  onEdit: (group: Group) => void
  onDelete: (id: string) => void
  onViewGroup: (group: Group) => void
}

const priorityColors = {
  high: 'destructive',
  medium: 'warning',
  low: 'info',
} as const

const iconMap: Record<string, any> = {
  target: Target,
  users: Users,
  calendar: Calendar,
  clock: Clock,
}

export function GroupCard({ group, resources, onEdit, onDelete, onViewGroup }: GroupCardProps) {
  const groupResources = resources.filter(r => r.groupId === group.id)
  const completedResources = groupResources.filter(r => r.status === 'completed')
  const progressPercentage = groupResources.length > 0 
    ? Math.round((completedResources.length / groupResources.length) * 100) 
    : 0

  const IconComponent = iconMap[group.icon] || Target
  const isOverdue = group.dueDate && new Date() > group.dueDate && progressPercentage < 100
  const totalTimeSpent = groupResources.reduce((acc, resource) => acc + (resource.timeSpent || 0), 0)

  return (
    <Card 
      className={`bg-gradient-to-br from-card to-card/80 shadow-card hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 cursor-pointer border-border/50 ${
        isOverdue ? 'border-destructive/50' : ''
      }`}
      onClick={() => onViewGroup(group)}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div 
              className="p-2 rounded-lg"
              style={{ backgroundColor: `${group.color}20`, color: group.color }}
            >
              <IconComponent className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-lg font-semibold">{group.name}</CardTitle>
              {group.description && (
                <CardDescription className="text-sm text-muted-foreground mt-1">
                  {group.description}
                </CardDescription>
              )}
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation()
                onEdit(group)
              }}
              className="h-8 w-8 p-0"
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation()
                onDelete(group.id)
              }}
              className="h-8 w-8 p-0 text-destructive hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0 space-y-4">
        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant={priorityColors[group.priority]}>
            {group.priority.charAt(0).toUpperCase() + group.priority.slice(1)} Priority
          </Badge>
          {isOverdue && (
            <Badge variant="destructive">Overdue</Badge>
          )}
        </div>

        <div className="space-y-3">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium">{progressPercentage}%</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{completedResources.length} completed</span>
              <span>{groupResources.length} resources</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 text-sm">
            {group.dueDate && (
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className={isOverdue ? 'text-destructive' : 'text-muted-foreground'}>
                  {format(group.dueDate, 'MMM dd')}
                </span>
              </div>
            )}
            {totalTimeSpent > 0 && (
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">
                  {Math.round(totalTimeSpent / 60)}h {totalTimeSpent % 60}m
                </span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}