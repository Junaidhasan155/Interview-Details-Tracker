export interface StudySession {
  id: string
  resourceId: string
  groupId?: string
  startTime: Date
  endTime?: Date
  duration?: number // in minutes
  notes?: string
  rating?: number // 1-5 stars
  createdAt: Date
}