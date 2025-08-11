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
  Calendar, 
  Building2, 
  Clock, 
  Star, 
  ThumbsUp, 
  ThumbsDown,
  Eye,
  Edit,
  Trash2,
  Filter,
  Search,
  BookOpen,
  Target,
  Users,
  CheckCircle,
  XCircle,
  AlertCircle,
  TrendingUp,
  MessageSquare,
  Lightbulb,
  FileText,
  MapPin
} from 'lucide-react';

export interface InterviewExperience {
  id: string;
  company: string;
  position: string;
  date: string;
  interviewType: 'phone' | 'video' | 'onsite' | 'take-home' | 'other';
  stage: 'phone-screen' | 'technical' | 'behavioral' | 'final' | 'other';
  duration: number; // in minutes
  interviewer?: string;
  interviewerRole?: string;
  location?: string;
  outcome: 'passed' | 'rejected' | 'pending' | 'withdrawn';
  overallRating: number; // 1-5
  difficultyRating: number; // 1-5
  questions: InterviewQuestionLog[];
  preparation: PreparationLog;
  experience: ExperienceDetails;
  feedback?: CompanyFeedback;
  followUp: FollowUpAction[];
  lessons: string[];
  tags: string[];
  isPrivate: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface InterviewQuestionLog {
  id: string;
  question: string;
  category: 'technical' | 'behavioral' | 'system-design' | 'cultural' | 'other';
  myAnswer: string;
  difficulty: 'easy' | 'medium' | 'hard';
  performance: 'poor' | 'fair' | 'good' | 'excellent';
  notes?: string;
  timeSpent?: number;
}

export interface PreparationLog {
  timeSpent: number; // hours
  resourcesUsed: string[];
  practiceQuestions: number;
  mockInterviews: number;
  researchTime: number; // hours
  confidence: number; // 1-5
  preparationNotes: string;
}

export interface ExperienceDetails {
  atmosphere: 'relaxed' | 'neutral' | 'stressful' | 'hostile';
  interviewerDemeanor: 'friendly' | 'neutral' | 'challenging' | 'unprofessional';
  technicalSetup: string;
  unexpectedElements: string[];
  positiveAspects: string[];
  negativeAspects: string[];
  wouldRecommend: boolean;
  glassdoorAccurate: boolean;
  salaryDiscussed: boolean;
  nextStepsDiscussed: boolean;
}

export interface CompanyFeedback {
  received: boolean;
  feedbackDate?: string;
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
  detailedNotes: string;
}

export interface FollowUpAction {
  id: string;
  action: 'thank-you-email' | 'follow-up-email' | 'linkedin-connect' | 'application-status' | 'other';
  completed: boolean;
  dueDate?: string;
  completedDate?: string;
  notes?: string;
}

const journalSchema = z.object({
  company: z.string().min(2, 'Company name is required'),
  position: z.string().min(2, 'Position is required'),
  date: z.string().min(1, 'Interview date is required'),
  interviewType: z.enum(['phone', 'video', 'onsite', 'take-home', 'other']),
  stage: z.enum(['phone-screen', 'technical', 'behavioral', 'final', 'other']),
  duration: z.number().min(1, 'Duration must be at least 1 minute'),
  interviewer: z.string().optional(),
  interviewerRole: z.string().optional(),
  location: z.string().optional(),
  outcome: z.enum(['passed', 'rejected', 'pending', 'withdrawn']),
  overallRating: z.number().min(1).max(5),
  difficultyRating: z.number().min(1).max(5),
  tags: z.string().optional()
});

type JournalFormData = z.infer<typeof journalSchema>;

const SAMPLE_EXPERIENCES: Omit<InterviewExperience, 'id' | 'createdAt' | 'updatedAt'>[] = [
  {
    company: 'Google',
    position: 'Senior Software Engineer',
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 1 week ago
    interviewType: 'video',
    stage: 'technical',
    duration: 90,
    interviewer: 'Sarah Chen',
    interviewerRole: 'Staff Engineer',
    outcome: 'passed',
    overallRating: 4,
    difficultyRating: 4,
    questions: [
      {
        id: '1',
        question: 'Design a rate limiter for an API service',
        category: 'system-design',
        myAnswer: 'Discussed token bucket algorithm, Redis implementation, and distributed considerations',
        difficulty: 'hard',
        performance: 'good',
        notes: 'Interviewer was impressed with scalability discussion',
        timeSpent: 45
      },
      {
        question: 'Implement a LRU cache',
        category: 'technical',
        myAnswer: 'Used HashMap + DoublyLinkedList approach',
        difficulty: 'medium',
        performance: 'excellent',
        timeSpent: 30
      }
    ],
    preparation: {
      timeSpent: 15,
      resourcesUsed: ['System Design Interview book', 'LeetCode', 'Educative.io'],
      practiceQuestions: 25,
      mockInterviews: 2,
      researchTime: 3,
      confidence: 4,
      preparationNotes: 'Focused heavily on system design patterns and Google-specific technologies'
    },
    experience: {
      atmosphere: 'relaxed',
      interviewerDemeanor: 'friendly',
      technicalSetup: 'Google Meet with shared code editor',
      unexpectedElements: ['Asked about specific Google services', 'Deep dive into monitoring'],
      positiveAspects: ['Interviewer was very engaged', 'Good technical discussion', 'Clear expectations'],
      negativeAspects: ['Ran slightly over time', 'Some audio issues initially'],
      wouldRecommend: true,
      glassdoorAccurate: true,
      salaryDiscussed: false,
      nextStepsDiscussed: true
    },
    feedback: {
      received: true,
      feedbackDate: new Date().toISOString().split('T')[0],
      strengths: ['Strong system design thinking', 'Good communication', 'Solid coding skills'],
      weaknesses: ['Could improve on edge case handling', 'Time management'],
      suggestions: ['Practice more complex distributed systems', 'Work on concise explanations'],
      detailedNotes: 'Overall strong candidate with good potential for the role'
    },
    followUp: [
      {
        id: '1',
        action: 'thank-you-email',
        completed: true,
        completedDate: new Date().toISOString().split('T')[0],
        notes: 'Sent personalized thank you mentioning specific discussion points'
      },
      {
        id: '2',
        action: 'linkedin-connect',
        completed: false,
        dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      }
    ],
    lessons: [
      'Need to practice time management in system design',
      'Prepare better for Google-specific technology questions',
      'Keep technical setup checklist for video interviews'
    ],
    tags: ['google', 'senior', 'system-design', 'passed'],
    isPrivate: false
  }
];

export function InterviewJournal() {
  const [experiences, setExperiences] = useState<InterviewExperience[]>([]);
  const [filteredExperiences, setFilteredExperiences] = useState<InterviewExperience[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOutcome, setSelectedOutcome] = useState<string>('all');
  const [selectedCompany, setSelectedCompany] = useState<string>('all');
  const [selectedStage, setSelectedStage] = useState<string>('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState<InterviewExperience | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const form = useForm<JournalFormData>({
    resolver: zodResolver(journalSchema),
    defaultValues: {
      company: '',
      position: '',
      date: new Date().toISOString().split('T')[0],
      interviewType: 'video',
      stage: 'technical',
      duration: 60,
      interviewer: '',
      interviewerRole: '',
      location: '',
      outcome: 'pending',
      overallRating: 3,
      difficultyRating: 3,
      tags: ''
    }
  });

