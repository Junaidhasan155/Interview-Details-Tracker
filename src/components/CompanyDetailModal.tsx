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
  CheckCircle,
  Briefcase,
  Globe,
  Flag,
  Code,
  Brain,
  MessageSquare,
  Target,
  Award,
  BookOpen,
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
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-orange-100 text-orange-800';
      case 'Very Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose} modal>
      <DialogContent
        className="w-screen h-screen max-w-none max-h-none m-0 p-0 rounded-none md:w-[95vw] md:h-[95vh] md:max-w-4xl md:rounded-lg md:m-auto"
        onPointerDownOutside={(e) => {
          onClose();
        }}
        onEscapeKeyDown={(e) => {
          onClose();
        }}
      >
        {/* Fixed Header */}
        <div className="flex items-center justify-between p-4 border-b bg-white sticky top-0 z-10">
          <DialogHeader className="flex-1">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10 md:h-12 md:w-12">
                <AvatarFallback className="bg-primary/10 text-primary text-sm md:text-lg font-bold">
                  {company.name.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <DialogTitle className="text-lg md:text-xl font-bold truncate">
                  {company.name}
                </DialogTitle>
                <div className="flex items-center gap-2 mt-1">
                  {company.region && (
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${company.region === 'indian' ? 'border-orange-300 text-orange-700' : 'border-blue-300 text-blue-700'}`}
                    >
                      {company.region === 'indian' ? (
                        <><Flag className="h-3 w-3 mr-1" /> IN</>
                      ) : (
                        <><Globe className="h-3 w-3 mr-1" /> Global</>
                      )}
                    </Badge>
                  )}
                  <Badge variant="secondary" className="text-xs">{company.industry}</Badge>
                </div>
              </div>
            </div>
          </DialogHeader>
          <Button variant="ghost" size="icon" onClick={onClose} className="ml-2">
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Company Quick Info */}
        <div className="px-4 py-3 bg-muted/50 border-b">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
            <div className="flex items-center gap-1">
              <MapPin className="h-3 w-3 text-muted-foreground" />
              <span className="truncate">{company.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-3 w-3 text-muted-foreground" />
              <span className="capitalize truncate">{company.size}</span>
            </div>
            <div className="flex items-center gap-1">
              <Briefcase className="h-3 w-3 text-muted-foreground" />
              <span className="truncate">Tech</span>
            </div>
            {company.glassdoorRating && (
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span className="truncate">{company.glassdoorRating}/5</span>
              </div>
            )}
          </div>
          {company.website && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => window.open(company.website, '_blank')}
              className="w-full mt-3 text-xs"
            >
              <ExternalLink className="h-3 w-3 mr-2" />
              Visit Website
            </Button>
          )}
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
          {/* Tab Navigation */}
          <div className="border-b bg-white">
            <TabsList className="w-full h-auto p-0 bg-transparent">
              <div className="flex w-full">
                <TabsTrigger 
                  value="overview" 
                  className="flex-1 py-3 text-xs md:text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  <Target className="h-3 w-3 mr-1 md:mr-2" />
                  <span className="hidden sm:inline">Overview</span>
                  <span className="sm:hidden">Info</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="process" 
                  className="flex-1 py-3 text-xs md:text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  <MessageSquare className="h-3 w-3 mr-1 md:mr-2" />
                  <span className="hidden sm:inline">Process</span>
                  <span className="sm:hidden">Process</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="tech" 
                  className="flex-1 py-3 text-xs md:text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  <Code className="h-3 w-3 mr-1 md:mr-2" />
                  <span className="hidden sm:inline">Tech</span>
                  <span className="sm:hidden">Tech</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="culture" 
                  className="flex-1 py-3 text-xs md:text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  <Coffee className="h-3 w-3 mr-1 md:mr-2" />
                  <span className="hidden sm:inline">Culture</span>
                  <span className="sm:hidden">Culture</span>
                </TabsTrigger>
              </div>
            </TabsList>
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-auto">
            {/* Overview Tab */}
            <TabsContent value="overview" className="mt-0 p-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Quick Stats */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm md:text-base flex items-center gap-2">
                      <Target className="h-4 w-4" />
                      Interview Stats
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">Success Rate</span>
                      <div className="flex items-center gap-2">
                        <Progress value={50} className="w-16" />
                        <span className="text-xs font-medium">50%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">Difficulty</span>
                      <Badge className={getDifficultyColor('Medium')} size="sm">Medium</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">Duration</span>
                      <span className="text-xs font-medium">3-4 hours</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Salary Info */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm md:text-base flex items-center gap-2">
                      <Banknote className="h-4 w-4" />
                      Compensation
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="text-center">
                      <div className="text-lg md:text-xl font-bold text-green-600">$115K</div>
                      <div className="text-xs text-muted-foreground">Range: $80K - $150K</div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">Stock Options</span>
                      <Badge variant="default" size="sm">Yes</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">Work-Life Balance</span>
                      <div className="flex items-center gap-2">
                        <Progress value={80} className="w-12" />
                        <span className="text-xs font-medium">4/5</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Benefits */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm md:text-base flex items-center gap-2">
                    <Award className="h-4 w-4" />
                    Benefits & Perks
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {(company.benefits || ['Health Insurance', 'Remote Work', 'Learning Budget', 'Flexible Hours']).map((benefit, index) => (
                      <div key={index} className="flex items-center gap-2 text-xs">
                        <CheckCircle className="h-3 w-3 text-green-500" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Process Tab */}
            <TabsContent value="process" className="mt-0 p-4 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm md:text-base flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    Interview Process
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {company.interviewProcess && company.interviewProcess.length > 0 ? (
                      company.interviewProcess.map((stage, index) => (
                        <div key={stage.id} className="flex gap-3 p-3 border rounded-lg">
                          <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold flex-shrink-0">
                            {index + 1}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-col gap-1">
                              <h4 className="font-semibold text-sm">{stage.name}</h4>
                              <div className="flex gap-1">
                                <Badge variant="outline" className="text-xs">{stage.type}</Badge>
                                <Badge variant="secondary" className="text-xs">{stage.duration} min</Badge>
                              </div>
                              <p className="text-xs text-muted-foreground">{stage.description}</p>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="space-y-3">
                        {[
                          { name: "Phone Screening", type: "phone", duration: 30, description: "Initial recruiter conversation" },
                          { name: "Technical Interview", type: "technical", duration: 60, description: "Coding and problem solving" },
                          { name: "Final Interview", type: "behavioral", duration: 45, description: "Culture fit discussion" }
                        ].map((stage, index) => (
                          <div key={index} className="flex gap-3 p-3 border rounded-lg">
                            <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold flex-shrink-0">
                              {index + 1}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex flex-col gap-1">
                                <h4 className="font-semibold text-sm">{stage.name}</h4>
                                <div className="flex gap-1">
                                  <Badge variant="outline" className="text-xs">{stage.type}</Badge>
                                  <Badge variant="secondary" className="text-xs">{stage.duration} min</Badge>
                                </div>
                                <p className="text-xs text-muted-foreground">{stage.description}</p>
                              </div>
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
                  <CardTitle className="text-sm md:text-base flex items-center gap-2">
                    <Brain className="h-4 w-4" />
                    DSA & Problem Solving
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium">Required:</span>
                      <Badge variant="default" size="sm">Yes</Badge>
                      <Badge className={getDifficultyColor('Medium')} size="sm">Medium</Badge>
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold mb-2 flex items-center gap-2">
                        <BookOpen className="h-3 w-3" />
                        Common Topics
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {['Arrays', 'Strings', 'Trees', 'Graphs'].map((topic, index) => (
                          <Badge key={index} variant="outline" className="text-xs">{topic}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Tech Stack Tab */}
            <TabsContent value="tech" className="mt-0 p-4 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm md:text-base flex items-center gap-2">
                    <Code className="h-4 w-4" />
                    Technology Stack
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {company.techStack && company.techStack.length > 0 ? (
                      company.techStack.map((tech, index) => (
                        <div key={index} className="flex items-center gap-2 p-2 bg-muted/50 rounded-lg">
                          <Code className="h-3 w-3 text-primary" />
                          <span className="font-medium text-xs truncate">{tech}</span>
                        </div>
                      ))
                    ) : (
                      ['React', 'TypeScript', 'Node.js', 'PostgreSQL'].map((tech, index) => (
                        <div key={index} className="flex items-center gap-2 p-2 bg-muted/50 rounded-lg">
                          <Code className="h-3 w-3 text-primary" />
                          <span className="font-medium text-xs">{tech}</span>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm md:text-base flex items-center gap-2">
                    <Rocket className="h-4 w-4" />
                    Frontend Requirements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <h4 className="text-xs font-semibold mb-2">Frameworks</h4>
                      <div className="flex flex-wrap gap-1">
                        {['React', 'JavaScript', 'TypeScript'].map((framework, index) => (
                          <Badge key={index} variant="default" className="text-xs">{framework}</Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold mb-2">Core Concepts</h4>
                      <div className="flex flex-wrap gap-1">
                        {['DOM', 'Events', 'State Mgmt'].map((concept, index) => (
                          <Badge key={index} variant="outline" className="text-xs">{concept}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Culture Tab */}
            <TabsContent value="culture" className="mt-0 p-4 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm md:text-base flex items-center gap-2">
                    <Coffee className="h-4 w-4" />
                    Company Culture
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold mb-1 text-sm flex items-center gap-2">
                        <Building2 className="h-3 w-3" />
                        Work Environment
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        Collaborative workspace with modern facilities.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1 text-sm flex items-center gap-2">
                        <Globe className="h-3 w-3" />
                        Remote Policy
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        Remote-friendly with flexible arrangements.
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-medium">Diversity</span>
                      <div className="flex items-center gap-2">
                        <Progress value={80} className="w-16" />
                        <span className="text-xs">4/5</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-medium">Innovation</span>
                      <div className="flex items-center gap-2">
                        <Progress value={90} className="w-16" />
                        <span className="text-xs">4.5/5</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-sm flex items-center gap-2">
                      <GraduationCap className="h-3 w-3" />
                      Learning & Development
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {['Conferences', 'Courses', 'Mentorship'].map((opportunity, index) => (
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
