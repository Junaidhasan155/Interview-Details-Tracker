export type ResourceType = 'website' | 'github' | 'notes' | 'practice'
export type ProgressStatus = 'not-started' | 'in-progress' | 'completed'

export interface Resource {
  id: string
  title: string
  description?: string
  url?: string
  type: ResourceType
  status: ProgressStatus
  tags: string[]
  createdAt: Date
  updatedAt: Date
  notes?: string
}