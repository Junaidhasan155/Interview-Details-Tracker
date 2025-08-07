import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Building2, 
  Globe, 
  Flag,
  BarChart3,
  PieChart,
  TrendingUp,
  Users,
  Calendar,
  DollarSign,
  Star,
  Code,
  Target
} from 'lucide-react';
import { Company } from './CompanyResearchHub';

interface CompanyComparisonProps {
  companies: Company[];
}

export function CompanyComparisonView({ companies }: CompanyComparisonProps) {
  const [activeTab, setActiveTab] = useState('overview');

  const stats = useMemo(() => {
    const indianCompanies = companies.filter(c => c.region === 'indian');
    const foreignCompanies = companies.filter(c => c.region === 'foreign');

    const calculateAverageRounds = (companyList: Company[]) => {
      const totalRounds = companyList.reduce((sum, company) => sum + company.interviewProcess.length, 0);
      return companyList.length > 0 ? Math.round((totalRounds / companyList.length) * 10) / 10 : 0;
    };

    const calculateAverageRating = (companyList: Company[]) => {
      const ratingsCount = companyList.filter(c => c.glassdoorRating).length;
      const totalRating = companyList.reduce((sum, company) => sum + (company.glassdoorRating || 0), 0);
      return ratingsCount > 0 ? Math.round((totalRating / ratingsCount) * 10) / 10 : 0;
    };

    const getTopTechnologies = (companyList: Company[]) => {
      const techCount: Record<string, number> = {};
      companyList.forEach(company => {
        company.techStack.forEach(tech => {
          techCount[tech] = (techCount[tech] || 0) + 1;
        });
      });
      return Object.entries(techCount)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 10)
        .map(([tech, count]) => ({ tech, count }));
    };

    const getIndustryDistribution = (companyList: Company[]) => {
      const industryCount: Record<string, number> = {};
      companyList.forEach(company => {
        industryCount[company.industry] = (industryCount[company.industry] || 0) + 1;
      });
      return Object.entries(industryCount)
        .sort(([,a], [,b]) => b - a)
        .map(([industry, count]) => ({ industry, count }));
    };

    const getSizeDistribution = (companyList: Company[]) => {
      const sizeCount: Record<string, number> = {};
      companyList.forEach(company => {
        sizeCount[company.size] = (sizeCount[company.size] || 0) + 1;
      });
      return Object.entries(sizeCount)
        .sort(([,a], [,b]) => b - a)
        .map(([size, count]) => ({ size, count }));
    };

    return {
      indian: {
        total: indianCompanies.length,
        averageRounds: calculateAverageRounds(indianCompanies),
        averageRating: calculateAverageRating(indianCompanies),
        topTech: getTopTechnologies(indianCompanies),
        industries: getIndustryDistribution(indianCompanies),
        sizes: getSizeDistribution(indianCompanies),
        withApplications: indianCompanies.filter(c => c.applications.length > 0).length
      },
      foreign: {
        total: foreignCompanies.length,
        averageRounds: calculateAverageRounds(foreignCompanies),
        averageRating: calculateAverageRating(foreignCompanies),
        topTech: getTopTechnologies(foreignCompanies),
        industries: getIndustryDistribution(foreignCompanies),
        sizes: getSizeDistribution(foreignCompanies),
        withApplications: foreignCompanies.filter(c => c.applications.length > 0).length
      }
    };
  }, [companies]);

  const getSizeLabel = (size: string) => {
    switch (size) {
      case 'startup': return '1-50';
      case 'small': return '51-200';
      case 'medium': return '201-1000';
      case 'large': return '1001-5000';
      case 'enterprise': return '5000+';
      default: return size;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Company Regional Comparison</h2>
        <p className="text-muted-foreground">
          Compare interview patterns and company characteristics between Indian and Foreign markets
        </p>
      </div>

      {/* Quick Stats Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Indian Companies Stats */}
        <Card className="border-l-4 border-l-orange-500">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Flag className="h-5 w-5 text-orange-600" />
                Indian Companies
              </CardTitle>
              <Badge variant="outline" className="text-orange-600 border-orange-200">
                {stats.indian.total} companies
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">
                  {stats.indian.averageRounds}
                </div>
                <p className="text-xs text-muted-foreground">Avg Interview Rounds</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">
                  {stats.indian.averageRating || 'N/A'}
                </div>
                <p className="text-xs text-muted-foreground">Avg Glassdoor Rating</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Top Technologies</h4>
              <div className="flex flex-wrap gap-1">
                {stats.indian.topTech.slice(0, 5).map(({ tech, count }) => (
                  <Badge key={tech} variant="secondary" className="text-xs">
                    {tech} ({count})
                  </Badge>
                ))}
              </div>
            </div>

            <div className="text-center">
              <div className="text-lg font-semibold text-orange-600">
                {stats.indian.withApplications}
              </div>
              <p className="text-xs text-muted-foreground">Companies with Applications</p>
            </div>
          </CardContent>
        </Card>

        {/* Foreign Companies Stats */}
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-blue-600" />
                Foreign Companies
              </CardTitle>
              <Badge variant="outline" className="text-blue-600 border-blue-200">
                {stats.foreign.total} companies
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {stats.foreign.averageRounds}
                </div>
                <p className="text-xs text-muted-foreground">Avg Interview Rounds</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {stats.foreign.averageRating || 'N/A'}
                </div>
                <p className="text-xs text-muted-foreground">Avg Glassdoor Rating</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Top Technologies</h4>
              <div className="flex flex-wrap gap-1">
                {stats.foreign.topTech.slice(0, 5).map(({ tech, count }) => (
                  <Badge key={tech} variant="secondary" className="text-xs">
                    {tech} ({count})
                  </Badge>
                ))}
              </div>
            </div>

            <div className="text-center">
              <div className="text-lg font-semibold text-blue-600">
                {stats.foreign.withApplications}
              </div>
              <p className="text-xs text-muted-foreground">Companies with Applications</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analysis Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="technologies">Technologies</TabsTrigger>
          <TabsTrigger value="industries">Industries</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Company Size Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Company Size Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2 text-orange-600">Indian Companies</h4>
                    <div className="space-y-2">
                      {stats.indian.sizes.map(({ size, count }) => (
                        <div key={size} className="flex items-center justify-between">
                          <span className="text-sm capitalize">{getSizeLabel(size)}</span>
                          <div className="flex items-center gap-2">
                            <div className="w-20 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-orange-500 h-2 rounded-full" 
                                style={{ width: `${(count / stats.indian.total) * 100}%` }}
                              />
                            </div>
                            <span className="text-sm text-muted-foreground">{count}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2 text-blue-600">Foreign Companies</h4>
                    <div className="space-y-2">
                      {stats.foreign.sizes.map(({ size, count }) => (
                        <div key={size} className="flex items-center justify-between">
                          <span className="text-sm capitalize">{getSizeLabel(size)}</span>
                          <div className="flex items-center gap-2">
                            <div className="w-20 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-blue-500 h-2 rounded-full" 
                                style={{ width: `${(count / stats.foreign.total) * 100}%` }}
                              />
                            </div>
                            <span className="text-sm text-muted-foreground">{count}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Interview Rounds Comparison */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Interview Process Comparison
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-orange-50 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600 mb-1">
                        {stats.indian.averageRounds}
                      </div>
                      <div className="text-sm text-orange-700">Indian Avg Rounds</div>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600 mb-1">
                        {stats.foreign.averageRounds}
                      </div>
                      <div className="text-sm text-blue-700">Foreign Avg Rounds</div>
                    </div>
                  </div>
                  
                  <div className="text-center text-sm text-muted-foreground">
                    {stats.indian.averageRounds > stats.foreign.averageRounds ? (
                      <>Indian companies have {(stats.indian.averageRounds - stats.foreign.averageRounds).toFixed(1)} more rounds on average</>
                    ) : stats.foreign.averageRounds > stats.indian.averageRounds ? (
                      <>Foreign companies have {(stats.foreign.averageRounds - stats.indian.averageRounds).toFixed(1)} more rounds on average</>
                    ) : (
                      <>Both regions have similar interview processes</>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="technologies" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange-600">
                  <Code className="h-4 w-4" />
                  Indian Companies - Top Tech
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {stats.indian.topTech.map(({ tech, count }, index) => (
                    <div key={tech} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-orange-600">#{index + 1}</span>
                        <span className="text-sm">{tech}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-orange-500 h-2 rounded-full" 
                            style={{ width: `${(count / stats.indian.total) * 100}%` }}
                          />
                        </div>
                        <Badge variant="outline" className="text-xs">{count}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-600">
                  <Code className="h-4 w-4" />
                  Foreign Companies - Top Tech
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {stats.foreign.topTech.map(({ tech, count }, index) => (
                    <div key={tech} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-blue-600">#{index + 1}</span>
                        <span className="text-sm">{tech}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full" 
                            style={{ width: `${(count / stats.foreign.total) * 100}%` }}
                          />
                        </div>
                        <Badge variant="outline" className="text-xs">{count}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="industries" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange-600">
                  <Building2 className="h-4 w-4" />
                  Indian Industry Focus
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {stats.indian.industries.map(({ industry, count }) => (
                    <div key={industry} className="flex items-center justify-between">
                      <span className="text-sm">{industry}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-orange-500 h-2 rounded-full" 
                            style={{ width: `${(count / stats.indian.total) * 100}%` }}
                          />
                        </div>
                        <Badge variant="outline" className="text-xs">{count}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-600">
                  <Building2 className="h-4 w-4" />
                  Foreign Industry Focus
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {stats.foreign.industries.map(({ industry, count }) => (
                    <div key={industry} className="flex items-center justify-between">
                      <span className="text-sm">{industry}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full" 
                            style={{ width: `${(count / stats.foreign.total) * 100}%` }}
                          />
                        </div>
                        <Badge variant="outline" className="text-xs">{count}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="insights" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  Key Insights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <h4 className="text-sm font-medium text-blue-700">Interview Process</h4>
                    <p className="text-xs text-blue-600 mt-1">
                      {stats.indian.averageRounds > stats.foreign.averageRounds 
                        ? 'Indian companies typically have more interview rounds, focusing on thorough evaluation'
                        : 'Foreign companies tend to have streamlined interview processes'
                      }
                    </p>
                  </div>
                  
                  <div className="p-3 bg-green-50 rounded-lg">
                    <h4 className="text-sm font-medium text-green-700">Technology Stack</h4>
                    <p className="text-xs text-green-600 mt-1">
                      React dominates both markets, with TypeScript gaining prominence in remote-first companies
                    </p>
                  </div>
                  
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <h4 className="text-sm font-medium text-purple-700">Market Focus</h4>
                    <p className="text-xs text-purple-600 mt-1">
                      Indian companies focus on scalability and local market needs, while foreign companies emphasize global reach
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-3 border border-orange-200 bg-orange-50 rounded-lg">
                    <h4 className="text-sm font-medium text-orange-700">For Indian Market</h4>
                    <p className="text-xs text-orange-600 mt-1">
                      Focus on DSA preparation and system design. Prepare for longer interview cycles.
                    </p>
                  </div>
                  
                  <div className="p-3 border border-blue-200 bg-blue-50 rounded-lg">
                    <h4 className="text-sm font-medium text-blue-700">For Foreign Market</h4>
                    <p className="text-xs text-blue-600 mt-1">
                      Emphasize practical coding skills, open-source contributions, and remote work experience.
                    </p>
                  </div>
                  
                  <div className="p-3 border border-gray-200 bg-gray-50 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-700">Universal Skills</h4>
                    <p className="text-xs text-gray-600 mt-1">
                      Master React, TypeScript, and system design. Build a strong portfolio with deployed projects.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
