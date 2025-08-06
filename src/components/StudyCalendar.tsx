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
import { Calendar, Plus, Clock, Target, BookOpen, Code, Users, Brain, CheckCircle, Circle, ArrowLeft, ArrowRight } from 'lucide-react';

export interface StudySession {
  id: string;
  title: string;
  description?: string;
  date: string;
  startTime: string;
  endTime: string;
  category: 'technical' | 'behavioral' | 'system-design' | 'coding' | 'practice' | 'review';
  priority: 'low' | 'medium' | 'high';
  isCompleted: boolean;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

const sessionSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().optional(),
  date: z.string().min(1, 'Date is required'),
  startTime: z.string().min(1, 'Start time is required'),
  endTime: z.string().min(1, 'End time is required'),
  category: z.enum(['technical', 'behavioral', 'system-design', 'coding', 'practice', 'review']),
  priority: z.enum(['low', 'medium', 'high']),
  tags: z.string().optional()
});

type SessionFormData = z.infer<typeof sessionSchema>;

const CATEGORIES = [
  { id: 'technical', label: 'Technical Interview', icon: Brain, color: 'bg-blue-500' },
  { id: 'behavioral', label: 'Behavioral Interview', icon: Users, color: 'bg-green-500' },
  { id: 'system-design', label: 'System Design', icon: Target, color: 'bg-purple-500' },
  { id: 'coding', label: 'Coding Practice', icon: Code, color: 'bg-orange-500' },
  { id: 'practice', label: 'Mock Interview', icon: BookOpen, color: 'bg-red-500' },
  { id: 'review', label: 'Review Session', icon: CheckCircle, color: 'bg-gray-500' }
];

const SAMPLE_SESSIONS: Omit<StudySession, 'id' | 'createdAt' | 'updatedAt'>[] = [
  {
    title: 'JavaScript Fundamentals Review',
    description: 'Review closures, promises, async/await, and event loop',
    date: new Date().toISOString().split('T')[0],
    startTime: '10:00',
    endTime: '11:30',
    category: 'technical',
    priority: 'high',
    isCompleted: false,
    tags: ['javascript', 'fundamentals']
  },
  {
    title: 'System Design: Design a Chat Application',
    description: 'Practice designing a real-time chat system like WhatsApp',
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Tomorrow
    startTime: '14:00',
    endTime: '16:00',
    category: 'system-design',
    priority: 'medium',
    isCompleted: false,
    tags: ['system-design', 'real-time', 'scalability']
  },
  {
    title: 'Behavioral Questions Practice',
    description: 'Practice STAR method for common behavioral questions',
    date: new Date(Date.now() + 172800000).toISOString().split('T')[0], // Day after tomorrow
    startTime: '09:00',
    endTime: '10:00',
    category: 'behavioral',
    priority: 'medium',
    isCompleted: false,
    tags: ['behavioral', 'star-method']
  }
];

