import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CompanyResearchHub } from '../CompanyResearchHub';

// Mock toast
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

// Mock window.open
const mockOpen = vi.fn();
Object.defineProperty(window, 'open', {
  value: mockOpen,
});

// Mock enhanced company data
vi.mock('../../data/enhancedCompanyData', () => ({
  ENHANCED_COMPANY_DATA: [
    {
      Company: "Google",
      HiringForFrontEnd: "Yes",
      JobDescriptionLink: "https://careers.google.com/jobs/results/100000-front-end-developer",
      NoOfInterviewRounds: 4,
      RoundBreakdown: [
        { Round: 1, Type: "Recruiter screen", Description: "Phone screen with recruiter" },
        { Round: 2, Type: "Technical phone interview", Description: "Live coding session" }
      ],
      FrameworksOrTools: ["React", "Angular", "TypeScript"],
      DSA: "Yes",
      SpecialFocusAreas: ["Performance optimization", "Web security"],
      Notes: "Emphasis on core JS fundamentals",
      interviewDetails: {
        averageDuration: "4-6 hours",
        successRate: 15,
        difficultyLevel: "Very Hard",
        preparationTime: "3-6 months",
        commonTopics: ["System Design", "JavaScript Fundamentals"],
        dsaFocus: {
          required: true,
          difficulty: "Hard",
          topics: ["Trees", "Graphs", "Dynamic Programming"],
          platforms: ["LeetCode", "HackerRank"]
        },
        frontendFocus: {
          frameworks: ["React", "Angular", "Vue.js"],
          concepts: ["Virtual DOM", "State Management"],
          practicalTasks: ["Build file explorer"],
          designPatterns: ["Observer", "Singleton"]
        }
      },
      hrContacts: [
        {
          name: "Sarah Chen",
          role: "Senior Technical Recruiter",
          email: "s.chen@google.com",
          responsiveness: "Fast",
          notes: "Very professional"
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
              questions: ["Tell me about yourself"],
              feedback: "Good communication",
              passed: true
            }
          ],
          overallFeedback: "Strong candidate",
          tips: ["Practice system design"],
          rating: 5
        }
      ],
      salaryInsights: {
        range: "$150,000 - $300,000",
        average: "$220,000",
        currency: "USD",
        benefits: ["Health Insurance", "Stock Options"],
        stockOptions: true,
        bonus: "15-25% of base",
        workLifeBalance: 3
      },
      cultureInsights: {
        workEnvironment: "Fast-paced, innovative",
        teamSize: "6-8 engineers",
        remotePolicy: "Hybrid",
        learningOpportunities: ["Training", "Conferences"],
        diversity: 4,
        innovation: 5,
        workPressure: 4
      }
    },
    {
      Company: "Flipkart",
      HiringForFrontEnd: "Yes",
      JobDescriptionLink: "https://www.flipkartcareers.com/job/5555-frontend",
      NoOfInterviewRounds: 3,
      RoundBreakdown: [
        { Round: 1, Type: "Machine coding", Description: "Build UI component" }
      ],
      FrameworksOrTools: ["React", "Next.js"],
      DSA: "Yes",
      SpecialFocusAreas: ["Performance", "Scalability"],
      Notes: "E-commerce focus",
      interviewDetails: {
        averageDuration: "3-4 hours",
        successRate: 25,
        difficultyLevel: "Hard",
        preparationTime: "2-3 months",
        commonTopics: ["E-commerce UI", "Performance"],
        dsaFocus: {
          required: true,
          difficulty: "Medium",
          topics: ["Arrays", "Strings"],
          platforms: ["GeeksforGeeks", "LeetCode"]
        },
        frontendFocus: {
          frameworks: ["React", "Next.js"],
          concepts: ["SSR", "PWA"],
          practicalTasks: ["Product listing"],
          designPatterns: ["Redux Pattern"]
        }
      },
      hrContacts: [],
      candidateExperiences: [],
      salaryInsights: {
        range: "₹8,00,000 - ₹25,00,000",
        average: "₹15,00,000",
        currency: "INR",
        benefits: ["Health Insurance"],
        stockOptions: true,
        bonus: "10-15%",
        workLifeBalance: 4
      },
      cultureInsights: {
        workEnvironment: "Startup culture",
        teamSize: "8-12 engineers",
        remotePolicy: "Hybrid",
        learningOpportunities: ["Hackathons"],
        diversity: 3,
        innovation: 4,
        workPressure: 4
      }
    }
  ]
}));

