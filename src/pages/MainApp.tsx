import { useState, useEffect } from "react"
import { Layout } from "@/components/Layout"
import { Dashboard } from "@/pages/Dashboard"
import { Groups } from "@/pages/Groups"
import { AIDashboard } from "@/pages/AIDashboard"
import { Analytics } from "@/pages/Analytics"
import { SubjectView } from "@/pages/SubjectView"
import { Settings } from "@/pages/Settings"
import { InterviewSimulator } from "@/components/InterviewSimulator"
import { Resource } from "@/types/resource"
import { Group } from "@/types/group"
import { useLocation, useNavigate } from "react-router-dom"
import { storage } from "@/lib/storage"

// Enhanced mock data
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
    groupId: '1',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-20'),
    timeSpent: 180, // 3 hours
    estimatedTime: 300,
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
    groupId: '2',
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-10'),
    estimatedTime: 480,
  },
  {
    id: '3',
    title: 'Behavioral Interview Notes',
    description: 'STAR method examples and common questions',
    type: 'notes',
    status: 'completed',
    priority: 'high',
    tags: ['behavioral', 'communication'],
    groupId: '3',
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-18'),
    timeSpent: 120,
    rating: 5,
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
    groupId: '1',
    createdAt: new Date('2024-01-12'),
    updatedAt: new Date('2024-01-19'),
    timeSpent: 90,
    estimatedTime: 180,
  },
  {
    id: '5',
    title: 'Cracking the Coding Interview',
    description: 'Classic interview preparation book',
    type: 'book',
    status: 'in-progress',
    priority: 'high',
    tags: ['algorithms', 'interview-prep'],
    groupId: '1',
    createdAt: new Date('2024-01-08'),
    updatedAt: new Date('2024-01-22'),
    timeSpent: 240,
    estimatedTime: 600,
    dueDate: new Date('2024-02-15'),
  }
]

const mockGroups: Group[] = [
  {
    id: '1',
    name: 'Technical Skills',
    description: 'Algorithms, data structures, and coding practice',
    color: '#3B82F6',
    icon: 'target',
    priority: 'high',
    resourceIds: ['1', '4', '5'],
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
    resourceIds: ['2'],
    createdAt: new Date('2024-01-08'),
    updatedAt: new Date('2024-01-10'),
    dueDate: new Date('2024-03-01'),
    isArchived: false
  },
  {
    id: '3',
    name: 'Behavioral & Communication',
    description: 'Soft skills and behavioral interview preparation',
    color: '#F59E0B',
    icon: 'brain',
    priority: 'high',
    resourceIds: ['3'],
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-18'),
    isArchived: false
  }
]

export function MainApp() {
  const [resources, setResources] = useState<Resource[]>([])
  const [groups, setGroups] = useState<Group[]>([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingResource, setEditingResource] = useState<Resource | undefined>()
  const location = useLocation()
  const navigate = useNavigate()

  // Load data from localStorage on mount
  useEffect(() => {
    const storedResources = storage.getResources()
    const storedGroups = storage.getGroups()
    setResources(storedResources)
    setGroups(storedGroups)
  }, [])

  // Save to localStorage whenever data changes
  useEffect(() => {
    if (resources.length > 0) {
      storage.setResources(resources)
    }
  }, [resources])

  useEffect(() => {
    if (groups.length > 0) {
      storage.setGroups(groups)
    }
  }, [groups])

  const handleAddResource = (newResource: Omit<Resource, 'id' | 'createdAt' | 'updatedAt'>) => {
    const resource: Resource = {
      ...newResource,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    setResources(prev => [resource, ...prev])
  }

  const handleEditResource = (id: string, updatedResource: Omit<Resource, 'id' | 'createdAt' | 'updatedAt'>) => {
    setResources(prev => prev.map(r => r.id === id ? 
      { ...updatedResource, id, createdAt: r.createdAt, updatedAt: new Date() } : r
    ))
  }

  const handleDeleteResource = (id: string) => {
    setResources(prev => prev.filter(r => r.id !== id))
  }

  const handleStatusChange = (id: string, status: Resource['status']) => {
    setResources(prev => prev.map(r => r.id === id ? 
      { ...r, status, updatedAt: new Date() } : r
    ))
  }

  const handleAddGroup = (newGroup: Omit<Group, 'id' | 'createdAt' | 'updatedAt'>) => {
    const group: Group = {
      ...newGroup,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    setGroups(prev => [group, ...prev])
  }

  const handleEditGroup = (id: string, updatedGroup: Omit<Group, 'id' | 'createdAt' | 'updatedAt'>) => {
    setGroups(prev => prev.map(g => g.id === id ? 
      { ...updatedGroup, id, createdAt: g.createdAt, updatedAt: new Date() } : g
    ))
  }

  const handleDeleteGroup = (id: string) => {
    setGroups(prev => prev.filter(g => g.id !== id))
  }

  const handleViewGroup = (group: Group) => {
    // Navigate to subject view
    navigate(`/subject/${group.id}`)
  }

  const renderCurrentPage = () => {
    // Check if it's a subject view route
    if (location.pathname.startsWith('/subject/')) {
      return (
        <SubjectView
          groups={groups}
          resources={resources}
          onAddResource={handleAddResource}
          onEditResource={handleEditResource}
          onDeleteResource={handleDeleteResource}
          onStatusChange={handleStatusChange}
        />
      )
    }

    switch (location.pathname) {
      case '/groups':
        return (
          <Groups 
            groups={groups}
            resources={resources}
            onAddGroup={handleAddGroup}
            onEditGroup={handleEditGroup}
            onDeleteGroup={handleDeleteGroup}
            onViewGroup={handleViewGroup}
          />
        )
      case '/ai':
        return (
          <AIDashboard
            resources={resources}
            groups={groups}
            onEditResource={handleEditResource}
          />
        )
      case '/interview':
        return <InterviewSimulator />
      case '/analytics':
        return <Analytics resources={resources} groups={groups} />
      case '/settings':
        return <Settings />
      default:
        return (
          <Dashboard
            resources={resources}
            groups={groups}
            onAddResource={handleAddResource}
            onEditResource={handleEditResource}
            onDeleteResource={handleDeleteResource}
            onStatusChange={handleStatusChange}
            showAddForm={showAddForm}
            setShowAddForm={setShowAddForm}
            editingResource={editingResource}
            setEditingResource={setEditingResource}
          />
        )
    }
  }

  return (
    <Layout
      resources={resources}
      groups={groups}
      onAddResource={() => setShowAddForm(true)}
      onCreateGroup={() => navigate('/groups')}
    >
      {renderCurrentPage()}
    </Layout>
  )
}
