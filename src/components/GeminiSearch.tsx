import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { 
  Search, 
  Sparkles, 
  Loader, 
  Brain, 
  BookOpen, 
  Code, 
  Users, 
  Target,
  Copy,
  ThumbsUp,
  ThumbsDown,
  RefreshCw,
  Star,
  Lightbulb,
  Zap,
  MessageSquare,
  History,
  Bookmark
} from 'lucide-react';

interface SearchResult {
  id: string;
  query: string;
  response: string;
  category: 'technical' | 'behavioral' | 'system-design' | 'career' | 'company' | 'general';
  timestamp: string;
  isBookmarked: boolean;
  rating?: 'helpful' | 'not-helpful';
  followUpSuggestions: string[];
}

interface SearchSuggestion {
  text: string;
  category: string;
  icon: any;
}

const SEARCH_SUGGESTIONS: SearchSuggestion[] = [
  { text: "How to explain my career gap in interviews?", category: "behavioral", icon: Users },
  { text: "System design for a messaging app like WhatsApp", category: "system-design", icon: Target },
  { text: "JavaScript closure interview questions", category: "technical", icon: Code },
  { text: "How to negotiate salary for senior developer role?", category: "career", icon: Brain },
  { text: "Google company culture and interview process", category: "company", icon: BookOpen },
  { text: "Best practices for technical presentations", category: "general", icon: Lightbulb }
];

const QUICK_ACTIONS = [
  { label: "Interview Tips", query: "Give me 5 essential tips for technical interviews", icon: Target },
  { label: "Common Questions", query: "What are the most common behavioral interview questions?", icon: MessageSquare },
  { label: "Salary Guide", query: "How to research and negotiate software engineer salaries", icon: Brain },
  { label: "Company Research", query: "How to research a company before an interview", icon: BookOpen }
];

