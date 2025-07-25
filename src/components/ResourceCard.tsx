import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Resource } from "@/types/resource"
import { ExternalLink, Github, FileText, Target, Edit, Trash2 } from "lucide-react"

interface ResourceCardProps {
  resource: Resource
  onEdit: (resource: Resource) => void
  onDelete: (id: string) => void
  onStatusChange: (id: string, status: Resource['status']) => void
}

const typeIcons = {
  website: ExternalLink,
  github: Github,
  notes: FileText,
  practice: Target,
}

const statusColors = {
  'not-started': 'outline',
  'in-progress': 'warning',
  'completed': 'success',
} as const

const statusLabels = {
  'not-started': 'Not Started',
  'in-progress': 'In Progress',
  'completed': 'Completed',
}

export function ResourceCard({ resource, onEdit, onDelete, onStatusChange }: ResourceCardProps) {
  const Icon = typeIcons[resource.type]

  const getNextStatus = (current: Resource['status']): Resource['status'] => {
    switch (current) {
      case 'not-started': return 'in-progress'
      case 'in-progress': return 'completed'
      case 'completed': return 'not-started'
    }
  }

  return (
    <Card className="bg-gradient-card shadow-card hover:shadow-elegant transition-all duration-300 hover:-translate-y-1">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <Icon className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg font-semibold">{resource.title}</CardTitle>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(resource)}
              className="h-8 w-8 p-0"
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(resource.id)}
              className="h-8 w-8 p-0 text-destructive hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        {resource.description && (
          <CardDescription className="text-sm text-muted-foreground">
            {resource.description}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge
              variant={statusColors[resource.status]}
              className="cursor-pointer"
              onClick={() => onStatusChange(resource.id, getNextStatus(resource.status))}
            >
              {statusLabels[resource.status]}
            </Badge>
            {resource.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
          
          {resource.url && (
            <Button
              variant="outline"
              size="sm"
              asChild
              className="w-full justify-start"
            >
              <a href={resource.url} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-2" />
                Open Resource
              </a>
            </Button>
          )}
          
          {resource.notes && (
            <p className="text-sm text-muted-foreground bg-muted/50 p-2 rounded-md">
              {resource.notes}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}