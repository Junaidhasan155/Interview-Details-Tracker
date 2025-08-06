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
import { Search, Plus, Brain, Code, Database, Users, Target, BookOpen, CheckCircle, Circle, Star } from 'lucide-react';

export interface InterviewQuestion {
  id: string;
  question: string;
  answer?: string;
  category: 'technical' | 'behavioral' | 'system-design' | 'coding' | 'database' | 'general';
  difficulty: 'easy' | 'medium' | 'hard';
  company?: string;
  tags: string[];
  isPracticed: boolean;
  isFavorite: boolean;
  createdAt: string;
  updatedAt: string;
}

const questionSchema = z.object({
  question: z.string().min(10, 'Question must be at least 10 characters'),
  answer: z.string().optional(),
  category: z.enum(['technical', 'behavioral', 'system-design', 'coding', 'database', 'general']),
  difficulty: z.enum(['easy', 'medium', 'hard']),
  company: z.string().optional(),
  tags: z.string().optional()
});

type QuestionFormData = z.infer<typeof questionSchema>;

const CATEGORIES = [
  { id: 'technical', label: 'Technical', icon: Brain, color: 'bg-blue-500' },
  { id: 'behavioral', label: 'Behavioral', icon: Users, color: 'bg-green-500' },
  { id: 'system-design', label: 'System Design', icon: Target, color: 'bg-purple-500' },
  { id: 'coding', label: 'Coding', icon: Code, color: 'bg-orange-500' },
  { id: 'database', label: 'Database', icon: Database, color: 'bg-red-500' },
  { id: 'general', label: 'General', icon: BookOpen, color: 'bg-gray-500' }
];

const SAMPLE_QUESTIONS: Omit<InterviewQuestion, 'id' | 'createdAt' | 'updatedAt'>[] = [
  {
    question: "Tell me about yourself and your background.",
    answer: "Structure your response using the present-past-future format. Start with your current role, briefly mention relevant past experiences, and conclude with your career aspirations.",
    category: 'behavioral',
    difficulty: 'easy',
    tags: ['introduction', 'personal'],
    isPracticed: false,
    isFavorite: false
  },
  {
    question: "What are the differences between let, const, and var in JavaScript?",
    answer: "var is function-scoped and can be redeclared, let is block-scoped and cannot be redeclared in the same scope, const is block-scoped, cannot be redeclared or reassigned, and must be initialized when declared.",
    category: 'technical',
    difficulty: 'easy',
    tags: ['javascript', 'variables', 'scoping'],
    isPracticed: false,
    isFavorite: false
  },
  {
    question: "Design a URL shortener like bit.ly",
    answer: "Key components: URL encoding/decoding service, database for mappings, caching layer, rate limiting, analytics service. Consider scalability, data consistency, and performance.",
    category: 'system-design',
    difficulty: 'hard',
    tags: ['system-design', 'scalability', 'databases'],
    isPracticed: false,
    isFavorite: false
  },
  {
    question: "Write a function to reverse a linked list.",
    answer: "Use iterative approach with three pointers: prev, current, and next. Traverse the list while reversing the links.",
    category: 'coding',
    difficulty: 'medium',
    tags: ['linked-list', 'algorithms', 'data-structures'],
    isPracticed: false,
    isFavorite: false
  }
];

