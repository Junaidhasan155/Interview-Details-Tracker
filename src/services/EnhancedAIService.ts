import { Resource } from '@/types/resource'
import { Group } from '@/types/group'

export class EnhancedAIService {
  // AI-powered resource suggestions based on study patterns
  static async generateResourceSuggestions(
    resources: Resource[], 
    groups: Group[], 
    currentSubject?: string
  ): Promise<string[]> {
    try {
      // Analyze user's study patterns
      const completedResources = resources.filter(r => r.status === 'completed')
      const favoriteTypes = this.getMostFrequentTypes(completedResources)
      const commonTags = this.getMostFrequentTags(completedResources)
      
      // Generate contextual suggestions
      const suggestions = []
      
      if (currentSubject) {
        suggestions.push(
          `Advanced ${currentSubject} practice problems`,
          `${currentSubject} interview questions`,
          `Real-world ${currentSubject} projects`
        )
      }
      
      // Add type-based suggestions
      if (favoriteTypes.includes('practice')) {
        suggestions.push('HackerRank coding challenges', 'CodeSignal practice tests')
      }
      
      if (favoriteTypes.includes('video')) {
        suggestions.push('YouTube tutorial series', 'Coursera specializations')
      }
      
      // Add tag-based suggestions
      if (commonTags.includes('algorithms')) {
        suggestions.push('Algorithm visualization tools', 'Competitive programming platforms')
      }
      
      return suggestions.slice(0, 5)
    } catch (error) {
      console.error('Error generating suggestions:', error)
      return ['Practice coding problems', 'Study documentation', 'Watch tutorial videos']
    }
  }

  // Auto-generate study quizzes from resource content
  static async generateQuizFromContent(resource: Resource): Promise<any[]> {
    try {
      // Simulate AI quiz generation
      const questions = []
      
      if (resource.type === 'notes' && resource.notes) {
        questions.push({
          question: `What are the key concepts mentioned in "${resource.title}"?`,
          type: 'open-ended',
          points: 10
        })
      }
      
      if (resource.tags?.includes('algorithms')) {
        questions.push({
          question: 'What is the time complexity of binary search?',
          type: 'multiple-choice',
          options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
          correct: 1,
          points: 5
        })
      }
      
      if (resource.tags?.includes('react')) {
        questions.push({
          question: 'Which hook is used for state management in React?',
          type: 'multiple-choice',
          options: ['useEffect', 'useState', 'useContext', 'useReducer'],
          correct: 1,
          points: 5
        })
      }
      
      return questions
    } catch (error) {
      console.error('Error generating quiz:', error)
      return []
    }
  }

  // Smart content analysis and tagging
  static async analyzeResourceContent(url: string): Promise<{
    suggestedTags: string[]
    difficulty: 'beginner' | 'intermediate' | 'advanced'
    estimatedTime: number
    summary: string
  }> {
    try {
      // Simulate content analysis
      const domain = new URL(url).hostname
      
      let suggestedTags: string[] = []
      let difficulty: 'beginner' | 'intermediate' | 'advanced' = 'intermediate'
      let estimatedTime = 60
      
      // Domain-based analysis
      if (domain.includes('leetcode')) {
        suggestedTags = ['algorithms', 'coding', 'interview-prep']
        difficulty = 'intermediate'
        estimatedTime = 30
      } else if (domain.includes('github')) {
        suggestedTags = ['code', 'open-source', 'documentation']
        estimatedTime = 45
      } else if (domain.includes('youtube') || domain.includes('coursera')) {
        suggestedTags = ['video', 'tutorial', 'learning']
        estimatedTime = 90
      } else if (domain.includes('stackoverflow')) {
        suggestedTags = ['q&a', 'problem-solving', 'community']
        estimatedTime = 15
      }
      
      return {
        suggestedTags,
        difficulty,
        estimatedTime,
        summary: `Automatically analyzed content from ${domain}`
      }
    } catch (error) {
      console.error('Error analyzing content:', error)
      return {
        suggestedTags: ['general'],
        difficulty: 'intermediate',
        estimatedTime: 60,
        summary: 'Unable to analyze content'
      }
    }
  }

  // Personalized study recommendations
  static generateStudyPlan(resources: Resource[], groups: Group[]): {
    dailyGoals: string[]
    weeklyMilestones: string[]
    recommendations: string[]
  } {
    const inProgressResources = resources.filter(r => r.status === 'in-progress')
    const notStartedResources = resources.filter(r => r.status === 'not-started')
    const highPriorityResources = resources.filter(r => r.priority === 'high')
    
    const dailyGoals = [
      `Complete 1 resource from ${inProgressResources.length} in-progress items`,
      'Spend at least 30 minutes on high-priority topics',
      'Review and update your notes'
    ]
    
    const weeklyMilestones = [
      `Start ${Math.min(3, notStartedResources.length)} new resources`,
      `Complete ${Math.min(2, inProgressResources.length)} ongoing resources`,
      'Organize and tag your completed resources'
    ]
    
    const recommendations = [
      `Focus on ${highPriorityResources.length} high-priority items first`,
      'Balance theory and practice in your study sessions',
      'Regular review sessions to reinforce learning'
    ]
    
    return { dailyGoals, weeklyMilestones, recommendations }
  }

  // Helper methods
  private static getMostFrequentTypes(resources: Resource[]): string[] {
    const typeCount = resources.reduce((acc, r) => {
      acc[r.type] = (acc[r.type] || 0) + 1
      return acc
    }, {} as Record<string, number>)
    
    return Object.entries(typeCount)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3)
      .map(([type]) => type)
  }
  
  private static getMostFrequentTags(resources: Resource[]): string[] {
    const tagCount = resources.reduce((acc, r) => {
      r.tags?.forEach(tag => {
        acc[tag] = (acc[tag] || 0) + 1
      })
      return acc
    }, {} as Record<string, number>)
    
    return Object.entries(tagCount)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([tag]) => tag)
  }
}