// Mock Gemini API responses - in real implementation, this would call the actual Gemini API
const generateMockResponse = (query: string): string => {
  const responses: { [key: string]: string } = {
    "javascript": `Here's a comprehensive guide to JavaScript interview questions:

**Key Concepts to Master:**
1. **Closures**: Functions that have access to outer scope variables
2. **Promises & Async/Await**: Handle asynchronous operations
3. **Event Loop**: Understanding how JavaScript handles concurrency
4. **Prototypal Inheritance**: How objects inherit from other objects
5. **Hoisting**: Variable and function declaration behavior

**Common Questions:**
- Explain the difference between let, const, and var
- What is a closure and when would you use one?
- How does the event loop work?
- What's the difference between == and ===?

**Best Practices:**
- Always use const for constants, let for variables
- Prefer async/await over promise chains
- Handle errors with try/catch blocks
- Use meaningful variable names`,

    "system design": `System Design Interview Strategy:

**Step-by-Step Approach:**
1. **Clarify Requirements** (5-10 minutes)
   - Ask about scale (users, data, requests/second)
   - Define functional requirements
   - Identify non-functional requirements

2. **High-Level Design** (10-15 minutes)
   - Draw major components
   - Show data flow
   - Identify key services

3. **Detailed Design** (15-20 minutes)
   - Database schema
   - API design
   - Caching strategy
   - Load balancing

4. **Scale & Optimize** (5-10 minutes)
   - Identify bottlenecks
   - Discuss scaling solutions
   - Address edge cases

**Key Technologies:**
- Load Balancers: Nginx, HAProxy
- Databases: PostgreSQL, MongoDB, Redis
- Message Queues: RabbitMQ, Apache Kafka
- Caching: Redis, Memcached
- CDN: CloudFlare, AWS CloudFront`,

    "behavioral": `Mastering Behavioral Interviews with STAR Method:

**STAR Framework:**
- **Situation**: Set the context
- **Task**: Describe your responsibility
- **Action**: Explain what you did
- **Result**: Share the outcome

**Top 10 Behavioral Questions:**
1. Tell me about a challenging project you worked on
2. Describe a time you had to work with a difficult team member
3. How do you handle tight deadlines and pressure?
4. Give an example of when you showed leadership
5. Describe a failure and what you learned from it
6. How do you handle constructive criticism?
7. Tell me about a time you had to learn something new quickly
8. Describe a time you went above and beyond
9. How do you prioritize multiple competing tasks?
10. Why do you want to work here?

**Pro Tips:**
- Prepare 3-5 diverse stories that can answer multiple questions
- Focus on your specific contributions
- Always end with measurable results
- Practice out loud to improve delivery`,

    "career": `Strategic Career Development for Software Engineers:

**Salary Negotiation Tips:**
1. **Research Market Rates**
   - Use Glassdoor, levels.fyi, Blind
   - Consider location and company size
   - Factor in total compensation (equity, benefits)

2. **Negotiation Strategy**
   - Never accept the first offer immediately
   - Ask for 24-48 hours to consider
   - Negotiate total package, not just salary
   - Be prepared to walk away

3. **Building Leverage**
   - Multiple competing offers
   - Strong performance reviews
   - Unique skills or experience
   - Market demand for your expertise

**Career Growth Path:**
- Junior → Mid-level (2-4 years)
- Mid-level → Senior (3-5 years)
- Senior → Staff/Principal (5+ years)
- Technical track vs Management track

**Skills to Develop:**
- Technical depth in your domain
- System design and architecture
- Communication and leadership
- Business understanding`,

    "default": `I'm here to help with your interview preparation! I can assist with:

**Technical Topics:**
- JavaScript, Python, Java, and other programming languages
- Data structures and algorithms
- System design and architecture
- Database design and optimization

**Interview Preparation:**
- Behavioral interview strategies
- Technical interview tips
- Salary negotiation advice
- Company research techniques

**Career Development:**
- Resume and portfolio optimization
- Networking strategies
- Skill development roadmaps
- Industry trends and insights

**Quick Tips:**
1. Practice coding problems daily
2. Prepare STAR method stories
3. Research the company thoroughly
4. Ask thoughtful questions
5. Follow up after interviews

What specific area would you like to explore today?`
  };

  // Simple keyword matching for demo
  const query_lower = query.toLowerCase();
  if (query_lower.includes('javascript') || query_lower.includes('js')) {
    return responses.javascript;
  } else if (query_lower.includes('system design') || query_lower.includes('architecture')) {
    return responses['system design'];
  } else if (query_lower.includes('behavioral') || query_lower.includes('star') || query_lower.includes('tell me about')) {
    return responses.behavioral;
  } else if (query_lower.includes('salary') || query_lower.includes('career') || query_lower.includes('negotiate')) {
    return responses.career;
  } else {
    return responses.default;
  }
};

