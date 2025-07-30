import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { AIService } from '@/services/AIService';
import { Resource } from '@/types/resource';
import {
  ExternalLink,
  Volume2,
  VolumeX,
  Sparkles,
  FileText,
  Loader,
  Brain,
  Globe
} from 'lucide-react';
import { toast } from 'react-toastify';

interface SmartResourceCardProps {
  resource: Resource;
  onUpdate: (id: string, updates: Partial<Resource>) => void;
}

export function SmartResourceCard({ resource, onUpdate }: SmartResourceCardProps) {
  const [isExtracting, setIsExtracting] = useState(false);
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [extractedContent, setExtractedContent] = useState('');

  const hasElevenLabsKey = AIService.hasApiKey('elevenlabs');
  const hasFirecrawlKey = AIService.hasApiKey('firecrawl');
  const hasPerplexityKey = AIService.hasApiKey('perplexity');

  const handleExtractContent = async () => {
    if (!resource.url || !hasFirecrawlKey) {
      toast.error('URL and Firecrawl API key required for content extraction');
      return;
    }

    setIsExtracting(true);
    try {
      const extracted = await AIService.extractUrlContent(resource.url);
      setExtractedContent(extracted.content);
      
      // Update resource with extracted content
      onUpdate(resource.id, {
        notes: (resource.notes || '') + '\n\n--- Extracted Content ---\n' + extracted.content.substring(0, 1000) + '...',
        description: extracted.description || resource.description
      });
      
      toast.success('Content extracted successfully!');
    } catch (error) {
      toast.error('Failed to extract content');
      console.error('Error extracting content:', error);
    } finally {
      setIsExtracting(false);
    }
  };

  const handleSummarizeContent = async () => {
    if (!hasPerplexityKey) {
      toast.error('Perplexity API key required for summarization');
      return;
    }

    const contentToSummarize = extractedContent || resource.notes || resource.description;
    if (!contentToSummarize) {
      toast.error('No content available to summarize');
      return;
    }

    setIsSummarizing(true);
    try {
      const summary = await AIService.summarizeResource(contentToSummarize);
      
      // Update resource with AI summary
      onUpdate(resource.id, {
        notes: (resource.notes || '') + '\n\n--- AI Summary ---\n' + summary
      });
      
      toast.success('Content summarized!');
    } catch (error) {
      toast.error('Failed to summarize content');
      console.error('Error summarizing:', error);
    } finally {
      setIsSummarizing(false);
    }
  };

  const handleTextToSpeech = async () => {
    if (!hasElevenLabsKey) {
      toast.error('ElevenLabs API key required for text-to-speech');
      return;
    }

    if (isPlaying) {
      // Stop current audio
      if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
        setCurrentAudio(null);
        setIsPlaying(false);
      }
      return;
    }

    const textToRead = resource.notes || resource.description || resource.title;
    if (!textToRead) {
      toast.error('No text content to read');
      return;
    }

    try {
      setIsPlaying(true);
      const audioUrl = await AIService.textToSpeech(textToRead.substring(0, 1000)); // Limit text length
      const audio = new Audio(audioUrl);
      
      audio.onended = () => {
        setIsPlaying(false);
        setCurrentAudio(null);
      };

      audio.onerror = () => {
        toast.error('Failed to play audio');
        setIsPlaying(false);
        setCurrentAudio(null);
      };

      setCurrentAudio(audio);
      await audio.play();
      toast.success('Playing audio...');
    } catch (error) {
      toast.error('Failed to convert text to speech');
      setIsPlaying(false);
      console.error('Error with text-to-speech:', error);
    }
  };

  const getStatusColor = (status: Resource['status']) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'not-started': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: Resource['priority']) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="relative overflow-hidden transition-all duration-200 hover:shadow-lg">
      {/* AI Feature Indicator */}
      <div className="absolute top-2 right-2">
        <Badge variant="outline" className="text-xs bg-gradient-primary text-white border-none">
          <Sparkles className="h-3 w-3 mr-1" />
          AI Enhanced
        </Badge>
      </div>

      <CardHeader className="pb-3">
        <div className="flex items-start justify-between pr-20">
          <div className="space-y-2">
            <CardTitle className="text-lg leading-tight">{resource.title}</CardTitle>
            <div className="flex flex-wrap gap-2">
              <Badge className={getStatusColor(resource.status)}>
                {resource.status.replace('-', ' ')}
              </Badge>
              <Badge className={getPriorityColor(resource.priority)}>
                {resource.priority} priority
              </Badge>
              {resource.type && (
                <Badge variant="outline">{resource.type}</Badge>
              )}
            </div>
          </div>
        </div>
        
        {resource.description && (
          <p className="text-sm text-muted-foreground mt-2">{resource.description}</p>
        )}
      </CardHeader>

      <CardContent className="space-y-4">
        {/* AI Action Buttons */}
        <div className="flex flex-wrap gap-2">
          {resource.url && (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={handleExtractContent}
                disabled={isExtracting || !hasFirecrawlKey}
                className="text-xs"
              >
                {isExtracting ? (
                  <Loader className="h-3 w-3 mr-1 animate-spin" />
                ) : (
                  <Globe className="h-3 w-3 mr-1" />
                )}
                {isExtracting ? 'Extracting...' : 'Extract Content'}
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                asChild
              >
                <a href={resource.url} target="_blank" rel="noopener noreferrer" className="text-xs">
                  <ExternalLink className="h-3 w-3 mr-1" />
                  Open Link
                </a>
              </Button>
            </>
          )}

          <Button
            variant="outline"
            size="sm"
            onClick={handleSummarizeContent}
            disabled={isSummarizing || !hasPerplexityKey}
            className="text-xs"
          >
            {isSummarizing ? (
              <Loader className="h-3 w-3 mr-1 animate-spin" />
            ) : (
              <Brain className="h-3 w-3 mr-1" />
            )}
            {isSummarizing ? 'Summarizing...' : 'AI Summary'}
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handleTextToSpeech}
            disabled={!hasElevenLabsKey}
            className="text-xs"
          >
            {isPlaying ? (
              <VolumeX className="h-3 w-3 mr-1" />
            ) : (
              <Volume2 className="h-3 w-3 mr-1" />
            )}
            {isPlaying ? 'Stop' : 'Listen'}
          </Button>
        </div>

        {/* Tags */}
        {resource.tags && resource.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {resource.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {/* Notes */}
        {resource.notes && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Notes</span>
            </div>
            <div className="text-sm text-muted-foreground p-3 bg-muted rounded-lg max-h-32 overflow-y-auto">
              <pre className="whitespace-pre-wrap font-sans">{resource.notes}</pre>
            </div>
          </div>
        )}

        {/* Progress and Time Info */}
        <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground">
          {resource.timeSpent && (
            <div>
              <span className="font-medium">Time Spent:</span> {Math.round(resource.timeSpent / 60)}h
            </div>
          )}
          {resource.estimatedTime && (
            <div>
              <span className="font-medium">Estimated:</span> {Math.round(resource.estimatedTime / 60)}h
            </div>
          )}
          {resource.dueDate && (
            <div className="col-span-2">
              <span className="font-medium">Due:</span> {new Date(resource.dueDate).toLocaleDateString()}
            </div>
          )}
        </div>

        {/* API Key Warnings */}
        <div className="space-y-1">
          {!hasFirecrawlKey && resource.url && (
            <p className="text-xs text-amber-600">
              💡 Set Firecrawl API key to extract content from URLs
            </p>
          )}
          {!hasPerplexityKey && (
            <p className="text-xs text-amber-600">
              💡 Set Perplexity API key for AI summaries
            </p>
          )}
          {!hasElevenLabsKey && (
            <p className="text-xs text-amber-600">
              💡 Set ElevenLabs API key for text-to-speech
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}