import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { 
  Building2, 
  Download, 
  Globe, 
  MapPin, 
  Users, 
  Code,
  Calendar,
  Star,
  TrendingUp,
  Flag,
  Briefcase
} from 'lucide-react';
import { Company, InterviewStage } from './CompanyResearchHub';
import { COMPANY_INTERVIEW_DATA, type CompanyInterviewData } from '../data/companyInterviewData';

interface CompanyDataImporterProps {
  onImportComplete: (companies: Company[]) => void;
  existingCompanies: Company[];
}

// Categorization of companies by region
const INDIAN_COMPANIES = [
  'Flipkart', 'Swiggy', 'Zomato', 'Paytm', 'Ola', "BYJU'S", 'Zoho', 'Freshworks',
  'TCS', 'Wipro', 'Infosys', 'Cognizant', 'HCL Technologies', 'Tech Mahindra',
  'Oracle', 'IBM', 'Accenture', 'Deloitte', 'Capgemini', 'Mindtree', 'Mphasis',
  'Virtusa', 'LTI (Larsen & Toubro Infotech)', 'Mindvalley', 'Razorpay', 'Delhivery',
  'Swiggy Genie', 'Dream11', 'CRED', 'Meesho', 'Myntra', 'Pharmeasy', 'PolicyBazaar',
  'Urban Company', 'MakeMyTrip', 'Nykaa', 'Cleartrip', 'OYO', 'Grofers (Blinkit)',
  'BigBasket', 'Swiggy Instamart', 'Cure.fit', 'Lenskart', 'PolicyBazaar Health'
];

const FOREIGN_COMPANIES = [
  'Google', 'Meta (Facebook)', 'Amazon', 'Microsoft', 'Atlassian', 'Uber', 'Netflix',
  'Apple', 'Airbnb', 'Shopify', 'Adobe', 'PayPal', 'Salesforce', 'LinkedIn', 'Spotify',
  'eBay', 'Dropbox', 'Slack', 'Zoom', 'Pinterest', 'Trello', 'GitHub', 'Bitbucket',
  'Stripe', 'Mailchimp', 'Canva', 'Dropbox Paper', 'Asana', 'DigitalOcean', 'Heroku',
  'MongoDB', 'Elastic', 'Figma', 'Notion', 'Calendly', 'Twilio', 'Automattic', 'GitLab',
  'InVision', 'Zapier', 'Toptal', 'Basecamp', 'Buffer', 'Remote', 'DuckDuckGo', 'Hotjar', 'Toggl',
  // Remote-first and Global companies
  'Deel', 'Arc.dev', 'Turing', 'Remote.com', 'X-Team', 'Crossover', '10up', 'Webflow',
  'Vercel', 'Netlify', 'ConvertKit', 'Help Scout', 'Auth0', 'Miro', 'Loom', 'Doist (Todoist)',
  'Typeform', 'Linear', 'Clerk', 'Railway', 'Supabase', 'PlanetScale', 'Replicate', 'Replit',
  'CodeSandbox', 'Luma', 'Circle', 'Framer', 'Gamma'
];

// Company data imported from comprehensive data file