export function StudyCalendar() {
  const [sessions, setSessions] = useState<StudySession[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('calendar');
  
  const form = useForm<SessionFormData>({
    resolver: zodResolver(sessionSchema),
    defaultValues: {
      title: '',
      description: '',
      date: selectedDate,
      startTime: '',
      endTime: '',
      category: 'technical',
      priority: 'medium',
      tags: ''
    }
  });

  // Load sessions on component mount
  useEffect(() => {
    const saved = localStorage.getItem('study-sessions');
    if (saved) {
      setSessions(JSON.parse(saved));
    } else {
      // Initialize with sample sessions
      const initialSessions = SAMPLE_SESSIONS.map(s => ({
        ...s,
        id: Math.random().toString(36).substr(2, 9),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }));
      setSessions(initialSessions);
      localStorage.setItem('study-sessions', JSON.stringify(initialSessions));
    }
  }, []);

  // Save sessions to localStorage
  useEffect(() => {
    if (sessions.length > 0) {
      localStorage.setItem('study-sessions', JSON.stringify(sessions));
    }
  }, [sessions]);

  // Update form date when selected date changes
  useEffect(() => {
    form.setValue('date', selectedDate);
  }, [selectedDate, form]);

  const handleAddSession = (data: SessionFormData) => {
    const newSession: StudySession = {
      id: Math.random().toString(36).substr(2, 9),
      title: data.title,
      description: data.description,
      date: data.date,
      startTime: data.startTime,
      endTime: data.endTime,
      category: data.category,
      priority: data.priority,
      isCompleted: false,
      tags: data.tags ? data.tags.split(',').map(tag => tag.trim()) : [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setSessions(prev => [...prev, newSession].sort((a, b) => {
      const dateCompare = a.date.localeCompare(b.date);
      if (dateCompare !== 0) return dateCompare;
      return a.startTime.localeCompare(b.startTime);
    }));
    
    form.reset();
    setIsAddDialogOpen(false);
    toast.success('Study session scheduled!');
  };

  const toggleCompleted = (id: string) => {
    setSessions(prev => prev.map(s => 
      s.id === id ? { ...s, isCompleted: !s.isCompleted, updatedAt: new Date().toISOString() } : s
    ));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getCategoryData = (category: string) => {
    return CATEGORIES.find(c => c.id === category) || CATEGORIES[0];
  };

  // Get sessions for selected date
  const getSessionsForDate = (date: string) => {
    return sessions.filter(s => s.date === date).sort((a, b) => a.startTime.localeCompare(b.startTime));
  };

  // Get sessions for current week
  const getWeekSessions = () => {
    const startOfWeek = new Date(selectedDate);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day;
    startOfWeek.setDate(diff);

    const weekSessions = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      const dateStr = date.toISOString().split('T')[0];
      weekSessions.push({
        date: dateStr,
        dayName: date.toLocaleDateString('en-US', { weekday: 'short' }),
        dayNumber: date.getDate(),
        sessions: getSessionsForDate(dateStr)
      });
    }
    return weekSessions;
  };

  // Statistics
  const totalSessions = sessions.length;
  const completedCount = sessions.filter(s => s.isCompleted).length;
  const todaysSessions = getSessionsForDate(new Date().toISOString().split('T')[0]);
  const upcomingSessions = sessions.filter(s => s.date >= new Date().toISOString().split('T')[0] && !s.isCompleted);
  const completionRate = totalSessions > 0 ? (completedCount / totalSessions) * 100 : 0;

  const navigateWeek = (direction: 'prev' | 'next') => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7));
    setSelectedDate(newDate.toISOString().split('T')[0]);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Study Calendar</h2>
          <p className="text-muted-foreground">Plan and track your interview preparation sessions</p>
        </div>

        <div className="flex gap-2">
          <Button
            variant={viewMode === 'calendar' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('calendar')}
          >
            <Calendar className="h-4 w-4 mr-2" />
            Calendar
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('list')}
          >
            <Clock className="h-4 w-4 mr-2" />
            List
          </Button>

          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-primary">
                <Plus className="h-4 w-4 mr-2" />
                Schedule Session
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Schedule Study Session</DialogTitle>
                <DialogDescription>
                  Plan your interview preparation session
                </DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleAddSession)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Session Title</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. JavaScript Interview Prep" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description (Optional)</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="What will you focus on in this session?"
                            className="min-h-[80px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="date"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Date</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="startTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Start Time</FormLabel>
                          <FormControl>
                            <Input type="time" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="endTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>End Time</FormLabel>
                          <FormControl>
                            <Input type="time" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

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
                      name="priority"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Priority</FormLabel>
                          <FormControl>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select priority" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="low">Low</SelectItem>
                                <SelectItem value="medium">Medium</SelectItem>
                                <SelectItem value="high">High</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="tags"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tags (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. javascript, algorithms, react" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex justify-end space-x-2">
                    <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">Schedule Session</Button>
                  </div>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sessions</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalSessions}</div>
            <p className="text-xs text-muted-foreground">
              {completionRate.toFixed(1)}% completed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Sessions</CardTitle>
            <Clock className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todaysSessions.length}</div>
            <p className="text-xs text-muted-foreground">
              {todaysSessions.filter(s => s.isCompleted).length} completed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming</CardTitle>
            <Target className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{upcomingSessions.length}</div>
            <p className="text-xs text-muted-foreground">
              Sessions planned
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedCount}</div>
            <p className="text-xs text-muted-foreground">
              Sessions finished
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Calendar/List View */}
      {viewMode === 'calendar' ? (
        <div className="space-y-4">
          {/* Week Navigation */}
          <div className="flex items-center justify-between">
            <Button variant="outline" size="sm" onClick={() => navigateWeek('prev')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous Week
            </Button>
            <h3 className="text-lg font-semibold">
              Week of {new Date(selectedDate).toLocaleDateString('en-US', { 
                month: 'long', 
                day: 'numeric',
                year: 'numeric'
              })}
            </h3>
            <Button variant="outline" size="sm" onClick={() => navigateWeek('next')}>
              Next Week
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>

          {/* Week View */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-4">
            {getWeekSessions().map((day) => (
              <Card 
                key={day.date} 
                className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                  day.date === selectedDate ? 'ring-2 ring-primary' : ''
                } ${
                  day.date === new Date().toISOString().split('T')[0] ? 'border-primary' : ''
                }`}
                onClick={() => setSelectedDate(day.date)}
              >
                <CardHeader className="pb-2">
                  <div className="text-center">
                    <div className="text-sm font-medium text-muted-foreground">{day.dayName}</div>
                    <div className="text-lg font-bold">{day.dayNumber}</div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-1">
                    {day.sessions.slice(0, 3).map((session) => {
                      const categoryData = getCategoryData(session.category);
                      const Icon = categoryData.icon;
                      
                      return (
                        <div 
                          key={session.id}
                          className={`p-2 rounded text-xs ${categoryData.color} text-white`}
                        >
                          <div className="flex items-center gap-1">
                            <Icon className="h-3 w-3" />
                            <span className="truncate">{session.title}</span>
                          </div>
                          <div className="text-xs opacity-75">
                            {session.startTime} - {session.endTime}
                          </div>
                        </div>
                      );
                    })}
                    {day.sessions.length > 3 && (
                      <div className="text-xs text-muted-foreground text-center py-1">
                        +{day.sessions.length - 3} more
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Selected Day Sessions */}
          {getSessionsForDate(selectedDate).length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>
                  Sessions for {new Date(selectedDate).toLocaleDateString('en-US', { 
                    weekday: 'long',
                    month: 'long', 
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {getSessionsForDate(selectedDate).map((session) => {
                    const categoryData = getCategoryData(session.category);
                    const Icon = categoryData.icon;
                    
                    return (
                      <div 
                        key={session.id}
                        className="flex items-start justify-between p-3 rounded-lg border bg-card"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <div className={`p-1 rounded ${categoryData.color} text-white`}>
                              <Icon className="h-3 w-3" />
                            </div>
                            <h4 className={`font-medium ${session.isCompleted ? 'line-through text-muted-foreground' : ''}`}>
                              {session.title}
                            </h4>
                            <Badge 
                              variant="outline" 
                              className={`text-xs ${getPriorityColor(session.priority)} text-white border-none`}
                            >
                              {session.priority}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            {session.startTime} - {session.endTime}
                          </p>
                          {session.description && (
                            <p className="text-sm text-muted-foreground mb-2">
                              {session.description}
                            </p>
                          )}
                          {session.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1">
                              {session.tags.map((tag, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleCompleted(session.id)}
                          className={session.isCompleted ? 'text-green-600' : 'text-muted-foreground'}
                        >
                          {session.isCompleted ? (
                            <CheckCircle className="h-4 w-4" />
                          ) : (
                            <Circle className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      ) : (
        // List View
        <div className="space-y-4">
          {sessions.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No sessions scheduled</h3>
              <p className="text-muted-foreground mb-4">
                Start planning your interview preparation schedule
              </p>
              <Button onClick={() => setIsAddDialogOpen(true)} className="bg-gradient-primary">
                Schedule First Session
              </Button>
            </div>
          ) : (
            sessions.map((session) => {
              const categoryData = getCategoryData(session.category);
              const Icon = categoryData.icon;
              const sessionDate = new Date(session.date);
              const isToday = session.date === new Date().toISOString().split('T')[0];
              const isPast = session.date < new Date().toISOString().split('T')[0];
              
              return (
                <Card key={session.id} className={`transition-all duration-200 hover:shadow-md ${isToday ? 'border-primary' : ''}`}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <div className={`p-1 rounded ${categoryData.color} text-white`}>
                            <Icon className="h-3 w-3" />
                          </div>
                          <h4 className={`font-medium ${session.isCompleted ? 'line-through text-muted-foreground' : ''}`}>
                            {session.title}
                          </h4>
                          <Badge variant="secondary" className="text-xs">
                            {categoryData.label}
                          </Badge>
                          <Badge 
                            variant="outline" 
                            className={`text-xs ${getPriorityColor(session.priority)} text-white border-none`}
                          >
                            {session.priority}
                          </Badge>
                          {isToday && <Badge className="text-xs bg-primary">Today</Badge>}
                          {isPast && !session.isCompleted && <Badge variant="destructive" className="text-xs">Overdue</Badge>}
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                          <span>{sessionDate.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</span>
                          <span>{session.startTime} - {session.endTime}</span>
                        </div>
                        
                        {session.description && (
                          <p className="text-sm text-muted-foreground mb-2">
                            {session.description}
                          </p>
                        )}
                        
                        {session.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {session.tags.map((tag, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleCompleted(session.id)}
                        className={session.isCompleted ? 'text-green-600' : 'text-muted-foreground'}
                      >
                        {session.isCompleted ? (
                          <CheckCircle className="h-4 w-4" />
                        ) : (
                          <Circle className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}