export function QuestionBank() {
  const [questions, setQuestions] = useState<InterviewQuestion[]>([]);
  const [filteredQuestions, setFilteredQuestions] = useState<InterviewQuestion[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAnswers, setShowAnswers] = useState<Set<string>>(new Set());
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  
  const form = useForm<QuestionFormData>({
    resolver: zodResolver(questionSchema),
    defaultValues: {
      question: '',
      answer: '',
      category: 'technical',
      difficulty: 'medium',
      company: '',
      tags: ''
    }
  });

  // Load questions on component mount
  useEffect(() => {
    const saved = localStorage.getItem('interview-questions');
    if (saved) {
      setQuestions(JSON.parse(saved));
    } else {
      // Initialize with sample questions
      const initialQuestions = SAMPLE_QUESTIONS.map(q => ({
        ...q,
        id: Math.random().toString(36).substr(2, 9),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }));
      setQuestions(initialQuestions);
      localStorage.setItem('interview-questions', JSON.stringify(initialQuestions));
    }
  }, []);

  // Save questions to localStorage
  useEffect(() => {
    if (questions.length > 0) {
      localStorage.setItem('interview-questions', JSON.stringify(questions));
    }
  }, [questions]);

  // Filter questions
  useEffect(() => {
    let filtered = questions;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(q => q.category === selectedCategory);
    }

    if (selectedDifficulty !== 'all') {
      filtered = filtered.filter(q => q.difficulty === selectedDifficulty);
    }

    if (searchQuery) {
      filtered = filtered.filter(q => 
        q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
        q.company?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredQuestions(filtered);
  }, [questions, selectedCategory, selectedDifficulty, searchQuery]);

  const handleAddQuestion = (data: QuestionFormData) => {
    const newQuestion: InterviewQuestion = {
      id: Math.random().toString(36).substr(2, 9),
      question: data.question,
      answer: data.answer,
      category: data.category,
      difficulty: data.difficulty,
      company: data.company,
      tags: data.tags ? data.tags.split(',').map(tag => tag.trim()) : [],
      isPracticed: false,
      isFavorite: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setQuestions(prev => [newQuestion, ...prev]);
    form.reset();
    setIsAddDialogOpen(false);
    toast.success('Question added successfully!');
  };

  const togglePracticed = (id: string) => {
    setQuestions(prev => prev.map(q => 
      q.id === id ? { ...q, isPracticed: !q.isPracticed, updatedAt: new Date().toISOString() } : q
    ));
  };

  const toggleFavorite = (id: string) => {
    setQuestions(prev => prev.map(q => 
      q.id === id ? { ...q, isFavorite: !q.isFavorite, updatedAt: new Date().toISOString() } : q
    ));
  };

  const toggleAnswer = (id: string) => {
    setShowAnswers(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
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

  // Statistics
  const totalQuestions = questions.length;
  const practicedCount = questions.filter(q => q.isPracticed).length;
  const favoriteCount = questions.filter(q => q.isFavorite).length;
  const practiceRate = totalQuestions > 0 ? (practicedCount / totalQuestions) * 100 : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Interview Question Bank</h2>
          <p className="text-muted-foreground">Practice and organize your interview questions</p>
        </div>

        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-primary">
              <Plus className="h-4 w-4 mr-2" />
              Add Question
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Question</DialogTitle>
              <DialogDescription>
                Add a new interview question to your practice bank
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleAddQuestion)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="question"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Question</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter the interview question..."
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="answer"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Answer (Optional)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter your answer or notes..."
                          className="min-h-[80px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
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
                    control={form.control}
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
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Google, Apple" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="tags"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tags (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. javascript, react, algorithms" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex justify-end space-x-2">
                  <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Add Question</Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Questions</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalQuestions}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Practiced</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{practicedCount}</div>
            <p className="text-xs text-muted-foreground">
              {practiceRate.toFixed(1)}% completion
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Favorites</CardTitle>
            <Star className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{favoriteCount}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Categories</CardTitle>
            <Brain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{CATEGORIES.length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search questions, tags, or companies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full sm:w-48">
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
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Difficulty" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Levels</SelectItem>
            <SelectItem value="easy">Easy</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="hard">Hard</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {filteredQuestions.length === 0 ? (
          <div className="text-center py-12">
            <Brain className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No questions found</h3>
            <p className="text-muted-foreground mb-4">
              {searchQuery || selectedCategory !== 'all' || selectedDifficulty !== 'all'
                ? 'Try adjusting your filters'
                : 'Start by adding your first interview question'
              }
            </p>
            <Button onClick={() => setIsAddDialogOpen(true)} className="bg-gradient-primary">
              Add Question
            </Button>
          </div>
        ) : (
          filteredQuestions.map((question) => {
            const categoryData = getCategoryData(question.category);
            const Icon = categoryData.icon;
            
            return (
              <Card key={question.id} className="transition-all duration-200 hover:shadow-md">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <div className={`p-1 rounded ${categoryData.color} text-white`}>
                          <Icon className="h-3 w-3" />
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {categoryData.label}
                        </Badge>
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${getDifficultyColor(question.difficulty)} text-white border-none`}
                        >
                          {question.difficulty}
                        </Badge>
                        {question.company && (
                          <Badge variant="outline" className="text-xs">
                            {question.company}
                          </Badge>
                        )}
                      </div>
                      <CardTitle className="text-lg leading-relaxed">{question.question}</CardTitle>
                      {question.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {question.tags.map((tag, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleFavorite(question.id)}
                        className={question.isFavorite ? 'text-yellow-600' : 'text-muted-foreground'}
                      >
                        <Star className={`h-4 w-4 ${question.isFavorite ? 'fill-current' : ''}`} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => togglePracticed(question.id)}
                        className={question.isPracticed ? 'text-green-600' : 'text-muted-foreground'}
                      >
                        {question.isPracticed ? (
                          <CheckCircle className="h-4 w-4 fill-current" />
                        ) : (
                          <Circle className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                {question.answer && (
                  <CardContent>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleAnswer(question.id)}
                      className="mb-3"
                    >
                      {showAnswers.has(question.id) ? 'Hide Answer' : 'Show Answer'}
                    </Button>
                    {showAnswers.has(question.id) && (
                      <div className="bg-muted p-4 rounded-lg">
                        <p className="text-sm leading-relaxed">{question.answer}</p>
                      </div>
                    )}
                  </CardContent>
                )}
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}
