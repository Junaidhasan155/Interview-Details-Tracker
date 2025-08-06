import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { 
  Plus, 
  Code, 
  Search, 
  Filter,
  Star, 
  Clock, 
  CheckCircle, 
  ExternalLink,
  Copy,
  Edit,
  Trash2,
  Play,
  BarChart3,
  Lightbulb,
  Target,
  TrendingUp,
  BookOpen,
  Link,
  Calendar,
  Timer,
  Brain,
  Zap,
  Database,
  Globe
} from 'lucide-react';

export interface CodeChallenge {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: 'algorithms' | 'data-structures' | 'system-design' | 'frontend' | 'backend' | 'database' | 'other';
  platform: 'leetcode' | 'hackerrank' | 'codewars' | 'interview' | 'personal' | 'other';
  url?: string;
  tags: string[];
  timeComplexity?: string;
  spaceComplexity?: string;
  solution: CodeSolution[];
  attempts: number;
  lastAttempted?: string;
  isCompleted: boolean;
  isFavorite: boolean;
  rating?: number; // 1-5
  notes?: string;
  hints: string[];
  relatedChallenges: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CodeSolution {
  id: string;
  language: 'javascript' | 'typescript' | 'python' | 'java' | 'cpp' | 'go' | 'rust' | 'other';
  code: string;
  explanation: string;
  runtime?: string;
  memory?: string;
  isOptimal: boolean;
  dateCreated: string;
  approach: string; // e.g., "Two Pointers", "Dynamic Programming", "BFS"
}

const challengeSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  difficulty: z.enum(['easy', 'medium', 'hard']),
  category: z.enum(['algorithms', 'data-structures', 'system-design', 'frontend', 'backend', 'database', 'other']),
  platform: z.enum(['leetcode', 'hackerrank', 'codewars', 'interview', 'personal', 'other']),
  url: z.string().url().optional().or(z.literal('')),
  tags: z.string().optional(),
  timeComplexity: z.string().optional(),
  spaceComplexity: z.string().optional(),
  notes: z.string().optional(),
  hints: z.string().optional()
});

type ChallengeFormData = z.infer<typeof challengeSchema>;

const solutionSchema = z.object({
  language: z.enum(['javascript', 'typescript', 'python', 'java', 'cpp', 'go', 'rust', 'other']),
  code: z.string().min(1, 'Code is required'),
  explanation: z.string().min(10, 'Explanation must be at least 10 characters'),
  approach: z.string().min(1, 'Approach is required'),
  runtime: z.string().optional(),
  memory: z.string().optional(),
  isOptimal: z.boolean().default(false)
});

type SolutionFormData = z.infer<typeof solutionSchema>;

const CATEGORIES = [
  { id: 'algorithms', label: 'Algorithms', icon: Brain, color: 'bg-blue-500' },
  { id: 'data-structures', label: 'Data Structures', icon: Database, color: 'bg-green-500' },
  { id: 'system-design', label: 'System Design', icon: Target, color: 'bg-purple-500' },
  { id: 'frontend', label: 'Frontend', icon: Globe, color: 'bg-orange-500' },
  { id: 'backend', label: 'Backend', icon: Code, color: 'bg-red-500' },
  { id: 'database', label: 'Database', icon: Database, color: 'bg-indigo-500' },
  { id: 'other', label: 'Other', icon: BookOpen, color: 'bg-gray-500' }
];

const PLATFORMS = [
  { id: 'leetcode', label: 'LeetCode', color: 'bg-orange-500' },
  { id: 'hackerrank', label: 'HackerRank', color: 'bg-green-600' },
  { id: 'codewars', label: 'Codewars', color: 'bg-red-600' },
  { id: 'interview', label: 'Interview', color: 'bg-blue-600' },
  { id: 'personal', label: 'Personal', color: 'bg-purple-600' },
  { id: 'other', label: 'Other', color: 'bg-gray-600' }
];

