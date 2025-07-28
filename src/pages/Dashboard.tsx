import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ResourceCard } from "@/components/ResourceCard"
import { AddResourceForm } from "@/components/AddResourceForm"
import { Resource, ResourceType } from "@/types/resource"
import { Group } from "@/types/group"
import { Search, Grid, List, Plus, Clock, Target, TrendingUp } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

interface DashboardProps {
  resources: Resource[]
  groups: Group[]
  onAddResource: (resource: Omit<Resource, 'id' | 'createdAt' | 'updatedAt'>) => void
  onEditResource: (id: string, resource: Omit<Resource, 'id' | 'createdAt' | 'updatedAt'>) => void
  onDeleteResource: (id: string) => void
  onStatusChange: (id: string, status: Resource['status']) => void
  showAddForm: boolean
  setShowAddForm: (show: boolean) => void
  editingResource?: Resource
  setEditingResource: (resource?: Resource) => void
}

export function Dashboard({
  resources,
  groups,
  onAddResource,
  onEditResource,
  onDeleteResource,
  onStatusChange,
  showAddForm,
  setShowAddForm,
  editingResource,
  setEditingResource
}: DashboardProps) {
  const [selectedType, setSelectedType] = useState<ResourceType | 'all'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const { toast } = useToast()

  const filteredResources = resources.filter(resource => {
    const matchesType = selectedType === 'all' || resource.type === selectedType
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesType && matchesSearch
  })

  const handleAddResource = (newResource: Omit<Resource, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (editingResource) {
      onEditResource(editingResource.id, newResource)
      toast({
        title: "Resource Updated",
        description: "Your resource has been successfully updated.",
      })
    } else {
      onAddResource(newResource)
      toast({
        title: "Resource Added",
        description: "Your new resource has been added successfully.",
      })
    }
    setShowAddForm(false)
    setEditingResource(undefined)
  }

  const handleEditResource = (resource: Resource) => {
    setEditingResource(resource)
    setShowAddForm(true)
  }

  // Quick stats
  const completedCount = resources.filter(r => r.status === 'completed').length
  const inProgressCount = resources.filter(r => r.status === 'in-progress').length
  const highPriorityCount = resources.filter(r => r.priority === 'high').length
  const completionRate = resources.length > 0 ? (completedCount / resources.length) * 100 : 0

  const recentResources = resources
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 6)

  if (showAddForm) {
    return (
      <div className="container mx-auto p-6 max-w-4xl">
        <AddResourceForm
          onAdd={handleAddResource}
          onCancel={() => {
            setShowAddForm(false)
            setEditingResource(undefined)
          }}
          editingResource={editingResource}
          groups={groups}
        />
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Track your interview preparation progress
          </p>
        </div>
        <Button onClick={() => setShowAddForm(true)} className="bg-gradient-primary">
          <Plus className="h-4 w-4 mr-2" />
          Add Resource
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Resources</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{resources.length}</div>
            <p className="text-xs text-muted-foreground">
              {completedCount} completed
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completionRate.toFixed(1)}%</div>
            <Progress value={completionRate} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inProgressCount}</div>
            <p className="text-xs text-muted-foreground">
              Active resources
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Priority</CardTitle>
            <Target className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{highPriorityCount}</div>
            <p className="text-xs text-muted-foreground">
              Need attention
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search resources..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('grid')}
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('list')}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Type Filter Buttons */}
      <div className="flex flex-wrap gap-2">
        {(['all', 'website', 'github', 'notes', 'practice', 'video', 'book', 'course'] as const).map((type) => (
          <Button
            key={type}
            variant={selectedType === type ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedType(type)}
            className="capitalize"
          >
            {type === 'all' ? 'All' : type}
            <Badge variant="secondary" className="ml-2 text-xs">
              {type === 'all' ? resources.length : resources.filter(r => r.type === type).length}
            </Badge>
          </Button>
        ))}
      </div>

      {/* Resources Grid */}
      {filteredResources.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📚</div>
          <h3 className="text-xl font-semibold mb-2">No resources found</h3>
          <p className="text-muted-foreground mb-4">
            {searchQuery ? 'Try adjusting your search terms' : 'Start by adding your first resource'}
          </p>
          <Button onClick={() => setShowAddForm(true)} className="bg-gradient-primary">
            Add Your First Resource
          </Button>
        </div>
      ) : (
        <div className={viewMode === 'grid' ? 
          'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 
          'space-y-4'
        }>
          {filteredResources.map((resource) => (
            <ResourceCard
              key={resource.id}
              resource={resource}
              onEdit={handleEditResource}
              onDelete={onDeleteResource}
              onStatusChange={onStatusChange}
            />
          ))}
        </div>
      )}
    </div>
  )
}