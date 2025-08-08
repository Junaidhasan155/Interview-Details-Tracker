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
  Building2,
  MapPin,
  DollarSign,
  Calendar,
  Users,
  Star,
  ExternalLink,
  Edit,
  Trash2,
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
  Download,
  Filter,
  BarChart3
} from 'lucide-react';
import { CompanyDataImporter } from './CompanyDataImporter';
import { CompanyComparisonView } from './CompanyComparisonView';
import { CompanyDetailModal } from './CompanyDetailModal';

export interface Company {
  id: string;
  name: string;
  description?: string;
  industry: string;
  size: 'startup' | 'small' | 'medium' | 'large' | 'enterprise';
  location: string;
  region?: 'indian' | 'foreign';
  website?: string;
  linkedinUrl?: string;
  glassdoorRating?: number;
  culture: string[];
  techStack: string[];
  benefits: string[];
  interviewProcess: InterviewStage[];
  applications: Application[];
  contacts: Contact[];
  notes: string;
  isWishlist: boolean;
  createdAt: string;
  updatedAt: string;
  // Enhanced data
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

export interface InterviewStage {
  id: string;
  name: string;
  type: 'phone' | 'technical' | 'behavioral' | 'system-design' | 'onsite' | 'final';
  duration: number; // in minutes
  description?: string;
  tips: string[];
}

export interface Application {
  id: string;
  position: string;
  department?: string;
  level: 'entry' | 'mid' | 'senior' | 'lead' | 'principal';
  salaryRange?: string;
  status: 'applied' | 'screening' | 'interviewing' | 'offer' | 'rejected' | 'withdrawn';
  appliedDate: string;
  lastUpdate: string;
  nextStep?: string;
  referrer?: string;
  jobUrl?: string;
  stages: ApplicationStage[];
}

export interface ApplicationStage {
  id: string;
  name: string;
  status: 'pending' | 'scheduled' | 'completed' | 'passed' | 'failed';
  scheduledDate?: string;
  completedDate?: string;
  feedback?: string;
  interviewer?: string;
  notes?: string;
}

export interface Contact {
  id: string;
  name: string;
  role: string;
  email?: string;
  linkedin?: string;
  notes?: string;
  lastContact?: string;
  relationship: 'recruiter' | 'hiring-manager' | 'engineer' | 'referral' | 'other';
}

const companySchema = z.object({
  name: z.string().min(2, 'Company name must be at least 2 characters'),
  description: z.string().optional(),
  industry: z.string().min(1, 'Industry is required'),
  size: z.enum(['startup', 'small', 'medium', 'large', 'enterprise']),
  location: z.string().min(1, 'Location is required'),
  website: z.string().url().optional().or(z.literal('')),
  linkedinUrl: z.string().url().optional().or(z.literal('')),
  glassdoorRating: z.number().min(1).max(5).optional(),
  culture: z.string().optional(),
  techStack: z.string().optional(),
  benefits: z.string().optional(),
  notes: z.string().optional()
});

type CompanyFormData = z.infer<typeof companySchema>;

const applicationSchema = z.object({
  position: z.string().min(2, 'Position must be at least 2 characters'),
  department: z.string().optional(),
  level: z.enum(['entry', 'mid', 'senior', 'lead', 'principal']),
  salaryRange: z.string().optional(),
  status: z.enum(['applied', 'screening', 'interviewing', 'offer', 'rejected', 'withdrawn']),
  appliedDate: z.string().min(1, 'Applied date is required'),
  nextStep: z.string().optional(),
  referrer: z.string().optional(),
  jobUrl: z.string().url().optional().or(z.literal(''))
});

type ApplicationFormData = z.infer<typeof applicationSchema>;

const SAMPLE_COMPANIES: Omit<Company, 'id' | 'createdAt' | 'updatedAt'>[] = [
  {
    name: 'Google',
    description: 'Technology company focused on search, advertising, and cloud computing',
    industry: 'Technology',
    size: 'enterprise',
    location: 'Mountain View, CA',
    website: 'https://google.com',
    linkedinUrl: 'https://linkedin.com/company/google',
    glassdoorRating: 4.4,
    culture: ['Innovation', 'Data-driven', 'Collaborative', 'Fast-paced'],
    techStack: ['Go', 'Python', 'Java', 'C++', 'JavaScript', 'Kubernetes'],
    benefits: ['Health insurance', '401k matching', 'Stock options', 'Free meals', 'Learning budget'],
    interviewProcess: [
      {
        id: '1',
        name: 'Phone Screening',
        type: 'phone',
        duration: 45,
        description: 'Initial recruiter call to assess background and interest',
        tips: ['Prepare elevator pitch', 'Research the role', 'Ask thoughtful questions']
      },
      {
        id: '2',
        name: 'Technical Phone Interview',
        type: 'technical',
        duration: 60,
        description: 'Coding interview with live coding session',
        tips: ['Practice data structures', 'Think out loud', 'Ask clarifying questions']
      },
      {
        id: '3',
        name: 'Onsite Interviews',
        type: 'onsite',
        duration: 300,
        description: '4-5 rounds including coding, system design, and behavioral',
        tips: ['Prepare for system design', 'Practice behavioral questions', 'Bring questions about team']
      }
    ],
    applications: [],
    contacts: [],
    notes: 'Highly competitive but great growth opportunities. Focus on algorithmic thinking.',
    isWishlist: true,
    region: 'foreign'
  },
  {
    name: 'Stripe',
    description: 'Financial technology company providing payment processing',
    industry: 'Fintech',
    size: 'large',
    location: 'San Francisco, CA',
    website: 'https://stripe.com',
    glassdoorRating: 4.6,
    culture: ['User-focused', 'Quality', 'Transparency', 'Global'],
    techStack: ['Ruby', 'Scala', 'Go', 'React', 'TypeScript'],
    benefits: ['Unlimited PTO', 'Remote work', 'Learning stipend', 'Health coverage'],
    interviewProcess: [
      {
        id: '1',
        name: 'Recruiter Call',
        type: 'phone',
        duration: 30,
        description: 'Initial screening and role discussion',
        tips: ['Understand the role clearly', 'Show enthusiasm for payments']
      },
      {
        id: '2',
        name: 'Hiring Manager Interview',
        type: 'behavioral',
        duration: 60,
        description: 'Discussion about experience and cultural fit',
        tips: ['Prepare specific examples', 'Show leadership qualities']
      },
      {
        id: '3',
        name: 'Technical Assessment',
        type: 'technical',
        duration: 90,
        description: 'Take-home coding challenge',
        tips: ['Write clean code', 'Include tests', 'Document your approach']
      }
    ],
    applications: [],
    contacts: [],
    notes: 'Values code quality and user experience. Great for payments/fintech experience.',
    isWishlist: false,
    region: 'foreign'
  }
];

// Indian companies list for categorization
const INDIAN_COMPANIES = [
  'Flipkart', 'Swiggy', 'Zomato', 'Paytm', 'Ola', "BYJU'S", 'Zoho', 'Freshworks',
  'TCS', 'Wipro', 'Infosys', 'Cognizant', 'HCL Technologies', 'Tech Mahindra',
  'Accenture', 'Deloitte', 'Capgemini', 'Mindtree', 'Mphasis', 'Virtusa',
  'LTI (Larsen & Toubro Infotech)', 'Mindvalley', 'Razorpay', 'Delhivery',
  'Swiggy Genie', 'Dream11', 'CRED', 'Meesho', 'Myntra', 'Pharmeasy', 'PolicyBazaar',
  'Urban Company', 'MakeMyTrip', 'Nykaa', 'Cleartrip', 'OYO', 'Grofers (Blinkit)',
  'BigBasket', 'Swiggy Instamart', 'Cure.fit', 'Lenskart', 'PolicyBazaar Health'
];

export function CompanyResearchHub() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [filteredCompanies, setFilteredCompanies] = useState<Company[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState<string>('all');
  const [selectedSize, setSelectedSize] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [isAddCompanyOpen, setIsAddCompanyOpen] = useState(false);
  const [isImportOpen, setIsImportOpen] = useState(false);
  const [isComparisonOpen, setIsComparisonOpen] = useState(false);
  const [isAddApplicationOpen, setIsAddApplicationOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Helper function to categorize companies by region
  const categorizeCompany = (companyName: string): 'indian' | 'foreign' => {
    return INDIAN_COMPANIES.includes(companyName) ? 'indian' : 'foreign';
  };

  // Helper function to convert interview data to company format
  const convertInterviewDataToCompany = (data: any, region: 'indian' | 'foreign'): Company => {
    const interviewProcess: InterviewStage[] = data.RoundBreakdown.map((round: any) => ({
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
      industry: getCompanyIndustry(data.Company, region),
      size: getCompanySize(data.Company),
      location: getCompanyLocation(data.Company, region),
      region,
      website: generateWebsiteUrl(data.Company),
      linkedinUrl: generateLinkedInUrl(data.Company),
      glassdoorRating: Math.round((Math.random() * 1.5 + 3.5) * 10) / 10,
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

  const getCompanyIndustry = (companyName: string, region: 'indian' | 'foreign'): string => {
    if (region === 'indian') {
      const industryMap: Record<string, string> = {
        'Flipkart': 'E-commerce', 'Swiggy': 'Food Delivery', 'Zomato': 'Food Tech',
        'Paytm': 'Fintech', 'Ola': 'Transportation', "BYJU'S": 'EdTech',
        'Zoho': 'Enterprise Software', 'Freshworks': 'Customer Experience',
        'TCS': 'IT Services', 'Wipro': 'IT Services', 'Infosys': 'IT Services'
      };
      return industryMap[companyName] || 'Technology';
    } else {
      const industryMap: Record<string, string> = {
        'Google': 'Search & Cloud', 'Meta (Facebook)': 'Social Media',
        'Amazon': 'E-commerce & Cloud', 'Microsoft': 'Software & Cloud',
        'Apple': 'Consumer Electronics', 'Netflix': 'Streaming Media',
        'Vercel': 'Developer Tools', 'Netlify': 'JAMstack Platform',
        'Supabase': 'Backend-as-a-Service', 'Linear': 'Project Management',
        'Figma': 'Design Tools', 'Framer': 'Design Tools'
      };
      return industryMap[companyName] || 'Technology';
    }
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

  const getCompanyLocation = (companyName: string, region: 'indian' | 'foreign'): string => {
    if (region === 'indian') {
      const locationMap: Record<string, string> = {
        'Flipkart': 'Bangalore, India', 'Swiggy': 'Bangalore, India', 'Zomato': 'Gurgaon, India',
        'Paytm': 'Noida, India', 'Ola': 'Bangalore, India', "BYJU'S": 'Bangalore, India',
        'Zoho': 'Chennai, India', 'Freshworks': 'Chennai, India', 'TCS': 'Mumbai, India'
      };
      return locationMap[companyName] || 'India';
    } else {
      const locationMap: Record<string, string> = {
        'Google': 'Mountain View, CA', 'Meta (Facebook)': 'Menlo Park, CA',
        'Amazon': 'Seattle, WA', 'Microsoft': 'Redmond, WA',
        'Vercel': 'San Francisco, CA', 'Netlify': 'San Francisco, CA',
        'Linear': 'San Francisco, CA', 'Figma': 'San Francisco, CA'
      };
      return locationMap[companyName] || 'Remote-First';
    }
  };

  const generateWebsiteUrl = (companyName: string): string => {
    const domain = companyName.toLowerCase().replace(/\s+/g, '').replace(/[()]/g, '');
    return `https://${domain}.com`;
  };

  const generateLinkedInUrl = (companyName: string): string => {
    const slug = companyName.toLowerCase().replace(/\s+/g, '-').replace(/[()]/g, '');
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

  const companyForm = useForm<CompanyFormData>({
    resolver: zodResolver(companySchema),
    defaultValues: {
      name: '',
      description: '',
      industry: '',
      size: 'medium',
      location: '',
      website: '',
      linkedinUrl: '',
      culture: '',
      techStack: '',
      benefits: '',
      notes: ''
    }
  });

  const applicationForm = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      position: '',
      department: '',
      level: 'mid',
      salaryRange: '',
      status: 'applied',
      appliedDate: new Date().toISOString().split('T')[0],
      nextStep: '',
      referrer: '',
      jobUrl: ''
    }
  });

  // Load companies on mount
  useEffect(() => {
    // Always load the latest comprehensive data
    import('../data/companyInterviewData').then(({ COMPANY_INTERVIEW_DATA }) => {
      const comprehensiveCompanies = COMPANY_INTERVIEW_DATA.map(data => {
        const region = categorizeCompany(data.Company);
        return convertInterviewDataToCompany(data, region);
      });
      setCompanies(comprehensiveCompanies);
      localStorage.setItem('companies', JSON.stringify(comprehensiveCompanies));
      toast.success(`🎉 Loaded ${comprehensiveCompanies.length} companies with comprehensive interview data!`);
    });
  }, []);

  // Save companies to localStorage
  useEffect(() => {
    if (companies.length > 0) {
      localStorage.setItem('companies', JSON.stringify(companies));
    }
  }, [companies]);

  // Filter companies
  useEffect(() => {
    let filtered = companies;

    if (searchQuery) {
      filtered = filtered.filter(company =>
        company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        company.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
        company.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedIndustry !== 'all') {
      filtered = filtered.filter(company => company.industry === selectedIndustry);
    }

    if (selectedSize !== 'all') {
      filtered = filtered.filter(company => company.size === selectedSize);
    }

    if (selectedStatus !== 'all') {
      if (selectedStatus === 'applied') {
        filtered = filtered.filter(company => company.applications.length > 0);
      } else if (selectedStatus === 'wishlist') {
        filtered = filtered.filter(company => company.isWishlist);
      }
    }

    if (selectedRegion !== 'all') {
      filtered = filtered.filter(company => company.region === selectedRegion);
    }

    setFilteredCompanies(filtered);
  }, [companies, searchQuery, selectedIndustry, selectedSize, selectedStatus, selectedRegion]);

  const handleAddCompany = (data: CompanyFormData) => {
    const newCompany: Company = {
      id: Math.random().toString(36).substr(2, 9),
      name: data.name,
      description: data.description,
      industry: data.industry,
      size: data.size,
      location: data.location,
      website: data.website,
      linkedinUrl: data.linkedinUrl,
      glassdoorRating: data.glassdoorRating,
      culture: data.culture ? data.culture.split(',').map(item => item.trim()) : [],
      techStack: data.techStack ? data.techStack.split(',').map(item => item.trim()) : [],
      benefits: data.benefits ? data.benefits.split(',').map(item => item.trim()) : [],
      interviewProcess: [],
      applications: [],
      contacts: [],
      notes: data.notes || '',
      isWishlist: false,
      region: undefined,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setCompanies(prev => [newCompany, ...prev]);
    companyForm.reset();
    setIsAddCompanyOpen(false);
    toast.success('Company added to research hub!');
  };

  const handleAddApplication = (data: ApplicationFormData) => {
    if (!selectedCompany) return;

    const newApplication: Application = {
      id: Math.random().toString(36).substr(2, 9),
      position: data.position,
      department: data.department,
      level: data.level,
      salaryRange: data.salaryRange,
      status: data.status,
      appliedDate: data.appliedDate,
      lastUpdate: new Date().toISOString(),
      nextStep: data.nextStep,
      referrer: data.referrer,
      jobUrl: data.jobUrl,
      stages: []
    };

    setCompanies(prev => prev.map(company =>
      company.id === selectedCompany.id
        ? {
            ...company,
            applications: [...company.applications, newApplication],
            updatedAt: new Date().toISOString()
          }
        : company
    ));

    applicationForm.reset();
    setIsAddApplicationOpen(false);
    setSelectedCompany(null);
    toast.success('Application tracked successfully!');
  };

  const toggleWishlist = (companyId: string) => {
    setCompanies(prev => prev.map(company =>
      company.id === companyId
        ? { ...company, isWishlist: !company.isWishlist, updatedAt: new Date().toISOString() }
        : company
    ));
  };

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'applied': return 'bg-blue-500';
      case 'screening': return 'bg-yellow-500';
      case 'interviewing': return 'bg-orange-500';
      case 'offer': return 'bg-green-500';
      case 'rejected': return 'bg-red-500';
      case 'withdrawn': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  // Statistics
  const totalCompanies = companies.length;
  const wishlistCount = companies.filter(c => c.isWishlist).length;
  const totalApplications = companies.reduce((sum, c) => sum + c.applications.length, 0);
  const activeApplications = companies.reduce((sum, c) => 
    sum + c.applications.filter(app => ['applied', 'screening', 'interviewing'].includes(app.status)).length, 0
  );

  const industries = [...new Set(companies.map(c => c.industry))];
  const sizes = ['startup', 'small', 'medium', 'large', 'enterprise'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Company Research Hub</h2>
          <p className="text-muted-foreground">Research companies and track your job applications</p>
        </div>

        <div className="flex gap-2">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('grid')}
          >
            Grid
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('list')}
          >
            List
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsImportOpen(true)}
          >
            <Download className="h-4 w-4 mr-2" />
            Import
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsComparisonOpen(true)}
            disabled={companies.length === 0}
          >
            <BarChart3 className="h-4 w-4 mr-2" />
            Compare
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              localStorage.removeItem('companies');
              window.location.reload();
            }}
            title="Reload all company data"
          >
            <TrendingUp className="h-4 w-4 mr-2" />
            Reload
          </Button>

          <Dialog open={isAddCompanyOpen} onOpenChange={setIsAddCompanyOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-primary">
                <Plus className="h-4 w-4 mr-2" />
                Add Company
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add Company to Research Hub</DialogTitle>
                <DialogDescription>
                  Add a company you're interested in or researching for job opportunities
                </DialogDescription>
              </DialogHeader>
              <Form {...companyForm}>
                <form onSubmit={companyForm.handleSubmit(handleAddCompany)} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                      control={companyForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company Name</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. Google, Stripe, Airbnb" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={companyForm.control}
                      name="industry"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Industry</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. Technology, Finance, Healthcare" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={companyForm.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Brief description of what the company does..."
                            className="min-h-[80px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <FormField
                      control={companyForm.control}
                      name="size"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company Size</FormLabel>
                          <FormControl>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select size" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="startup">Startup (1-50)</SelectItem>
                                <SelectItem value="small">Small (51-200)</SelectItem>
                                <SelectItem value="medium">Medium (201-1000)</SelectItem>
                                <SelectItem value="large">Large (1001-5000)</SelectItem>
                                <SelectItem value="enterprise">Enterprise (5000+)</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={companyForm.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Location</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. San Francisco, CA" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={companyForm.control}
                      name="glassdoorRating"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Glassdoor Rating</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min="1"
                              max="5"
                              step="0.1"
                              placeholder="4.2"
                              {...field}
                              onChange={(e) => field.onChange(e.target.value ? parseFloat(e.target.value) : undefined)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                      control={companyForm.control}
                      name="website"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Website</FormLabel>
                          <FormControl>
                            <Input placeholder="https://company.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={companyForm.control}
                      name="linkedinUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>LinkedIn URL</FormLabel>
                          <FormControl>
                            <Input placeholder="https://linkedin.com/company/..." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={companyForm.control}
                    name="culture"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Culture & Values</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Innovation, Collaboration, Transparency" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={companyForm.control}
                    name="techStack"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tech Stack</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. React, Node.js, Python, AWS" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={companyForm.control}
                    name="benefits"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Benefits</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Health insurance, 401k, Remote work" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={companyForm.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Notes</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Any additional notes about the company..."
                            className="min-h-[80px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex justify-end space-x-2">
                    <Button type="button" variant="outline" onClick={() => setIsAddCompanyOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">Add Company</Button>
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
            <CardTitle className="text-sm font-medium">Total Companies</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCompanies}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Wishlist</CardTitle>
            <Star className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{wishlistCount}</div>
            <p className="text-xs text-muted-foreground">
              Target companies
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Applications</CardTitle>
            <Briefcase className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalApplications}</div>
            <p className="text-xs text-muted-foreground">
              Total submitted
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeApplications}</div>
            <p className="text-xs text-muted-foreground">
              In progress
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Input
          placeholder="Search companies..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="sm:max-w-sm"
        />

        <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Industry" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Industries</SelectItem>
            {industries.map((industry) => (
              <SelectItem key={industry} value={industry}>
                {industry}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedSize} onValueChange={setSelectedSize}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Size" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Sizes</SelectItem>
            {sizes.map((size) => (
              <SelectItem key={size} value={size}>
                {getSizeLabel(size)} employees
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Companies</SelectItem>
            <SelectItem value="wishlist">Wishlist</SelectItem>
            <SelectItem value="applied">Applied</SelectItem>
          </SelectContent>
        </Select>

        <Select value={selectedRegion} onValueChange={setSelectedRegion}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Region" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Regions</SelectItem>
            <SelectItem value="indian">
              <div className="flex items-center gap-2">
                <Flag className="h-3 w-3 text-orange-600" />
                Indian
              </div>
            </SelectItem>
            <SelectItem value="foreign">
              <div className="flex items-center gap-2">
                <Globe className="h-3 w-3 text-blue-600" />
                Foreign
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Companies Grid/List */}
      <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
        {filteredCompanies.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No companies found</h3>
            <p className="text-muted-foreground mb-4">
              {searchQuery || selectedIndustry !== 'all' || selectedSize !== 'all' || selectedStatus !== 'all'
                ? 'Try adjusting your filters'
                : 'Start building your company research database'
              }
            </p>
            <Button onClick={() => setIsAddCompanyOpen(true)} className="bg-gradient-primary">
              Add Your First Company
            </Button>
          </div>
        ) : (
          filteredCompanies.map((company) => (
            <Card key={company.id} className="transition-all duration-200 hover:shadow-md">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <CardTitle className="text-lg">{company.name}</CardTitle>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleWishlist(company.id)}
                        className={company.isWishlist ? 'text-yellow-600' : 'text-muted-foreground'}
                      >
                        <Star className={`h-4 w-4 ${company.isWishlist ? 'fill-current' : ''}`} />
                      </Button>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <MapPin className="h-3 w-3" />
                      {company.location}
                      <span>•</span>
                      <Users className="h-3 w-3" />
                      {getSizeLabel(company.size)}
                      {company.glassdoorRating && (
                        <>
                          <span>•</span>
                          <Star className="h-3 w-3 fill-current text-yellow-500" />
                          {company.glassdoorRating}
                        </>
                      )}
                      {company.region && (
                        <>
                          <span>•</span>
                          {company.region === 'indian' ? (
                            <Flag className="h-3 w-3 text-orange-600" />
                          ) : (
                            <Globe className="h-3 w-3 text-blue-600" />
                          )}
                          {company.region === 'indian' ? 'Indian' : 'Global'}
                        </>
                      )}
                    </div>
                    <Badge variant="secondary" className="mb-2">
                      {company.industry}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {company.description && (
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {company.description}
                  </p>
                )}

                {/* Applications Summary */}
                {company.applications.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-sm font-medium mb-2">Applications ({company.applications.length})</h4>
                    <div className="space-y-1">
                      {company.applications.slice(0, 2).map((app) => (
                        <div key={app.id} className="flex items-center justify-between text-xs">
                          <span className="truncate">{app.position}</span>
                          <Badge 
                            variant="outline" 
                            className={`${getStatusColor(app.status)} text-white border-none`}
                          >
                            {app.status}
                          </Badge>
                        </div>
                      ))}
                      {company.applications.length > 2 && (
                        <div className="text-xs text-muted-foreground">
                          +{company.applications.length - 2} more applications
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Tech Stack */}
                {company.techStack.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-sm font-medium mb-2">Tech Stack</h4>
                    <div className="flex flex-wrap gap-1">
                      {company.techStack.slice(0, 4).map((tech, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                      {company.techStack.length > 4 && (
                        <Badge variant="outline" className="text-xs">
                          +{company.techStack.length - 4}
                        </Badge>
                      )}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedCompany(company);
                      setIsAddApplicationOpen(true);
                    }}
                    className="flex-1"
                  >
                    <Briefcase className="h-3 w-3 mr-1" />
                    Apply
                  </Button>
                  {company.website && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(company.website, '_blank')}
                    >
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  )}
                  {company.linkedinUrl && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(company.linkedinUrl, '_blank')}
                    >
                      <Linkedin className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Add Application Dialog */}
      <Dialog open={isAddApplicationOpen} onOpenChange={setIsAddApplicationOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Track Application</DialogTitle>
            <DialogDescription>
              Add a new job application for {selectedCompany?.name}
            </DialogDescription>
          </DialogHeader>
          <Form {...applicationForm}>
            <form onSubmit={applicationForm.handleSubmit(handleAddApplication)} className="space-y-4">
              <FormField
                control={applicationForm.control}
                name="position"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Position</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Senior Software Engineer" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={applicationForm.control}
                  name="department"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Department</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Engineering, Product" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={applicationForm.control}
                  name="level"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Level</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="entry">Entry Level</SelectItem>
                            <SelectItem value="mid">Mid Level</SelectItem>
                            <SelectItem value="senior">Senior Level</SelectItem>
                            <SelectItem value="lead">Lead/Staff</SelectItem>
                            <SelectItem value="principal">Principal</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={applicationForm.control}
                  name="salaryRange"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Salary Range</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. $120k - $150k" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={applicationForm.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="applied">Applied</SelectItem>
                            <SelectItem value="screening">Screening</SelectItem>
                            <SelectItem value="interviewing">Interviewing</SelectItem>
                            <SelectItem value="offer">Offer</SelectItem>
                            <SelectItem value="rejected">Rejected</SelectItem>
                            <SelectItem value="withdrawn">Withdrawn</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={applicationForm.control}
                name="appliedDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Applied Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={applicationForm.control}
                name="jobUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={applicationForm.control}
                name="referrer"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Referrer</FormLabel>
                    <FormControl>
                      <Input placeholder="Who referred you?" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={applicationForm.control}
                name="nextStep"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Next Step</FormLabel>
                    <FormControl>
                      <Input placeholder="What's the next step?" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsAddApplicationOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Track Application</Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Import Dialog */}
      <Dialog open={isImportOpen} onOpenChange={setIsImportOpen}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Import Company Data</DialogTitle>
            <DialogDescription>
              Import comprehensive company interview data with Indian and Foreign segregation
            </DialogDescription>
          </DialogHeader>
          <CompanyDataImporter
            onImportComplete={(newCompanies) => {
              setCompanies(prev => [...newCompanies, ...prev]);
              setIsImportOpen(false);
            }}
            existingCompanies={companies}
          />
        </DialogContent>
      </Dialog>

      {/* Comparison Dialog */}
      <Dialog open={isComparisonOpen} onOpenChange={setIsComparisonOpen}>
        <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Company Regional Comparison</DialogTitle>
            <DialogDescription>
              Analyze and compare companies by region, technologies, and interview processes
            </DialogDescription>
          </DialogHeader>
          <CompanyComparisonView companies={companies} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
