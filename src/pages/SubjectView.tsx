import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ResourceCard } from "@/components/ResourceCard"
import { AddResourceForm } from "@/components/AddResourceForm"
import { Badge } from "@/components/ui/badge"
import { Resource } from "@/types/resource"
import { Group } from "@/types/group"
import { ArrowLeft, Plus, ExternalLink, Search, Grid, List } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface SubjectViewProps {
  groups: Group[]
  resources: Resource[]
  onAddResource: (resource: Omit<Resource, 'id' | 'createdAt' | 'updatedAt'>) => void
  onEditResource: (id: string, resource: Omit<Resource, 'id' | 'createdAt' | 'updatedAt'>) => void
  onDeleteResource: (id: string) => void
  onStatusChange: (id: string, status: Resource['status']) => void
}

export function SubjectView({ 
  groups, 
  resources, 
  onAddResource, 
  onEditResource, 
  onDeleteResource, 
  onStatusChange 
}: SubjectViewProps) {
  const { groupId } = useParams()
  const navigate = useNavigate()
  const { toast } = useToast()
  
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingResource, setEditingResource] = useState<Resource | undefined>()
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const group = groups.find(g => g.id === groupId)
  const groupResources = resources.filter(r => r.groupId === groupId)
  
  const filteredResources = groupResources.filter(resource =>
    resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    resource.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  if (!group) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-4">Subject not found</h2>
          <Button onClick={() => navigate('/groups')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Subjects
          </Button>
        </div>
      </div>
    )
  }

  const handleAddResource = (newResource: Omit<Resource, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (editingResource) {
      onEditResource(editingResource.id, { ...newResource, groupId })
      toast({
        title: "Resource Updated",
        description: "Your resource has been successfully updated.",
      })
      setEditingResource(undefined)
    } else {
      onAddResource({ ...newResource, groupId })
      toast({
        title: "Resource Added",
        description: `Resource added to "${group.name}" successfully.`,
      })
    }
    setShowAddForm(false)
  }

  const handleEditResource = (resource: Resource) => {
    setEditingResource(resource)
    setShowAddForm(true)
  }

  const handleDeleteResource = (id: string) => {
    const resource = resources.find(r => r.id === id)
    onDeleteResource(id)
    toast({
      title: "Resource Removed",
      description: `"${resource?.title}" has been removed from "${group.name}".`,
    })
  }

  const handleStatusChange = (id: string, status: Resource['status']) => {
    onStatusChange(id, status)
    const resource = resources.find(r => r.id === id)
    toast({
      title: "Status Updated",
      description: `"${resource?.title}" marked as ${status.replace('-', ' ')}.`,
    })
  }

  const openAllLinks = () => {
    const resourcesWithUrls = groupResources.filter(r => r.url)
    if (resourcesWithUrls.length === 0) {
      toast({
        title: "No Links Found",
        description: "This subject doesn't have any resources with URLs.",
        variant: "destructive"
      })
      return
    }

    resourcesWithUrls.forEach(resource => {
      if (resource.url) {
        window.open(resource.url, '_blank')
      }
    })

    toast({
      title: "Links Opened",
      description: `Opened ${resourcesWithUrls.length} link(s) in new tabs.`,
    })
  }

  if (showAddForm) {
    return (
      <div className="container mx-auto p-6">
        <AddResourceForm
          onAdd={handleAddResource}
          onCancel={() => {
            setShowAddForm(false)
            setEditingResource(undefined)
          }}
          editingResource={editingResource}
          groups={groups}
          defaultGroupId={groupId}
        />
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => navigate('/groups')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Subjects
          </Button>
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold" style={{ color: group.color }}>
                {group.name}
              </h1>
              <Badge 
                variant="secondary" 
                className="text-xs"
                style={{ backgroundColor: `${group.color}20`, color: group.color }}
              >
                {group.priority} priority
              </Badge>
            </div>
            <p className="text-muted-foreground">{group.description}</p>
            <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
              <span>{groupResources.length} resources</span>
              <span>•</span>
              <span>{groupResources.filter(r => r.status === 'completed').length} completed</span>
            </div>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={openAllLinks}
            disabled={groupResources.filter(r => r.url).length === 0}
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Open All Links
          </Button>
          <Button onClick={() => setShowAddForm(true)} className="bg-gradient-primary">
            <Plus className="h-4 w-4 mr-2" />
            Add Resource
          </Button>
        </div>
      </div>

      {/* Search and View Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search resources..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex gap-2">
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

      {/* Resources */}
      {filteredResources.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📚</div>
          <h3 className="text-xl font-semibold mb-2">
            {searchQuery ? 'No resources found' : 'No resources yet'}
          </h3>
          <p className="text-muted-foreground mb-4">
            {searchQuery 
              ? 'Try adjusting your search query' 
              : `Start building your "${group.name}" resource collection`
            }
          </p>
          {!searchQuery && (
            <Button onClick={() => setShowAddForm(true)} className="bg-gradient-primary">
              Add Your First Resource
            </Button>
          )}
        </div>
      ) : (
        <div className={
          viewMode === 'grid' 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            : "space-y-4"
        }>
          {filteredResources.map((resource) => (
            <ResourceCard
              key={resource.id}
              resource={resource}
              onEdit={handleEditResource}
              onDelete={handleDeleteResource}
              onStatusChange={handleStatusChange}
            />
          ))}
        </div>
      )}
    </div>
  )
}