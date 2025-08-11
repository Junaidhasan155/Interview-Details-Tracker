import { Resource } from "@/types/resource"
import { Group } from "@/types/group"

const STORAGE_KEYS = {
  RESOURCES: 'studyApp_resources',
  GROUPS: 'studyApp_groups'
}

// Default data for first-time users
const defaultGroups: Group[] = [
  {
    id: '1',
    name: 'React Documentation',
    description: 'Complete React learning materials and resources',
    color: '#61DAFB',
    icon: 'code',
    priority: 'high',
    resourceIds: [],
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-20'),
    dueDate: new Date('2024-02-15'),
    isArchived: false
  },
  {
    id: '2', 
    name: 'System Design',
    description: 'Large scale system architecture and design patterns',
    color: '#10B981',
    icon: 'users',
    priority: 'medium',
    resourceIds: [],
    createdAt: new Date('2024-01-08'),
    updatedAt: new Date('2024-01-10'),
    dueDate: new Date('2024-03-01'),
    isArchived: false
  },
  {
    id: '3',
    name: 'JavaScript Fundamentals',
    description: 'Core JavaScript concepts and advanced techniques',
    color: '#F7DF1E',
    icon: 'book',
    priority: 'high',
    resourceIds: [],
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-18'),
    isArchived: false
  }
]

const defaultResources: Resource[] = [
  {
    id: '1',
    title: 'React Official Documentation',
    description: 'Official React docs for learning fundamentals',
    url: 'https://react.dev',
    type: 'website',
    status: 'not-started',
    priority: 'high',
    tags: ['react', 'frontend', 'documentation'],
    groupId: '1',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-20'),
    estimatedTime: 180,
  },
  {
    id: '2',
    title: 'React GitHub Repository',
    description: 'Official React repository with source code and examples',
    url: 'https://github.com/facebook/react',
    type: 'github',
    status: 'not-started',
    priority: 'medium',
    tags: ['react', 'github', 'source-code'],
    groupId: '1',
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-10'),
    estimatedTime: 120,
  },
  {
    id: '3',
    title: 'React Hooks Notes',
    description: 'Personal notes on React hooks and best practices',
    type: 'notes',
    status: 'in-progress',
    priority: 'high',
    tags: ['react', 'hooks', 'notes'],
    groupId: '1',
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-18'),
    timeSpent: 60,
    notes: 'useEffect, useState, useContext patterns and common pitfalls'
  },
  {
    id: '4',
    title: 'System Design Primer',
    description: 'Comprehensive guide to system design interviews',
    url: 'https://github.com/donnemartin/system-design-primer',
    type: 'github',
    status: 'not-started',
    priority: 'medium',
    tags: ['system-design', 'architecture'],
    groupId: '2',
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-10'),
    estimatedTime: 480,
  }
]

// Storage utilities
export const storage = {
  // Get data from localStorage
  getResources(): Resource[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.RESOURCES)
      if (!stored) {
        // First time - set default data
        this.setResources(defaultResources)
        return defaultResources
      }
      return JSON.parse(stored).map((resource: any) => ({
        ...resource,
        createdAt: new Date(resource.createdAt),
        updatedAt: new Date(resource.updatedAt),
        dueDate: resource.dueDate ? new Date(resource.dueDate) : undefined,
        lastAccessedAt: resource.lastAccessedAt ? new Date(resource.lastAccessedAt) : undefined
      }))
    } catch (error) {
      console.error('Error loading resources:', error)
      return defaultResources
    }
  },

  getGroups(): Group[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.GROUPS)
      if (!stored) {
        // First time - set default data
        this.setGroups(defaultGroups)
        return defaultGroups
      }
      return JSON.parse(stored).map((group: any) => ({
        ...group,
        createdAt: new Date(group.createdAt),
        updatedAt: new Date(group.updatedAt),
        dueDate: group.dueDate ? new Date(group.dueDate) : undefined,
        targetCompletionDate: group.targetCompletionDate ? new Date(group.targetCompletionDate) : undefined
      }))
    } catch (error) {
      console.error('Error loading groups:', error)
      return defaultGroups
    }
  },

  // Save data to localStorage
  setResources(resources: Resource[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.RESOURCES, JSON.stringify(resources))
    } catch (error) {
      console.error('Error saving resources:', error)
    }
  },

  setGroups(groups: Group[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.GROUPS, JSON.stringify(groups))
    } catch (error) {
      console.error('Error saving groups:', error)
    }
  },

  // Clear all data
  clear(): void {
    localStorage.removeItem(STORAGE_KEYS.RESOURCES)
    localStorage.removeItem(STORAGE_KEYS.GROUPS)
  }
}