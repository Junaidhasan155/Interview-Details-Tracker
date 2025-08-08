import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarInitials } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import {
  Building2,
  MapPin,
  DollarSign,
  Calendar,
  Users,
  Star,
  ExternalLink,
  Clock,
  CheckCircle,
  XCircle,
  Briefcase,
  TrendingUp,
  Phone,
  Mail,
  Linkedin,
  Globe,
  Flag,
  Code,
  Brain,
  MessageSquare,
  Target,
  Award,
  AlertTriangle,
  User,
  ThumbsUp,
  ThumbsDown,
  Timer,
  BookOpen,
  Zap,
  Shield,
  Rocket,
  Coffee,
  Home,
  Banknote,
  ChevronRight,
  Lightbulb,
  GraduationCap,
  HeartHandshake,
  Sparkles
} from 'lucide-react';
import { Company } from './CompanyResearchHub';

interface EnhancedCompany extends Company {
  interviewDetails?: {
    averageDuration: string;
    successRate: number;
    difficultyLevel: 'Easy' | 'Medium' | 'Hard' | 'Very Hard';
    preparationTime: string;
    commonTopics: string[];
    dsaFocus: {
      required: boolean;
      difficulty: 'Easy' | 'Medium' | 'Hard';
      topics: string[];
      platforms: string[];
    };
    frontendFocus: {
      frameworks: string[];
      concepts: string[];
      practicalTasks: string[];
      designPatterns: string[];
    };
  };
  hrContacts?: {
    name: string;
    role: string;
    email?: string;
    linkedin?: string;
    responsiveness: 'Fast' | 'Medium' | 'Slow';
    notes: string;
  }[];
  candidateExperiences?: {
    id: string;
    candidateName: string;
    role: string;
    experience: string;
    result: 'Passed' | 'Failed' | 'Ongoing';
    interviewDate: string;
    rounds: {
      roundName: string;
      duration: number;
      difficulty: 'Easy' | 'Medium' | 'Hard';
      questions: string[];
      feedback: string;
      passed: boolean;
    }[];
    overallFeedback: string;
    tips: string[];
    rating: number;
  }[];
  salaryInsights?: {
    range: string;
    average: string;
    currency: string;
    benefits: string[];
    stockOptions: boolean;
    bonus: string;
    workLifeBalance: number;
  };
  cultureInsights?: {
    workEnvironment: string;
    teamSize: string;
    remotePolicy: string;
    learningOpportunities: string[];
    diversity: number;
    innovation: number;
    workPressure: number;
  };
}

interface CompanyDetailModalProps {
  company: Company | null;
  isOpen: boolean;
  onClose: () => void;
}

