import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AIService } from '@/services/AIService';
import { Key, Eye, EyeOff, CheckCircle, AlertCircle, ExternalLink } from 'lucide-react';
import { toast } from 'react-toastify';

export function AISettings() {
  const [apiKeys, setApiKeys] = useState({
    perplexity: AIService.getApiKey('perplexity') || '',
    elevenlabs: AIService.getApiKey('elevenlabs') || '',
    firecrawl: AIService.getApiKey('firecrawl') || '',
  });

  const [showKeys, setShowKeys] = useState({
    perplexity: false,
    elevenlabs: false,
    firecrawl: false,
  });

  const [testingKeys, setTestingKeys] = useState({
    perplexity: false,
    elevenlabs: false,
    firecrawl: false,
  });

  const handleSaveKey = (service: keyof typeof apiKeys) => {
    const key = apiKeys[service];
    if (!key.trim()) {
      toast.error('Please enter a valid API key');
      return;
    }

    AIService.saveApiKey(service, key);
    toast.success(`${service.charAt(0).toUpperCase() + service.slice(1)} API key saved!`);
  };

  const handleTestKey = async (service: keyof typeof apiKeys) => {
    const key = apiKeys[service];
    if (!key.trim()) {
      toast.error('Please enter an API key first');
      return;
    }

    setTestingKeys(prev => ({ ...prev, [service]: true }));

    try {
      // Simple test based on service
      if (service === 'perplexity') {
        const response = await fetch('https://api.perplexity.ai/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${key}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'llama-3.1-sonar-small-128k-online',
            messages: [{ role: 'user', content: 'Hello' }],
            max_tokens: 10
          }),
        });
        
        if (response.ok) {
          toast.success('Perplexity API key is valid!');
        } else {
          throw new Error('Invalid API key');
        }
      } else if (service === 'elevenlabs') {
        const response = await fetch('https://api.elevenlabs.io/v1/voices', {
          headers: { 'xi-api-key': key }
        });
        
        if (response.ok) {
          toast.success('ElevenLabs API key is valid!');
        } else {
          throw new Error('Invalid API key');
        }
      } else if (service === 'firecrawl') {
        // For Firecrawl, we'll just save it - testing requires actual scraping
        toast.success('Firecrawl API key saved! (Will be tested on first use)');
      }
    } catch (error) {
      toast.error(`${service.charAt(0).toUpperCase() + service.slice(1)} API key is invalid!`);
    } finally {
      setTestingKeys(prev => ({ ...prev, [service]: false }));
    }
  };

  const services = [
    {
      key: 'perplexity' as const,
      name: 'Perplexity AI',
      description: 'Powers the AI Study Assistant for answering questions',
      website: 'https://www.perplexity.ai/',
      features: ['AI Study Assistant', 'Question Answering', 'Content Summarization']
    },
    {
      key: 'elevenlabs' as const,
      name: 'ElevenLabs',
      description: 'Text-to-speech for study materials',
      website: 'https://elevenlabs.io/',
      features: ['Text-to-Speech', 'Voice Reading', 'Audio Study Materials']
    },
    {
      key: 'firecrawl' as const,
      name: 'Firecrawl',
      description: 'Smart content extraction from URLs',
      website: 'https://www.firecrawl.dev/',
      features: ['URL Content Extraction', 'Web Scraping', 'Auto-summarization']
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">AI Settings</h2>
        <p className="text-muted-foreground">
          Configure your API keys to unlock powerful AI features for interview preparation
        </p>
      </div>

      <div className="grid gap-6">
        {services.map((service) => {
          const hasKey = !!AIService.getApiKey(service.key);
          
          return (
            <Card key={service.key} className="relative">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-lg">{service.name}</CardTitle>
                      {hasKey ? (
                        <Badge variant="default" className="bg-green-100 text-green-800">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Configured
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="border-amber-200 text-amber-800">
                          <AlertCircle className="h-3 w-3 mr-1" />
                          Not Set
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{service.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {service.features.map((feature) => (
                        <Badge key={feature} variant="secondary" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                  >
                    <a href={service.website} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-1" />
                      Get API Key
                    </a>
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor={`${service.key}-key`}>API Key</Label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Input
                        id={`${service.key}-key`}
                        type={showKeys[service.key] ? 'text' : 'password'}
                        placeholder={`Enter your ${service.name} API key`}
                        value={apiKeys[service.key]}
                        onChange={(e) =>
                          setApiKeys(prev => ({ ...prev, [service.key]: e.target.value }))
                        }
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 p-0"
                        onClick={() =>
                          setShowKeys(prev => ({ ...prev, [service.key]: !prev[service.key] }))
                        }
                      >
                        {showKeys[service.key] ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    <Button
                      onClick={() => handleTestKey(service.key)}
                      disabled={!apiKeys[service.key].trim() || testingKeys[service.key]}
                      variant="outline"
                    >
                      {testingKeys[service.key] ? 'Testing...' : 'Test'}
                    </Button>
                    <Button
                      onClick={() => handleSaveKey(service.key)}
                      disabled={!apiKeys[service.key].trim()}
                    >
                      Save
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-lg bg-blue-100">
              <Key className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold mb-2">🚀 Free Features Included!</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• <strong>Background Removal:</strong> Remove backgrounds from images (runs in browser)</li>
                <li>• <strong>Smart Search:</strong> AI-powered resource search using embeddings</li>
                <li>• <strong>Content Analysis:</strong> Text processing and similarity matching</li>
              </ul>
              <p className="text-xs text-muted-foreground mt-2">
                These features use Hugging Face Transformers and run directly in your browser - no API keys needed!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}