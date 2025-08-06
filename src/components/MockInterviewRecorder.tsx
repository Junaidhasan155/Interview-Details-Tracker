import { useState, useEffect, useRef } from 'react';
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
  Play, 
  Pause, 
  Square, 
  Video, 
  VideoOff, 
  Mic, 
  MicOff,
  Camera,
  Settings,
  Clock,
  RotateCcw,
  Save,
  Download,
  Trash2,
  Star,
  Volume2,
  VolumeX,
  MonitorSpeaker,
  Smartphone,
  Laptop,
  Eye,
  BarChart3,
  MessageSquare,
  TrendingUp,
  Timer,
  FileText
} from 'lucide-react';

export interface MockInterview {
  id: string;
  title: string;
  description?: string;
  type: 'behavioral' | 'technical' | 'system-design' | 'coding' | 'general';
  duration: number; // in seconds
  recordingUrl?: string;
  audioUrl?: string;
  thumbnail?: string;
  transcript?: string;
  questions: InterviewQuestion[];
  responses: InterviewResponse[];
  analysis?: InterviewAnalysis;
  createdAt: string;
  completedAt?: string;
  isStarred: boolean;
  tags: string[];
}

export interface InterviewQuestion {
  id: string;
  question: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  timeAllotted: number; // in seconds
  tips?: string[];
}

export interface InterviewResponse {
  id: string;
  questionId: string;
  startTime: number;
  endTime: number;
  audioBlob?: Blob;
  videoBlob?: Blob;
  transcript?: string;
  selfRating?: number; // 1-5
  notes?: string;
}

export interface InterviewAnalysis {
  overallScore: number;
  strengths: string[];
  areasForImprovement: string[];
  speakingPace: 'too-slow' | 'good' | 'too-fast';
  fillerWords: number;
  eyeContact: 'poor' | 'fair' | 'good' | 'excellent';
  confidence: number; // 1-5
  clarity: number; // 1-5
  recommendations: string[];
}

const mockInterviewSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().optional(),
  type: z.enum(['behavioral', 'technical', 'system-design', 'coding', 'general']),
  tags: z.string().optional()
});

type MockInterviewFormData = z.infer<typeof mockInterviewSchema>;

const INTERVIEW_TYPES = [
  { id: 'behavioral', label: 'Behavioral', description: 'STAR method, leadership, teamwork' },
  { id: 'technical', label: 'Technical', description: 'Technology concepts, problem solving' },
  { id: 'system-design', label: 'System Design', description: 'Architecture, scalability, trade-offs' },
  { id: 'coding', label: 'Coding', description: 'Live coding, algorithms, data structures' },
  { id: 'general', label: 'General', description: 'Mixed questions, company culture' }
];

const SAMPLE_QUESTIONS = {
  behavioral: [
    {
      question: "Tell me about a time when you had to work with a difficult team member.",
      category: "teamwork",
      difficulty: "medium" as const,
      timeAllotted: 180,
      tips: ["Use STAR method", "Focus on resolution", "Show leadership"]
    },
    {
      question: "Describe a situation where you had to learn something new quickly.",
      category: "adaptability",
      difficulty: "easy" as const,
      timeAllotted: 120,
      tips: ["Show curiosity", "Mention resources used", "Highlight results"]
    }
  ],
  technical: [
    {
      question: "Explain the difference between synchronous and asynchronous programming.",
      category: "programming-concepts",
      difficulty: "medium" as const,
      timeAllotted: 300,
      tips: ["Use examples", "Mention use cases", "Discuss trade-offs"]
    },
    {
      question: "What is a database index and how does it improve query performance?",
      category: "databases",
      difficulty: "medium" as const,
      timeAllotted: 240,
      tips: ["Explain with examples", "Mention trade-offs", "Discuss types"]
    }
  ]
};