export function CompanyDetailModal({ company, isOpen, onClose }: CompanyDetailModalProps) {
  const [activeTab, setActiveTab] = useState('overview');

  if (!company) return null;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800 border-green-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Hard': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Very Hard': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getResultColor = (result: string) => {
    switch (result) {
      case 'Passed': return 'bg-green-100 text-green-800 border-green-200';
      case 'Failed': return 'bg-red-100 text-red-800 border-red-200';
      case 'Ongoing': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getResponsivenessColor = (responsiveness: string) => {
    switch (responsiveness) {
      case 'Fast': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Slow': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        {/* Enhanced Header */}
        <DialogHeader className="space-y-6 pb-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <div className="relative">
                  <Avatar className="h-12 w-12 border-2 border-primary/20">
                    <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10 text-primary font-semibold">
                      {company.name.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  {company.region === 'foreign' && (
                    <div className="absolute -top-1 -right-1 h-5 w-5 bg-blue-500 rounded-full flex items-center justify-center">
                      <Globe className="h-3 w-3 text-white" />
                    </div>
                  )}
                </div>
                <div>
                  <DialogTitle className="text-2xl font-bold text-foreground flex items-center gap-3">
                    {company.name}
                    {company.region && (
                      <Badge 
                        variant="outline" 
                        className={`${
                          company.region === 'indian' 
                            ? 'border-orange-200 text-orange-700 bg-orange-50' 
                            : 'border-blue-200 text-blue-700 bg-blue-50'
                        } font-medium`}
                      >
                        {company.region === 'indian' ? (
                          <><Flag className="h-3 w-3 mr-1" /> Indian</>
                        ) : (
                          <><Globe className="h-3 w-3 mr-1" /> Global</>
                        )}
                      </Badge>
                    )}
                  </DialogTitle>
                  <DialogDescription className="text-base text-muted-foreground mt-1 leading-relaxed">
                    {company.description || "A leading technology company focused on innovation and growth."}
                  </DialogDescription>
                </div>
              </div>
              
              {/* Company Quick Info */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">{company.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium capitalize">{company.size}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                  <Badge variant="secondary" className="font-medium">{company.industry}</Badge>
                </div>
                {company.glassdoorRating && (
                  <div className="flex items-center gap-2 text-sm">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{company.glassdoorRating}/5</span>
                  </div>
                )}
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex gap-2 ml-4">
              {company.website && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => window.open(company.website, '_blank')}
                  className="hover:bg-primary/10"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Website
                </Button>
              )}
              {company.linkedinUrl && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => window.open(company.linkedinUrl, '_blank')}
                  className="hover:bg-primary/10"
                >
                  <Linkedin className="h-4 w-4 mr-2" />
                  LinkedIn
                </Button>
              )}
            </div>
          </div>
        </DialogHeader>

        <Separator />

        {/* Enhanced Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
          <TabsList className="grid w-full grid-cols-6 h-12 bg-muted/50">
            <TabsTrigger value="overview" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
              <Target className="h-4 w-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="interviews" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
              <MessageSquare className="h-4 w-4 mr-2" />
              Process
            </TabsTrigger>
            <TabsTrigger value="experiences" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
              <User className="h-4 w-4 mr-2" />
              Reviews
            </TabsTrigger>
            <TabsTrigger value="tech" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
              <Code className="h-4 w-4 mr-2" />
              Tech
            </TabsTrigger>
            <TabsTrigger value="culture" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
              <Coffee className="h-4 w-4 mr-2" />
              Culture
            </TabsTrigger>
            <TabsTrigger value="contacts" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
              <Phone className="h-4 w-4 mr-2" />
              Contacts
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Quick Stats */}
              <Card className="border-0 shadow-lg bg-gradient-to-br from-primary/5 to-primary/10">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2 text-primary">
                    <Target className="h-5 w-5" />
                    Interview Stats
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-muted-foreground">Success Rate</span>
                      <div className="flex items-center gap-2">
                        <Progress 
                          value={company.interviewDetails?.successRate ?? 50} 
                          className="w-20 h-2" 
                        />
                        <span className="text-sm font-bold text-primary">
                          {company.interviewDetails?.successRate ?? 50}%
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-muted-foreground">Difficulty</span>
                      <Badge className={getDifficultyColor(company.interviewDetails?.difficultyLevel ?? 'Medium')}>
                        {company.interviewDetails?.difficultyLevel ?? 'Medium'}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-muted-foreground">Duration</span>
                      <span className="text-sm font-semibold">
                        {company.interviewDetails?.averageDuration ?? '3-4 hours'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-muted-foreground">Prep Time</span>
                      <span className="text-sm font-semibold">
                        {company.interviewDetails?.preparationTime ?? '2-3 weeks'}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Salary Insights */}
              <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2 text-green-700">
                    <Banknote className="h-5 w-5" />
                    Compensation
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="text-center py-2">
                      <div className="text-2xl font-bold text-green-600">
                        {company.salaryInsights?.average ?? '$115K'}
                      </div>
                      <div className="text-sm text-muted-foreground">Average Salary</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        Range: {company.salaryInsights?.range ?? '$80K - $150K'}
                      </div>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-muted-foreground">Stock Options</span>
                      <Badge variant={company.salaryInsights?.stockOptions ? 'default' : 'secondary'}>
                        {company.salaryInsights?.stockOptions ? 'Yes' : 'No'}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-muted-foreground">Work-Life Balance</span>
                      <div className="flex items-center gap-2">
                        <Progress 
                          value={(company.salaryInsights?.workLifeBalance ?? 4) * 20} 
                          className="w-16 h-2" 
                        />
                        <span className="text-sm font-semibold">
                          {company.salaryInsights?.workLifeBalance ?? 4}/5
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Benefits */}
              <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2 text-blue-700">
                    <Award className="h-5 w-5" />
                    Benefits & Perks
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {(company.benefits || ['Health Insurance', 'Remote Work', 'Learning Budget', 'Flexible Hours']).map((benefit, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        {benefit}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Interview Process Overview */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  Interview Process Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {company.interviewProcess.map((stage, index) => (
                    <div key={stage.id} className="flex items-center gap-4 p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
                          {index + 1}
                        </div>
                      </div>
                      <div className="flex-grow">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold">{stage.name}</h4>
                          <Badge variant="outline" className="capitalize">{stage.type}</Badge>
                          <Badge variant="secondary">{stage.duration} min</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{stage.description}</p>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Interviews Tab */}
          <TabsContent value="interviews" className="space-y-6 mt-6">
            <div className="grid gap-6">
              {/* DSA Requirements */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Brain className="h-5 w-5 text-primary" />
                    DSA & Problem Solving
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg">
                    <span className="text-sm font-medium text-muted-foreground">Required:</span>
                    <Badge variant={company.interviewDetails?.dsaFocus?.required ? 'default' : 'secondary'}>
                      {company.interviewDetails?.dsaFocus?.required ? 'Yes' : 'No'}
                    </Badge>
                    {company.interviewDetails?.dsaFocus?.required && (
                      <Badge className={getDifficultyColor(company.interviewDetails.dsaFocus.difficulty)}>
                        {company.interviewDetails.dsaFocus.difficulty}
                      </Badge>
                    )}
                  </div>
                  {company.interviewDetails?.dsaFocus?.required && (
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                          <BookOpen className="h-4 w-4" />
                          Common Topics
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {(company.interviewDetails.dsaFocus.topics || ['Arrays', 'Strings', 'Trees']).map((topic, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {topic}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                          <Code className="h-4 w-4" />
                          Practice Platforms
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {(company.interviewDetails.dsaFocus.platforms || ['LeetCode', 'HackerRank']).map((platform, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {platform}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Frontend Focus */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Rocket className="h-5 w-5 text-primary" />
                    Frontend Expertise
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                        <Code className="h-4 w-4" />
                        Frameworks & Libraries
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {(company.interviewDetails?.frontendFocus?.frameworks || company.techStack || ['React', 'JavaScript']).map((framework, index) => (
                          <Badge key={index} variant="default" className="text-xs">
                            {framework}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                        <Lightbulb className="h-4 w-4" />
                        Core Concepts
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {(company.interviewDetails?.frontendFocus?.concepts || ['DOM Manipulation', 'Event Handling', 'Async Programming']).map((concept, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {concept}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                        <GraduationCap className="h-4 w-4" />
                        Practical Tasks
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {(company.interviewDetails?.frontendFocus?.practicalTasks || ['Component Building', 'API Integration', 'UI Implementation']).map((task, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {task}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Experiences Tab */}
          <TabsContent value="experiences" className="space-y-6 mt-6">
            {(company.candidateExperiences || []).length > 0 ? (
              company.candidateExperiences.map((experience) => (
                <Card key={experience.id} className="border-0 shadow-lg">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {experience.candidateName.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg">{experience.candidateName}</CardTitle>
                          <CardDescription className="flex items-center gap-2 mt-1">
                            {experience.role} • {experience.experience} • {experience.interviewDate}
                          </CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className={getResultColor(experience.result)} variant="outline">
                          {experience.result === 'Passed' && <CheckCircle className="h-3 w-3 mr-1" />}
                          {experience.result === 'Failed' && <XCircle className="h-3 w-3 mr-1" />}
                          {experience.result === 'Ongoing' && <Clock className="h-3 w-3 mr-1" />}
                          {experience.result}
                        </Badge>
                        <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-semibold">{experience.rating}/5</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Interview Rounds */}
                    <div>
                      <h4 className="font-semibold mb-4 flex items-center gap-2">
                        <MessageSquare className="h-4 w-4" />
                        Interview Rounds
                      </h4>
                      <div className="space-y-4">
                        {experience.rounds.map((round, index) => (
                          <div key={index} className="border rounded-lg p-4 bg-muted/20">
                            <div className="flex items-center justify-between mb-3">
                              <h5 className="font-semibold">{round.roundName}</h5>
                              <div className="flex items-center gap-2">
                                <Badge variant="outline">{round.duration} min</Badge>
                                <Badge className={getDifficultyColor(round.difficulty)}>
                                  {round.difficulty}
                                </Badge>
                                <Badge variant={round.passed ? 'default' : 'destructive'}>
                                  {round.passed ? <ThumbsUp className="h-3 w-3 mr-1" /> : <ThumbsDown className="h-3 w-3 mr-1" />}
                                  {round.passed ? 'Passed' : 'Failed'}
                                </Badge>
                              </div>
                            </div>
                            <div className="space-y-3">
                              <div>
                                <h6 className="text-sm font-semibold mb-2">Questions Asked:</h6>
                                <ul className="text-sm text-muted-foreground space-y-1">
                                  {round.questions.map((question, qIndex) => (
                                    <li key={qIndex} className="flex items-start gap-2">
                                      <span className="w-1 h-1 bg-muted-foreground rounded-full mt-2 flex-shrink-0"></span>
                                      {question}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div>
                                <h6 className="text-sm font-semibold mb-2">Feedback:</h6>
                                <p className="text-sm text-muted-foreground bg-muted/30 p-3 rounded">
                                  {round.feedback}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Overall Feedback */}
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <MessageSquare className="h-4 w-4" />
                        Overall Feedback
                      </h4>
                      <p className="text-sm text-muted-foreground bg-muted/20 p-4 rounded-lg">
                        {experience.overallFeedback}
                      </p>
                    </div>

                    {/* Tips */}
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <Zap className="h-4 w-4 text-yellow-500" />
                        Tips for Future Candidates
                      </h4>
                      <div className="space-y-2">
                        {experience.tips.map((tip, index) => (
                          <div key={index} className="flex items-start gap-3 text-sm bg-yellow-50 p-3 rounded-lg">
                            <Lightbulb className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                            {tip}
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card className="border-0 shadow-lg">
                <CardContent className="text-center py-12">
                  <MessageSquare className="h-16 w-16 mx-auto text-muted-foreground mb-4 opacity-50" />
                  <h3 className="text-lg font-semibold text-muted-foreground mb-2">No Experiences Yet</h3>
                  <p className="text-muted-foreground">
                    Candidate experiences and reviews will appear here once available.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Tech Stack Tab */}
          <TabsContent value="tech" className="space-y-6 mt-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Code className="h-5 w-5 text-primary" />
                  Technology Stack
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {company.techStack.map((tech, index) => (
                    <div key={index} className="flex items-center gap-2 p-3 bg-muted/20 rounded-lg hover:bg-muted/40 transition-colors">
                      <Code className="h-4 w-4 text-primary" />
                      <span className="font-medium">{tech}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Culture Tab */}
          <TabsContent value="culture" className="space-y-6 mt-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Coffee className="h-5 w-5 text-primary" />
                  Company Culture
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <Building2 className="h-4 w-4" />
                        Work Environment
                      </h4>
                      <p className="text-sm text-muted-foreground bg-muted/20 p-3 rounded">
                        {company.cultureInsights?.workEnvironment ?? 'Collaborative and innovative workspace with modern facilities.'}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <Home className="h-4 w-4" />
                        Remote Policy
                      </h4>
                      <p className="text-sm text-muted-foreground bg-muted/20 p-3 rounded">
                        {company.cultureInsights?.remotePolicy ?? 'Remote-friendly with flexible work arrangements and hybrid options.'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-muted/20 rounded">
                      <span className="text-sm font-medium">Diversity & Inclusion</span>
                      <div className="flex items-center gap-2">
                        <Progress value={(company.cultureInsights?.diversity ?? 4) * 20} className="w-20 h-2" />
                        <span className="text-sm font-semibold">{company.cultureInsights?.diversity ?? 4}/5</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted/20 rounded">
                      <span className="text-sm font-medium">Innovation Culture</span>
                      <div className="flex items-center gap-2">
                        <Progress value={(company.cultureInsights?.innovation ?? 4) * 20} className="w-20 h-2" />
                        <span className="text-sm font-semibold">{company.cultureInsights?.innovation ?? 4}/5</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted/20 rounded">
                      <span className="text-sm font-medium">Work Pressure</span>
                      <div className="flex items-center gap-2">
                        <Progress value={(company.cultureInsights?.workPressure ?? 3) * 20} className="w-20 h-2" />
                        <span className="text-sm font-semibold">{company.cultureInsights?.workPressure ?? 3}/5</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <GraduationCap className="h-4 w-4" />
                    Learning & Development
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {(company.cultureInsights?.learningOpportunities || ['Professional Development', 'Tech Conferences', 'Online Courses', 'Mentorship Programs']).map((opportunity, index) => (
                      <Badge key={index} variant="outline" className="text-xs bg-blue-50 border-blue-200 text-blue-700">
                        {opportunity}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contacts Tab */}
          <TabsContent value="contacts" className="space-y-6 mt-6">
            {(company.hrContacts || []).length > 0 ? (
              company.hrContacts.map((contact, index) => (
                <Card key={index} className="border-0 shadow-lg">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-12 w-12">
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {contact.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg">{contact.name}</CardTitle>
                          <CardDescription>{contact.role}</CardDescription>
                        </div>
                      </div>
                      <Badge className={getResponsivenessColor(contact.responsiveness)} variant="outline">
                        {contact.responsiveness} Response
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-4">
                      {contact.email && (
                        <Button variant="outline" size="sm" asChild>
                          <a href={`mailto:${contact.email}`} className="flex items-center gap-2">
                            <Mail className="h-4 w-4" />
                            Send Email
                          </a>
                        </Button>
                      )}
                      {contact.linkedin && (
                        <Button variant="outline" size="sm" asChild>
                          <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                            <Linkedin className="h-4 w-4" />
                            LinkedIn
                          </a>
                        </Button>
                      )}
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold mb-2">Notes:</h4>
                      <p className="text-sm text-muted-foreground bg-muted/20 p-3 rounded">
                        {contact.notes}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card className="border-0 shadow-lg">
                <CardContent className="text-center py-12">
                  <Phone className="h-16 w-16 mx-auto text-muted-foreground mb-4 opacity-50" />
                  <h3 className="text-lg font-semibold text-muted-foreground mb-2">No Contact Information</h3>
                  <p className="text-muted-foreground">
                    HR contact details will be available here when provided.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
