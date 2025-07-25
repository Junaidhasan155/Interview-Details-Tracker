export type ResourceType = 'website' | 'github' | 'notes' | 'practice' | 'video' | 'book' | 'course'
export type ProgressStatus = 'not-started' | 'in-progress' | 'completed'
export type Priority = 'high' | 'medium' | 'low'

export interface Resource {
  id: string
  title: string
  description?: string
  url?: string
  type: ResourceType
  status: ProgressStatus
  priority: Priority
  tags: string[]
  groupId?: string
  createdAt: Date
  updatedAt: Date
  dueDate?: Date
  estimatedTime?: number // in minutes
  timeSpent?: number // in minutes
  notes?: string
  rating?: number // 1-5 stars
  lastAccessedAt?: Date
}