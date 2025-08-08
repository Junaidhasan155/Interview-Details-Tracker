import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarInitials } from '@/components/ui/avatar';
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
  Banknote
} from 'lucide-react';
import { Company } from './CompanyResearchHub';

interface EnhancedCompany extends Company {
  interviewDetails: {
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
  hrContacts: {
    name: string;
    role: string;
    email?: string;
    linkedin?: string;
    responsiveness: 'Fast' | 'Medium' | 'Slow';
    notes: string;
  }[];
  candidateExperiences: {
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
  salaryInsights: {
    range: string;
    average: string;
    currency: string;
    benefits: string[];
    stockOptions: boolean;
    bonus: string;
    workLifeBalance: number;
  };
  cultureInsights: {
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
  company: EnhancedCompany | null;
  isOpen: boolean;
  onClose: () => void;
}

export function CompanyDetailModal({ company, isOpen, onClose }: CompanyDetailModalProps) {
  const [activeTab, setActiveTab] = useState('overview');

  if (!company) return null;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-600 bg-green-50';
      case 'Medium': return 'text-yellow-600 bg-yellow-50';
      case 'Hard': return 'text-red-600 bg-red-50';
      case 'Very Hard': return 'text-purple-600 bg-purple-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getResultColor = (result: string) => {
    switch (result) {
      case 'Passed': return 'text-green-600 bg-green-50';
      case 'Failed': return 'text-red-600 bg-red-50';
      case 'Ongoing': return 'text-blue-600 bg-blue-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[95vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div>
              <DialogTitle className="text-2xl font-bold flex items-center gap-3">
                <Building2 className="h-6 w-6" />
                {company.name}
                {company.region && (
                  <Badge variant="outline" className={company.region === 'indian' ? 'border-orange-200 text-orange-700' : 'border-blue-200 text-blue-700'}>
                    {company.region === 'indian' ? (
                      <><Flag className="h-3 w-3 mr-1" /> Indian</>
                    ) : (
                      <><Globe className="h-3 w-3 mr-1" /> Global</>
                    )}
                  </Badge>
                )}
              </DialogTitle>
              <DialogDescription className="text-lg mt-2">
                {company.description}
              </DialogDescription>
              <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {company.location}
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {company.size} company
                </div>
                <div className="flex items-center gap-1">
                  <Badge variant="secondary">{company.industry}</Badge>
                </div>
                {company.glassdoorRating && (
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-current text-yellow-500" />
                    {company.glassdoorRating}/5
                  </div>
                )}
              </div>
            </div>
            <div className="flex gap-2">
              {company.website && (
                <Button variant="outline" size="sm" onClick={() => window.open(company.website, '_blank')}>
                  <ExternalLink className="h-4 w-4" />
                </Button>
              )}
              {company.linkedinUrl && (
                <Button variant="outline" size="sm" onClick={() => window.open(company.linkedinUrl, '_blank')}>
                  <Linkedin className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="interviews">Interviews</TabsTrigger>
            <TabsTrigger value="experiences">Experiences</TabsTrigger>
            <TabsTrigger value="tech">Tech Stack</TabsTrigger>
            <TabsTrigger value="culture">Culture</TabsTrigger>
            <TabsTrigger value="contacts">Contacts</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Quick Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Quick Stats
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Success Rate</span>
                    <div className="flex items-center gap-2">
                      <Progress value={company.interviewDetails?.successRate ?? 50} className="w-20" />
                      <span className="text-sm font-medium">{company.interviewDetails?.successRate ?? 50}%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Difficulty</span>
                    <Badge className={getDifficultyColor(company.interviewDetails?.difficultyLevel ?? 'Medium')}>
                      {company.interviewDetails?.difficultyLevel ?? 'Medium'}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Avg Duration</span>
                    <span className="text-sm font-medium">{company.interviewDetails?.averageDuration ?? '3-4 hours'}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Prep Time</span>
                    <span className="text-sm font-medium">{company.interviewDetails?.preparationTime ?? '2-3 weeks'}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Salary Insights */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Banknote className="h-5 w-5" />
                    Salary Insights
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Range</span>
                    <span className="text-sm font-medium">{company.salaryInsights.range}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Average</span>
                    <span className="text-sm font-medium text-green-600">{company.salaryInsights.average}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Stock Options</span>
                    <Badge variant={company.salaryInsights.stockOptions ? 'default' : 'secondary'}>
                      {company.salaryInsights.stockOptions ? 'Yes' : 'No'}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Work-Life Balance</span>
                    <div className="flex items-center gap-2">
                      <Progress value={company.salaryInsights.workLifeBalance * 20} className="w-20" />
                      <span className="text-sm font-medium">{company.salaryInsights.workLifeBalance}/5</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Benefits */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Benefits & Perks
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {company.benefits.map((benefit, index) => (
                    <Badge key={index} variant="outline" className="justify-center">
                      {benefit}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Culture Values */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Culture & Values
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {company.culture.map((value, index) => (
                    <Badge key={index} variant="secondary" className="justify-center">
                      {value}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="interviews" className="space-y-6">
            {/* DSA Focus */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  DSA Requirements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Required:</span>
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
                  <>
                    <div>
                      <h4 className="text-sm font-medium mb-2">Topics</h4>
                      <div className="flex flex-wrap gap-1">
                        {(company.interviewDetails.dsaFocus.topics || []).map((topic, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {topic}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-2">Platforms</h4>
                      <div className="flex flex-wrap gap-1">
                        {(company.interviewDetails.dsaFocus.platforms || []).map((platform, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {platform}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Frontend Focus */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Code className="h-5 w-5" />
                  Frontend Focus
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-2">Frameworks & Libraries</h4>
                  <div className="flex flex-wrap gap-1">
                    {(company.interviewDetails?.frontendFocus?.frameworks || company.techStack || ['React', 'JavaScript']).map((framework, index) => (
                      <Badge key={index} variant="default" className="text-xs">
                        {framework}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-2">Core Concepts</h4>
                  <div className="flex flex-wrap gap-1">
                    {(company.interviewDetails?.frontendFocus?.concepts || ['DOM Manipulation', 'Event Handling', 'Async Programming']).map((concept, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {concept}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-2">Practical Tasks</h4>
                  <div className="flex flex-wrap gap-1">
                    {(company.interviewDetails?.frontendFocus?.practicalTasks || ['Component Building', 'API Integration', 'UI Implementation']).map((task, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {task}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Interview Process */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Timer className="h-5 w-5" />
                  Interview Process
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {company.interviewProcess.map((stage, index) => (
                    <div key={stage.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">Round {index + 1}: {stage.name}</h4>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{stage.type}</Badge>
                          <Badge variant="secondary">{stage.duration} min</Badge>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{stage.description}</p>
                      <div>
                        <h5 className="text-sm font-medium mb-1">Tips:</h5>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {stage.tips.map((tip, tipIndex) => (
                            <li key={tipIndex} className="flex items-start gap-2">
                              <CheckCircle className="h-3 w-3 mt-0.5 text-green-600" />
                              {tip}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="experiences" className="space-y-6">
            {company.candidateExperiences.map((experience) => (
              <Card key={experience.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <User className="h-5 w-5" />
                        {experience.candidateName}
                      </CardTitle>
                      <CardDescription>
                        {experience.role} • {experience.experience} • {experience.interviewDate}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getResultColor(experience.result)}>
                        {experience.result === 'Passed' && <CheckCircle className="h-3 w-3 mr-1" />}
                        {experience.result === 'Failed' && <XCircle className="h-3 w-3 mr-1" />}
                        {experience.result === 'Ongoing' && <Clock className="h-3 w-3 mr-1" />}
                        {experience.result}
                      </Badge>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-current text-yellow-500" />
                        <span className="text-sm font-medium">{experience.rating}/5</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Rounds */}
                  <div>
                    <h4 className="font-medium mb-3">Interview Rounds</h4>
                    <div className="space-y-3">
                      {experience.rounds.map((round, index) => (
                        <div key={index} className="border rounded-lg p-3">
                          <div className="flex items-center justify-between mb-2">
                            <h5 className="font-medium">{round.roundName}</h5>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline">{round.duration} min</Badge>
                              <Badge className={getDifficultyColor(round.difficulty)}>
                                {round.difficulty}
                              </Badge>
                              <Badge variant={round.passed ? 'default' : 'destructive'}>
                                {round.passed ? <ThumbsUp className="h-3 w-3" /> : <ThumbsDown className="h-3 w-3" />}
                              </Badge>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div>
                              <h6 className="text-sm font-medium">Questions Asked:</h6>
                              <ul className="text-sm text-muted-foreground ml-4">
                                {round.questions.map((question, qIndex) => (
                                  <li key={qIndex} className="list-disc">{question}</li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h6 className="text-sm font-medium">Feedback:</h6>
                              <p className="text-sm text-muted-foreground">{round.feedback}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Overall Feedback */}
                  <div>
                    <h4 className="font-medium mb-2">Overall Feedback</h4>
                    <p className="text-sm text-muted-foreground">{experience.overallFeedback}</p>
                  </div>

                  {/* Tips */}
                  <div>
                    <h4 className="font-medium mb-2">Tips for Future Candidates</h4>
                    <ul className="space-y-1">
                      {experience.tips.map((tip, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <Zap className="h-3 w-3 mt-0.5 text-yellow-500" />
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="tech" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Rocket className="h-5 w-5" />
                  Tech Stack
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {company.techStack.map((tech, index) => (
                    <Badge key={index} variant="default" className="justify-center">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="culture" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Coffee className="h-5 w-5" />
                  Culture Insights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">Work Environment</h4>
                    <p className="text-sm text-muted-foreground">{company.cultureInsights.workEnvironment}</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Remote Policy</h4>
                    <p className="text-sm text-muted-foreground">{company.cultureInsights.remotePolicy}</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Diversity Score</span>
                    <div className="flex items-center gap-2">
                      <Progress value={company.cultureInsights.diversity * 20} className="w-20" />
                      <span className="text-sm font-medium">{company.cultureInsights.diversity}/5</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Innovation</span>
                    <div className="flex items-center gap-2">
                      <Progress value={company.cultureInsights.innovation * 20} className="w-20" />
                      <span className="text-sm font-medium">{company.cultureInsights.innovation}/5</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Work Pressure</span>
                    <div className="flex items-center gap-2">
                      <Progress value={company.cultureInsights.workPressure * 20} className="w-20" />
                      <span className="text-sm font-medium">{company.cultureInsights.workPressure}/5</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Learning Opportunities</h4>
                  <div className="flex flex-wrap gap-1">
                    {company.cultureInsights.learningOpportunities.map((opportunity, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {opportunity}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contacts" className="space-y-6">
            {company.hrContacts.map((contact, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Phone className="h-5 w-5" />
                    {contact.name}
                  </CardTitle>
                  <CardDescription>{contact.role}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Responsiveness:</span>
                    <Badge variant={contact.responsiveness === 'Fast' ? 'default' : contact.responsiveness === 'Medium' ? 'secondary' : 'outline'}>
                      {contact.responsiveness}
                    </Badge>
                  </div>
                  {contact.email && (
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <a href={`mailto:${contact.email}`} className="text-sm text-blue-600 hover:underline">
                        {contact.email}
                      </a>
                    </div>
                  )}
                  {contact.linkedin && (
                    <div className="flex items-center gap-2">
                      <Linkedin className="h-4 w-4 text-muted-foreground" />
                      <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">
                        LinkedIn Profile
                      </a>
                    </div>
                  )}
                  <div>
                    <h4 className="text-sm font-medium mb-1">Notes:</h4>
                    <p className="text-sm text-muted-foreground">{contact.notes}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
