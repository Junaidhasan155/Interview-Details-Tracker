import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CompanyDetailModal } from '../CompanyDetailModal';

const mockCompany = {
  id: '1',
  name: 'Google',
  description: 'Technology company focused on search and cloud computing',
  industry: 'Technology',
  size: 'enterprise' as const,
  location: 'Mountain View, CA',
  region: 'foreign' as const,
  website: 'https://google.com',
  linkedinUrl: 'https://linkedin.com/company/google',
  glassdoorRating: 4.4,
  culture: ['Innovation', 'Data-driven', 'Collaborative'],
  techStack: ['React', 'Angular', 'TypeScript', 'Python'],
  benefits: ['Health Insurance', '401k Match', 'Stock Options', 'Free Meals'],
  interviewProcess: [
    {
      id: '1',
      name: 'Recruiter Screen',
      type: 'phone' as const,
      duration: 30,
      description: 'Initial screening call',
      tips: ['Prepare your elevator pitch', 'Research the company']
    },
    {
      id: '2',
      name: 'Technical Interview',
      type: 'technical' as const,
      duration: 60,
      description: 'Live coding session',
      tips: ['Practice algorithms', 'Think out loud']
    }
  ],
  applications: [],
  contacts: [],
  notes: 'Great company for growth',
  isWishlist: false,
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-01-01T00:00:00Z',
  interviewDetails: {
    averageDuration: '4-6 hours',
    successRate: 15,
    difficultyLevel: 'Very Hard' as const,
    preparationTime: '3-6 months',
    commonTopics: ['System Design', 'JavaScript Fundamentals', 'React'],
    dsaFocus: {
      required: true,
      difficulty: 'Hard' as const,
      topics: ['Trees', 'Graphs', 'Dynamic Programming'],
      platforms: ['LeetCode', 'HackerRank']
    },
    frontendFocus: {
      frameworks: ['React', 'Angular', 'Vue.js'],
      concepts: ['Virtual DOM', 'State Management', 'Performance'],
      practicalTasks: ['Build file explorer', 'Create data visualization'],
      designPatterns: ['Observer', 'Singleton', 'Factory']
    }
  },
  hrContacts: [
    {
      name: 'Sarah Chen',
      role: 'Senior Technical Recruiter',
      email: 's.chen@google.com',
      linkedin: 'https://linkedin.com/in/sarahchen',
      responsiveness: 'Fast' as const,
      notes: 'Very professional, responds within 24 hours'
    },
    {
      name: 'Mike Rodriguez',
      role: 'Engineering Manager',
      responsiveness: 'Medium' as const,
      notes: 'Technical discussions, helpful with team questions'
    }
  ],
  candidateExperiences: [
    {
      id: '1',
      candidateName: 'Rahul K.',
      role: 'Frontend Engineer',
      experience: '3 years',
      result: 'Passed' as const,
      interviewDate: 'December 2023',
      rounds: [
        {
          roundName: 'Recruiter Screen',
          duration: 30,
          difficulty: 'Easy' as const,
          questions: ['Tell me about yourself', 'Why Google?'],
          feedback: 'Good communication skills',
          passed: true
        },
        {
          roundName: 'Technical Interview',
          duration: 60,
          difficulty: 'Hard' as const,
          questions: ['Implement LRU Cache', 'Explain React lifecycle'],
          feedback: 'Strong problem-solving skills',
          passed: true
        }
      ],
      overallFeedback: 'Strong technical candidate with good communication',
      tips: ['Practice system design', 'Know React internals deeply'],
      rating: 5
    },
    {
      id: '2',
      candidateName: 'Priya S.',
      role: 'Senior Frontend Engineer',
      experience: '5 years',
      result: 'Failed' as const,
      interviewDate: 'November 2023',
      rounds: [
        {
          roundName: 'Technical Interview',
          duration: 60,
          difficulty: 'Hard' as const,
          questions: ['Find minimum window substring', 'Implement debouncing'],
          feedback: 'Struggled with algorithmic problems',
          passed: false
        }
      ],
      overallFeedback: 'Good frontend knowledge but needs stronger DSA skills',
      tips: ['Practice DSA daily', 'Time management is crucial'],
      rating: 3
    }
  ],
  salaryInsights: {
    range: '$150,000 - $300,000',
    average: '$220,000',
    currency: 'USD',
    benefits: ['Health Insurance', '401k Match', 'Stock Options', 'Free Meals'],
    stockOptions: true,
    bonus: '15-25% of base salary',
    workLifeBalance: 3
  },
  cultureInsights: {
    workEnvironment: 'Fast-paced, innovative culture with emphasis on user impact',
    teamSize: '6-8 engineers per team',
    remotePolicy: 'Hybrid - 3 days in office',
    learningOpportunities: ['Internal training', 'Conference budget', '20% time'],
    diversity: 4,
    innovation: 5,
    workPressure: 4
  }
};