describe('CompanyResearchHub Integration Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockLocalStorage.getItem.mockReturnValue(null);
  });

  it('completes the full user journey: load → filter → view details → switch tabs', async () => {
    const user = userEvent.setup();
    render(<CompanyResearchHub />);

    // Step 1: Verify initial load
    await waitFor(() => {
      expect(screen.getByText('Google')).toBeInTheDocument();
      expect(screen.getByText('Flipkart')).toBeInTheDocument();
    });

    // Verify statistics are updated
    expect(screen.getByText('Total Companies')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();

    // Step 2: Filter by region (Indian companies)
    const regionFilter = screen.getByDisplayValue('All Regions');
    await user.click(regionFilter);
    
    const indianOption = screen.getByText('Indian');
    await user.click(indianOption);

    await waitFor(() => {
      expect(screen.queryByText('Google')).not.toBeInTheDocument();
      expect(screen.getByText('Flipkart')).toBeInTheDocument();
    });

    // Step 3: Clear filter and search for specific company
    await user.click(regionFilter);
    const allRegionsOption = screen.getByText('All Regions');
    await user.click(allRegionsOption);

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

    // Step 4: Open company detail modal
    const viewDetailsButton = screen.getByText('View Details');
    await user.click(viewDetailsButton);

    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
      expect(screen.getByText('Google')).toBeInTheDocument();
    });

    // Step 5: Navigate through all tabs in detail modal
    
    // Overview tab (default)
    expect(screen.getByText('Quick Stats')).toBeInTheDocument();
    expect(screen.getByText('Success Rate')).toBeInTheDocument();
    expect(screen.getByText('15%')).toBeInTheDocument();

    // Interviews tab
    const interviewsTab = screen.getByText('Interviews');
    await user.click(interviewsTab);
    
    await waitFor(() => {
      expect(screen.getByText('DSA Requirements')).toBeInTheDocument();
      expect(screen.getByText('Required:')).toBeInTheDocument();
      expect(screen.getByText('Frontend Focus')).toBeInTheDocument();
    });

    // Experiences tab
    const experiencesTab = screen.getByText('Experiences');
    await user.click(experiencesTab);
    
    await waitFor(() => {
      expect(screen.getByText('Rahul K.')).toBeInTheDocument();
      expect(screen.getByText('Frontend Engineer')).toBeInTheDocument();
      expect(screen.getByText('Passed')).toBeInTheDocument();
    });

    // Tech tab
    const techTab = screen.getByText('Tech');
    await user.click(techTab);
    
    await waitFor(() => {
      expect(screen.getByText('Tech Stack')).toBeInTheDocument();
      expect(screen.getByText('React')).toBeInTheDocument();
      expect(screen.getByText('Angular')).toBeInTheDocument();
    });

    // Culture tab
    const cultureTab = screen.getByText('Culture');
    await user.click(cultureTab);
    
    await waitFor(() => {
      expect(screen.getByText('Culture Insights')).toBeInTheDocument();
      expect(screen.getByText('Work Environment')).toBeInTheDocument();
      expect(screen.getByText('Fast-paced, innovative')).toBeInTheDocument();
    });

    // Contacts tab
    const contactsTab = screen.getByText('Contacts');
    await user.click(contactsTab);
    
    await waitFor(() => {
      expect(screen.getByText('Sarah Chen')).toBeInTheDocument();
      expect(screen.getByText('Senior Technical Recruiter')).toBeInTheDocument();
      expect(screen.getByText('s.chen@google.com')).toBeInTheDocument();
    });

    // Step 6: Test external links in modal
    const linkedinLink = screen.getByText('LinkedIn Profile');
    await user.click(linkedinLink);
    
    // Note: The actual link click might not trigger window.open in test environment
    // but we can verify the element exists and is clickable
    expect(linkedinLink).toBeInTheDocument();
  });

  it('handles wishlist functionality end-to-end', async () => {
    const user = userEvent.setup();
    render(<CompanyResearchHub />);

    await waitFor(() => {
      expect(screen.getByText('Google')).toBeInTheDocument();
    });

    // Initial wishlist count should be 0
    const wishlistStats = screen.getAllByText('0');
    expect(wishlistStats.length).toBeGreaterThan(0);

    // Find and click wishlist button for Google
    const googleCard = screen.getByText('Google').closest('.transition-all');
    expect(googleCard).toBeInTheDocument();

    const wishlistButton = within(googleCard as HTMLElement).getByRole('button', {
      name: /star/i
    });
    await user.click(wishlistButton);

    // Verify localStorage was called
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
      'companies',
      expect.any(String)
    );

    // Filter by wishlist to see the change
    const statusFilter = screen.getByDisplayValue('All Companies');
    await user.click(statusFilter);
    
    const wishlistOption = screen.getByText('Wishlist');
    await user.click(wishlistOption);

    // Should show the wishlisted company
    await waitFor(() => {
      expect(screen.getByText('Google')).toBeInTheDocument();
      expect(screen.queryByText('Flipkart')).not.toBeInTheDocument();
    });
  });

  it('handles view mode switching', async () => {
    const user = userEvent.setup();
    render(<CompanyResearchHub />);

    await waitFor(() => {
      expect(screen.getByText('Google')).toBeInTheDocument();
    });

    // Default should be grid view
    const gridButton = screen.getByText('Grid');
    const listButton = screen.getByText('List');

    // Switch to list view
    await user.click(listButton);
    
    // Companies should still be visible
    expect(screen.getByText('Google')).toBeInTheDocument();
    expect(screen.getByText('Flipkart')).toBeInTheDocument();

    // Switch back to grid view
    await user.click(gridButton);
    
    // Companies should still be visible
    expect(screen.getByText('Google')).toBeInTheDocument();
    expect(screen.getByText('Flipkart')).toBeInTheDocument();
  });

  it('handles add company modal workflow', async () => {
    const user = userEvent.setup();
    render(<CompanyResearchHub />);

    // Open add company modal
    const addCompanyButton = screen.getByText('Add Company');
    await user.click(addCompanyButton);

    await waitFor(() => {
      expect(screen.getByText('Add Company to Research Hub')).toBeInTheDocument();
    });

    // Fill in the form
    const nameInput = screen.getByLabelText('Company Name');
    const industryInput = screen.getByLabelText('Industry');
    const locationInput = screen.getByLabelText('Location');

    await user.type(nameInput, 'Test Company');
    await user.type(industryInput, 'Technology');
    await user.type(locationInput, 'San Francisco, CA');

    // Submit the form
    const submitButton = screen.getByRole('button', { name: 'Add Company' });
    await user.click(submitButton);

    // Modal should close and company should be added
    await waitFor(() => {
      expect(screen.queryByText('Add Company to Research Hub')).not.toBeInTheDocument();
    });

    // Verify localStorage was called with updated data
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
      'companies',
      expect.any(String)
    );
  });

  it('handles application tracking workflow', async () => {
    const user = userEvent.setup();
    render(<CompanyResearchHub />);

    await waitFor(() => {
      expect(screen.getByText('Google')).toBeInTheDocument();
    });

    // Click apply button for Google
    const googleCard = screen.getByText('Google').closest('.transition-all');
    const applyButton = within(googleCard as HTMLElement).getByRole('button', {
      name: /briefcase/i
    });
    await user.click(applyButton);

    await waitFor(() => {
      expect(screen.getByText('Track Application')).toBeInTheDocument();
      expect(screen.getByText('Add a new job application for Google')).toBeInTheDocument();
    });

    // Fill in application form
    const positionInput = screen.getByLabelText('Position');
    await user.type(positionInput, 'Senior Frontend Engineer');

    const appliedDateInput = screen.getByLabelText('Applied Date');
    await user.clear(appliedDateInput);
    await user.type(appliedDateInput, '2024-01-15');

    // Submit application
    const trackButton = screen.getByRole('button', { name: 'Track Application' });
    await user.click(trackButton);

    // Modal should close
    await waitFor(() => {
      expect(screen.queryByText('Track Application')).not.toBeInTheDocument();
    });

    // Verify localStorage was updated
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
      'companies',
      expect.any(String)
    );
  });

  it('handles multiple filters simultaneously', async () => {
    const user = userEvent.setup();
    render(<CompanyResearchHub />);

    await waitFor(() => {
      expect(screen.getByText('Google')).toBeInTheDocument();
      expect(screen.getByText('Flipkart')).toBeInTheDocument();
    });

    // Apply search filter
    const searchInput = screen.getByPlaceholderText('Search companies...');
    await user.type(searchInput, 'Tech');

    // Apply industry filter
    const industryFilter = screen.getByDisplayValue('All Industries');
    await user.click(industryFilter);
    const technologyOption = screen.getByText('Technology');
    await user.click(technologyOption);

    // Apply region filter
    const regionFilter = screen.getByDisplayValue('All Regions');
    await user.click(regionFilter);
    const foreignOption = screen.getByText('Global');
    await user.click(foreignOption);

    // Should show filtered results
    await waitFor(() => {
      // Based on our mock data, Google should match: contains "Tech", Technology industry, foreign region
      expect(screen.getByText('Google')).toBeInTheDocument();
      expect(screen.queryByText('Flipkart')).not.toBeInTheDocument();
    });

    // Clear search to see effect of other filters
    await user.clear(searchInput);

    await waitFor(() => {
      expect(screen.getByText('Google')).toBeInTheDocument();
      expect(screen.queryByText('Flipkart')).not.toBeInTheDocument();
    });
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

  it('displays enhanced company information correctly', async () => {
    render(<CompanyResearchHub />);

    await waitFor(() => {
      expect(screen.getByText('Google')).toBeInTheDocument();
      expect(screen.getByText('Flipkart')).toBeInTheDocument();
    });

    // Verify enhanced data is displayed in cards
    const googleCard = screen.getByText('Google').closest('.transition-all');
    expect(within(googleCard as HTMLElement).getByText('Global')).toBeInTheDocument();
    expect(within(googleCard as HTMLElement).getByText('React')).toBeInTheDocument();
    expect(within(googleCard as HTMLElement).getByText('Angular')).toBeInTheDocument();

    const flipkartCard = screen.getByText('Flipkart').closest('.transition-all');
    expect(within(flipkartCard as HTMLElement).getByText('Indian')).toBeInTheDocument();
    expect(within(flipkartCard as HTMLElement).getByText('React')).toBeInTheDocument();
    expect(within(flipkartCard as HTMLElement).getByText('Next.js')).toBeInTheDocument();
  });

  it('persists data to localStorage correctly', async () => {
    render(<CompanyResearchHub />);

    await waitFor(() => {
      expect(screen.getByText('Google')).toBeInTheDocument();
    });

    // Verify that enhanced company data was saved to localStorage
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
      'companies',
      expect.stringContaining('Google')
    );

    // Verify the data structure includes enhanced fields
    const savedData = mockLocalStorage.setItem.mock.calls[0][1];
    const parsedData = JSON.parse(savedData);
    
    expect(parsedData).toHaveLength(2);
    expect(parsedData[0]).toHaveProperty('interviewDetails');
    expect(parsedData[0]).toHaveProperty('salaryInsights');
    expect(parsedData[0]).toHaveProperty('cultureInsights');
  });
});
