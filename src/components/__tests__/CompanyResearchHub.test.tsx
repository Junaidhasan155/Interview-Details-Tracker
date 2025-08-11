import { describe, it, expect, beforeEach, vi, Mock } from 'vitest';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CompanyResearchHub } from '../CompanyResearchHub';
import { toast } from 'sonner';

// Mock the toast function
vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

// Mock localStorage
const mockLocalStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
});

// Mock the enhanced company data
vi.mock('../../data/enhancedCompanyData', () => ({
  ENHANCED_COMPANY_DATA: [
    {
      Company: "Google",
      HiringForFrontEnd: "Yes",
      JobDescriptionLink: "https://careers.google.com/jobs/results/100000-front-end-developer",
      NoOfInterviewRounds: 4,
      RoundBreakdown: [
        { Round: 1, Type: "Recruiter screen", Description: "Phone screen with recruiter" },
        { Round: 2, Type: "Technical phone interview", Description: "Live coding session" },
        { Round: 3, Type: "On-site frontend system design", Description: "Design UI architecture" },
        { Round: 4, Type: "Behavioral interview", Description: "Culture-fit questions" }
      ],
      FrameworksOrTools: ["React", "Angular", "TypeScript"],
      DSA: "Yes",
      SpecialFocusAreas: ["Performance optimization", "Web security", "Accessibility"],
      Notes: "Emphasis on core JS, DOM API, closures",
      interviewDetails: {
        averageDuration: "4-6 hours",
        successRate: 15,
        difficultyLevel: "Very Hard",
        preparationTime: "3-6 months",
        commonTopics: ["System Design", "JavaScript Fundamentals", "React/Angular"],
        dsaFocus: {
          required: true,
          difficulty: "Hard",
          topics: ["Trees", "Graphs", "Dynamic Programming"],
          platforms: ["LeetCode", "HackerRank"]
        },
        frontendFocus: {
          frameworks: ["React", "Angular", "Vue.js"],
          concepts: ["Virtual DOM", "State Management", "Performance"],
          practicalTasks: ["Build file explorer", "Create data visualization"],
          designPatterns: ["Observer", "Singleton", "Factory"]
        }
      },
      hrContacts: [
        {
          name: "Sarah Chen",
          role: "Senior Technical Recruiter",
          email: "s.chen@google.com",
          responsiveness: "Fast",
          notes: "Very professional, responds within 24 hours"
        }
      ],
      candidateExperiences: [
        {
          id: "1",
          candidateName: "Rahul K.",
          role: "Frontend Engineer",
          experience: "3 years",
          result: "Passed",
          interviewDate: "December 2023",
          rounds: [
            {
              roundName: "Recruiter Screen",
              duration: 30,
              difficulty: "Easy",
              questions: ["Tell me about yourself", "Why Google?"],
              feedback: "Good communication skills",
              passed: true
            }
          ],
          overallFeedback: "Strong technical candidate with good communication",
          tips: ["Practice system design", "Know React internals"],
          rating: 5
        }
      ],
      salaryInsights: {
        range: "$150,000 - $300,000",
        average: "$220,000",
        currency: "USD",
        benefits: ["Health Insurance", "401k Match", "Stock Options"],
        stockOptions: true,
        bonus: "15-25% of base salary",
        workLifeBalance: 3
      },
      cultureInsights: {
        workEnvironment: "Fast-paced, innovative culture",
        teamSize: "6-8 engineers per team",
        remotePolicy: "Hybrid - 3 days in office",
        learningOpportunities: ["Internal training", "Conference budget"],
        diversity: 4,
        innovation: 5,
        workPressure: 4
      }
    },
    {
      Company: "Flipkart",
      HiringForFrontEnd: "Yes",
      JobDescriptionLink: "https://www.flipkartcareers.com/job/5555-frontend",
      NoOfInterviewRounds: 5,
      RoundBreakdown: [
        { Round: 1, Type: "Machine coding", Description: "Build product filter UI" },
        { Round: 2, Type: "UI deep dive", Description: "React hooks and patterns" }
      ],
      FrameworksOrTools: ["React", "Next.js"],
      DSA: "Yes",
      SpecialFocusAreas: ["Performance", "Scalability"],
      Notes: "Focus on large-scale React apps",
      interviewDetails: {
        averageDuration: "4-5 hours",
        successRate: 25,
        difficultyLevel: "Hard",
        preparationTime: "2-3 months",
        commonTopics: ["E-commerce UI", "Performance Optimization"],
        dsaFocus: {
          required: true,
          difficulty: "Medium",
          topics: ["Arrays", "Strings", "Hash Maps"],
          platforms: ["GeeksforGeeks", "LeetCode"]
        },
        frontendFocus: {
          frameworks: ["React", "Next.js", "Redux"],
          concepts: ["Server-side Rendering", "PWAs"],
          practicalTasks: ["Product listing page", "Shopping cart"],
          designPatterns: ["Redux Pattern", "Custom Hooks"]
        }
      },
      hrContacts: [
        {
          name: "Neha Sharma",
          role: "Senior Talent Acquisition",
          responsiveness: "Medium",
          notes: "Professional and helpful"
        }
      ],
      candidateExperiences: [],
      salaryInsights: {
        range: "₹8,00,000 - ₹25,00,000",
        average: "₹15,00,000",
        currency: "INR",
        benefits: ["Health Insurance", "Food Allowance"],
        stockOptions: true,
        bonus: "10-15% of base salary",
        workLifeBalance: 4
      },
      cultureInsights: {
        workEnvironment: "Fast-paced startup culture",
        teamSize: "8-12 engineers per team",
        remotePolicy: "Hybrid - 2 days WFH per week",
        learningOpportunities: ["Tech conferences", "Hackathons"],
        diversity: 3,
        innovation: 4,
        workPressure: 4
      }
    }
  ]
}));

