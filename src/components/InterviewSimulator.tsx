import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Mic, MicOff, Play, Square, Volume2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { AIService } from '@/services/AIService';

// Extend Window interface for speech recognition
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

interface Question {
  id: string;
  text: string;
  category: 'technical' | 'behavioral' | 'system-design';
  difficulty: 'easy' | 'medium' | 'hard';
}

const mockQuestions: Question[] = [
  { id: '1', text: "Tell me about yourself and your background", category: 'behavioral', difficulty: 'easy' },
  { id: '2', text: "Explain the difference between var, let, and const in JavaScript", category: 'technical', difficulty: 'medium' },
  { id: '3', text: "Describe a challenging project you worked on", category: 'behavioral', difficulty: 'medium' },
  { id: '4', text: "How would you implement a rate limiter?", category: 'system-design', difficulty: 'hard' },
  { id: '5', text: "What are your strengths and weaknesses?", category: 'behavioral', difficulty: 'easy' },
];

export function InterviewSimulator() {
  const [isRecording, setIsRecording] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [transcript, setTranscript] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isGeneratingFeedback, setIsGeneratingFeedback] = useState(false);
  const [sessionProgress, setSessionProgress] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recognitionRef = useRef<any>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Initialize speech recognition
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        let finalTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          }
        }
        if (finalTranscript) {
          setTranscript(prev => prev + ' ' + finalTranscript);
        }
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        toast({
          title: "Speech Recognition Error",
          description: "Please check your microphone permissions",
          variant: "destructive"
        });
      };
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [toast]);

  const startInterview = () => {
    setCurrentQuestion(mockQuestions[0]);
    setQuestionIndex(0);
    setSessionProgress(0);
    setTranscript('');
    setFeedback('');
    setTimeElapsed(0);
    
    // Read question aloud
    speakQuestion(mockQuestions[0].text);
    
    // Start timer
    timerRef.current = setInterval(() => {
      setTimeElapsed(prev => prev + 1);
    }, 1000);
  };

  const speakQuestion = async (question: string) => {
    try {
      if (AIService.hasApiKey('elevenlabs')) {
        const audioUrl = await AIService.textToSpeech(`Here's your interview question: ${question}. Take your time to think and answer when ready.`);
        const audio = new Audio(audioUrl);
        audio.play();
      } else {
        // Fallback to browser speech synthesis
        const utterance = new SpeechSynthesisUtterance(`Here's your interview question: ${question}. Take your time to think and answer when ready.`);
        speechSynthesis.speak(utterance);
      }
    } catch (error) {
      console.error('Error speaking question:', error);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      if (recognitionRef.current) {
        recognitionRef.current.start();
      }

      setIsRecording(true);
      toast({
        title: "Recording Started",
        description: "Speak your answer clearly"
      });
    } catch (error) {
      console.error('Error starting recording:', error);
      toast({
        title: "Recording Error",
        description: "Please allow microphone access",
        variant: "destructive"
      });
    }
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsRecording(false);
    
    if (transcript.trim()) {
      generateFeedback();
    }
  };

  const generateFeedback = async () => {
    if (!currentQuestion || !transcript.trim()) return;
    
    setIsGeneratingFeedback(true);
    try {
      const feedbackPrompt = `
        Interview Question: "${currentQuestion.text}"
        Category: ${currentQuestion.category}
        Difficulty: ${currentQuestion.difficulty}
        
        Candidate's Answer: "${transcript}"
        
        Please provide constructive feedback on this interview answer including:
        1. Strengths of the response
        2. Areas for improvement
        3. Missing key points
        4. Overall rating (1-10)
        5. Suggestions for better answers
        
        Keep it concise but helpful for interview preparation.
      `;

      const feedbackResponse = await AIService.askStudyQuestion(feedbackPrompt);
      setFeedback(feedbackResponse);
      
      toast({
        title: "Feedback Generated",
        description: "Review your performance below"
      });
    } catch (error) {
      console.error('Error generating feedback:', error);
      toast({
        title: "Feedback Error",
        description: "Could not generate feedback. Check your API keys.",
        variant: "destructive"
      });
    }
    setIsGeneratingFeedback(false);
  };

  const nextQuestion = () => {
    const nextIndex = questionIndex + 1;
    if (nextIndex < mockQuestions.length) {
      setCurrentQuestion(mockQuestions[nextIndex]);
      setQuestionIndex(nextIndex);
      setSessionProgress((nextIndex / mockQuestions.length) * 100);
      setTranscript('');
      setFeedback('');
      speakQuestion(mockQuestions[nextIndex].text);
    } else {
      endInterview();
    }
  };

  const endInterview = () => {
    setCurrentQuestion(null);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    toast({
      title: "Interview Complete!",
      description: `Great job! You completed ${questionIndex + 1} questions in ${Math.floor(timeElapsed / 60)}:${(timeElapsed % 60).toString().padStart(2, '0')}`
    });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'hard': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'technical': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'behavioral': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'system-design': return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>🎯 AI Interview Simulator</span>
            {currentQuestion && (
              <div className="flex items-center gap-4 text-sm">
                <span>⏱️ {formatTime(timeElapsed)}</span>
                <span>📊 {questionIndex + 1}/{mockQuestions.length}</span>
              </div>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {!currentQuestion ? (
            <div className="text-center space-y-4">
              <h3 className="text-xl font-semibold">Ready for your mock interview?</h3>
              <p className="text-muted-foreground">
                Practice with AI-powered questions and get instant feedback on your responses
              </p>
              <Button onClick={startInterview} size="lg" className="w-full max-w-md">
                <Play className="w-4 h-4 mr-2" />
                Start Interview Session
              </Button>
            </div>
          ) : (
            <>
              <div className="space-y-4">
                <Progress value={sessionProgress} className="w-full" />
                
                <Card className="bg-muted/50">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Badge className={getCategoryColor(currentQuestion.category)}>
                        {currentQuestion.category.replace('-', ' ')}
                      </Badge>
                      <Badge className={getDifficultyColor(currentQuestion.difficulty)}>
                        {currentQuestion.difficulty}
                      </Badge>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Question {questionIndex + 1}:</h3>
                    <p className="text-foreground">{currentQuestion.text}</p>
                  </CardContent>
                </Card>

                <div className="flex justify-center gap-4">
                  <Button
                    onClick={isRecording ? stopRecording : startRecording}
                    variant={isRecording ? "destructive" : "default"}
                    size="lg"
                  >
                    {isRecording ? (
                      <>
                        <Square className="w-4 h-4 mr-2" />
                        Stop Recording
                      </>
                    ) : (
                      <>
                        <Mic className="w-4 h-4 mr-2" />
                        Start Recording Answer
                      </>
                    )}
                  </Button>
                  
                  <Button
                    onClick={() => speakQuestion(currentQuestion.text)}
                    variant="outline"
                  >
                    <Volume2 className="w-4 h-4 mr-2" />
                    Repeat Question
                  </Button>
                </div>

                {transcript && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">Your Answer:</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm bg-muted p-3 rounded">{transcript}</p>
                    </CardContent>
                  </Card>
                )}

                {isGeneratingFeedback && (
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                        <span>Generating AI feedback...</span>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {feedback && (
                  <Card className="border-primary">
                    <CardHeader>
                      <CardTitle className="text-sm flex items-center gap-2">
                        🤖 AI Feedback
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="whitespace-pre-wrap text-sm">{feedback}</div>
                      <div className="mt-4 flex gap-2">
                        <Button onClick={nextQuestion} className="flex-1">
                          {questionIndex < mockQuestions.length - 1 ? 'Next Question' : 'Finish Interview'}
                        </Button>
                        <Button variant="outline" onClick={() => setTranscript('')}>
                          Try Again
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}