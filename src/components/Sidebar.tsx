import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Resource, ResourceType } from "@/types/resource"
import { ExternalLink, Github, FileText, Target, Plus, Search } from "lucide-react"

interface SidebarProps {
  resources: Resource[]
  selectedType: ResourceType | 'all'
  onTypeChange: (type: ResourceType | 'all') => void
  onAddNew: () => void
}

const typeIcons = {
  all: Search,
  website: ExternalLink,
  github: Github,
  notes: FileText,
  practice: Target,
}

const typeLabels = {
  all: 'All Resources',
  website: 'Websites',
  github: 'GitHub Repos',
  notes: 'Notes',
  practice: 'Practice',
}

export function Sidebar({ resources, selectedType, onTypeChange, onAddNew }: SidebarProps) {
  const getResourceCount = (type: ResourceType | 'all') => {
    if (type === 'all') return resources.length
    return resources.filter(r => r.type === type).length
  }

  const getProgressStats = () => {
    const total = resources.length
    const completed = resources.filter(r => r.status === 'completed').length
    const inProgress = resources.filter(r => r.status === 'in-progress').length
    
    return { total, completed, inProgress }
  }

  const stats = getProgressStats()

  return (
    <div className="w-80 bg-gradient-card border-r border-border p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Interview Tracker
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Organize your prep resources
        </p>
      </div>

      <Button onClick={onAddNew} className="w-full bg-gradient-primary">
        <Plus className="h-4 w-4 mr-2" />
        Add Resource
      </Button>

      <Card className="shadow-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">Progress Overview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Total Resources</span>
            <Badge variant="outline">{stats.total}</Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Completed</span>
            <Badge variant="success">{stats.completed}</Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">In Progress</span>
            <Badge variant="warning">{stats.inProgress}</Badge>
          </div>
          {stats.total > 0 && (
            <div className="pt-2">
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-gradient-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(stats.completed / stats.total) * 100}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1 text-center">
                {Math.round((stats.completed / stats.total) * 100)}% Complete
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="space-y-2">
        <h3 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
          Categories
        </h3>
        {Object.entries(typeLabels).map(([type, label]) => {
          const Icon = typeIcons[type as keyof typeof typeIcons]
          const count = getResourceCount(type as ResourceType | 'all')
          const isSelected = selectedType === type

          return (
            <Button
              key={type}
              variant={isSelected ? "default" : "ghost"}
              className={`w-full justify-between ${isSelected ? 'bg-gradient-primary' : ''}`}
              onClick={() => onTypeChange(type as ResourceType | 'all')}
            >
              <div className="flex items-center gap-2">
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </div>
              <Badge variant={isSelected ? "secondary" : "outline"} className="text-xs">
                {count}
              </Badge>
            </Button>
          )
        })}
      </div>
    </div>
  )
}