  // Load experiences from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('interview-experiences');
    if (saved) {
      setExperiences(JSON.parse(saved));
    } else {
      const initialExperiences = SAMPLE_EXPERIENCES.map(exp => ({
        ...exp,
        id: Math.random().toString(36).substr(2, 9),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }));
      setExperiences(initialExperiences);
      localStorage.setItem('interview-experiences', JSON.stringify(initialExperiences));
    }
  }, []);

  // Save experiences to localStorage
  useEffect(() => {
    if (experiences.length > 0) {
      localStorage.setItem('interview-experiences', JSON.stringify(experiences));
    }
  }, [experiences]);

  // Filter experiences
  useEffect(() => {
    let filtered = experiences;

    if (searchQuery) {
      filtered = filtered.filter(exp =>
        exp.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exp.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exp.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    if (selectedOutcome !== 'all') {
      filtered = filtered.filter(exp => exp.outcome === selectedOutcome);
    }

    if (selectedCompany !== 'all') {
      filtered = filtered.filter(exp => exp.company === selectedCompany);
    }

    if (selectedStage !== 'all') {
      filtered = filtered.filter(exp => exp.stage === selectedStage);
    }

    // Sort by date (newest first)
    filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    setFilteredExperiences(filtered);
  }, [experiences, searchQuery, selectedOutcome, selectedCompany, selectedStage]);

  const handleAddExperience = (data: JournalFormData) => {
    const newExperience: InterviewExperience = {
      id: Math.random().toString(36).substr(2, 9),
      company: data.company,
      position: data.position,
      date: data.date,
      interviewType: data.interviewType,
      stage: data.stage,
      duration: data.duration,
      interviewer: data.interviewer,
      interviewerRole: data.interviewerRole,
      location: data.location,
      outcome: data.outcome,
      overallRating: data.overallRating,
      difficultyRating: data.difficultyRating,
      questions: [],
      preparation: {
        timeSpent: 0,
        resourcesUsed: [],
        practiceQuestions: 0,
        mockInterviews: 0,
        researchTime: 0,
        confidence: 3,
        preparationNotes: ''
      },
      experience: {
        atmosphere: 'neutral',
        interviewerDemeanor: 'neutral',
        technicalSetup: '',
        unexpectedElements: [],
        positiveAspects: [],
        negativeAspects: [],
        wouldRecommend: true,
        glassdoorAccurate: true,
        salaryDiscussed: false,
        nextStepsDiscussed: false
      },
      followUp: [],
      lessons: [],
      tags: data.tags ? data.tags.split(',').map(tag => tag.trim()) : [],
      isPrivate: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setExperiences(prev => [newExperience, ...prev]);
    form.reset();
    setIsAddDialogOpen(false);
    toast.success('Interview experience added to journal!');
  };

  const getOutcomeColor = (outcome: string) => {
    switch (outcome) {
      case 'passed': return 'bg-green-500';
      case 'rejected': return 'bg-red-500';
      case 'pending': return 'bg-yellow-500';
      case 'withdrawn': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getOutcomeIcon = (outcome: string) => {
    switch (outcome) {
      case 'passed': return CheckCircle;
      case 'rejected': return XCircle;
      case 'pending': return AlertCircle;
      case 'withdrawn': return Clock;
      default: return Clock;
    }
  };

  const getStageLabel = (stage: string) => {
    switch (stage) {
      case 'phone-screen': return 'Phone Screen';
      case 'technical': return 'Technical';
      case 'behavioral': return 'Behavioral';
      case 'final': return 'Final Round';
      case 'other': return 'Other';
      default: return stage;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'phone': return 'Phone';
      case 'video': return 'Video';
      case 'onsite': return 'On-site';
      case 'take-home': return 'Take-home';
      case 'other': return 'Other';
      default: return type;
    }
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  // Statistics
  const totalExperiences = experiences.length;
  const passedCount = experiences.filter(exp => exp.outcome === 'passed').length;
  const rejectedCount = experiences.filter(exp => exp.outcome === 'rejected').length;
  const pendingCount = experiences.filter(exp => exp.outcome === 'pending').length;
  const averageRating = experiences.length > 0 
    ? experiences.reduce((sum, exp) => sum + exp.overallRating, 0) / experiences.length 
    : 0;

  const companies = [...new Set(experiences.map(exp => exp.company))];
  const stages = [...new Set(experiences.map(exp => exp.stage))];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Interview Experience Journal</h2>
          <p className="text-muted-foreground">Track and reflect on your interview experiences</p>
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

          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-primary">
                <Plus className="h-4 w-4 mr-2" />
                Add Experience
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Log Interview Experience</DialogTitle>
                <DialogDescription>
                  Record details about your interview to track progress and learnings
                </DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleAddExperience)} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="company"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. Google, Microsoft" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="position"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Position</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. Senior Software Engineer" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="date"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Interview Date</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="interviewType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Interview Type</FormLabel>
                          <FormControl>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="phone">Phone</SelectItem>
                                <SelectItem value="video">Video</SelectItem>
                                <SelectItem value="onsite">On-site</SelectItem>
                                <SelectItem value="take-home">Take-home</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="stage"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Interview Stage</FormLabel>
                          <FormControl>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select stage" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="phone-screen">Phone Screen</SelectItem>
                                <SelectItem value="technical">Technical</SelectItem>
                                <SelectItem value="behavioral">Behavioral</SelectItem>
                                <SelectItem value="final">Final Round</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="duration"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Duration (minutes)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min="1"
                              placeholder="60"
                              {...field}
                              onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="overallRating"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Overall Rating (1-5)</FormLabel>
                          <FormControl>
                            <Select onValueChange={(value) => field.onChange(parseInt(value))} defaultValue={field.value.toString()}>
                              <SelectTrigger>
                                <SelectValue placeholder="Rate experience" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="1">1 - Poor</SelectItem>
                                <SelectItem value="2">2 - Fair</SelectItem>
                                <SelectItem value="3">3 - Good</SelectItem>
                                <SelectItem value="4">4 - Very Good</SelectItem>
                                <SelectItem value="5">5 - Excellent</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="difficultyRating"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Difficulty (1-5)</FormLabel>
                          <FormControl>
                            <Select onValueChange={(value) => field.onChange(parseInt(value))} defaultValue={field.value.toString()}>
                              <SelectTrigger>
                                <SelectValue placeholder="Rate difficulty" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="1">1 - Very Easy</SelectItem>
                                <SelectItem value="2">2 - Easy</SelectItem>
                                <SelectItem value="3">3 - Medium</SelectItem>
                                <SelectItem value="4">4 - Hard</SelectItem>
                                <SelectItem value="5">5 - Very Hard</SelectItem>
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
                      name="interviewer"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Interviewer Name (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. Sarah Chen" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="interviewerRole"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Interviewer Role (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. Senior Engineer, Manager" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Google Office, Zoom, Phone" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="outcome"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Outcome</FormLabel>
                        <FormControl>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select outcome" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="passed">Passed / Advanced</SelectItem>
                              <SelectItem value="rejected">Rejected</SelectItem>
                              <SelectItem value="pending">Pending / Waiting</SelectItem>
                              <SelectItem value="withdrawn">Withdrawn</SelectItem>
                            </SelectContent>
                          </Select>
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
                          <Input placeholder="e.g. technical, system-design, challenging" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex justify-end space-x-2">
                    <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">Add Experience</Button>
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
            <CardTitle className="text-sm font-medium">Total Interviews</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalExperiences}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Passed</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{passedCount}</div>
            <p className="text-xs text-muted-foreground">
              {totalExperiences > 0 ? ((passedCount / totalExperiences) * 100).toFixed(1) : 0}% success rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rejected</CardTitle>
            <XCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{rejectedCount}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <AlertCircle className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingCount}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Rating</CardTitle>
            <Star className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageRating.toFixed(1)}/5</div>
            <p className="text-xs text-muted-foreground">
              Experience quality
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search experiences..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <Select value={selectedOutcome} onValueChange={setSelectedOutcome}>
          <SelectTrigger className="w-full lg:w-36">
            <SelectValue placeholder="Outcome" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Outcomes</SelectItem>
            <SelectItem value="passed">Passed</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="withdrawn">Withdrawn</SelectItem>
          </SelectContent>
        </Select>

        <Select value={selectedCompany} onValueChange={setSelectedCompany}>
          <SelectTrigger className="w-full lg:w-36">
            <SelectValue placeholder="Company" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Companies</SelectItem>
            {companies.map((company) => (
              <SelectItem key={company} value={company}>
                {company}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedStage} onValueChange={setSelectedStage}>
          <SelectTrigger className="w-full lg:w-36">
            <SelectValue placeholder="Stage" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Stages</SelectItem>
            {stages.map((stage) => (
              <SelectItem key={stage} value={stage}>
                {getStageLabel(stage)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Experiences Grid/List */}
      <div className={viewMode === 'grid' ? 'grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6' : 'space-y-4'}>
        {filteredExperiences.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No interview experiences logged</h3>
            <p className="text-muted-foreground mb-4">
              {searchQuery || selectedOutcome !== 'all' || selectedCompany !== 'all' || selectedStage !== 'all'
                ? 'Try adjusting your filters'
                : 'Start documenting your interview journey'
              }
            </p>
            <Button onClick={() => setIsAddDialogOpen(true)} className="bg-gradient-primary">
              Log Your First Interview
            </Button>
          </div>
        ) : (
          filteredExperiences.map((experience) => {
            const OutcomeIcon = getOutcomeIcon(experience.outcome);

            return (
              <Card key={experience.id} className="transition-all duration-200 hover:shadow-md">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <CardTitle className="text-lg">{experience.company}</CardTitle>
                        <OutcomeIcon className={`h-4 w-4 ${experience.outcome === 'passed' ? 'text-green-600' : experience.outcome === 'rejected' ? 'text-red-600' : experience.outcome === 'pending' ? 'text-yellow-600' : 'text-gray-600'}`} />
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{experience.position}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {new Date(experience.date).toLocaleDateString()}
                        <span>•</span>
                        <Clock className="h-3 w-3" />
                        {formatDuration(experience.duration)}
                        <span>•</span>
                        {getStageLabel(experience.stage)}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Ratings */}
                    <div className="flex justify-between items-center">
                      <div className="text-center">
                        <div className="text-sm text-muted-foreground">Experience</div>
                        <div className="flex items-center gap-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${
                                i < experience.overallRating
                                  ? 'text-yellow-500 fill-current'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-muted-foreground">Difficulty</div>
                        <div className="flex items-center gap-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Target
                              key={i}
                              className={`h-3 w-3 ${
                                i < experience.difficultyRating
                                  ? 'text-red-500 fill-current'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Interview Details */}
                    <div className="flex flex-wrap gap-1">
                      <Badge variant="secondary" className="text-xs">
                        {getTypeLabel(experience.interviewType)}
                      </Badge>
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${getOutcomeColor(experience.outcome)} text-white border-none`}
                      >
                        {experience.outcome}
                      </Badge>
                      {experience.interviewer && (
                        <Badge variant="outline" className="text-xs">
                          {experience.interviewer}
                        </Badge>
                      )}
                    </div>

                    {/* Questions Summary */}
                    {experience.questions.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium mb-1">Questions ({experience.questions.length})</h4>
                        <div className="text-xs text-muted-foreground">
                          {experience.questions.slice(0, 2).map((q, index) => (
                            <div key={index} className="line-clamp-1">
                              • {q.question}
                            </div>
                          ))}
                          {experience.questions.length > 2 && (
                            <div>+{experience.questions.length - 2} more questions</div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Lessons */}
                    {experience.lessons.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium mb-1 flex items-center gap-1">
                          <Lightbulb className="h-3 w-3" />
                          Key Lessons
                        </h4>
                        <div className="text-xs text-muted-foreground">
                          {experience.lessons.slice(0, 2).map((lesson, index) => (
                            <div key={index} className="line-clamp-1">
                              • {lesson}
                            </div>
                          ))}
                          {experience.lessons.length > 2 && (
                            <div>+{experience.lessons.length - 2} more lessons</div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Tags */}
                    {experience.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {experience.tags.slice(0, 3).map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {experience.tags.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{experience.tags.length - 3}
                          </Badge>
                        )}
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-2 pt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => setSelectedExperience(experience)}
                      >
                        <Eye className="h-3 w-3 mr-1" />
                        View Details
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}
