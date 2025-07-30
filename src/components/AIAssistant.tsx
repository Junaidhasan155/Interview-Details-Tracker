import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AIService } from '@/services/AIService';
import { Brain, MessageSquare, Loader, Sparkles, Volume2, VolumeX } from 'lucide-react';
import { toast } from 'react-toastify';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [question, setQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);
  const [playingMessageId, setPlayingMessageId] = useState<string | null>(null);

  const hasPerplexityKey = AIService.hasApiKey('perplexity');
  const hasElevenLabsKey = AIService.hasApiKey('elevenlabs');

  const handleAskQuestion = async () => {
    if (!question.trim() || isLoading) return;
    if (!hasPerplexityKey) {
      toast.error('Please set up your Perplexity API key first!');
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: question,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setQuestion('');
    setIsLoading(true);

    try {
      const response = await AIService.askStudyQuestion(question);
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
      toast.success('Got your answer!');
    } catch (error) {
      toast.error('Failed to get response. Check your API key!');
      console.error('Error asking question:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTextToSpeech = async (messageId: string, text: string) => {
    if (!hasElevenLabsKey) {
      toast.error('Please set up your ElevenLabs API key to use text-to-speech!');
      return;
    }

    if (playingMessageId === messageId) {
      // Stop current audio
      if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
        setCurrentAudio(null);
        setPlayingMessageId(null);
      }
      return;
    }

    try {
      // Stop any currently playing audio
      if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
      }

      setPlayingMessageId(messageId);
      const audioUrl = await AIService.textToSpeech(text);
      const audio = new Audio(audioUrl);
      
      audio.onended = () => {
        setPlayingMessageId(null);
        setCurrentAudio(null);
      };

      audio.onerror = () => {
        toast.error('Failed to play audio');
        setPlayingMessageId(null);
        setCurrentAudio(null);
      };

      setCurrentAudio(audio);
      await audio.play();
      toast.success('Playing audio...');
    } catch (error) {
      toast.error('Failed to convert text to speech');
      setPlayingMessageId(null);
      console.error('Error with text-to-speech:', error);
    }
  };

  const suggestedQuestions = [
    "What are the most common behavioral interview questions?",
    "How do I prepare for system design interviews?",
    "What's the STAR method for answering behavioral questions?",
    "How to approach coding interview problems?",
    "What questions should I ask at the end of an interview?"
  ];

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="border-b">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gradient-primary">
            <Brain className="h-6 w-6 text-white" />
          </div>
          <div>
            <CardTitle className="flex items-center gap-2">
              AI Study Assistant
              <Badge variant="outline" className="text-xs">
                <Sparkles className="h-3 w-3 mr-1" />
                Powered by AI
              </Badge>
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Ask questions about interview preparation, coding, or career advice
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6 space-y-6">
        {!hasPerplexityKey && (
          <div className="p-4 border border-amber-200 bg-amber-50 rounded-lg">
            <p className="text-sm text-amber-800">
              🔑 To use the AI assistant, you need to set up your Perplexity API key. 
              Visit the <strong>AI Settings</strong> tab to configure it.
            </p>
          </div>
        )}

        {/* Messages */}
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {messages.length === 0 ? (
            <div className="text-center py-8">
              <MessageSquare className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="font-semibold mb-2">Start a conversation</h3>
              <p className="text-sm text-muted-foreground">
                Ask me anything about interview preparation!
              </p>
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.type === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    {message.type === 'assistant' && hasElevenLabsKey && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0 flex-shrink-0"
                        onClick={() => handleTextToSpeech(message.id, message.content)}
                      >
                        {playingMessageId === message.id ? (
                          <VolumeX className="h-3 w-3" />
                        ) : (
                          <Volume2 className="h-3 w-3" />
                        )}
                      </Button>
                    )}
                  </div>
                  <div className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              </div>
            ))
          )}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-muted p-3 rounded-lg flex items-center gap-2">
                <Loader className="h-4 w-4 animate-spin" />
                <span className="text-sm">AI is thinking...</span>
              </div>
            </div>
          )}
        </div>

        {/* Suggested Questions */}
        {messages.length === 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium">Suggested questions:</p>
            <div className="flex flex-wrap gap-2">
              {suggestedQuestions.map((suggestion, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="text-xs"
                  onClick={() => setQuestion(suggestion)}
                  disabled={!hasPerplexityKey}
                >
                  {suggestion}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="flex gap-2">
          <Textarea
            placeholder="Ask me anything about interview preparation..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleAskQuestion();
              }
            }}
            className="min-h-[60px] resize-none"
            disabled={!hasPerplexityKey}
          />
          <Button
            onClick={handleAskQuestion}
            disabled={!question.trim() || isLoading || !hasPerplexityKey}
            className="bg-gradient-primary"
          >
            {isLoading ? (
              <Loader className="h-4 w-4 animate-spin" />
            ) : (
              'Ask'
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}