const LANGUAGES = [
  { id: 'javascript', label: 'JavaScript', color: 'bg-yellow-500' },
  { id: 'typescript', label: 'TypeScript', color: 'bg-blue-600' },
  { id: 'python', label: 'Python', color: 'bg-green-600' },
  { id: 'java', label: 'Java', color: 'bg-orange-600' },
  { id: 'cpp', label: 'C++', color: 'bg-blue-700' },
  { id: 'go', label: 'Go', color: 'bg-cyan-600' },
  { id: 'rust', label: 'Rust', color: 'bg-orange-700' },
  { id: 'other', label: 'Other', color: 'bg-gray-600' }
];

const SAMPLE_CHALLENGES: Omit<CodeChallenge, 'id' | 'createdAt' | 'updatedAt'>[] = [
  {
    title: 'Two Sum',
    description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
    difficulty: 'easy',
    category: 'algorithms',
    platform: 'leetcode',
    url: 'https://leetcode.com/problems/two-sum/',
    tags: ['array', 'hash-table'],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    solution: [
      {
        id: '1',
        language: 'javascript',
        code: `function twoSum(nums, target) {
    const map = new Map();
    
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        
        map.set(nums[i], i);
    }
    
    return [];
}`,
        explanation: 'Use a hash map to store each number and its index. For each number, check if its complement exists in the map. If found, return the indices.',
        approach: 'Hash Table',
        runtime: '52ms',
        memory: '42.1MB',
        isOptimal: true,
        dateCreated: new Date().toISOString()
      }
    ],
    attempts: 2,
    lastAttempted: new Date().toISOString(),
    isCompleted: true,
    isFavorite: true,
    rating: 4,
    notes: 'Classic problem. Good for understanding hash tables.',
    hints: ['Think about what you need to find for each number', 'Can you do it in one pass?'],
    relatedChallenges: []
  },
  {
    title: 'Valid Parentheses',
    description: 'Given a string s containing just the characters \'(\', \')\', \'{\', \'}\', \'[\' and \']\', determine if the input string is valid.',
    difficulty: 'easy',
    category: 'data-structures',
    platform: 'leetcode',
    url: 'https://leetcode.com/problems/valid-parentheses/',
    tags: ['stack', 'string'],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    solution: [
      {
        id: '1',
        language: 'javascript',
        code: `function isValid(s) {
    const stack = [];
    const map = {
        ')': '(',
        '}': '{',
        ']': '['
    };
    
    for (let char of s) {
        if (char in map) {
            if (stack.length === 0 || stack.pop() !== map[char]) {
                return false;
            }
        } else {
            stack.push(char);
        }
    }
    
    return stack.length === 0;
}`,
        explanation: 'Use a stack to keep track of opening brackets. When encountering a closing bracket, check if it matches the most recent opening bracket.',
        approach: 'Stack',
        runtime: '48ms',
        memory: '41.8MB',
        isOptimal: true,
        dateCreated: new Date().toISOString()
      }
    ],
    attempts: 1,
    lastAttempted: new Date().toISOString(),
    isCompleted: true,
    isFavorite: false,
    rating: 5,
    notes: 'Great stack problem. Important pattern for parsing.',
    hints: ['What data structure naturally handles nested structures?', 'Think about the order of operations'],
    relatedChallenges: []
  }
];

