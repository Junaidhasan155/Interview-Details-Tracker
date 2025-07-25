import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Group, Priority } from "@/types/group"
import { Target, Users, Calendar, Clock, BookOpen, Code, Brain, Zap } from "lucide-react"

interface AddGroupFormProps {
  onAdd: (group: Omit<Group, 'id' | 'createdAt' | 'updatedAt'>) => void
  onCancel: () => void
  editingGroup?: Group
}

const iconOptions = [
  { value: 'target', label: 'Target', icon: Target },
  { value: 'users', label: 'Team', icon: Users },
  { value: 'calendar', label: 'Calendar', icon: Calendar },
  { value: 'clock', label: 'Clock', icon: Clock },
  { value: 'book', label: 'Book', icon: BookOpen },
  { value: 'code', label: 'Code', icon: Code },
  { value: 'brain', label: 'Brain', icon: Brain },
  { value: 'zap', label: 'Zap', icon: Zap },
]

const colorOptions = [
  '#3B82F6', // Blue
  '#EF4444', // Red
  '#10B981', // Green
  '#F59E0B', // Amber
  '#8B5CF6', // Purple
  '#EC4899', // Pink
  '#14B8A6', // Teal
  '#F97316', // Orange
]

export function AddGroupForm({ onAdd, onCancel, editingGroup }: AddGroupFormProps) {
  const [name, setName] = useState(editingGroup?.name || '')
  const [description, setDescription] = useState(editingGroup?.description || '')
  const [priority, setPriority] = useState<Priority>(editingGroup?.priority || 'medium')
  const [icon, setIcon] = useState(editingGroup?.icon || 'target')
  const [color, setColor] = useState(editingGroup?.color || '#3B82F6')
  const [dueDate, setDueDate] = useState(
    editingGroup?.dueDate ? editingGroup.dueDate.toISOString().split('T')[0] : ''
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return

    onAdd({
      name: name.trim(),
      description: description.trim() || undefined,
      priority,
      icon,
      color,
      dueDate: dueDate ? new Date(dueDate) : undefined,
      resourceIds: editingGroup?.resourceIds || [],
      targetCompletionDate: dueDate ? new Date(dueDate) : undefined,
      isArchived: editingGroup?.isArchived || false,
    })
  }

  return (
    <Card className="bg-gradient-card shadow-elegant max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{editingGroup ? 'Edit Group' : 'Create New Group'}</CardTitle>
        <CardDescription>
          {editingGroup ? 'Update your group settings' : 'Organize your resources into focused study groups'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Group Name *</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., System Design, Frontend, Algorithms"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select value={priority} onValueChange={(value: Priority) => setPriority(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">High Priority</SelectItem>
                  <SelectItem value="medium">Medium Priority</SelectItem>
                  <SelectItem value="low">Low Priority</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief description of what this group covers"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="icon">Icon</Label>
              <Select value={icon} onValueChange={setIcon}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {iconOptions.map((option) => {
                    const IconComponent = option.icon
                    return (
                      <SelectItem key={option.value} value={option.value}>
                        <div className="flex items-center gap-2">
                          <IconComponent className="h-4 w-4" />
                          {option.label}
                        </div>
                      </SelectItem>
                    )
                  })}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dueDate">Due Date</Label>
              <Input
                id="dueDate"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Color</Label>
            <div className="flex gap-2 flex-wrap">
              {colorOptions.map((colorOption) => (
                <button
                  key={colorOption}
                  type="button"
                  className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 ${
                    color === colorOption ? 'border-foreground scale-110' : 'border-border'
                  }`}
                  style={{ backgroundColor: colorOption }}
                  onClick={() => setColor(colorOption)}
                />
              ))}
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" className="bg-gradient-primary">
              {editingGroup ? 'Update Group' : 'Create Group'}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}