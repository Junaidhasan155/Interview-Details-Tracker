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
  RotateCcw, 
  ChevronRight, 
  ChevronLeft, 
  BookOpen, 
  Brain, 
  Code, 
  Database, 
  Users, 
  Target,
  Star,
  CheckCircle,
  X,
  Shuffle,
  Play,
  Pause,
  SkipForward
} from 'lucide-react';

export interface Flashcard {
  id: string;
  front: string;
  back: string;
  category: 'javascript' | 'react' | 'algorithms' | 'system-design' | 'database' | 'general';
  difficulty: 'easy' | 'medium' | 'hard';
  tags: string[];
  confidence: 0 | 1 | 2 | 3 | 4; // 0 = haven't seen, 1 = hard, 2 = medium, 3 = easy, 4 = mastered
  lastReviewed?: string;
  reviewCount: number;
  correctCount: number;
  createdAt: string;
  updatedAt: string;
}

const flashcardSchema = z.object({
  front: z.string().min(5, 'Front content must be at least 5 characters'),
  back: z.string().min(5, 'Back content must be at least 5 characters'),
  category: z.enum(['javascript', 'react', 'algorithms', 'system-design', 'database', 'general']),
  difficulty: z.enum(['easy', 'medium', 'hard']),
  tags: z.string().optional()
});

type FlashcardFormData = z.infer<typeof flashcardSchema>;

const CATEGORIES = [
  { id: 'javascript', label: 'JavaScript', icon: Code, color: 'bg-yellow-500' },
  { id: 'react', label: 'React', icon: Brain, color: 'bg-blue-500' },
  { id: 'algorithms', label: 'Algorithms', icon: Target, color: 'bg-purple-500' },
  { id: 'system-design', label: 'System Design', icon: Users, color: 'bg-green-500' },
  { id: 'database', label: 'Database', icon: Database, color: 'bg-red-500' },
  { id: 'general', label: 'General', icon: BookOpen, color: 'bg-gray-500' }
];

const SAMPLE_FLASHCARDS: Omit<Flashcard, 'id' | 'createdAt' | 'updatedAt'>[] = [
  {
    front: "What is a closure in JavaScript?",
    back: "A closure is a function that has access to variables in its outer (enclosing) scope even after the outer function has returned. It gives you access to an outer function's scope from an inner function.",
    category: 'javascript',
    difficulty: 'medium',
    tags: ['closures', 'scope', 'functions'],
    confidence: 0,
    reviewCount: 0,
    correctCount: 0
  },
  {
    front: "What is the difference between useEffect and useLayoutEffect?",
    back: "useEffect runs after the DOM has been painted, while useLayoutEffect runs synchronously after all DOM mutations but before the browser paints. useLayoutEffect is useful when you need to make DOM measurements or mutations that affect layout.",
    category: 'react',
    difficulty: 'hard',
    tags: ['hooks', 'useEffect', 'useLayoutEffect'],
    confidence: 0,
    reviewCount: 0,
    correctCount: 0
  },
  {
    front: "What is the time complexity of binary search?",
    back: "O(log n) because with each comparison, we eliminate half of the remaining elements. In the worst case, we need to divide the array log₂(n) times.",
    category: 'algorithms',
    difficulty: 'easy',
    tags: ['binary-search', 'time-complexity', 'big-o'],
    confidence: 0,
    reviewCount: 0,
    correctCount: 0
  },
  {
    front: "What is database normalization?",
    back: "Database normalization is the process of organizing data in a database to reduce redundancy and improve data integrity. It involves dividing large tables into smaller tables and defining relationships between them according to rules called normal forms (1NF, 2NF, 3NF, etc.).",
    category: 'database',
    difficulty: 'medium',
    tags: ['normalization', 'database-design', 'integrity'],
    confidence: 0,
    reviewCount: 0,
    correctCount: 0
  }
];

