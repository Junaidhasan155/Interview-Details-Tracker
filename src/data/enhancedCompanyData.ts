export interface EnhancedCompanyInterviewData {
  Company: string;
  HiringForFrontEnd: string;
  JobDescriptionLink: string;
  NoOfInterviewRounds: number;
  RoundBreakdown: Array<{
    Round: number;
    Type: string;
    Description: string;
  }>;
  FrameworksOrTools: string[];
  DSA: string;
  SpecialFocusAreas: string[];
  Notes: string;
  // Enhanced data
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

export const ENHANCED_COMPANY_DATA: EnhancedCompanyInterviewData[] = [
  {
    Company: "Google",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://careers.google.com/jobs/results/100000-front-end-developer",
    NoOfInterviewRounds: 4,
    RoundBreakdown: [
      { Round: 1, Type: "Recruiter screen", Description: "Phone screen with recruiter covering background and motivation" },
      { Round: 2, Type: "Technical phone interview", Description: "Live coding on JavaScript and basic DSA problems" },
      { Round: 3, Type: "On-site frontend system design", Description: "Design a scalable UI component architecture" },
      { Round: 4, Type: "Behavioral interview", Description: "Culture-fit and leadership questions" }
    ],
    FrameworksOrTools: ["React", "Angular", "Polymer", "TypeScript"],
    DSA: "Yes",
    SpecialFocusAreas: ["Performance optimization", "Web security", "Accessibility"],
    Notes: "Emphasis on core JS, DOM API, closures, async patterns",
    interviewDetails: {
      averageDuration: "4-6 hours",
      successRate: 15,
      difficultyLevel: "Very Hard",
      preparationTime: "3-6 months",
      commonTopics: ["System Design", "JavaScript Fundamentals", "React/Angular", "Web Performance", "Security"],
      dsaFocus: {
        required: true,
        difficulty: "Hard",
        topics: ["Trees", "Graphs", "Dynamic Programming", "Arrays", "Strings", "Hash Tables"],
        platforms: ["LeetCode", "HackerRank", "Codeforces"]
      },
      frontendFocus: {
        frameworks: ["React", "Angular", "Vue.js", "TypeScript"],
        concepts: ["Virtual DOM", "State Management", "Component Architecture", "Performance Optimization", "Accessibility"],
        practicalTasks: ["Build a file explorer", "Create a data visualization component", "Implement virtual scrolling"],
        designPatterns: ["Observer", "Singleton", "Factory", "Module Pattern", "MVC/MVVM"]
      }
    },
    hrContacts: [
      {
        name: "Sarah Chen",
        role: "Senior Technical Recruiter",
        email: "s.chen@google.com",
        linkedin: "https://linkedin.com/in/sarahchen-google",
        responsiveness: "Fast",
        notes: "Very professional, responds within 24 hours. Good at setting expectations."
      },
      {
        name: "Mike Rodriguez",
        role: "Engineering Manager",
        responsiveness: "Medium",
        notes: "Technical discussions, helpful with team-specific questions."
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
            questions: ["Tell me about yourself", "Why Google?", "Walk me through your resume"],
            feedback: "Good communication, clear career progression",
            passed: true
          },
          {
            roundName: "Technical Phone",
            duration: 60,
            difficulty: "Hard",
            questions: [
              "Implement a function to find the longest common subsequence",
              "Explain event bubbling and capturing",
              "How would you optimize a React component that re-renders frequently?"
            ],
            feedback: "Strong problem-solving skills, good JS knowledge, explained trade-offs well",
            passed: true
          },
          {
            roundName: "System Design",
            duration: 45,
            difficulty: "Hard",
            questions: ["Design a frontend architecture for Google Photos"],
            feedback: "Good understanding of scalability, considered edge cases",
            passed: true
          },
          {
            roundName: "Behavioral",
            duration: 45,
            difficulty: "Medium",
            questions: ["Tell me about a time you disagreed with your manager", "Describe a challenging project"],
            feedback: "Good examples using STAR method, shows leadership potential",
            passed: true
          }
        ],
        overallFeedback: "Strong technical candidate with good communication skills. Demonstrated ability to think at scale and consider user experience.",
        tips: [
          "Practice system design extensively - they expect you to think about millions of users",
          "Be very strong in JavaScript fundamentals",
          "Practice explaining your thought process clearly",
          "Know React/Angular internals deeply"
        ],
        rating: 5
      },
      {
        id: "2",
        candidateName: "Priya S.",
        role: "Senior Frontend Engineer",
        experience: "5 years",
        result: "Failed",
        interviewDate: "November 2023",
        rounds: [
          {
            roundName: "Recruiter Screen",
            duration: 30,
            difficulty: "Easy",
            questions: ["Background discussion", "Salary expectations"],
            feedback: "Good fit for the role",
            passed: true
          },
          {
            roundName: "Technical Phone",
            duration: 60,
            difficulty: "Hard",
            questions: [
              "Find the minimum window substring",
              "Implement debouncing in JavaScript",
              "Explain React rendering lifecycle"
            ],
            feedback: "Struggled with the algorithmic problem, good React knowledge",
            passed: false
          }
        ],
        overallFeedback: "Good frontend knowledge but needs stronger algorithmic problem-solving skills.",
        tips: [
          "Don't underestimate the DSA portion - it's very important",
          "Practice medium to hard LeetCode problems daily",
          "Time management is crucial in coding rounds"
        ],
        rating: 3
      }
    ],
    salaryInsights: {
      range: "$150,000 - $300,000",
      average: "$220,000",
      currency: "USD",
      benefits: ["Health Insurance", "401k Match", "Stock Options", "Free Meals", "Learning Budget"],
      stockOptions: true,
      bonus: "15-25% of base salary",
      workLifeBalance: 3
    },
    cultureInsights: {
      workEnvironment: "Fast-paced, innovative, data-driven culture with emphasis on user impact",
      teamSize: "6-8 engineers per team",
      remotePolicy: "Hybrid - 3 days in office",
      learningOpportunities: ["Internal training", "Conference budget", "20% time for side projects", "Mentorship programs"],
      diversity: 4,
      innovation: 5,
      workPressure: 4
    }
  },
  {
    Company: "Meta (Facebook)",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://www.meta.com/careers/jobs/2345-front-end-engineer",
    NoOfInterviewRounds: 3,
    RoundBreakdown: [
      { Round: 1, Type: "Recruiter phone screen", Description: "JS fundamentals and resume discussion" },
      { Round: 2, Type: "Technical coding interview", Description: "CoderPad live coding: JS algorithms + small UI widget" },
      { Round: 3, Type: "On-site / virtual loop", Description: "Two coding + one design + one behavioral" }
    ],
    FrameworksOrTools: ["React", "GraphQL", "TypeScript"],
    DSA: "Yes",
    SpecialFocusAreas: ["JS closures", "Memory leaks", "Component architecture"],
    Notes: "Expect deep JS knowledge and React expertise",
    interviewDetails: {
      averageDuration: "5-7 hours",
      successRate: 18,
      difficultyLevel: "Very Hard",
      preparationTime: "2-4 months",
      commonTopics: ["React Deep Dive", "JavaScript Performance", "GraphQL", "Mobile Optimization"],
      dsaFocus: {
        required: true,
        difficulty: "Hard",
        topics: ["Graphs", "Trees", "Dynamic Programming", "Greedy Algorithms"],
        platforms: ["LeetCode", "Meta Coding Interview Prep"]
      },
      frontendFocus: {
        frameworks: ["React", "React Native", "GraphQL", "Relay"],
        concepts: ["React Fiber", "Concurrent Mode", "Server Components", "Performance Profiling"],
        practicalTasks: ["Build a news feed component", "Implement infinite scrolling", "Create a photo upload widget"],
        designPatterns: ["Flux/Redux", "Higher-Order Components", "Render Props", "Hooks Pattern"]
      }
    },
    hrContacts: [
      {
        name: "Jessica Wong",
        role: "Technical Recruiter",
        email: "j.wong@meta.com",
        responsiveness: "Fast",
        notes: "Very responsive, provides detailed feedback after each round"
      }
    ],
    candidateExperiences: [
      {
        id: "1",
        candidateName: "Ankit M.",
        role: "Frontend Engineer",
        experience: "4 years",
        result: "Passed",
        interviewDate: "January 2024",
        rounds: [
          {
            roundName: "Recruiter Screen",
            duration: 30,
            difficulty: "Easy",
            questions: ["Why Meta?", "Tell me about your React experience"],
            feedback: "Good motivation and experience match",
            passed: true
          },
          {
            roundName: "Technical Coding",
            duration: 60,
            difficulty: "Hard",
            questions: [
              "Implement a LRU Cache",
              "Build a React component for photo gallery with lazy loading"
            ],
            feedback: "Excellent problem-solving, clean code, good React patterns",
            passed: true
          },
          {
            roundName: "System Design",
            duration: 60,
            difficulty: "Hard",
            questions: ["Design the architecture for Facebook's news feed"],
            feedback: "Good understanding of scale, considered mobile and web",
            passed: true
          }
        ],
        overallFeedback: "Strong React knowledge and system thinking. Ready for senior responsibilities.",
        tips: [
          "Know React internals extremely well",
          "Practice building complex UIs quickly",
          "Understand GraphQL and client-side caching",
          "Be prepared for scale questions - billions of users"
        ],
        rating: 5
      }
    ],
    salaryInsights: {
      range: "$140,000 - $280,000",
      average: "$210,000",
      currency: "USD",
      benefits: ["Health Insurance", "Stock Options", "Free Meals", "Gym Membership", "Parental Leave"],
      stockOptions: true,
      bonus: "10-20% of base salary",
      workLifeBalance: 3
    },
    cultureInsights: {
      workEnvironment: "Move fast and break things culture, very product-focused",
      teamSize: "5-7 engineers per team",
      remotePolicy: "Hybrid - 3 days in office",
      learningOpportunities: ["Internal bootcamps", "Tech talks", "Hackathons", "Open source contributions"],
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
      { Round: 2, Type: "UI deep dive", Description: "React hooks and state patterns" },
      { Round: 3, Type: "DSA + DOM", Description: "Array manipulations + event handling" },
      { Round: 4, Type: "System design", Description: "Scalable front-end module" },
      { Round: 5, Type: "Managerial", Description: "Behavioral culture fit" }
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
      commonTopics: ["E-commerce UI", "Performance Optimization", "Mobile-first Design", "Payment Integration"],
      dsaFocus: {
        required: true,
        difficulty: "Medium",
        topics: ["Arrays", "Strings", "Hash Maps", "Binary Search", "Sorting"],
        platforms: ["GeeksforGeeks", "LeetCode", "HackerRank"]
      },
      frontendFocus: {
        frameworks: ["React", "Next.js", "Redux", "Material-UI"],
        concepts: ["Server-side Rendering", "Progressive Web Apps", "State Management", "Responsive Design"],
        practicalTasks: ["Build a product listing page", "Implement shopping cart", "Create search with filters"],
        designPatterns: ["Redux Pattern", "Container/Presentational", "Custom Hooks"]
      }
    },
    hrContacts: [
      {
        name: "Neha Sharma",
        role: "Senior Talent Acquisition",
        email: "neha.sharma@flipkart.com",
        responsiveness: "Medium",
        notes: "Professional and helpful, schedules interviews efficiently"
      }
    ],
    candidateExperiences: [
      {
        id: "1",
        candidateName: "Rohit P.",
        role: "Frontend Developer",
        experience: "2 years",
        result: "Passed",
        interviewDate: "February 2024",
        rounds: [
          {
            roundName: "Machine Coding",
            duration: 90,
            difficulty: "Medium",
            questions: ["Build a product filter and search interface with React"],
            feedback: "Clean code structure, good component breakdown, handled edge cases",
            passed: true
          },
          {
            roundName: "UI Deep Dive",
            duration: 60,
            difficulty: "Medium",
            questions: [
              "Explain useEffect vs useLayoutEffect",
              "How to optimize React performance?",
              "Implement custom hooks for API calls"
            ],
            feedback: "Good React knowledge, understood performance implications",
            passed: true
          },
          {
            roundName: "DSA Round",
            duration: 60,
            difficulty: "Medium",
            questions: [
              "Find duplicates in an array",
              "Implement debounce function",
              "Event delegation in vanilla JS"
            ],
            feedback: "Good problem-solving approach, explained time complexity",
            passed: true
          }
        ],
        overallFeedback: "Solid frontend skills with good understanding of e-commerce requirements.",
        tips: [
          "Practice building e-commerce components",
          "Focus on performance optimization techniques",
          "Understand mobile-first design principles",
          "Know about PWA implementation"
        ],
        rating: 4
      }
    ],
    salaryInsights: {
      range: "₹8,00,000 - ₹25,00,000",
      average: "₹15,00,000",
      currency: "INR",
      benefits: ["Health Insurance", "Food Allowance", "Transportation", "Stock Options", "Flexible Hours"],
      stockOptions: true,
      bonus: "10-15% of base salary",
      workLifeBalance: 4
    },
    cultureInsights: {
      workEnvironment: "Fast-paced startup culture with focus on customer experience",
      teamSize: "8-12 engineers per team",
      remotePolicy: "Hybrid - 2 days WFH per week",
      learningOpportunities: ["Tech conferences", "Internal tech talks", "Certification programs", "Hackathons"],
      diversity: 3,
      innovation: 4,
      workPressure: 4
    }
  },
  {
    Company: "Swiggy",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://careers.swiggy.com/job/6666-frontend-engineer",
    NoOfInterviewRounds: 3,
    RoundBreakdown: [
      { Round: 1, Type: "Online assessment", Description: "HackerRank React task" },
      { Round: 2, Type: "Technical interview", Description: "JS fundamentals and React patterns" },
      { Round: 3, Type: "Managerial", Description: "Team fit and design discussion" }
    ],
    FrameworksOrTools: ["React", "TypeScript"],
    DSA: "Yes",
    SpecialFocusAreas: ["Performance", "Responsive UI"],
    Notes: "Polyfills and caching strategies matter",
    interviewDetails: {
      averageDuration: "3-4 hours",
      successRate: 30,
      difficultyLevel: "Medium",
      preparationTime: "1-2 months",
      commonTopics: ["Food delivery UI", "Real-time tracking", "Location services", "Payment flows"],
      dsaFocus: {
        required: true,
        difficulty: "Medium",
        topics: ["Arrays", "Strings", "Hash Maps", "Basic Trees"],
        platforms: ["HackerRank", "CodeChef", "LeetCode"]
      },
      frontendFocus: {
        frameworks: ["React", "TypeScript", "Redux Toolkit", "Ant Design"],
        concepts: ["Real-time updates", "Geolocation APIs", "Offline handling", "Push notifications"],
        practicalTasks: ["Build a restaurant listing", "Implement order tracking", "Create delivery timeline"],
        designPatterns: ["Observer for real-time updates", "State management", "Error boundaries"]
      }
    },
    hrContacts: [
      {
        name: "Kavya Reddy",
        role: "Talent Acquisition Partner",
        email: "kavya.reddy@swiggy.in",
        responsiveness: "Fast",
        notes: "Very approachable, quick to schedule and provides feedback"
      }
    ],
    candidateExperiences: [
      {
        id: "1",
        candidateName: "Deepak V.",
        role: "Frontend Engineer",
        experience: "3 years",
        result: "Passed",
        interviewDate: "March 2024",
        rounds: [
          {
            roundName: "Online Assessment",
            duration: 120,
            difficulty: "Medium",
            questions: ["Build a restaurant search and filter interface with React"],
            feedback: "Good implementation, handled loading states well",
            passed: true
          },
          {
            roundName: "Technical Interview",
            duration: 60,
            difficulty: "Medium",
            questions: [
              "Implement a search with auto-suggestions",
              "How would you handle real-time order updates?",
              "Optimize a slow React component"
            ],
            feedback: "Strong practical knowledge, good understanding of real-time systems",
            passed: true
          },
          {
            roundName: "Managerial Round",
            duration: 45,
            difficulty: "Easy",
            questions: ["Tell me about a challenging project", "How do you handle tight deadlines?"],
            feedback: "Good communication, team player attitude",
            passed: true
          }
        ],
        overallFeedback: "Good fit for the team with practical experience in building user-facing features.",
        tips: [
          "Understand food delivery domain well",
          "Practice real-time UI updates",
          "Know about location-based services",
          "Focus on mobile-first design"
        ],
        rating: 4
      }
    ],
    salaryInsights: {
      range: "₹12,00,000 - ₹35,00,000",
      average: "₹20,00,000",
      currency: "INR",
      benefits: ["Health Insurance", "Food Credits", "Flexible Hours", "Learning Budget", "Transportation"],
      stockOptions: true,
      bonus: "12-18% of base salary",
      workLifeBalance: 4
    },
    cultureInsights: {
      workEnvironment: "Collaborative, fast-moving with focus on user experience",
      teamSize: "6-10 engineers per squad",
      remotePolicy: "Hybrid - 3 days in office",
      learningOpportunities: ["Tech meetups", "Internal training", "Conference sponsorship", "Open source time"],
      diversity: 4,
      innovation: 4,
      workPressure: 3
    }
  }
];
