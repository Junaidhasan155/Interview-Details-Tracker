export type Priority = 'high' | 'medium' | 'low'

export interface Group {
  id: string
  name: string
  description?: string
  color: string
  icon: string
  resourceIds: string[]
  createdAt: Date
  updatedAt: Date
  dueDate?: Date
  priority: Priority
  targetCompletionDate?: Date
  isArchived: boolean
}