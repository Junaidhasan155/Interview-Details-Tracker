import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { GroupCard } from "@/components/GroupCard"
import { AddGroupForm } from "@/components/AddGroupForm"
import { Group } from "@/types/group"
import { Resource } from "@/types/resource"
import { Search, Plus, Filter, Archive } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface GroupsProps {
  groups: Group[]
  resources: Resource[]
  onAddGroup: (group: Omit<Group, 'id' | 'createdAt' | 'updatedAt'>) => void
  onEditGroup: (id: string, group: Omit<Group, 'id' | 'createdAt' | 'updatedAt'>) => void
  onDeleteGroup: (id: string) => void
  onViewGroup: (group: Group) => void
}

export function Groups({ groups, resources, onAddGroup, onEditGroup, onDeleteGroup, onViewGroup }: GroupsProps) {
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingGroup, setEditingGroup] = useState<Group | undefined>()
  const [searchQuery, setSearchQuery] = useState('')
  const [filterPriority, setFilterPriority] = useState<string>('all')
  const [showArchived, setShowArchived] = useState(false)
  const { toast } = useToast()

  const filteredGroups = groups.filter(group => {
    const matchesSearch = group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         group.description?.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesPriority = filterPriority === 'all' || group.priority === filterPriority
    const matchesArchived = showArchived || !group.isArchived
    return matchesSearch && matchesPriority && matchesArchived
  })

  const handleAddGroup = (newGroup: Omit<Group, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (editingGroup) {
      onEditGroup(editingGroup.id, newGroup)
      toast({
        title: "Group Updated",
        description: "Your group has been successfully updated.",
      })
    } else {
      onAddGroup(newGroup)
      toast({
        title: "Group Created",
        description: "Your new group has been created successfully.",
      })
    }
    setShowAddForm(false)
    setEditingGroup(undefined)
  }

  const handleEditGroup = (group: Group) => {
    setEditingGroup(group)
    setShowAddForm(true)
  }

  const handleDeleteGroup = (id: string) => {
    const group = groups.find(g => g.id === id)
    const groupResources = resources.filter(r => r.groupId === id)
    
    if (groupResources.length > 0) {
      toast({
        title: "Cannot Delete Group",
        description: `This group contains ${groupResources.length} resource(s). Please move or delete them first.`,
        variant: "destructive"
      })
      return
    }

    onDeleteGroup(id)
    toast({
      title: "Group Deleted",
      description: `"${group?.name}" has been removed.`,
    })
  }

  if (showAddForm) {
    return (
      <div className="container mx-auto p-6">
        <AddGroupForm
          onAdd={handleAddGroup}
          onCancel={() => {
            setShowAddForm(false)
            setEditingGroup(undefined)
          }}
          editingGroup={editingGroup}
        />
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Study Groups</h1>
          <p className="text-muted-foreground">
            Organize your resources into focused study groups
          </p>
        </div>
        <Button onClick={() => setShowAddForm(true)} className="bg-gradient-primary">
          <Plus className="h-4 w-4 mr-2" />
          Create Group
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search groups..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={filterPriority} onValueChange={setFilterPriority}>
          <SelectTrigger className="w-full sm:w-40">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priorities</SelectItem>
            <SelectItem value="high">High Priority</SelectItem>
            <SelectItem value="medium">Medium Priority</SelectItem>
            <SelectItem value="low">Low Priority</SelectItem>
          </SelectContent>
        </Select>
        <Button
          variant={showArchived ? "default" : "outline"}
          onClick={() => setShowArchived(!showArchived)}
        >
          <Archive className="h-4 w-4 mr-2" />
          {showArchived ? "Hide Archived" : "Show Archived"}
        </Button>
      </div>

      {filteredGroups.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📁</div>
          <h3 className="text-xl font-semibold mb-2">No groups found</h3>
          <p className="text-muted-foreground mb-4">
            {searchQuery || filterPriority !== 'all' 
              ? 'Try adjusting your search or filters' 
              : 'Create your first study group to organize your resources'}
          </p>
          <Button onClick={() => setShowAddForm(true)} className="bg-gradient-primary">
            Create Your First Group
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGroups.map((group) => (
            <GroupCard
              key={group.id}
              group={group}
              resources={resources}
              onEdit={handleEditGroup}
              onDelete={handleDeleteGroup}
              onViewGroup={onViewGroup}
            />
          ))}
        </div>
      )}
    </div>
  )
}