// Mock window.open
const mockOpen = vi.fn();
Object.defineProperty(window, 'open', {
  value: mockOpen,
});

describe('CompanyDetailModal', () => {
  const mockOnClose = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders when open is true', () => {
    render(
      <CompanyDetailModal
        company={mockCompany}
        isOpen={true}
        onClose={mockOnClose}
      />
    );

    expect(screen.getByText('Google')).toBeInTheDocument();
    expect(screen.getByText('Technology company focused on search and cloud computing')).toBeInTheDocument();
    expect(screen.getByText('Mountain View, CA')).toBeInTheDocument();
  });

  it('does not render when open is false', () => {
    render(
      <CompanyDetailModal
        company={mockCompany}
        isOpen={false}
        onClose={mockOnClose}
      />
    );

    expect(screen.queryByText('Google')).not.toBeInTheDocument();
  });

  it('does not render when company is null', () => {
    render(
      <CompanyDetailModal
        company={null}
        isOpen={true}
        onClose={mockOnClose}
      />
    );

    expect(screen.queryByText('Google')).not.toBeInTheDocument();
  });

  it('displays company header information correctly', () => {
    render(
      <CompanyDetailModal
        company={mockCompany}
        isOpen={true}
        onClose={mockOnClose}
      />
    );

    expect(screen.getByText('Google')).toBeInTheDocument();
    expect(screen.getByText('Global')).toBeInTheDocument();
    expect(screen.getByText('Mountain View, CA')).toBeInTheDocument();
    expect(screen.getByText('enterprise company')).toBeInTheDocument();
    expect(screen.getByText('Technology')).toBeInTheDocument();
    expect(screen.getByText('4.4/5')).toBeInTheDocument();
  });

  it('displays overview tab content correctly', () => {
    render(
      <CompanyDetailModal
        company={mockCompany}
        isOpen={true}
        onClose={mockOnClose}
      />
    );

    // Quick Stats
    expect(screen.getByText('Quick Stats')).toBeInTheDocument();
    expect(screen.getByText('Success Rate')).toBeInTheDocument();
    expect(screen.getByText('15%')).toBeInTheDocument();
    expect(screen.getByText('Very Hard')).toBeInTheDocument();
    expect(screen.getByText('4-6 hours')).toBeInTheDocument();
    expect(screen.getByText('3-6 months')).toBeInTheDocument();

    // Salary Insights
    expect(screen.getByText('Salary Insights')).toBeInTheDocument();
    expect(screen.getByText('$150,000 - $300,000')).toBeInTheDocument();
    expect(screen.getByText('$220,000')).toBeInTheDocument();
    expect(screen.getByText('Yes')).toBeInTheDocument(); // Stock options

    // Benefits
    expect(screen.getByText('Benefits & Perks')).toBeInTheDocument();
    expect(screen.getByText('Health Insurance')).toBeInTheDocument();
    expect(screen.getByText('401k Match')).toBeInTheDocument();
    expect(screen.getByText('Stock Options')).toBeInTheDocument();

    // Culture
    expect(screen.getByText('Culture & Values')).toBeInTheDocument();
    expect(screen.getByText('Innovation')).toBeInTheDocument();
    expect(screen.getByText('Data-driven')).toBeInTheDocument();
    expect(screen.getByText('Collaborative')).toBeInTheDocument();
  });

  it('switches to interviews tab and displays content', async () => {
    const user = userEvent.setup();
    render(
      <CompanyDetailModal
        company={mockCompany}
        isOpen={true}
        onClose={mockOnClose}
      />
    );

    const interviewsTab = screen.getByText('Interviews');
    await user.click(interviewsTab);

    await waitFor(() => {
      expect(screen.getByText('DSA Requirements')).toBeInTheDocument();
      expect(screen.getByText('Frontend Focus')).toBeInTheDocument();
      expect(screen.getByText('Interview Process')).toBeInTheDocument();
    });

    // DSA Focus
    expect(screen.getByText('Topics')).toBeInTheDocument();
    expect(screen.getByText('Trees')).toBeInTheDocument();
    expect(screen.getByText('Graphs')).toBeInTheDocument();
    expect(screen.getByText('Dynamic Programming')).toBeInTheDocument();

    // Frontend Focus
    expect(screen.getByText('Frameworks & Libraries')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('Angular')).toBeInTheDocument();
    expect(screen.getByText('Vue.js')).toBeInTheDocument();

    // Interview Process
    expect(screen.getByText('Round 1: Recruiter Screen')).toBeInTheDocument();
    expect(screen.getByText('Round 2: Technical Interview')).toBeInTheDocument();
  });

  it('switches to experiences tab and displays candidate experiences', async () => {
    const user = userEvent.setup();
    render(
      <CompanyDetailModal
        company={mockCompany}
        isOpen={true}
        onClose={mockOnClose}
      />
    );

    const experiencesTab = screen.getByText('Experiences');
    await user.click(experiencesTab);

    await waitFor(() => {
      expect(screen.getByText('Rahul K.')).toBeInTheDocument();
      expect(screen.getByText('Priya S.')).toBeInTheDocument();
    });

    // First candidate (Passed)
    expect(screen.getByText('Frontend Engineer • 3 years • December 2023')).toBeInTheDocument();
    expect(screen.getByText('Passed')).toBeInTheDocument();
    expect(screen.getByText('5/5')).toBeInTheDocument();

    // Second candidate (Failed)
    expect(screen.getByText('Senior Frontend Engineer • 5 years • November 2023')).toBeInTheDocument();
    expect(screen.getByText('Failed')).toBeInTheDocument();
    expect(screen.getByText('3/5')).toBeInTheDocument();

    // Interview rounds
    expect(screen.getByText('Interview Rounds')).toBeInTheDocument();
    expect(screen.getByText('Tell me about yourself')).toBeInTheDocument();
    expect(screen.getByText('Implement LRU Cache')).toBeInTheDocument();
  });

  it('switches to tech tab and displays tech stack', async () => {
    const user = userEvent.setup();
    render(
      <CompanyDetailModal
        company={mockCompany}
        isOpen={true}
        onClose={mockOnClose}
      />
    );

    const techTab = screen.getByText('Tech');
    await user.click(techTab);

    await waitFor(() => {
      expect(screen.getByText('Tech Stack')).toBeInTheDocument();
    });

    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('Angular')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('Python')).toBeInTheDocument();
  });

  it('switches to culture tab and displays culture insights', async () => {
    const user = userEvent.setup();
    render(
      <CompanyDetailModal
        company={mockCompany}
        isOpen={true}
        onClose={mockOnClose}
      />
    );

    const cultureTab = screen.getByText('Culture');
    await user.click(cultureTab);

    await waitFor(() => {
      expect(screen.getByText('Culture Insights')).toBeInTheDocument();
    });

    expect(screen.getByText('Work Environment')).toBeInTheDocument();
    expect(screen.getByText('Fast-paced, innovative culture with emphasis on user impact')).toBeInTheDocument();
    expect(screen.getByText('Remote Policy')).toBeInTheDocument();
    expect(screen.getByText('Hybrid - 3 days in office')).toBeInTheDocument();

    // Progress bars
    expect(screen.getByText('Diversity Score')).toBeInTheDocument();
    expect(screen.getByText('4/5')).toBeInTheDocument();
    expect(screen.getByText('Innovation')).toBeInTheDocument();
    expect(screen.getByText('5/5')).toBeInTheDocument();
  });

  it('switches to contacts tab and displays HR contacts', async () => {
    const user = userEvent.setup();
    render(
      <CompanyDetailModal
        company={mockCompany}
        isOpen={true}
        onClose={mockOnClose}
      />
    );

    const contactsTab = screen.getByText('Contacts');
    await user.click(contactsTab);

    await waitFor(() => {
      expect(screen.getByText('Sarah Chen')).toBeInTheDocument();
      expect(screen.getByText('Mike Rodriguez')).toBeInTheDocument();
    });

    // First contact
    expect(screen.getByText('Senior Technical Recruiter')).toBeInTheDocument();
    expect(screen.getByText('Fast')).toBeInTheDocument();
    expect(screen.getByText('s.chen@google.com')).toBeInTheDocument();
    expect(screen.getByText('LinkedIn Profile')).toBeInTheDocument();

    // Second contact
    expect(screen.getByText('Engineering Manager')).toBeInTheDocument();
    expect(screen.getByText('Medium')).toBeInTheDocument();
  });

  it('opens external links correctly', async () => {
    const user = userEvent.setup();
    render(
      <CompanyDetailModal
        company={mockCompany}
        isOpen={true}
        onClose={mockOnClose}
      />
    );

    // Test website link
    const websiteButton = screen.getAllByRole('button').find(btn => 
      btn.querySelector('svg')?.getAttribute('class')?.includes('ExternalLink')
    );
    
    if (websiteButton) {
      await user.click(websiteButton);
      expect(mockOpen).toHaveBeenCalledWith('https://google.com', '_blank');
    }

    // Test LinkedIn link
    const linkedinButton = screen.getAllByRole('button').find(btn => 
      btn.querySelector('svg')?.getAttribute('class')?.includes('Linkedin')
    );
    
    if (linkedinButton) {
      await user.click(linkedinButton);
      expect(mockOpen).toHaveBeenCalledWith('https://linkedin.com/company/google', '_blank');
    }
  });

  it('displays difficulty badges with correct colors', () => {
    render(
      <CompanyDetailModal
        company={mockCompany}
        isOpen={true}
        onClose={mockOnClose}
      />
    );

    const veryHardBadge = screen.getByText('Very Hard');
    expect(veryHardBadge).toHaveClass('text-purple-600', 'bg-purple-50');
  });

  it('displays result badges with correct colors', async () => {
    const user = userEvent.setup();
    render(
      <CompanyDetailModal
        company={mockCompany}
        isOpen={true}
        onClose={mockOnClose}
      />
    );

    const experiencesTab = screen.getByText('Experiences');
    await user.click(experiencesTab);

    await waitFor(() => {
      const passedBadge = screen.getByText('Passed');
      expect(passedBadge).toHaveClass('text-green-600', 'bg-green-50');

      const failedBadge = screen.getByText('Failed');
      expect(failedBadge).toHaveClass('text-red-600', 'bg-red-50');
    });
  });

  it('handles missing optional data gracefully', () => {
    const incompleteCompany = {
      ...mockCompany,
      interviewDetails: undefined,
      hrContacts: undefined,
      candidateExperiences: undefined,
      salaryInsights: undefined,
      cultureInsights: undefined
    };

    render(
      <CompanyDetailModal
        company={incompleteCompany}
        isOpen={true}
        onClose={mockOnClose}
      />
    );

    // Should still render basic company info
    expect(screen.getByText('Google')).toBeInTheDocument();
    expect(screen.getByText('Overview')).toBeInTheDocument();
  });

  it('calls onClose when dialog is dismissed', async () => {
    const user = userEvent.setup();
    render(
      <CompanyDetailModal
        company={mockCompany}
        isOpen={true}
        onClose={mockOnClose}
      />
    );

    // Find and click the close button (assuming there's an X button)
    const dialog = screen.getByRole('dialog');
    
    // Simulate pressing Escape key to close dialog
    fireEvent.keyDown(dialog, { key: 'Escape', code: 'Escape' });

    await waitFor(() => {
      expect(mockOnClose).toHaveBeenCalled();
    });
  });

  it('displays progress bars correctly', async () => {
    const user = userEvent.setup();
    render(
      <CompanyDetailModal
        company={mockCompany}
        isOpen={true}
        onClose={mockOnClose}
      />
    );

    // Check success rate progress in overview
    const successRateProgress = screen.getByText('15%');
    expect(successRateProgress).toBeInTheDocument();

    // Switch to culture tab to check other progress bars
    const cultureTab = screen.getByText('Culture');
    await user.click(cultureTab);

    await waitFor(() => {
      expect(screen.getByText('4/5')).toBeInTheDocument(); // Diversity
      expect(screen.getByText('5/5')).toBeInTheDocument(); // Innovation
    });
  });
});
