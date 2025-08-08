import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Building2,
  MapPin,
  Users,
  Star,
  ExternalLink,
  Clock,
  CheckCircle,
  XCircle,
  Briefcase,
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
  User,
  ThumbsUp,
  ThumbsDown,
  BookOpen,
  Zap,
  Rocket,
  Coffee,
  Banknote,
  Lightbulb,
  GraduationCap
} from 'lucide-react';
import { Company } from './CompanyResearchHub';

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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <DialogHeader className="pb-4 border-b">
          <div className="flex items-start gap-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="bg-primary/10 text-primary text-lg font-bold">
                {company.name.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <DialogTitle className="text-2xl font-bold">{company.name}</DialogTitle>
                {company.region && (
                  <Badge variant="outline" className={company.region === 'indian' ? 'border-orange-300 text-orange-700' : 'border-blue-300 text-blue-700'}>
                    {company.region === 'indian' ? (
                      <><Flag className="h-3 w-3 mr-1" /> Indian</>
                    ) : (
                      <><Globe className="h-3 w-3 mr-1" /> Global</>
                    )}
                  </Badge>
                )}
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{company.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="capitalize">{company.size}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                  <Badge variant="secondary">{company.industry}</Badge>
                </div>
                {company.glassdoorRating && (
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span>{company.glassdoorRating}/5</span>
                  </div>
                )}
              </div>
              
              {company.website && (
                <div className="mt-3">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => window.open(company.website, '_blank')}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Visit Website
                  </Button>
                </div>
              )}
            </div>
          </div>
        </DialogHeader>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 overflow-hidden flex flex-col">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="process">Process</TabsTrigger>
            <TabsTrigger value="tech">Tech Stack</TabsTrigger>
            <TabsTrigger value="culture">Culture</TabsTrigger>
          </TabsList>

          <div className="flex-1 overflow-y-auto mt-4">
            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6 mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Quick Stats */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Target className="h-5 w-5" />
                      Interview Stats
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Success Rate</span>
                      <div className="flex items-center gap-2">
                        <Progress value={50} className="w-20" />
                        <span className="text-sm font-medium">50%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Difficulty</span>
                      <Badge className={getDifficultyColor('Medium')}>Medium</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Duration</span>
                      <span className="text-sm font-medium">3-4 hours</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Prep Time</span>
                      <span className="text-sm font-medium">2-3 weeks</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Salary Info */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Banknote className="h-5 w-5" />
                      Compensation
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">$115K</div>
                      <div className="text-sm text-muted-foreground">Average Salary</div>
                      <div className="text-xs text-muted-foreground">Range: $80K - $150K</div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Stock Options</span>
                      <Badge variant="default">Yes</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Work-Life Balance</span>
                      <div className="flex items-center gap-2">
                        <Progress value={80} className="w-16" />
                        <span className="text-sm font-medium">4/5</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Benefits */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Award className="h-5 w-5" />
                    Benefits & Perks
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {(company.benefits || ['Health Insurance', 'Remote Work', 'Learning Budget', 'Flexible Hours', 'Stock Options', 'Paid Leave']).map((benefit, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        {benefit}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Process Tab */}
            <TabsContent value="process" className="space-y-6 mt-0">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <MessageSquare className="h-5 w-5" />
                    Interview Process
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {company.interviewProcess && company.interviewProcess.length > 0 ? (
                      company.interviewProcess.map((stage, index) => (
                        <div key={stage.id} className="flex items-center gap-4 p-4 border rounded-lg">
                          <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-semibold">{stage.name}</h4>
                              <Badge variant="outline" className="capitalize">{stage.type}</Badge>
                              <Badge variant="secondary">{stage.duration} min</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{stage.description}</p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="space-y-4">
                        <div className="flex items-center gap-4 p-4 border rounded-lg">
                          <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">1</div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-semibold">Phone Screening</h4>
                              <Badge variant="outline">phone</Badge>
                              <Badge variant="secondary">30 min</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">Initial conversation with recruiter</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 p-4 border rounded-lg">
                          <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">2</div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-semibold">Technical Interview</h4>
                              <Badge variant="outline">technical</Badge>
                              <Badge variant="secondary">60 min</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">Coding and technical problem solving</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 p-4 border rounded-lg">
                          <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">3</div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-semibold">Final Interview</h4>
                              <Badge variant="outline">behavioral</Badge>
                              <Badge variant="secondary">45 min</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">Culture fit and final discussion</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* DSA Requirements */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Brain className="h-5 w-5" />
                    DSA & Problem Solving
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">Required:</span>
                      <Badge variant="default">Yes</Badge>
                      <Badge className={getDifficultyColor('Medium')}>Medium</Badge>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                        <BookOpen className="h-4 w-4" />
                        Common Topics
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {['Arrays', 'Strings', 'Trees', 'Graphs', 'Dynamic Programming'].map((topic, index) => (
                          <Badge key={index} variant="outline" className="text-xs">{topic}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Tech Stack Tab */}
            <TabsContent value="tech" className="space-y-6 mt-0">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Code className="h-5 w-5" />
                    Technology Stack
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {company.techStack && company.techStack.length > 0 ? (
                      company.techStack.map((tech, index) => (
                        <div key={index} className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                          <Code className="h-4 w-4 text-primary" />
                          <span className="font-medium text-sm">{tech}</span>
                        </div>
                      ))
                    ) : (
                      ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS', 'Docker'].map((tech, index) => (
                        <div key={index} className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                          <Code className="h-4 w-4 text-primary" />
                          <span className="font-medium text-sm">{tech}</span>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Frontend Focus */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Rocket className="h-5 w-5" />
                    Frontend Requirements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                        <Code className="h-4 w-4" />
                        Frameworks
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {['React', 'JavaScript', 'TypeScript', 'HTML/CSS'].map((framework, index) => (
                          <Badge key={index} variant="default" className="text-xs">{framework}</Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                        <Lightbulb className="h-4 w-4" />
                        Core Concepts
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {['DOM Manipulation', 'Event Handling', 'State Management', 'API Integration'].map((concept, index) => (
                          <Badge key={index} variant="outline" className="text-xs">{concept}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Culture Tab */}
            <TabsContent value="culture" className="space-y-6 mt-0">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Coffee className="h-5 w-5" />
                    Company Culture
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <Building2 className="h-4 w-4" />
                        Work Environment
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Collaborative and innovative workspace with modern facilities and open communication.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <Globe className="h-4 w-4" />
                        Remote Policy
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Remote-friendly with flexible work arrangements and hybrid options available.
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Diversity & Inclusion</span>
                      <div className="flex items-center gap-2">
                        <Progress value={80} className="w-20" />
                        <span className="text-sm font-medium">4/5</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Innovation Culture</span>
                      <div className="flex items-center gap-2">
                        <Progress value={90} className="w-20" />
                        <span className="text-sm font-medium">4.5/5</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Work-Life Balance</span>
                      <div className="flex items-center gap-2">
                        <Progress value={85} className="w-20" />
                        <span className="text-sm font-medium">4.2/5</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <GraduationCap className="h-4 w-4" />
                      Learning & Development
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {['Professional Development', 'Tech Conferences', 'Online Courses', 'Mentorship Programs'].map((opportunity, index) => (
                        <Badge key={index} variant="outline" className="text-xs">{opportunity}</Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