export function CodeChallengeRepository() {
  const [challenges, setChallenges] = useState<CodeChallenge[]>([]);
  const [filteredChallenges, setFilteredChallenges] = useState<CodeChallenge[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [selectedPlatform, setSelectedPlatform] = useState<string>('all');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('all');
  const [isAddChallengeOpen, setIsAddChallengeOpen] = useState(false);
  const [isAddSolutionOpen, setIsAddSolutionOpen] = useState(false);
  const [selectedChallenge, setSelectedChallenge] = useState<CodeChallenge | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const challengeForm = useForm<ChallengeFormData>({
    resolver: zodResolver(challengeSchema),
    defaultValues: {
      title: '',
      description: '',
      difficulty: 'medium',
      category: 'algorithms',
      platform: 'leetcode',
      url: '',
      tags: '',
      timeComplexity: '',
      spaceComplexity: '',
      notes: '',
      hints: ''
    }
  });

  const solutionForm = useForm<SolutionFormData>({
    resolver: zodResolver(solutionSchema),
    defaultValues: {
      language: 'javascript',
      code: '',
      explanation: '',
      approach: '',
      runtime: '',
      memory: '',
      isOptimal: false
    }
  });

  // Load challenges from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('code-challenges');
    if (saved) {
      setChallenges(JSON.parse(saved));
    } else {
      const initialChallenges = SAMPLE_CHALLENGES.map(challenge => ({
        ...challenge,
        id: Math.random().toString(36).substr(2, 9),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }));
      setChallenges(initialChallenges);
      localStorage.setItem('code-challenges', JSON.stringify(initialChallenges));
    }
  }, []);

  // Save challenges to localStorage
  useEffect(() => {
    if (challenges.length > 0) {
      localStorage.setItem('code-challenges', JSON.stringify(challenges));
    }
  }, [challenges]);

  // Filter challenges
  useEffect(() => {
    let filtered = challenges;

    if (searchQuery) {
      filtered = filtered.filter(challenge =>
        challenge.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        challenge.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        challenge.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(challenge => challenge.category === selectedCategory);
    }

    if (selectedDifficulty !== 'all') {
      filtered = filtered.filter(challenge => challenge.difficulty === selectedDifficulty);
    }

    if (selectedPlatform !== 'all') {
      filtered = filtered.filter(challenge => challenge.platform === selectedPlatform);
    }

    if (selectedLanguage !== 'all') {
      filtered = filtered.filter(challenge =>
        challenge.solution.some(sol => sol.language === selectedLanguage)
      );
    }

    setFilteredChallenges(filtered);
  }, [challenges, searchQuery, selectedCategory, selectedDifficulty, selectedPlatform, selectedLanguage]);

  const handleAddChallenge = (data: ChallengeFormData) => {
    const newChallenge: CodeChallenge = {
      id: Math.random().toString(36).substr(2, 9),
      title: data.title,
      description: data.description,
      difficulty: data.difficulty,
      category: data.category,
      platform: data.platform,
      url: data.url,
      tags: data.tags ? data.tags.split(',').map(tag => tag.trim()) : [],
      timeComplexity: data.timeComplexity,
      spaceComplexity: data.spaceComplexity,
      solution: [],
      attempts: 0,
      isCompleted: false,
      isFavorite: false,
      notes: data.notes,
      hints: data.hints ? data.hints.split(',').map(hint => hint.trim()) : [],
      relatedChallenges: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setChallenges(prev => [newChallenge, ...prev]);
    challengeForm.reset();
    setIsAddChallengeOpen(false);
    toast.success('Challenge added to repository!');
  };

  const handleAddSolution = (data: SolutionFormData) => {
    if (!selectedChallenge) return;

    const newSolution: CodeSolution = {
      id: Math.random().toString(36).substr(2, 9),
      language: data.language,
      code: data.code,
      explanation: data.explanation,
      approach: data.approach,
      runtime: data.runtime,
      memory: data.memory,
      isOptimal: data.isOptimal,
      dateCreated: new Date().toISOString()
    };

    setChallenges(prev => prev.map(challenge =>
      challenge.id === selectedChallenge.id
        ? {
            ...challenge,
            solution: [...challenge.solution, newSolution],
            isCompleted: true,
            attempts: challenge.attempts + 1,
            lastAttempted: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }
        : challenge
    ));

    solutionForm.reset();
    setIsAddSolutionOpen(false);
    setSelectedChallenge(null);
    toast.success('Solution added successfully!');
  };

  const toggleFavorite = (challengeId: string) => {
    setChallenges(prev => prev.map(challenge =>
      challenge.id === challengeId
        ? { ...challenge, isFavorite: !challenge.isFavorite, updatedAt: new Date().toISOString() }
        : challenge
    ));
  };

  const markAttempted = (challengeId: string) => {
    setChallenges(prev => prev.map(challenge =>
      challenge.id === challengeId
        ? {
            ...challenge,
            attempts: challenge.attempts + 1,
            lastAttempted: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }
        : challenge
    ));
    toast.success('Attempt recorded!');
  };

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success('Code copied to clipboard!');
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      case 'hard': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getCategoryData = (category: string) => {
    return CATEGORIES.find(c => c.id === category) || CATEGORIES[0];
  };

  const getPlatformData = (platform: string) => {
    return PLATFORMS.find(p => p.id === platform) || PLATFORMS[0];
  };

  const getLanguageData = (language: string) => {
    return LANGUAGES.find(l => l.id === language) || LANGUAGES[0];
  };

  // Statistics
  const totalChallenges = challenges.length;
  const completedChallenges = challenges.filter(c => c.isCompleted).length;
  const favoriteChallenges = challenges.filter(c => c.isFavorite).length;
  const totalSolutions = challenges.reduce((sum, c) => sum + c.solution.length, 0);
  const completionRate = totalChallenges > 0 ? (completedChallenges / totalChallenges) * 100 : 0;

  const difficultyStats = {
    easy: challenges.filter(c => c.difficulty === 'easy' && c.isCompleted).length,
    medium: challenges.filter(c => c.difficulty === 'medium' && c.isCompleted).length,
    hard: challenges.filter(c => c.difficulty === 'hard' && c.isCompleted).length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Code Challenge Repository</h2>
          <p className="text-muted-foreground">Track and organize your coding practice solutions</p>
        </div>

        <div className="flex gap-2">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('grid')}
          >
            Grid
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('list')}
          >
            List
          </Button>

          <Dialog open={isAddChallengeOpen} onOpenChange={setIsAddChallengeOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-primary">
                <Plus className="h-4 w-4 mr-2" />
                Add Challenge
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Code Challenge</DialogTitle>
                <DialogDescription>
                  Add a coding challenge to track your solutions and progress
                </DialogDescription>
              </DialogHeader>
              <Form {...challengeForm}>
                <form onSubmit={challengeForm.handleSubmit(handleAddChallenge)} className="space-y-4">
                  <FormField
                    control={challengeForm.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Challenge Title</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Two Sum, Valid Parentheses" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={challengeForm.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe the problem statement..."
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <FormField
                      control={challengeForm.control}
                      name="difficulty"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Difficulty</FormLabel>
                          <FormControl>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select difficulty" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="easy">Easy</SelectItem>
                                <SelectItem value="medium">Medium</SelectItem>
                                <SelectItem value="hard">Hard</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={challengeForm.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category</FormLabel>
                          <FormControl>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                              <SelectContent>
                                {CATEGORIES.map((category) => (
                                  <SelectItem key={category.id} value={category.id}>
                                    {category.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={challengeForm.control}
                      name="platform"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Platform</FormLabel>
                          <FormControl>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select platform" />
                              </SelectTrigger>
                              <SelectContent>
                                {PLATFORMS.map((platform) => (
                                  <SelectItem key={platform.id} value={platform.id}>
                                    {platform.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={challengeForm.control}
                    name="url"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Problem URL (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="https://leetcode.com/problems/..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                      control={challengeForm.control}
                      name="timeComplexity"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Time Complexity (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. O(n), O(n log n)" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={challengeForm.control}
                      name="spaceComplexity"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Space Complexity (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. O(1), O(n)" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={challengeForm.control}
                    name="tags"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tags (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. array, hash-table, two-pointers" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={challengeForm.control}
                    name="hints"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Hints (Optional)</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Add hints for solving this problem..."
                            className="min-h-[80px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={challengeForm.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Notes (Optional)</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Any additional notes about this challenge..."
                            className="min-h-[80px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex justify-end space-x-2">
                    <Button type="button" variant="outline" onClick={() => setIsAddChallengeOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">Add Challenge</Button>
                  </div>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Challenges</CardTitle>
            <Code className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalChallenges}</div>
            <p className="text-xs text-muted-foreground">
              {completionRate.toFixed(1)}% completed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Solutions</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalSolutions}</div>
            <p className="text-xs text-muted-foreground">
              Code solutions
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Easy</CardTitle>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{difficultyStats.easy}</div>
            <p className="text-xs text-muted-foreground">
              Completed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Medium</CardTitle>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{difficultyStats.medium}</div>
            <p className="text-xs text-muted-foreground">
              Completed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Hard</CardTitle>
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{difficultyStats.hard}</div>
            <p className="text-xs text-muted-foreground">
              Completed
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search challenges..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full lg:w-48">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {CATEGORIES.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
          <SelectTrigger className="w-full lg:w-36">
            <SelectValue placeholder="Difficulty" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Levels</SelectItem>
            <SelectItem value="easy">Easy</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="hard">Hard</SelectItem>
          </SelectContent>
        </Select>

        <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
          <SelectTrigger className="w-full lg:w-36">
            <SelectValue placeholder="Platform" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Platforms</SelectItem>
            {PLATFORMS.map((platform) => (
              <SelectItem key={platform.id} value={platform.id}>
                {platform.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
          <SelectTrigger className="w-full lg:w-36">
            <SelectValue placeholder="Language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Languages</SelectItem>
            {LANGUAGES.map((language) => (
              <SelectItem key={language.id} value={language.id}>
                {language.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Challenges Grid/List */}
      <div className={viewMode === 'grid' ? 'grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6' : 'space-y-4'}>
        {filteredChallenges.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <Code className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No challenges found</h3>
            <p className="text-muted-foreground mb-4">
              {searchQuery || selectedCategory !== 'all' || selectedDifficulty !== 'all' || selectedPlatform !== 'all'
                ? 'Try adjusting your filters'
                : 'Start building your code challenge repository'
              }
            </p>
            <Button onClick={() => setIsAddChallengeOpen(true)} className="bg-gradient-primary">
              Add Your First Challenge
            </Button>
          </div>
        ) : (
          filteredChallenges.map((challenge) => {
            const categoryData = getCategoryData(challenge.category);
            const platformData = getPlatformData(challenge.platform);
            const CategoryIcon = categoryData.icon;

            return (
              <Card key={challenge.id} className="transition-all duration-200 hover:shadow-md">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <CardTitle className="text-lg line-clamp-1">{challenge.title}</CardTitle>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleFavorite(challenge.id)}
                          className={challenge.isFavorite ? 'text-yellow-600' : 'text-muted-foreground'}
                        >
                          <Star className={`h-4 w-4 ${challenge.isFavorite ? 'fill-current' : ''}`} />
                        </Button>
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <div className={`p-1 rounded ${categoryData.color} text-white`}>
                          <CategoryIcon className="h-3 w-3" />
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {categoryData.label}
                        </Badge>
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${getDifficultyColor(challenge.difficulty)} text-white border-none`}
                        >
                          {challenge.difficulty}
                        </Badge>
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${platformData.color} text-white border-none`}
                        >
                          {platformData.label}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {challenge.description}
                    </p>

                    {/* Complexity Info */}
                    {(challenge.timeComplexity || challenge.spaceComplexity) && (
                      <div className="flex gap-4 text-xs text-muted-foreground">
                        {challenge.timeComplexity && (
                          <div>
                            <span className="font-medium">Time:</span> {challenge.timeComplexity}
                          </div>
                        )}
                        {challenge.spaceComplexity && (
                          <div>
                            <span className="font-medium">Space:</span> {challenge.spaceComplexity}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Solutions Summary */}
                    {challenge.solution.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium mb-2">Solutions ({challenge.solution.length})</h4>
                        <div className="flex flex-wrap gap-1">
                          {challenge.solution.slice(0, 4).map((solution, index) => {
                            const langData = getLanguageData(solution.language);
                            return (
                              <Badge 
                                key={index} 
                                variant="outline" 
                                className={`text-xs ${langData.color} text-white border-none`}
                              >
                                {langData.label}
                              </Badge>
                            );
                          })}
                          {challenge.solution.length > 4 && (
                            <Badge variant="outline" className="text-xs">
                              +{challenge.solution.length - 4}
                            </Badge>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Tags */}
                    {challenge.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {challenge.tags.slice(0, 3).map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {challenge.tags.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{challenge.tags.length - 3}
                          </Badge>
                        )}
                      </div>
                    )}

                    {/* Status and Actions */}
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        {challenge.isCompleted ? (
                          <div className="flex items-center gap-1 text-green-600">
                            <CheckCircle className="h-3 w-3" />
                            Solved
                          </div>
                        ) : (
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            Not solved
                          </div>
                        )}
                        {challenge.attempts > 0 && (
                          <span>• {challenge.attempts} attempts</span>
                        )}
                      </div>
                      
                      <div className="flex gap-1">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedChallenge(challenge);
                            setIsAddSolutionOpen(true);
                          }}
                        >
                          <Code className="h-3 w-3 mr-1" />
                          Add Solution
                        </Button>
                        {challenge.url && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => window.open(challenge.url, '_blank')}
                          >
                            <ExternalLink className="h-3 w-3" />
                          </Button>
                        )}
                        {!challenge.isCompleted && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => markAttempted(challenge.id)}
                          >
                            <Play className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                    </div>

                    {/* Latest Solution Preview */}
                    {challenge.solution.length > 0 && (
                      <div className="bg-muted rounded-lg p-3">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-medium">Latest Solution</span>
                          <div className="flex items-center gap-1">
                            <Badge 
                              variant="outline" 
                              className={`text-xs ${getLanguageData(challenge.solution[0].language).color} text-white border-none`}
                            >
                              {getLanguageData(challenge.solution[0].language).label}
                            </Badge>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => copyCode(challenge.solution[0].code)}
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                        <pre className="text-xs bg-background rounded p-2 overflow-x-auto line-clamp-4">
                          <code>{challenge.solution[0].code}</code>
                        </pre>
                        <p className="text-xs text-muted-foreground mt-2 line-clamp-2">
                          {challenge.solution[0].explanation}
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>

      {/* Add Solution Dialog */}
      <Dialog open={isAddSolutionOpen} onOpenChange={setIsAddSolutionOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add Solution</DialogTitle>
            <DialogDescription>
              Add your solution for "{selectedChallenge?.title}"
            </DialogDescription>
          </DialogHeader>
          <Form {...solutionForm}>
            <form onSubmit={solutionForm.handleSubmit(handleAddSolution)} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={solutionForm.control}
                  name="language"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Programming Language</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select language" />
                          </SelectTrigger>
                          <SelectContent>
                            {LANGUAGES.map((language) => (
                              <SelectItem key={language.id} value={language.id}>
                                {language.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={solutionForm.control}
                  name="approach"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Approach</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Two Pointers, Hash Table, BFS" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={solutionForm.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Code Solution</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Paste your code solution here..."
                        className="min-h-[200px] font-mono text-sm"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={solutionForm.control}
                name="explanation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Explanation</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Explain your approach and solution..."
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={solutionForm.control}
                  name="runtime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Runtime (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. 52ms, 0.1s" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={solutionForm.control}
                  name="memory"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Memory (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. 42.1MB, 15.2MB" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={solutionForm.control}
                name="isOptimal"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        This is my optimal solution
                      </FormLabel>
                    </div>
                  </FormItem>
                )}
              />

              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsAddSolutionOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Add Solution</Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