describe('CompanyResearchHub', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockLocalStorage.getItem.mockReturnValue(null);
  });

  it('renders the component correctly', async () => {
    render(<CompanyResearchHub />);
    
    expect(screen.getByText('Company Research Hub')).toBeInTheDocument();
    expect(screen.getByText('Research companies and track your job applications')).toBeInTheDocument();
    
    // Wait for companies to load
    await waitFor(() => {
      expect(screen.getByText('Google')).toBeInTheDocument();
      expect(screen.getByText('Flipkart')).toBeInTheDocument();
    });
  });

  it('displays company statistics correctly', async () => {
    render(<CompanyResearchHub />);
    
    await waitFor(() => {
      expect(screen.getByText('Total Companies')).toBeInTheDocument();
      expect(screen.getByText('2')).toBeInTheDocument(); // Should show 2 companies
    });
  });

  it('filters companies by search query', async () => {
    const user = userEvent.setup();
    render(<CompanyResearchHub />);
    
    await waitFor(() => {
      expect(screen.getByText('Google')).toBeInTheDocument();
      expect(screen.getByText('Flipkart')).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText('Search companies...');
    await user.type(searchInput, 'Google');

    await waitFor(() => {
      expect(screen.getByText('Google')).toBeInTheDocument();
      expect(screen.queryByText('Flipkart')).not.toBeInTheDocument();
    });
  });

  it('filters companies by region', async () => {
    const user = userEvent.setup();
    render(<CompanyResearchHub />);
    
    await waitFor(() => {
      expect(screen.getByText('Google')).toBeInTheDocument();
      expect(screen.getByText('Flipkart')).toBeInTheDocument();
    });

    // Click on region filter
    const regionSelect = screen.getByDisplayValue('All Regions');
    await user.click(regionSelect);
    
    // Select Indian companies
    const indianOption = screen.getByText('Indian');
    await user.click(indianOption);

    await waitFor(() => {
      expect(screen.queryByText('Google')).not.toBeInTheDocument();
      expect(screen.getByText('Flipkart')).toBeInTheDocument();
    });
  });

  it('opens company detail modal when clicking View Details', async () => {
    const user = userEvent.setup();
    render(<CompanyResearchHub />);
    
    await waitFor(() => {
      expect(screen.getByText('Google')).toBeInTheDocument();
    });

    const viewDetailsButton = screen.getByText('View Details');
    await user.click(viewDetailsButton);

    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
      expect(screen.getByText('Google')).toBeInTheDocument();
      expect(screen.getByText('Overview')).toBeInTheDocument();
      expect(screen.getByText('Interviews')).toBeInTheDocument();
      expect(screen.getByText('Experiences')).toBeInTheDocument();
    });
  });

  it('displays company detail modal tabs correctly', async () => {
    const user = userEvent.setup();
    render(<CompanyResearchHub />);
    
    await waitFor(() => {
      expect(screen.getByText('Google')).toBeInTheDocument();
    });

    const viewDetailsButton = screen.getByText('View Details');
    await user.click(viewDetailsButton);

    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    // Test Overview tab (default)
    expect(screen.getByText('Quick Stats')).toBeInTheDocument();
    expect(screen.getByText('Success Rate')).toBeInTheDocument();
    expect(screen.getByText('15%')).toBeInTheDocument(); // Success rate
    expect(screen.getByText('Very Hard')).toBeInTheDocument(); // Difficulty

    // Test Interviews tab
    const interviewsTab = screen.getByText('Interviews');
    await user.click(interviewsTab);
    
    await waitFor(() => {
      expect(screen.getByText('DSA Requirements')).toBeInTheDocument();
      expect(screen.getByText('Frontend Focus')).toBeInTheDocument();
      expect(screen.getByText('Interview Process')).toBeInTheDocument();
    });

    // Test Experiences tab
    const experiencesTab = screen.getByText('Experiences');
    await user.click(experiencesTab);
    
    await waitFor(() => {
      expect(screen.getByText('Rahul K.')).toBeInTheDocument();
      expect(screen.getByText('Frontend Engineer')).toBeInTheDocument();
      expect(screen.getByText('Passed')).toBeInTheDocument();
    });

    // Test Tech tab
    const techTab = screen.getByText('Tech');
    await user.click(techTab);
    
    await waitFor(() => {
      expect(screen.getByText('Tech Stack')).toBeInTheDocument();
      expect(screen.getByText('React')).toBeInTheDocument();
      expect(screen.getByText('Angular')).toBeInTheDocument();
    });

    // Test Culture tab
    const cultureTab = screen.getByText('Culture');
    await user.click(cultureTab);
    
    await waitFor(() => {
      expect(screen.getByText('Culture Insights')).toBeInTheDocument();
      expect(screen.getByText('Work Environment')).toBeInTheDocument();
      expect(screen.getByText('Fast-paced, innovative culture')).toBeInTheDocument();
    });

    // Test Contacts tab
    const contactsTab = screen.getByText('Contacts');
    await user.click(contactsTab);
    
    await waitFor(() => {
      expect(screen.getByText('Sarah Chen')).toBeInTheDocument();
      expect(screen.getByText('Senior Technical Recruiter')).toBeInTheDocument();
    });
  });

  it('toggles wishlist status', async () => {
    const user = userEvent.setup();
    render(<CompanyResearchHub />);
    
    await waitFor(() => {
      expect(screen.getByText('Google')).toBeInTheDocument();
    });

    const wishlistButtons = screen.getAllByRole('button');
    const wishlistButton = wishlistButtons.find(btn => {
      const starIcon = btn.querySelector('svg');
      return starIcon && starIcon.getAttribute('class')?.includes('h-4 w-4');
    });

    if (wishlistButton) {
      await user.click(wishlistButton);
      
      // Check if localStorage was called
      expect(mockLocalStorage.setItem).toHaveBeenCalled();
    }
  });

  it('opens add company modal', async () => {
    const user = userEvent.setup();
    render(<CompanyResearchHub />);
    
    const addCompanyButton = screen.getByText('Add Company');
    await user.click(addCompanyButton);

    await waitFor(() => {
      expect(screen.getByText('Add Company to Research Hub')).toBeInTheDocument();
      expect(screen.getByLabelText('Company Name')).toBeInTheDocument();
      expect(screen.getByLabelText('Industry')).toBeInTheDocument();
    });
  });

  it('switches between grid and list view modes', async () => {
    const user = userEvent.setup();
    render(<CompanyResearchHub />);
    
    await waitFor(() => {
      expect(screen.getByText('Google')).toBeInTheDocument();
    });

    const listButton = screen.getByText('List');
    await user.click(listButton);

    // Should still show companies but in list view
    expect(screen.getByText('Google')).toBeInTheDocument();
    
    const gridButton = screen.getByText('Grid');
    await user.click(gridButton);
    
    expect(screen.getByText('Google')).toBeInTheDocument();
  });

  it('handles reload functionality', async () => {
    const user = userEvent.setup();
    
    // Mock window.location.reload
    const reloadMock = vi.fn();
    Object.defineProperty(window, 'location', {
      value: { reload: reloadMock },
      writable: true,
    });

    render(<CompanyResearchHub />);
    
    const reloadButton = screen.getByText('Reload');
    await user.click(reloadButton);

    expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('companies');
    expect(reloadMock).toHaveBeenCalled();
  });

  it('displays no companies message when filtered results are empty', async () => {
    const user = userEvent.setup();
    render(<CompanyResearchHub />);
    
    await waitFor(() => {
      expect(screen.getByText('Google')).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText('Search companies...');
    await user.type(searchInput, 'NonExistentCompany');

    await waitFor(() => {
      expect(screen.getByText('No companies found')).toBeInTheDocument();
      expect(screen.getByText('Try adjusting your filters')).toBeInTheDocument();
    });
  });

  it('opens comparison modal', async () => {
    const user = userEvent.setup();
    render(<CompanyResearchHub />);
    
    await waitFor(() => {
      expect(screen.getByText('Google')).toBeInTheDocument();
    });

    const compareButton = screen.getByText('Compare');
    await user.click(compareButton);

    await waitFor(() => {
      expect(screen.getByText('Company Regional Comparison')).toBeInTheDocument();
    });
  });

  it('loads companies on mount and shows success toast', async () => {
    render(<CompanyResearchHub />);
    
    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith(
        expect.stringContaining('Loaded 2 companies with enhanced interview experiences')
      );
    });
  });

  it('categorizes companies correctly by region', async () => {
    render(<CompanyResearchHub />);
    
    await waitFor(() => {
      expect(screen.getByText('Google')).toBeInTheDocument();
      expect(screen.getByText('Flipkart')).toBeInTheDocument();
    });

    // Google should be categorized as foreign (Global badge)
    const googleCard = screen.getByText('Google').closest('.transition-all');
    expect(within(googleCard as HTMLElement).getByText('Global')).toBeInTheDocument();

    // Flipkart should be categorized as Indian
    const flipkartCard = screen.getByText('Flipkart').closest('.transition-all');
    expect(within(flipkartCard as HTMLElement).getByText('Indian')).toBeInTheDocument();
  });

  it('displays tech stack badges correctly', async () => {
    render(<CompanyResearchHub />);
    
    await waitFor(() => {
      expect(screen.getByText('Google')).toBeInTheDocument();
    });

    const googleCard = screen.getByText('Google').closest('.transition-all');
    expect(within(googleCard as HTMLElement).getByText('React')).toBeInTheDocument();
    expect(within(googleCard as HTMLElement).getByText('Angular')).toBeInTheDocument();
    expect(within(googleCard as HTMLElement).getByText('TypeScript')).toBeInTheDocument();
  });

  it('handles error states gracefully', async () => {
    // Mock console.error to avoid noise in tests
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    
    // Mock import to throw an error
    vi.doMock('../../data/enhancedCompanyData', () => {
      throw new Error('Failed to load data');
    });

    render(<CompanyResearchHub />);
    
    // Should not crash and should show empty state
    await waitFor(() => {
      expect(screen.getByText('Company Research Hub')).toBeInTheDocument();
    });

    consoleSpy.mockRestore();
  });
});