export function MockInterviewRecorder() {
  const [interviews, setInterviews] = useState<MockInterview[]>([]);
  const [currentInterview, setCurrentInterview] = useState<MockInterview | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isSetupDialogOpen, setIsSetupDialogOpen] = useState(false);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [selectedDevice, setSelectedDevice] = useState<'webcam' | 'phone' | 'professional'>('webcam');
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const form = useForm<MockInterviewFormData>({
    resolver: zodResolver(mockInterviewSchema),
    defaultValues: {
      title: '',
      description: '',
      type: 'behavioral',
      tags: ''
    }
  });

  // Load interviews from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('mock-interviews');
    if (saved) {
      setInterviews(JSON.parse(saved));
    }
  }, []);

  // Save interviews to localStorage
  useEffect(() => {
    if (interviews.length > 0) {
      localStorage.setItem('mock-interviews', JSON.stringify(interviews));
    }
  }, [interviews]);

  // Timer for recording
  useEffect(() => {
    if (isRecording && !isPaused) {
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isRecording, isPaused]);

  const initializeCamera = async () => {
    try {
      const constraints = {
        video: isVideoEnabled ? {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'user'
        } : false,
        audio: isAudioEnabled ? {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 44100
        } : false
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;

      if (videoRef.current && isVideoEnabled) {
        videoRef.current.srcObject = stream;
      }

      return stream;
    } catch (error) {
      toast.error('Failed to access camera/microphone. Please check permissions.');
      throw error;
    }
  };

  const startRecording = async () => {
    try {
      const stream = await initializeCamera();
      
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'video/webm;codecs=vp9'
      });

      recordedChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(recordedChunksRef.current, { type: 'video/webm' });
        saveRecording(blob);
      };

      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);
      toast.success('Recording started!');
    } catch (error) {
      toast.error('Failed to start recording');
    }
  };

  const pauseRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      if (isPaused) {
        mediaRecorderRef.current.resume();
        setIsPaused(false);
        toast.success('Recording resumed');
      } else {
        mediaRecorderRef.current.pause();
        setIsPaused(true);
        toast.success('Recording paused');
      }
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setIsPaused(false);
      
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      
      toast.success('Recording stopped and saved!');
    }
  };

  const saveRecording = (blob: Blob) => {
    if (!currentInterview) return;

    const recordingUrl = URL.createObjectURL(blob);
    const updatedInterview: MockInterview = {
      ...currentInterview,
      recordingUrl,
      duration: recordingTime,
      completedAt: new Date().toISOString(),
      analysis: generateMockAnalysis()
    };

    setInterviews(prev => prev.map(interview => 
      interview.id === currentInterview.id ? updatedInterview : interview
    ));

    setCurrentInterview(updatedInterview);
  };

  const generateMockAnalysis = (): InterviewAnalysis => {
    // This is a mock analysis - in a real app, you'd use AI/ML for actual analysis
    return {
      overallScore: Math.floor(Math.random() * 3) + 3, // 3-5
      strengths: [
        'Clear communication',
        'Good structure in responses',
        'Confident delivery'
      ],
      areasForImprovement: [
        'Could provide more specific examples',
        'Consider speaking slightly slower',
        'More eye contact with camera'
      ],
      speakingPace: 'good',
      fillerWords: Math.floor(Math.random() * 10) + 5,
      eyeContact: 'good',
      confidence: Math.floor(Math.random() * 2) + 4, // 4-5
      clarity: Math.floor(Math.random() * 2) + 4, // 4-5
      recommendations: [
        'Practice the STAR method for behavioral questions',
        'Record yourself more often to improve comfort on camera',
        'Prepare specific examples from your experience'
      ]
    };
  };

  const createNewInterview = (data: MockInterviewFormData) => {
    const questionPool = SAMPLE_QUESTIONS[data.type as keyof typeof SAMPLE_QUESTIONS] || SAMPLE_QUESTIONS.behavioral;
    const selectedQuestions = questionPool.slice(0, 3).map((q, index) => ({
      id: `q${index + 1}`,
      ...q
    }));

    const newInterview: MockInterview = {
      id: Math.random().toString(36).substr(2, 9),
      title: data.title,
      description: data.description,
      type: data.type,
      duration: 0,
      questions: selectedQuestions,
      responses: [],
      createdAt: new Date().toISOString(),
      isStarred: false,
      tags: data.tags ? data.tags.split(',').map(tag => tag.trim()) : []
    };

    setInterviews(prev => [newInterview, ...prev]);
    setCurrentInterview(newInterview);
    setCurrentQuestionIndex(0);
    form.reset();
    setIsSetupDialogOpen(false);
    toast.success('Mock interview session created!');
  };

  const nextQuestion = () => {
    if (currentInterview && currentQuestionIndex < currentInterview.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const toggleStar = (interviewId: string) => {
    setInterviews(prev => prev.map(interview =>
      interview.id === interviewId
        ? { ...interview, isStarred: !interview.isStarred }
        : interview
    ));
  };

  const deleteInterview = (interviewId: string) => {
    setInterviews(prev => prev.filter(interview => interview.id !== interviewId));
    if (currentInterview?.id === interviewId) {
      setCurrentInterview(null);
    }
    toast.success('Interview deleted');
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'behavioral': return 'bg-blue-500';
      case 'technical': return 'bg-green-500';
      case 'system-design': return 'bg-purple-500';
      case 'coding': return 'bg-orange-500';
      case 'general': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  // Recording Session View
  if (currentInterview && !currentInterview.completedAt) {
    const currentQuestion = currentInterview.questions[currentQuestionIndex];

    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 p-4">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">{currentInterview.title}</h2>
              <p className="text-muted-foreground">Mock Interview Session</p>
            </div>
            <Button
              variant="outline"
              onClick={() => setCurrentInterview(null)}
            >
              Exit Session
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Video Preview */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Video Preview</span>
                    <div className="flex items-center gap-2">
                      <Badge variant={isRecording ? 'destructive' : 'secondary'}>
                        {isRecording ? (isPaused ? 'PAUSED' : 'RECORDING') : 'READY'}
                      </Badge>
                      {isRecording && (
                        <div className="flex items-center gap-1 text-sm">
                          <Clock className="h-3 w-3" />
                          {formatTime(recordingTime)}
                        </div>
                      )}
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
                    {isVideoEnabled ? (
                      <video
                        ref={videoRef}
                        autoPlay
                        muted
                        playsInline
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white">
                        <div className="text-center">
                          <VideoOff className="h-12 w-12 mx-auto mb-2" />
                          <p>Video Disabled</p>
                        </div>
                      </div>
                    )}
                    
                    {/* Recording Controls Overlay */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                      <div className="flex items-center gap-2 bg-black/50 backdrop-blur-sm rounded-lg p-2">
                        {!isRecording ? (
                          <Button
                            onClick={startRecording}
                            className="bg-red-600 hover:bg-red-700 text-white"
                          >
                            <Video className="h-4 w-4 mr-2" />
                            Start Recording
                          </Button>
                        ) : (
                          <>
                            <Button
                              variant="outline"
                              onClick={pauseRecording}
                              className="text-white border-white hover:bg-white/20"
                            >
                              {isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
                            </Button>
                            <Button
                              onClick={stopRecording}
                              className="bg-red-600 hover:bg-red-700 text-white"
                            >
                              <Square className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                        
                        <Button
                          variant="outline"
                          onClick={() => setIsVideoEnabled(!isVideoEnabled)}
                          className="text-white border-white hover:bg-white/20"
                        >
                          {isVideoEnabled ? <Video className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
                        </Button>
                        
                        <Button
                          variant="outline"
                          onClick={() => setIsAudioEnabled(!isAudioEnabled)}
                          className="text-white border-white hover:bg-white/20"
                        >
                          {isAudioEnabled ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Question Panel */}
            <div className="space-y-6">
              {/* Current Question */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Question {currentQuestionIndex + 1} of {currentInterview.questions.length}</span>
                    <Badge className={`${getTypeColor(currentInterview.type)} text-white`}>
                      {INTERVIEW_TYPES.find(t => t.id === currentInterview.type)?.label}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">{currentQuestion.question}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Timer className="h-3 w-3" />
                      {Math.floor(currentQuestion.timeAllotted / 60)} minutes
                      <Badge variant="outline" className="text-xs">
                        {currentQuestion.difficulty}
                      </Badge>
                    </div>
                  </div>

                  {currentQuestion.tips && (
                    <div>
                      <h4 className="text-sm font-medium mb-2">Tips:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {currentQuestion.tips.map((tip, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span>•</span>
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Navigation */}
                  <div className="flex justify-between pt-4">
                    <Button
                      variant="outline"
                      onClick={prevQuestion}
                      disabled={currentQuestionIndex === 0}
                    >
                      Previous
                    </Button>
                    <Button
                      variant="outline"
                      onClick={nextQuestion}
                      disabled={currentQuestionIndex === currentInterview.questions.length - 1}
                    >
                      Next
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Session Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" className="w-full">
                    <FileText className="h-4 w-4 mr-2" />
                    Take Notes
                  </Button>
                  <Button variant="outline" className="w-full">
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Restart Question
                  </Button>
                  <Button variant="outline" className="w-full" onClick={() => setCurrentInterview(null)}>
                    <Save className="h-4 w-4 mr-2" />
                    Save & Exit
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Mock Interview Recorder</h2>
          <p className="text-muted-foreground">Practice interviews with video recording and AI feedback</p>
        </div>

        <Dialog open={isSetupDialogOpen} onOpenChange={setIsSetupDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-primary">
              <Video className="h-4 w-4 mr-2" />
              Start New Session
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Setup Mock Interview</DialogTitle>
              <DialogDescription>
                Configure your mock interview session
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(createNewInterview)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Session Title</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Senior Engineer Behavioral Interview" {...field} />
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

                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Interview Type</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select interview type" />
                          </SelectTrigger>
                          <SelectContent>
                            {INTERVIEW_TYPES.map((type) => (
                              <SelectItem key={type.id} value={type.id}>
                                <div>
                                  <div className="font-medium">{type.label}</div>
                                  <div className="text-xs text-muted-foreground">{type.description}</div>
                                </div>
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
                  name="tags"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tags (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. google, senior, system-design" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Device Selection */}
                <div className="space-y-3">
                  <label className="text-sm font-medium">Recording Setup</label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <Button
                      type="button"
                      variant={selectedDevice === 'webcam' ? 'default' : 'outline'}
                      onClick={() => setSelectedDevice('webcam')}
                      className="h-auto p-3"
                    >
                      <div className="text-center">
                        <Laptop className="h-5 w-5 mx-auto mb-1" />
                        <div className="text-xs">Webcam</div>
                      </div>
                    </Button>
                    <Button
                      type="button"
                      variant={selectedDevice === 'phone' ? 'default' : 'outline'}
                      onClick={() => setSelectedDevice('phone')}
                      className="h-auto p-3"
                    >
                      <div className="text-center">
                        <Smartphone className="h-5 w-5 mx-auto mb-1" />
                        <div className="text-xs">Phone</div>
                      </div>
                    </Button>
                    <Button
                      type="button"
                      variant={selectedDevice === 'professional' ? 'default' : 'outline'}
                      onClick={() => setSelectedDevice('professional')}
                      className="h-auto p-3"
                    >
                      <div className="text-center">
                        <Camera className="h-5 w-5 mx-auto mb-1" />
                        <div className="text-xs">Professional</div>
                      </div>
                    </Button>
                  </div>
                </div>

                {/* Recording Options */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={isVideoEnabled}
                        onChange={(e) => setIsVideoEnabled(e.target.checked)}
                      />
                      <Video className="h-4 w-4" />
                      Video
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={isAudioEnabled}
                        onChange={(e) => setIsAudioEnabled(e.target.checked)}
                      />
                      <Mic className="h-4 w-4" />
                      Audio
                    </label>
                  </div>
                </div>

                <div className="flex justify-end space-x-2">
                  <Button type="button" variant="outline" onClick={() => setIsSetupDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Create Session</Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Previous Sessions */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Recent Sessions</h3>
        
        {interviews.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Video className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No mock interviews yet</h3>
              <p className="text-muted-foreground text-center mb-4">
                Start your first mock interview session to practice and improve your skills
              </p>
              <Button onClick={() => setIsSetupDialogOpen(true)} className="bg-gradient-primary">
                Start First Session
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {interviews.map((interview) => (
              <Card key={interview.id} className="transition-all duration-200 hover:shadow-md">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-base flex items-center gap-2">
                        {interview.title}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleStar(interview.id)}
                          className={interview.isStarred ? 'text-yellow-600' : 'text-muted-foreground'}
                        >
                          <Star className={`h-3 w-3 ${interview.isStarred ? 'fill-current' : ''}`} />
                        </Button>
                      </CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${getTypeColor(interview.type)} text-white border-none`}
                        >
                          {INTERVIEW_TYPES.find(t => t.id === interview.type)?.label}
                        </Badge>
                        {interview.completedAt && (
                          <Badge variant="secondary" className="text-xs">
                            Completed
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {interview.description && (
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {interview.description}
                      </p>
                    )}

                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{new Date(interview.createdAt).toLocaleDateString()}</span>
                      {interview.duration > 0 && (
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {formatTime(interview.duration)}
                        </span>
                      )}
                    </div>

                    {interview.analysis && (
                      <div className="bg-muted rounded-lg p-3">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">Overall Score</span>
                          <div className="flex items-center gap-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3 w-3 ${
                                  i < interview.analysis!.overallScore
                                    ? 'text-yellow-500 fill-current'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div>
                            <span className="text-muted-foreground">Confidence:</span>
                            <span className="ml-1">{interview.analysis.confidence}/5</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Clarity:</span>
                            <span className="ml-1">{interview.analysis.clarity}/5</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {interview.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {interview.tags.slice(0, 3).map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {interview.tags.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{interview.tags.length - 3}
                          </Badge>
                        )}
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-2 pt-2">
                      {interview.completedAt ? (
                        <>
                          <Button variant="outline" size="sm" className="flex-1">
                            <Eye className="h-3 w-3 mr-1" />
                            Review
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="h-3 w-3" />
                          </Button>
                        </>
                      ) : (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1"
                          onClick={() => setCurrentInterview(interview)}
                        >
                          <Play className="h-3 w-3 mr-1" />
                          Continue
                        </Button>
                      )}
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => deleteInterview(interview.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
