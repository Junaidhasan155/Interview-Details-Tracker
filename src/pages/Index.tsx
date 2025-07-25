import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ResourceCard } from "@/components/ResourceCard"
import { AddResourceForm } from "@/components/AddResourceForm"
import { Sidebar } from "@/components/Sidebar"
import { Resource, ResourceType } from "@/types/resource"
import { Search, Grid, List } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Mock data for demonstration
const mockResources: Resource[] = [
  {
    id: '1',
    title: 'LeetCode',
    description: 'Practice coding problems for technical interviews',
    url: 'https://leetcode.com',
    type: 'practice',
    status: 'in-progress',
    priority: 'high',
    tags: ['algorithms', 'data-structures'],
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-20'),
    notes: 'Focus on medium difficulty problems. Complete at least 3 problems per day.'
  },
  {
    id: '2',
    title: 'System Design Primer',
    description: 'Comprehensive guide to system design interviews',
    url: 'https://github.com/donnemartin/system-design-primer',
    type: 'github',
    status: 'not-started',
    priority: 'medium',
    tags: ['system-design', 'architecture'],
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-10'),
  },
  {
    id: '3',
    title: 'Behavioral Interview Notes',
    description: 'STAR method examples and common questions',
    type: 'notes',
    status: 'completed',
    priority: 'high',
    tags: ['behavioral', 'communication'],
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-18'),
    notes: 'Prepared stories for leadership, conflict resolution, and project management scenarios.'
  },
  {
    id: '4',
    title: 'React Documentation',
    description: 'Official React docs for frontend interviews',
    url: 'https://react.dev',
    type: 'website',
    status: 'in-progress',
    priority: 'medium',
    tags: ['react', 'frontend'],
    createdAt: new Date('2024-01-12'),
    updatedAt: new Date('2024-01-19'),
  }
]

const Index = () => {
  const [resources, setResources] = useState<Resource[]>(mockResources)
  const [selectedType, setSelectedType] = useState<ResourceType | 'all'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingResource, setEditingResource] = useState<Resource | undefined>()
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
    const resource: Resource = {
      ...newResource,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    if (editingResource) {
      setResources(prev => prev.map(r => r.id === editingResource.id ? 
        { ...resource, id: editingResource.id, createdAt: editingResource.createdAt } : r
      ))
      toast({
        title: "Resource Updated",
        description: "Your resource has been successfully updated.",
      })
    } else {
      setResources(prev => [resource, ...prev])
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

  const handleDeleteResource = (id: string) => {
    setResources(prev => prev.filter(r => r.id !== id))
    toast({
      title: "Resource Deleted",
      description: "The resource has been removed from your collection.",
    })
  }

  const handleStatusChange = (id: string, status: Resource['status']) => {
    setResources(prev => prev.map(r => r.id === id ? 
      { ...r, status, updatedAt: new Date() } : r
    ))
    
    const statusLabels = {
      'not-started': 'Not Started',
      'in-progress': 'In Progress',
      'completed': 'Completed',
    }
    
    toast({
      title: "Status Updated",
      description: `Resource marked as ${statusLabels[status].toLowerCase()}.`,
    })
  }

  if (showAddForm) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto p-6 max-w-4xl">
          <AddResourceForm
            onAdd={handleAddResource}
            onCancel={() => {
              setShowAddForm(false)
              setEditingResource(undefined)
            }}
            editingResource={editingResource}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar
        resources={resources}
        selectedType={selectedType}
        onTypeChange={setSelectedType}
        onAddNew={() => setShowAddForm(true)}
      />
      
      <div className="flex-1 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">
                {selectedType === 'all' ? 'All Resources' : 
                 selectedType.charAt(0).toUpperCase() + selectedType.slice(1) + ' Resources'}
              </h1>
              <p className="text-muted-foreground">
                {filteredResources.length} resource{filteredResources.length !== 1 ? 's' : ''} found
              </p>
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

          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

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
                  onDelete={handleDeleteResource}
                  onStatusChange={handleStatusChange}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Index