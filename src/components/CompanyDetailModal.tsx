import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
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
  GraduationCap,
  X
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
      <DialogContent className="w-full max-w-7xl h-[95vh] max-h-[95vh] p-0 gap-0 overflow-hidden">
        {/* Mobile Close Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-2 z-50 md:hidden"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>

        {/* Header - Responsive */}
        <DialogHeader className="p-4 md:p-6 border-b bg-background">
          <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
            {/* Avatar and Title */}
            <div className="flex items-start gap-3 w-full sm:w-auto">
              <Avatar className="h-12 w-12 sm:h-16 sm:w-16 flex-shrink-0">
                <AvatarFallback className="bg-primary/10 text-primary text-sm sm:text-lg font-bold">
                  {company.name.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                  <DialogTitle className="text-lg sm:text-2xl font-bold truncate">
                    {company.name}
                  </DialogTitle>
                  {company.region && (
                    <Badge 
                      variant="outline" 
                      className={`w-fit ${company.region === 'indian' ? 'border-orange-300 text-orange-700' : 'border-blue-300 text-blue-700'}`}
                    >
                      {company.region === 'indian' ? (
                        <><Flag className="h-3 w-3 mr-1" /> Indian</>
                      ) : (
                        <><Globe className="h-3 w-3 mr-1" /> Global</>
                      )}
                    </Badge>
                  )}
                </div>
                
                {/* Company Details Grid - Responsive */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 text-xs sm:text-sm">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground flex-shrink-0" />
                    <span className="truncate">{company.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground flex-shrink-0" />
                    <span className="capitalize truncate">{company.size}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Briefcase className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground flex-shrink-0" />
                    <Badge variant="secondary" className="text-xs truncate">{company.industry}</Badge>
                  </div>
                  {company.glassdoorRating && (
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 sm:h-4 sm:w-4 fill-yellow-400 text-yellow-400 flex-shrink-0" />
                      <span className="truncate">{company.glassdoorRating}/5</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Website Button */}
            {company.website && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => window.open(company.website, '_blank')}
                className="w-full sm:w-auto mt-2 sm:mt-0"
              >
                <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                <span className="hidden sm:inline">Visit </span>Website
              </Button>
            )}
          </div>
        </DialogHeader>

        {/* Tabs - Responsive */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col overflow-hidden">
          {/* Tab List - Scrollable on mobile */}
          <div className="border-b bg-background">
            <ScrollArea className="w-full">
              <TabsList className="h-10 sm:h-12 w-full justify-start rounded-none bg-transparent p-0">
                <TabsTrigger 
                  value="overview" 
                  className="flex-shrink-0 px-3 sm:px-4 py-2 text-xs sm:text-sm data-[state=active]:bg-background data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
                >
                  <Target className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                  Overview
                </TabsTrigger>
                <TabsTrigger 
                  value="process" 
                  className="flex-shrink-0 px-3 sm:px-4 py-2 text-xs sm:text-sm data-[state=active]:bg-background data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
                >
                  <MessageSquare className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                  Process
                </TabsTrigger>
                <TabsTrigger 
                  value="tech" 
                  className="flex-shrink-0 px-3 sm:px-4 py-2 text-xs sm:text-sm data-[state=active]:bg-background data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
                >
                  <Code className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                  Tech
                </TabsTrigger>
                <TabsTrigger 
                  value="culture" 
                  className="flex-shrink-0 px-3 sm:px-4 py-2 text-xs sm:text-sm data-[state=active]:bg-background data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
                >
                  <Coffee className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                  Culture
                </TabsTrigger>
              </TabsList>
            </ScrollArea>
          </div>

          {/* Tab Content - Scrollable */}
          <div className="flex-1 overflow-hidden">
            <ScrollArea className="h-full">
              <div className="p-4 sm:p-6">
                {/* Overview Tab */}
                <TabsContent value="overview" className="space-y-4 sm:space-y-6 mt-0">
                  <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                    {/* Quick Stats */}
                    <Card className="lg:col-span-1">
                      <CardHeader className="pb-3">
                        <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                          <Target className="h-4 w-4 sm:h-5 sm:w-5" />
                          Interview Stats
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3 sm:space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-xs sm:text-sm text-muted-foreground">Success Rate</span>
                          <div className="flex items-center gap-2">
                            <Progress value={50} className="w-16 sm:w-20" />
                            <span className="text-xs sm:text-sm font-medium">50%</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs sm:text-sm text-muted-foreground">Difficulty</span>
                          <Badge className={getDifficultyColor('Medium')} size="sm">Medium</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs sm:text-sm text-muted-foreground">Duration</span>
                          <span className="text-xs sm:text-sm font-medium">3-4 hours</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs sm:text-sm text-muted-foreground">Prep Time</span>
                          <span className="text-xs sm:text-sm font-medium">2-3 weeks</span>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Salary Info */}
                    <Card className="lg:col-span-1">
                      <CardHeader className="pb-3">
                        <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                          <Banknote className="h-4 w-4 sm:h-5 sm:w-5" />
                          Compensation
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3 sm:space-y-4">
                        <div className="text-center">
                          <div className="text-xl sm:text-2xl font-bold text-green-600">$115K</div>
                          <div className="text-xs sm:text-sm text-muted-foreground">Average Salary</div>
                          <div className="text-xs text-muted-foreground">Range: $80K - $150K</div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs sm:text-sm text-muted-foreground">Stock Options</span>
                          <Badge variant="default" size="sm">Yes</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs sm:text-sm text-muted-foreground">Work-Life Balance</span>
                          <div className="flex items-center gap-2">
                            <Progress value={80} className="w-12 sm:w-16" />
                            <span className="text-xs sm:text-sm font-medium">4/5</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Benefits - Full width on mobile, spans remaining space on desktop */}
                    <Card className="lg:col-span-2 xl:col-span-1">
                      <CardHeader className="pb-3">
                        <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                          <Award className="h-4 w-4 sm:h-5 sm:w-5" />
                          Benefits & Perks
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {(company.benefits || ['Health Insurance', 'Remote Work', 'Learning Budget', 'Flexible Hours', 'Stock Options', 'Paid Leave']).map((benefit, index) => (
                            <div key={index} className="flex items-center gap-2 text-xs sm:text-sm">
                              <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-500 flex-shrink-0" />
                              <span className="truncate">{benefit}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                {/* Process Tab */}
                <TabsContent value="process" className="space-y-4 sm:space-y-6 mt-0">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                        <MessageSquare className="h-4 w-4 sm:h-5 sm:w-5" />
                        Interview Process
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3 sm:space-y-4">
                        {company.interviewProcess && company.interviewProcess.length > 0 ? (
                          company.interviewProcess.map((stage, index) => (
                            <div key={stage.id} className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 p-3 sm:p-4 border rounded-lg">
                              <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs sm:text-sm font-bold flex-shrink-0">
                                {index + 1}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-1">
                                  <h4 className="font-semibold text-sm sm:text-base truncate">{stage.name}</h4>
                                  <div className="flex flex-wrap gap-1">
                                    <Badge variant="outline" className="text-xs capitalize">{stage.type}</Badge>
                                    <Badge variant="secondary" className="text-xs">{stage.duration} min</Badge>
                                  </div>
                                </div>
                                <p className="text-xs sm:text-sm text-muted-foreground">{stage.description}</p>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="space-y-3 sm:space-y-4">
                            {[
                              { name: "Phone Screening", type: "phone", duration: 30, description: "Initial conversation with recruiter" },
                              { name: "Technical Interview", type: "technical", duration: 60, description: "Coding and technical problem solving" },
                              { name: "Final Interview", type: "behavioral", duration: 45, description: "Culture fit and final discussion" }
                            ].map((stage, index) => (
                              <div key={index} className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 p-3 sm:p-4 border rounded-lg">
                                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs sm:text-sm font-bold flex-shrink-0">
                                  {index + 1}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-1">
                                    <h4 className="font-semibold text-sm sm:text-base">{stage.name}</h4>
                                    <div className="flex flex-wrap gap-1">
                                      <Badge variant="outline" className="text-xs capitalize">{stage.type}</Badge>
                                      <Badge variant="secondary" className="text-xs">{stage.duration} min</Badge>
                                    </div>
                                  </div>
                                  <p className="text-xs sm:text-sm text-muted-foreground">{stage.description}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  {/* DSA Requirements */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                        <Brain className="h-4 w-4 sm:h-5 sm:w-5" />
                        DSA & Problem Solving
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3 sm:space-y-4">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-xs sm:text-sm font-medium">Required:</span>
                          <Badge variant="default" size="sm">Yes</Badge>
                          <Badge className={getDifficultyColor('Medium')} size="sm">Medium</Badge>
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                            <BookOpen className="h-3 w-3 sm:h-4 sm:w-4" />
                            Common Topics
                          </h4>
                          <div className="flex flex-wrap gap-1 sm:gap-2">
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
                <TabsContent value="tech" className="space-y-4 sm:space-y-6 mt-0">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                        <Code className="h-4 w-4 sm:h-5 sm:w-5" />
                        Technology Stack
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-3">
                        {company.techStack && company.techStack.length > 0 ? (
                          company.techStack.map((tech, index) => (
                            <div key={index} className="flex items-center gap-2 p-2 sm:p-3 bg-muted/50 rounded-lg">
                              <Code className="h-3 w-3 sm:h-4 sm:w-4 text-primary flex-shrink-0" />
                              <span className="font-medium text-xs sm:text-sm truncate">{tech}</span>
                            </div>
                          ))
                        ) : (
                          ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS', 'Docker'].map((tech, index) => (
                            <div key={index} className="flex items-center gap-2 p-2 sm:p-3 bg-muted/50 rounded-lg">
                              <Code className="h-3 w-3 sm:h-4 sm:w-4 text-primary flex-shrink-0" />
                              <span className="font-medium text-xs sm:text-sm truncate">{tech}</span>
                            </div>
                          ))
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Frontend Focus */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                        <Rocket className="h-4 w-4 sm:h-5 sm:w-5" />
                        Frontend Requirements
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                        <div>
                          <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                            <Code className="h-3 w-3 sm:h-4 sm:w-4" />
                            Frameworks
                          </h4>
                          <div className="flex flex-wrap gap-1 sm:gap-2">
                            {['React', 'JavaScript', 'TypeScript', 'HTML/CSS'].map((framework, index) => (
                              <Badge key={index} variant="default" className="text-xs">{framework}</Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                            <Lightbulb className="h-3 w-3 sm:h-4 sm:w-4" />
                            Core Concepts
                          </h4>
                          <div className="flex flex-wrap gap-1 sm:gap-2">
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
                <TabsContent value="culture" className="space-y-4 sm:space-y-6 mt-0">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                        <Coffee className="h-4 w-4 sm:h-5 sm:w-5" />
                        Company Culture
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 sm:space-y-6">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                        <div>
                          <h4 className="font-semibold mb-2 flex items-center gap-2 text-sm sm:text-base">
                            <Building2 className="h-3 w-3 sm:h-4 sm:w-4" />
                            Work Environment
                          </h4>
                          <p className="text-xs sm:text-sm text-muted-foreground">
                            Collaborative and innovative workspace with modern facilities and open communication.
                          </p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2 flex items-center gap-2 text-sm sm:text-base">
                            <Globe className="h-3 w-3 sm:h-4 sm:w-4" />
                            Remote Policy
                          </h4>
                          <p className="text-xs sm:text-sm text-muted-foreground">
                            Remote-friendly with flexible work arrangements and hybrid options available.
                          </p>
                        </div>
                      </div>
                      
                      <div className="space-y-2 sm:space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-xs sm:text-sm font-medium">Diversity & Inclusion</span>
                          <div className="flex items-center gap-2">
                            <Progress value={80} className="w-16 sm:w-20" />
                            <span className="text-xs sm:text-sm font-medium">4/5</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs sm:text-sm font-medium">Innovation Culture</span>
                          <div className="flex items-center gap-2">
                            <Progress value={90} className="w-16 sm:w-20" />
                            <span className="text-xs sm:text-sm font-medium">4.5/5</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs sm:text-sm font-medium">Work-Life Balance</span>
                          <div className="flex items-center gap-2">
                            <Progress value={85} className="w-16 sm:w-20" />
                            <span className="text-xs sm:text-sm font-medium">4.2/5</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2 flex items-center gap-2 text-sm sm:text-base">
                          <GraduationCap className="h-3 w-3 sm:h-4 sm:w-4" />
                          Learning & Development
                        </h4>
                        <div className="flex flex-wrap gap-1 sm:gap-2">
                          {['Professional Development', 'Tech Conferences', 'Online Courses', 'Mentorship Programs'].map((opportunity, index) => (
                            <Badge key={index} variant="outline" className="text-xs">{opportunity}</Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </div>
            </ScrollArea>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