export function GeminiSearch() {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchHistory, setSearchHistory] = useState<SearchResult[]>([]);
  const [currentResult, setCurrentResult] = useState<SearchResult | null>(null);
  const [showHistory, setShowHistory] = useState(false);

  // Load search history from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('gemini-search-history');
    if (saved) {
      setSearchHistory(JSON.parse(saved));
    }
  }, []);

  // Save search history to localStorage
  const saveToHistory = (result: SearchResult) => {
    const updated = [result, ...searchHistory.slice(0, 19)]; // Keep last 20 searches
    setSearchHistory(updated);
    localStorage.setItem('gemini-search-history', JSON.stringify(updated));
  };

  const handleSearch = async (searchQuery: string = query) => {
    if (!searchQuery.trim()) {
      toast.error('Please enter a search query');
      return;
    }

    setIsLoading(true);
    console.log('Starting search for:', searchQuery);

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

      const response = generateMockResponse(searchQuery);
      console.log('Generated response:', response.substring(0, 100) + '...');

      // Determine category based on query
      let category: SearchResult['category'] = 'general';
      const queryLower = searchQuery.toLowerCase();
      if (queryLower.includes('javascript') || queryLower.includes('code') || queryLower.includes('algorithm')) {
        category = 'technical';
      } else if (queryLower.includes('behavioral') || queryLower.includes('tell me about') || queryLower.includes('teamwork')) {
        category = 'behavioral';
      } else if (queryLower.includes('system design') || queryLower.includes('architecture')) {
        category = 'system-design';
      } else if (queryLower.includes('salary') || queryLower.includes('career') || queryLower.includes('growth')) {
        category = 'career';
      } else if (queryLower.includes('company') || queryLower.includes('culture') || queryLower.includes('research')) {
        category = 'company';
      }

      // Generate follow-up suggestions
      const followUpSuggestions = [
        "Can you provide more specific examples?",
        "How does this apply to senior-level positions?",
        "What are common mistakes to avoid?",
        "Can you give me practice questions?"
      ];

      const result: SearchResult = {
        id: Math.random().toString(36).substr(2, 9),
        query: searchQuery,
        response,
        category,
        timestamp: new Date().toISOString(),
        isBookmarked: false,
        followUpSuggestions
      };

      console.log('Setting current result:', result.id);
      setCurrentResult(result);
      saveToHistory(result);
      setQuery('');
      toast.success('Search completed!');

    } catch (error) {
      console.error('Search error:', error);
      toast.error('Search failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickAction = (actionQuery: string) => {
    setQuery(actionQuery);
    handleSearch(actionQuery);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    handleSearch(suggestion);
  };

  const copyResponse = () => {
    if (currentResult) {
      navigator.clipboard.writeText(currentResult.response);
      toast.success('Response copied to clipboard!');
    }
  };

  const toggleBookmark = (resultId: string) => {
    const updated = searchHistory.map(result =>
      result.id === resultId ? { ...result, isBookmarked: !result.isBookmarked } : result
    );
    setSearchHistory(updated);
    localStorage.setItem('gemini-search-history', JSON.stringify(updated));
    
    if (currentResult?.id === resultId) {
      setCurrentResult(prev => prev ? { ...prev, isBookmarked: !prev.isBookmarked } : null);
    }
  };

  const rateResponse = (resultId: string, rating: 'helpful' | 'not-helpful') => {
    const updated = searchHistory.map(result =>
      result.id === resultId ? { ...result, rating } : result
    );
    setSearchHistory(updated);
    localStorage.setItem('gemini-search-history', JSON.stringify(updated));
    
    if (currentResult?.id === resultId) {
      setCurrentResult(prev => prev ? { ...prev, rating } : null);
    }
    
    toast.success('Thank you for your feedback!');
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'technical': return 'bg-blue-500';
      case 'behavioral': return 'bg-green-500';
      case 'system-design': return 'bg-purple-500';
      case 'career': return 'bg-orange-500';
      case 'company': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'technical': return Code;
      case 'behavioral': return Users;
      case 'system-design': return Target;
      case 'career': return Brain;
      case 'company': return BookOpen;
      default: return MessageSquare;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-purple-500" />
            Gemini AI Search
          </h2>
          <p className="text-muted-foreground">Get AI-powered insights for your interview preparation</p>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setShowHistory(!showHistory)}
            className="flex items-center gap-2"
          >
            <History className="h-4 w-4" />
            History ({searchHistory.length})
          </Button>
          <Button
            variant="outline"
            onClick={() => setCurrentResult(null)}
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            New Search
          </Button>
        </div>
      </div>

      {/* Search Interface */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Ask Gemini Anything
          </CardTitle>
          <CardDescription>
            Get instant answers about interview prep, coding concepts, career advice, and more
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="e.g., How to prepare for system design interviews at Google?"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="flex-1"
              disabled={isLoading}
            />
            <Button 
              onClick={() => handleSearch()} 
              disabled={isLoading || !query.trim()}
              className="bg-gradient-primary"
            >
              {isLoading ? (
                <Loader className="h-4 w-4 animate-spin" />
              ) : (
                <Search className="h-4 w-4" />
              )}
            </Button>
          </div>

          {/* Quick Actions */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Quick Actions:</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
              {QUICK_ACTIONS.map((action, index) => {
                const Icon = action.icon;
                return (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuickAction(action.query)}
                    disabled={isLoading}
                    className="h-auto p-3 text-left justify-start"
                  >
                    <Icon className="h-4 w-4 mr-2 flex-shrink-0" />
                    <span className="text-xs">{action.label}</span>
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Search Suggestions */}
          {!currentResult && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Popular Searches:</h4>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                {SEARCH_SUGGESTIONS.map((suggestion, index) => {
                  const Icon = suggestion.icon;
                  return (
                    <Button
                      key={index}
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSuggestionClick(suggestion.text)}
                      disabled={isLoading}
                      className="h-auto p-3 text-left justify-start hover:bg-muted"
                    >
                      <Icon className="h-4 w-4 mr-2 flex-shrink-0" />
                      <span className="text-xs">{suggestion.text}</span>
                    </Button>
                  );
                })}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Search Result */}
      {currentResult && (
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="flex items-center gap-2 mb-2">
                  <MessageSquare className="h-5 w-5" />
                  Search Result
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${getCategoryColor(currentResult.category)} text-white border-none`}
                  >
                    {currentResult.category.replace('-', ' ')}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {new Date(currentResult.timestamp).toLocaleString()}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleBookmark(currentResult.id)}
                  className={currentResult.isBookmarked ? 'text-yellow-600' : 'text-muted-foreground'}
                >
                  <Bookmark className={`h-4 w-4 ${currentResult.isBookmarked ? 'fill-current' : ''}`} />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={copyResponse}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Query */}
            <div className="bg-muted p-3 rounded-lg">
              <p className="text-sm font-medium mb-1">Your Question:</p>
              <p className="text-sm">{currentResult.query}</p>
            </div>

            {/* Response */}
            <div className="space-y-3">
              <p className="text-sm font-medium flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-purple-500" />
                Gemini's Response:
              </p>
              <div className="prose prose-sm max-w-none">
                <pre className="whitespace-pre-wrap text-sm leading-relaxed">
                  {currentResult.response}
                </pre>
              </div>
            </div>

            {/* Follow-up Questions */}
            <div className="space-y-2">
              <p className="text-sm font-medium">Follow-up Questions:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {currentResult.followUpSuggestions.map((suggestion, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => handleSuggestionClick(suggestion)}
                    disabled={isLoading}
                    className="text-xs h-auto p-2 justify-start"
                  >
                    <Lightbulb className="h-3 w-3 mr-2" />
                    {suggestion}
                  </Button>
                ))}
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center justify-between pt-3 border-t">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Was this helpful?</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => rateResponse(currentResult.id, 'helpful')}
                  className={currentResult.rating === 'helpful' ? 'text-green-600' : 'text-muted-foreground'}
                >
                  <ThumbsUp className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => rateResponse(currentResult.id, 'not-helpful')}
                  className={currentResult.rating === 'not-helpful' ? 'text-red-600' : 'text-muted-foreground'}
                >
                  <ThumbsDown className="h-4 w-4" />
                </Button>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setQuery(currentResult.query)}
              >
                Search Again
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search History */}
      {showHistory && searchHistory.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <History className="h-5 w-5" />
              Search History
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {searchHistory.map((result) => {
                const CategoryIcon = getCategoryIcon(result.category);
                return (
                  <div
                    key={result.id}
                    className="flex items-start justify-between p-3 rounded-lg border hover:bg-muted cursor-pointer"
                    onClick={() => setCurrentResult(result)}
                  >
                    <div className="flex items-start gap-3 flex-1">
                      <CategoryIcon className="h-4 w-4 mt-1 text-muted-foreground" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium line-clamp-1">{result.query}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge 
                            variant="outline" 
                            className={`text-xs ${getCategoryColor(result.category)} text-white border-none`}
                          >
                            {result.category.replace('-', ' ')}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {new Date(result.timestamp).toLocaleDateString()}
                          </span>
                          {result.isBookmarked && (
                            <Bookmark className="h-3 w-3 text-yellow-600 fill-current" />
                          )}
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleBookmark(result.id);
                      }}
                      className={result.isBookmarked ? 'text-yellow-600' : 'text-muted-foreground'}
                    >
                      <Bookmark className={`h-4 w-4 ${result.isBookmarked ? 'fill-current' : ''}`} />
                    </Button>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Loading State */}
      {isLoading && (
        <Card>
          <CardContent className="flex items-center justify-center py-12">
            <div className="text-center">
              <Sparkles className="h-8 w-8 animate-pulse text-purple-500 mx-auto mb-4" />
              <p className="text-muted-foreground">Gemini is thinking...</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