export function FlashcardSystem() {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [filteredCards, setFilteredCards] = useState<Flashcard[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [studyMode, setStudyMode] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [studyCards, setStudyCards] = useState<Flashcard[]>([]);
  
  const form = useForm<FlashcardFormData>({
    resolver: zodResolver(flashcardSchema),
    defaultValues: {
      front: '',
      back: '',
      category: 'javascript',
      difficulty: 'medium',
      tags: ''
    }
  });

  // Load flashcards on component mount
  useEffect(() => {
    const saved = localStorage.getItem('flashcards');
    if (saved) {
      setFlashcards(JSON.parse(saved));
    } else {
      // Initialize with sample flashcards
      const initialFlashcards = SAMPLE_FLASHCARDS.map(card => ({
        ...card,
        id: Math.random().toString(36).substr(2, 9),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }));
      setFlashcards(initialFlashcards);
      localStorage.setItem('flashcards', JSON.stringify(initialFlashcards));
    }
  }, []);

  // Save flashcards to localStorage
  useEffect(() => {
    if (flashcards.length > 0) {
      localStorage.setItem('flashcards', JSON.stringify(flashcards));
    }
  }, [flashcards]);

  // Filter flashcards
  useEffect(() => {
    let filtered = flashcards;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(card => card.category === selectedCategory);
    }

    if (selectedDifficulty !== 'all') {
      filtered = filtered.filter(card => card.difficulty === selectedDifficulty);
    }

    if (searchQuery) {
      filtered = filtered.filter(card => 
        card.front.toLowerCase().includes(searchQuery.toLowerCase()) ||
        card.back.toLowerCase().includes(searchQuery.toLowerCase()) ||
        card.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    setFilteredCards(filtered);
  }, [flashcards, selectedCategory, selectedDifficulty, searchQuery]);

  const handleAddFlashcard = (data: FlashcardFormData) => {
    const newCard: Flashcard = {
      id: Math.random().toString(36).substr(2, 9),
      front: data.front,
      back: data.back,
      category: data.category,
      difficulty: data.difficulty,
      tags: data.tags ? data.tags.split(',').map(tag => tag.trim()) : [],
      confidence: 0,
      reviewCount: 0,
      correctCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setFlashcards(prev => [newCard, ...prev]);
    form.reset();
    setIsAddDialogOpen(false);
    toast.success('Flashcard created successfully!');
  };

  const startStudySession = () => {
    const cardsToStudy = [...filteredCards].sort(() => Math.random() - 0.5);
    setStudyCards(cardsToStudy);
    setCurrentCardIndex(0);
    setShowAnswer(false);
    setStudyMode(true);
    if (cardsToStudy.length === 0) {
      toast.error('No cards available for study session');
      return;
    }
    toast.success(`Study session started with ${cardsToStudy.length} cards!`);
  };

  const endStudySession = () => {
    setStudyMode(false);
    setStudyCards([]);
    setCurrentCardIndex(0);
    setShowAnswer(false);
    toast.success('Study session completed!');
  };

  const handleConfidenceRating = (rating: 1 | 2 | 3 | 4) => {
    if (studyCards.length === 0) return;
    
    const currentCard = studyCards[currentCardIndex];
    const isCorrect = rating >= 3;
    
    setFlashcards(prev => prev.map(card => 
      card.id === currentCard.id 
        ? {
            ...card,
            confidence: rating,
            reviewCount: card.reviewCount + 1,
            correctCount: isCorrect ? card.correctCount + 1 : card.correctCount,
            lastReviewed: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }
        : card
    ));

    // Move to next card
    if (currentCardIndex < studyCards.length - 1) {
      setCurrentCardIndex(prev => prev + 1);
      setShowAnswer(false);
    } else {
      endStudySession();
    }
  };

  const nextCard = () => {
    if (currentCardIndex < studyCards.length - 1) {
      setCurrentCardIndex(prev => prev + 1);
      setShowAnswer(false);
    }
  };

  const prevCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(prev => prev - 1);
      setShowAnswer(false);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      case 'hard': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getConfidenceColor = (confidence: number) => {
    switch (confidence) {
      case 0: return 'bg-gray-400';
      case 1: return 'bg-red-500';
      case 2: return 'bg-orange-500';
      case 3: return 'bg-yellow-500';
      case 4: return 'bg-green-500';
      default: return 'bg-gray-400';
    }
  };

  const getConfidenceLabel = (confidence: number) => {
    switch (confidence) {
      case 0: return 'New';
      case 1: return 'Hard';
      case 2: return 'Medium';
      case 3: return 'Easy';
      case 4: return 'Mastered';
      default: return 'Unknown';
    }
  };

  const getCategoryData = (category: string) => {
    return CATEGORIES.find(c => c.id === category) || CATEGORIES[0];
  };

  // Statistics
  const totalCards = flashcards.length;
  const masteredCards = flashcards.filter(card => card.confidence === 4).length;
  const reviewedCards = flashcards.filter(card => card.reviewCount > 0).length;
  const averageConfidence = flashcards.length > 0 
    ? flashcards.reduce((sum, card) => sum + card.confidence, 0) / flashcards.length 
    : 0;

  if (studyMode) {
    const currentCard = studyCards[currentCardIndex];
    if (!currentCard) {
      return <div>No cards to study</div>;
    }

    const categoryData = getCategoryData(currentCard.category);
    const Icon = categoryData.icon;

    return (
      <div className="min-h-[80vh] flex items-center justify-center p-4">
        <div className="w-full max-w-2xl space-y-6">
          {/* Study Header */}
          <div className="flex items-center justify-between">
            <Button variant="outline" onClick={endStudySession}>
              <X className="h-4 w-4 mr-2" />
              End Session
            </Button>
            <div className="text-center">
              <div className="text-sm text-muted-foreground">
                Card {currentCardIndex + 1} of {studyCards.length}
              </div>
              <div className="w-32 bg-muted rounded-full h-2 mt-1">
                <div
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentCardIndex + 1) / studyCards.length) * 100}%` }}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={prevCard} disabled={currentCardIndex === 0}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={nextCard} disabled={currentCardIndex === studyCards.length - 1}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Flashcard */}
          <Card className="min-h-[400px] cursor-pointer transition-transform hover:scale-[1.02]" onClick={() => setShowAnswer(!showAnswer)}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`p-2 rounded ${categoryData.color} text-white`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <Badge variant="secondary">{categoryData.label}</Badge>
                  <Badge 
                    variant="outline" 
                    className={`${getDifficultyColor(currentCard.difficulty)} text-white border-none`}
                  >
                    {currentCard.difficulty}
                  </Badge>
                </div>
                <Badge 
                  variant="outline" 
                  className={`${getConfidenceColor(currentCard.confidence)} text-white border-none`}
                >
                  {getConfidenceLabel(currentCard.confidence)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="flex items-center justify-center min-h-[300px]">
              <div className="text-center space-y-4">
                <div className="text-lg font-medium leading-relaxed">
                  {showAnswer ? currentCard.back : currentCard.front}
                </div>
                {!showAnswer && (
                  <div className="text-sm text-muted-foreground">
                    Click to reveal answer
                  </div>
                )}
                {currentCard.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 justify-center mt-4">
                    {currentCard.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Confidence Rating */}
          {showAnswer && (
            <div className="space-y-4">
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-2">How well did you know this?</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <Button
                    variant="outline"
                    className="h-16 bg-red-50 hover:bg-red-100 border-red-200"
                    onClick={() => handleConfidenceRating(1)}
                  >
                    <div className="text-center">
                      <div className="text-red-600 font-semibold">Hard</div>
                      <div className="text-xs text-red-500">Need more practice</div>
                    </div>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-16 bg-orange-50 hover:bg-orange-100 border-orange-200"
                    onClick={() => handleConfidenceRating(2)}
                  >
                    <div className="text-center">
                      <div className="text-orange-600 font-semibold">Medium</div>
                      <div className="text-xs text-orange-500">Some difficulty</div>
                    </div>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-16 bg-yellow-50 hover:bg-yellow-100 border-yellow-200"
                    onClick={() => handleConfidenceRating(3)}
                  >
                    <div className="text-center">
                      <div className="text-yellow-600 font-semibold">Easy</div>
                      <div className="text-xs text-yellow-500">Got it right</div>
                    </div>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-16 bg-green-50 hover:bg-green-100 border-green-200"
                    onClick={() => handleConfidenceRating(4)}
                  >
                    <div className="text-center">
                      <div className="text-green-600 font-semibold">Mastered</div>
                      <div className="text-xs text-green-500">Know it well</div>
                    </div>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Flashcard System</h2>
          <p className="text-muted-foreground">Study and memorize key concepts with spaced repetition</p>
        </div>

        <div className="flex gap-2">
          <Button 
            onClick={startStudySession} 
            disabled={filteredCards.length === 0}
            className="bg-gradient-primary"
          >
            <Play className="h-4 w-4 mr-2" />
            Start Study Session
          </Button>

          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Add Card
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Flashcard</DialogTitle>
                <DialogDescription>
                  Add a new concept to your flashcard collection
                </DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleAddFlashcard)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="front"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Front (Question/Concept)</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="What is the question or concept?"
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
                    name="back"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Back (Answer/Explanation)</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="What is the answer or explanation?"
                            className="min-h-[120px]"
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

                  <FormField
                    control={form.control}
                    name="tags"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tags (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. closures, scope, functions" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex justify-end space-x-2">
                    <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">Create Card</Button>
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
            <CardTitle className="text-sm font-medium">Total Cards</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCards}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reviewed</CardTitle>
            <CheckCircle className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reviewedCards}</div>
            <p className="text-xs text-muted-foreground">
              {totalCards > 0 ? ((reviewedCards / totalCards) * 100).toFixed(1) : 0}% of total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Mastered</CardTitle>
            <Star className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{masteredCards}</div>
            <p className="text-xs text-muted-foreground">
              {totalCards > 0 ? ((masteredCards / totalCards) * 100).toFixed(1) : 0}% mastery rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Confidence</CardTitle>
            <Brain className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageConfidence.toFixed(1)}/4</div>
            <p className="text-xs text-muted-foreground">
              Knowledge level
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Input
          placeholder="Search flashcards..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="sm:max-w-sm"
        />

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

      {/* Flashcards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCards.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No flashcards found</h3>
            <p className="text-muted-foreground mb-4">
              {searchQuery || selectedCategory !== 'all' || selectedDifficulty !== 'all'
                ? 'Try adjusting your filters'
                : 'Create your first flashcard to start studying'
              }
            </p>
            <Button onClick={() => setIsAddDialogOpen(true)} className="bg-gradient-primary">
              Create Flashcard
            </Button>
          </div>
        ) : (
          filteredCards.map((card) => {
            const categoryData = getCategoryData(card.category);
            const Icon = categoryData.icon;
            
            return (
              <Card 
                key={card.id} 
                className="transition-all duration-200 hover:shadow-md cursor-pointer group"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`p-1 rounded ${categoryData.color} text-white`}>
                        <Icon className="h-3 w-3" />
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {categoryData.label}
                      </Badge>
                    </div>
                    <div className="flex gap-1">
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${getDifficultyColor(card.difficulty)} text-white border-none`}
                      >
                        {card.difficulty}
                      </Badge>
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${getConfidenceColor(card.confidence)} text-white border-none`}
                      >
                        {getConfidenceLabel(card.confidence)}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-sm font-medium leading-relaxed line-clamp-3">
                      {card.front}
                    </p>
                    
                    {card.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {card.tags.slice(0, 3).map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {card.tags.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{card.tags.length - 3}
                          </Badge>
                        )}
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>
                        {card.reviewCount > 0 
                          ? `Reviewed ${card.reviewCount} times`
                          : 'Not reviewed'
                        }
                      </span>
                      {card.reviewCount > 0 && (
                        <span>
                          {((card.correctCount / card.reviewCount) * 100).toFixed(0)}% correct
                        </span>
                      )}
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