export function CompanyDataImporter({ onImportComplete, existingCompanies }: CompanyDataImporterProps) {
  const [isImporting, setIsImporting] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState<'all' | 'indian' | 'foreign'>('all');

  const categorizeCompany = (companyName: string): 'indian' | 'foreign' => {
    if (INDIAN_COMPANIES.includes(companyName)) {
      return 'indian';
    }
    return 'foreign';
  };

  const convertToCompany = (data: CompanyInterviewData): Company => {
    const region = categorizeCompany(data.Company);
    
    // Convert interview rounds to InterviewStage format
    const interviewProcess: InterviewStage[] = data.RoundBreakdown.map(round => ({
      id: `${data.Company.toLowerCase().replace(/\s+/g, '-')}-round-${round.Round}`,
      name: round.Type,
      type: mapRoundTypeToStageType(round.Type),
      duration: estimateDuration(round.Type),
      description: round.Description,
      tips: generateTipsForRound(round.Type, data.SpecialFocusAreas)
    }));

    return {
      id: Math.random().toString(36).substr(2, 9),
      name: data.Company,
      description: `Frontend engineering opportunities with focus on ${data.SpecialFocusAreas.join(', ')}`,
      industry: region === 'indian' ? getIndianCompanyIndustry(data.Company) : getForeignCompanyIndustry(data.Company),
      size: getCompanySize(data.Company),
      location: region === 'indian' ? getIndianCompanyLocation(data.Company) : getForeignCompanyLocation(data.Company),
      website: generateWebsiteUrl(data.Company),
      linkedinUrl: generateLinkedInUrl(data.Company),
      glassdoorRating: Math.random() * 1.5 + 3.5, // Random rating between 3.5-5
      culture: generateCultureValues(region, data.Company),
      techStack: data.FrameworksOrTools,
      benefits: generateBenefits(region),
      interviewProcess,
      applications: [],
      contacts: [],
      notes: data.Notes || `DSA Required: ${data.DSA}. Special focus: ${data.SpecialFocusAreas.join(', ')}`,
      isWishlist: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
  };

  const mapRoundTypeToStageType = (roundType: string): InterviewStage['type'] => {
    const type = roundType.toLowerCase();
    if (type.includes('phone') || type.includes('recruiter')) return 'phone';
    if (type.includes('technical') || type.includes('coding')) return 'technical';
    if (type.includes('behavioral') || type.includes('culture')) return 'behavioral';
    if (type.includes('system') || type.includes('design')) return 'system-design';
    if (type.includes('onsite') || type.includes('final')) return 'onsite';
    return 'technical';
  };

  const estimateDuration = (roundType: string): number => {
    const type = roundType.toLowerCase();
    if (type.includes('phone') || type.includes('recruiter')) return 30;
    if (type.includes('technical') || type.includes('coding')) return 60;
    if (type.includes('behavioral')) return 45;
    if (type.includes('system') || type.includes('design')) return 90;
    if (type.includes('onsite')) return 240;
    return 60;
  };

  const generateTipsForRound = (roundType: string, focusAreas: string[]): string[] => {
    const type = roundType.toLowerCase();
    const baseTips: string[] = [];
    
    if (type.includes('phone') || type.includes('recruiter')) {
      baseTips.push('Prepare your elevator pitch', 'Research the company culture', 'Ask thoughtful questions');
    } else if (type.includes('technical') || type.includes('coding')) {
      baseTips.push('Practice data structures and algorithms', 'Think out loud while coding', 'Ask clarifying questions');
      if (focusAreas.includes('Performance')) baseTips.push('Discuss performance optimizations');
      if (focusAreas.includes('Security')) baseTips.push('Consider security implications');
    } else if (type.includes('system') || type.includes('design')) {
      baseTips.push('Start with requirements gathering', 'Consider scalability', 'Discuss trade-offs');
    } else if (type.includes('behavioral')) {
      baseTips.push('Use STAR method', 'Prepare specific examples', 'Show leadership qualities');
    }
    
    return baseTips;
  };

  const getIndianCompanyIndustry = (companyName: string): string => {
    const industryMap: Record<string, string> = {
      'Flipkart': 'E-commerce',
      'Swiggy': 'Food Delivery',
      'Zomato': 'Food Tech',
      'Paytm': 'Fintech',
      'Ola': 'Transportation',
      "BYJU'S": 'EdTech',
      'Zoho': 'Enterprise Software',
      'Freshworks': 'Customer Experience',
      'TCS': 'IT Services',
      'Wipro': 'IT Services',
      'Infosys': 'IT Services'
    };
    return industryMap[companyName] || 'Technology';
  };

  const getForeignCompanyIndustry = (companyName: string): string => {
    const industryMap: Record<string, string> = {
      'Google': 'Search & Cloud',
      'Meta (Facebook)': 'Social Media',
      'Amazon': 'E-commerce & Cloud',
      'Microsoft': 'Software & Cloud',
      'Apple': 'Consumer Electronics',
      'Netflix': 'Streaming Media',
      'Uber': 'Transportation',
      'Airbnb': 'Travel & Hospitality'
    };
    return industryMap[companyName] || 'Technology';
  };

  const getCompanySize = (companyName: string): Company['size'] => {
    if (['TCS', 'Wipro', 'Infosys', 'Google', 'Meta (Facebook)', 'Amazon', 'Microsoft'].includes(companyName)) {
      return 'enterprise';
    }
    if (['Flipkart', 'Swiggy', 'Paytm', 'Netflix', 'Uber', 'Airbnb'].includes(companyName)) {
      return 'large';
    }
    return 'medium';
  };

  const getIndianCompanyLocation = (companyName: string): string => {
    const locationMap: Record<string, string> = {
      'Flipkart': 'Bangalore, India',
      'Swiggy': 'Bangalore, India',
      'Zomato': 'Gurgaon, India',
      'Paytm': 'Noida, India',
      'Ola': 'Bangalore, India',
      "BYJU'S": 'Bangalore, India',
      'Zoho': 'Chennai, India',
      'Freshworks': 'Chennai, India',
      'TCS': 'Mumbai, India',
      'Wipro': 'Bangalore, India'
    };
    return locationMap[companyName] || 'India';
  };

  const getForeignCompanyLocation = (companyName: string): string => {
    const locationMap: Record<string, string> = {
      'Google': 'Mountain View, CA',
      'Meta (Facebook)': 'Menlo Park, CA',
      'Amazon': 'Seattle, WA',
      'Microsoft': 'Redmond, WA',
      'Apple': 'Cupertino, CA',
      'Netflix': 'Los Gatos, CA',
      'Uber': 'San Francisco, CA',
      'Airbnb': 'San Francisco, CA'
    };
    return locationMap[companyName] || 'United States';
  };

  const generateWebsiteUrl = (companyName: string): string => {
    const domain = companyName.toLowerCase()
      .replace(/\s+/g, '')
      .replace(/[()]/g, '')
      .replace('meta', 'meta');
    return `https://${domain}.com`;
  };

  const generateLinkedInUrl = (companyName: string): string => {
    const slug = companyName.toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[()]/g, '');
    return `https://linkedin.com/company/${slug}`;
  };

  const generateCultureValues = (region: 'indian' | 'foreign', companyName: string): string[] => {
    const commonValues = ['Innovation', 'Collaboration', 'Growth'];
    const indianValues = ['Diversity', 'Jugaad', 'Family-first'];
    const foreignValues = ['Transparency', 'Remote-first', 'Work-life balance'];
    
    return [...commonValues, ...(region === 'indian' ? indianValues : foreignValues)];
  };

  const generateBenefits = (region: 'indian' | 'foreign'): string[] => {
    const commonBenefits = ['Health insurance', 'Learning budget', 'Flexible hours'];
    const indianBenefits = ['Food allowance', 'Transportation', 'Festival bonuses'];
    const foreignBenefits = ['401k matching', 'Unlimited PTO', 'Stock options'];
    
    return [...commonBenefits, ...(region === 'indian' ? indianBenefits : foreignBenefits)];
  };

  const handleImport = async () => {
    setIsImporting(true);
    
    try {
      const filteredData = selectedRegion === 'all' ? COMPANY_INTERVIEW_DATA :
        COMPANY_INTERVIEW_DATA.filter(company => 
          categorizeCompany(company.Company) === selectedRegion
        );

      const newCompanies = filteredData.map(convertToCompany);
      
      // Filter out companies that already exist
      const existingNames = new Set(existingCompanies.map(c => c.name));
      const uniqueCompanies = newCompanies.filter(c => !existingNames.has(c.name));
      
      if (uniqueCompanies.length === 0) {
        toast.info('All companies in this category have already been imported');
      } else {
        onImportComplete(uniqueCompanies);
        toast.success(`Successfully imported ${uniqueCompanies.length} companies!`);
      }
    } catch (error) {
      toast.error('Failed to import companies');
      console.error('Import error:', error);
    } finally {
      setIsImporting(false);
    }
  };

  const indianCompanies = COMPANY_INTERVIEW_DATA.filter(c => categorizeCompany(c.Company) === 'indian');
  const foreignCompanies = COMPANY_INTERVIEW_DATA.filter(c => categorizeCompany(c.Company) === 'foreign');

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Company Interview Data</h2>
        <p className="text-muted-foreground">
          Import comprehensive interview data for top tech companies
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Companies</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{COMPANY_INTERVIEW_DATA.length}</div>
            <p className="text-xs text-muted-foreground">
              Available for import
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Indian Companies</CardTitle>
            <Flag className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{indianCompanies.length}</div>
            <p className="text-xs text-muted-foreground">
              Indian market focused
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Foreign Companies</CardTitle>
            <Globe className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{foreignCompanies.length}</div>
            <p className="text-xs text-muted-foreground">
              Global opportunities
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Import Controls */}
      <Card>
        <CardHeader>
          <CardTitle>Import Companies</CardTitle>
          <CardDescription>
            Choose which companies to import into your research hub
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Tabs value={selectedRegion} onValueChange={(value) => setSelectedRegion(value as any)}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all">All Companies</TabsTrigger>
              <TabsTrigger value="indian">Indian Companies</TabsTrigger>
              <TabsTrigger value="foreign">Foreign Companies</TabsTrigger>
            </TabsList>
          </Tabs>

          <Button 
            onClick={handleImport} 
            disabled={isImporting}
            className="w-full"
          >
            <Download className="h-4 w-4 mr-2" />
            {isImporting ? 'Importing...' : `Import ${selectedRegion === 'all' ? 'All' : selectedRegion === 'indian' ? 'Indian' : 'Foreign'} Companies`}
          </Button>
        </CardContent>
      </Card>

      {/* Company Preview */}
      <Tabs value={selectedRegion === 'all' ? 'indian' : selectedRegion}>
        <TabsList>
          <TabsTrigger value="indian">Indian Companies</TabsTrigger>
          <TabsTrigger value="foreign">Foreign Companies</TabsTrigger>
        </TabsList>

        <TabsContent value="indian" className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {indianCompanies.slice(0, 6).map((company) => (
              <Card key={company.Company} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">{company.Company}</CardTitle>
                    <Badge variant="outline" className="text-orange-600 border-orange-200">
                      <Flag className="h-3 w-3 mr-1" />
                      Indian
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    {company.NoOfInterviewRounds} rounds
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <h4 className="text-xs font-medium mb-1">Tech Stack</h4>
                    <div className="flex flex-wrap gap-1">
                      {company.FrameworksOrTools.slice(0, 3).map((tech, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                      {company.FrameworksOrTools.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{company.FrameworksOrTools.length - 3}
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-xs font-medium mb-1">Focus Areas</h4>
                    <div className="flex flex-wrap gap-1">
                      {company.SpecialFocusAreas.slice(0, 2).map((area, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {area}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs">
                    <Code className="h-3 w-3" />
                    <span>DSA: {company.DSA}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          {indianCompanies.length > 6 && (
            <p className="text-center text-sm text-muted-foreground">
              +{indianCompanies.length - 6} more Indian companies available
            </p>
          )}
        </TabsContent>

        <TabsContent value="foreign" className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {foreignCompanies.slice(0, 6).map((company) => (
              <Card key={company.Company} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">{company.Company}</CardTitle>
                    <Badge variant="outline" className="text-blue-600 border-blue-200">
                      <Globe className="h-3 w-3 mr-1" />
                      Global
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    {company.NoOfInterviewRounds} rounds
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <h4 className="text-xs font-medium mb-1">Tech Stack</h4>
                    <div className="flex flex-wrap gap-1">
                      {company.FrameworksOrTools.slice(0, 3).map((tech, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                      {company.FrameworksOrTools.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{company.FrameworksOrTools.length - 3}
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-xs font-medium mb-1">Focus Areas</h4>
                    <div className="flex flex-wrap gap-1">
                      {company.SpecialFocusAreas.slice(0, 2).map((area, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {area}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs">
                    <Code className="h-3 w-3" />
                    <span>DSA: {company.DSA}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          {foreignCompanies.length > 6 && (
            <p className="text-center text-sm text-muted-foreground">
              +{foreignCompanies.length - 6} more global companies available
            </p>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
