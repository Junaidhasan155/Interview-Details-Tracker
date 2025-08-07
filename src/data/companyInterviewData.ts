export interface CompanyInterviewData {
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
}

export const COMPANY_INTERVIEW_DATA: CompanyInterviewData[] = [
  // Major Tech Giants
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
    Notes: "Emphasis on core JS, DOM API, closures, async patterns"
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
    Notes: "Expect deep JS knowledge and React expertise"
  },
  {
    Company: "Amazon",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://www.amazon.jobs/en/jobs/67890-front-end-engineer",
    NoOfInterviewRounds: 5,
    RoundBreakdown: [
      { Round: 1, Type: "Online assessment", Description: "LeetCode-style coding + front-end MCQs" },
      { Round: 2, Type: "Phone screen", Description: "Coding + Leadership Principles behavioral" },
      { Round: 3, Type: "On-site coding", Description: "Vanilla JS, DOM widget implementation" },
      { Round: 4, Type: "System design", Description: "Design a photo-gallery SPA" },
      { Round: 5, Type: "Behavioral", Description: "Leadership Principles deep dive" }
    ],
    FrameworksOrTools: ["Vanilla JavaScript", "React", "Redux"],
    DSA: "Yes",
    SpecialFocusAreas: ["Component design", "Browser APIs", "Performance"],
    Notes: "Practice vanilla JS and AWS-style front-end design"
  },
  {
    Company: "Microsoft",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://careers.microsoft.com/us/en/job/34567-Front-End-Software-Engineer",
    NoOfInterviewRounds: 4,
    RoundBreakdown: [
      { Round: 1, Type: "Recruiter screen", Description: "Overview of projects and core skills" },
      { Round: 2, Type: "Technical phone interview", Description: "DSA on LeetCode + JS scenario questions" },
      { Round: 3, Type: "On-site coding & UI build", Description: "Build a responsive component in plain editor" },
      { Round: 4, Type: "Behavioral", Description: "STAR-based teamwork questions" }
    ],
    FrameworksOrTools: ["JavaScript", "TypeScript", "React"],
    DSA: "Yes",
    SpecialFocusAreas: ["TypeScript typings", "Cross-browser issues"],
    Notes: "Familiarity with Azure services is a plus"
  },
  {
    Company: "Apple",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://jobs.apple.com/en-us/details/3333-frontend-engineer",
    NoOfInterviewRounds: 4,
    RoundBreakdown: [
      { Round: 1, Type: "Recruiter screen", Description: "Motivation and fit" },
      { Round: 2, Type: "Coding interview", Description: "Swift JS interop + DOM tasks" },
      { Round: 3, Type: "System design", Description: "Design a responsive shopping UI" },
      { Round: 4, Type: "Behavioral", Description: "Apple values and team fit" }
    ],
    FrameworksOrTools: ["Swift WebAssembly", "React"],
    DSA: "Yes",
    SpecialFocusAreas: ["Design aesthetics", "Performance"],
    Notes: "Polish UI/UX sensibility"
  },
  // Indian Companies
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
    Notes: "Focus on large-scale React apps"
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
    Notes: "Polyfills and caching strategies matter"
  },
  {
    Company: "Zomato",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://zomato.com/careers/7777-frontend",
    NoOfInterviewRounds: 4,
    RoundBreakdown: [
      { Round: 1, Type: "Recruiter screen", Description: "Motivation and basics" },
      { Round: 2, Type: "Technical coding", Description: "JS + map/list UI" },
      { Round: 3, Type: "System design", Description: "Restaurant listing module" },
      { Round: 4, Type: "Behavioral", Description: "Culture fit" }
    ],
    FrameworksOrTools: ["React", "Redux"],
    DSA: "Yes",
    SpecialFocusAreas: ["Mapping APIs", "Performance"],
    Notes: ""
  },
  {
    Company: "Paytm",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://paytm.com/careers/8888-frontend",
    NoOfInterviewRounds: 4,
    RoundBreakdown: [
      { Round: 1, Type: "Phone screen", Description: "JS fundamentals" },
      { Round: 2, Type: "Coding task", Description: "React + payment form" },
      { Round: 3, Type: "System design", Description: "Secure checkout flow" },
      { Round: 4, Type: "Behavioral", Description: "Leadership & product sense" }
    ],
    FrameworksOrTools: ["React", "Redux"],
    DSA: "Yes",
    SpecialFocusAreas: ["Security", "Performance"],
    Notes: ""
  },
  {
    Company: "Zoho",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://zoho.com/careers/2020-frontend",
    NoOfInterviewRounds: 4,
    RoundBreakdown: [
      { Round: 1, Type: "Screening test", Description: "MCQs on HTML/CSS/JS" },
      { Round: 2, Type: "Technical interview", Description: "Live coding on JS/DOM" },
      { Round: 3, Type: "System design", Description: "CRM UI module" },
      { Round: 4, Type: "Behavioral", Description: "Team fit" }
    ],
    FrameworksOrTools: ["Vanilla JS", "jQuery"],
    DSA: "No",
    SpecialFocusAreas: ["Browser compatibility", "Performance"],
    Notes: ""
  },
  // Remote-First Companies
  {
    Company: "Deel",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://deel.com/careers/job/6067-frontend-engineer-remote",
    NoOfInterviewRounds: 4,
    RoundBreakdown: [
      { Round: 1, Type: "Technical screen", Description: "React.js fundamentals and remote work assessment" },
      { Round: 2, Type: "Live coding", Description: "Build component with TypeScript" },
      { Round: 3, Type: "System design", Description: "Design global payroll UI architecture" },
      { Round: 4, Type: "Behavioral", Description: "Remote collaboration and culture fit" }
    ],
    FrameworksOrTools: ["React", "TypeScript", "Next.js"],
    DSA: "No",
    SpecialFocusAreas: ["Global UI patterns", "Multi-currency components"],
    Notes: "Strong focus on international remote team collaboration"
  },
  {
    Company: "Vercel",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://vercel.com/careers/frontend-engineer-remote",
    NoOfInterviewRounds: 4,
    RoundBreakdown: [
      { Round: 1, Type: "Phone screen", Description: "Next.js ecosystem knowledge" },
      { Round: 2, Type: "Technical interview", Description: "Build deployment dashboard UI" },
      { Round: 3, Type: "System design", Description: "Design developer tooling interface" },
      { Round: 4, Type: "Behavioral", Description: "Open-source contribution mindset" }
    ],
    FrameworksOrTools: ["React", "Next.js", "TypeScript"],
    DSA: "No",
    SpecialFocusAreas: ["Developer experience", "Performance"],
    Notes: ""
  },
  {
    Company: "Netlify",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://netlify.com/careers/frontend-engineer-remote",
    NoOfInterviewRounds: 4,
    RoundBreakdown: [
      { Round: 1, Type: "Recruiter screen", Description: "JAMstack and deployment knowledge" },
      { Round: 2, Type: "Technical interview", Description: "Build CI/CD dashboard component" },
      { Round: 3, Type: "System design", Description: "Design scalable deployment UI" },
      { Round: 4, Type: "Behavioral", Description: "Developer advocacy mindset" }
    ],
    FrameworksOrTools: ["React", "Gatsby", "GraphQL"],
    DSA: "No",
    SpecialFocusAreas: ["JAMstack", "Developer tools"],
    Notes: ""
  },
  {
    Company: "Linear",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://linear.app/careers/frontend-engineer",
    NoOfInterviewRounds: 4,
    RoundBreakdown: [
      { Round: 1, Type: "Phone screen", Description: "Project management tool interest" },
      { Round: 2, Type: "Technical interview", Description: "Build issue tracking component" },
      { Round: 3, Type: "System design", Description: "Design real-time project dashboard" },
      { Round: 4, Type: "Behavioral", Description: "Product quality obsession" }
    ],
    FrameworksOrTools: ["React", "GraphQL", "TypeScript"],
    DSA: "No",
    SpecialFocusAreas: ["Real-time updates", "Performance"],
    Notes: ""
  },
  {
    Company: "Supabase",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://supabase.com/careers/frontend-engineer-remote",
    NoOfInterviewRounds: 3,
    RoundBreakdown: [
      { Round: 1, Type: "Technical screen", Description: "Database and React knowledge" },
      { Round: 2, Type: "Live coding", Description: "Build database management UI" },
      { Round: 3, Type: "Behavioral", Description: "Open-source contribution mindset" }
    ],
    FrameworksOrTools: ["React", "Next.js", "PostgreSQL"],
    DSA: "No",
    SpecialFocusAreas: ["Database UI", "Developer tools"],
    Notes: ""
  },
  {
    Company: "Figma",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://figma.com/careers/6063-frontend-engineer",
    NoOfInterviewRounds: 4,
    RoundBreakdown: [
      { Round: 1, Type: "Phone screen", Description: "JS fundamentals and design tool interest" },
      { Round: 2, Type: "Technical interview", Description: "Build vector editor UI" },
      { Round: 3, Type: "System design", Description: "Design collaborative editing UI" },
      { Round: 4, Type: "Behavioral", Description: "Design collaboration scenarios" }
    ],
    FrameworksOrTools: ["React", "TypeScript"],
    DSA: "Yes",
    SpecialFocusAreas: ["Canvas API", "Real-time updates"],
    Notes: ""
  },
  {
    Company: "Framer",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://framer.com/careers/frontend-engineer-remote",
    NoOfInterviewRounds: 4,
    RoundBreakdown: [
      { Round: 1, Type: "Portfolio review", Description: "Design tool and animation experience" },
      { Round: 2, Type: "Technical interview", Description: "Build design editor component" },
      { Round: 3, Type: "System design", Description: "Design animation timeline UI" },
      { Round: 4, Type: "Behavioral", Description: "Design-developer bridge mindset" }
    ],
    FrameworksOrTools: ["React", "Canvas API", "Animation libraries"],
    DSA: "No",
    SpecialFocusAreas: ["Design tools", "Animations"],
    Notes: ""
  },
  {
    Company: "Loom",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://loom.com/careers/frontend-engineer-remote",
    NoOfInterviewRounds: 4,
    RoundBreakdown: [
      { Round: 1, Type: "Recruiter screen", Description: "Video communication tool interest" },
      { Round: 2, Type: "Technical interview", Description: "Build video player UI component" },
      { Round: 3, Type: "System design", Description: "Design video recording interface" },
      { Round: 4, Type: "Behavioral", Description: "Async communication advocacy" }
    ],
    FrameworksOrTools: ["React", "WebRTC", "Video APIs"],
    DSA: "No",
    SpecialFocusAreas: ["Video UI", "Recording interfaces"],
    Notes: ""
  },
  {
    Company: "Miro",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://miro.com/careers/frontend-engineer-remote",
    NoOfInterviewRounds: 4,
    RoundBreakdown: [
      { Round: 1, Type: "Phone screen", Description: "Collaborative tool interest and JS basics" },
      { Round: 2, Type: "Technical interview", Description: "Build whiteboard widget component" },
      { Round: 3, Type: "System design", Description: "Design real-time collaboration UI" },
      { Round: 4, Type: "Behavioral", Description: "Remote collaboration scenarios" }
    ],
    FrameworksOrTools: ["React", "Canvas API", "WebSockets"],
    DSA: "No",
    SpecialFocusAreas: ["Real-time collaboration", "Canvas manipulation"],
    Notes: ""
  },
  {
    Company: "Replit",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://replit.com/careers/frontend-engineer-remote",
    NoOfInterviewRounds: 4,
    RoundBreakdown: [
      { Round: 1, Type: "Phone screen", Description: "Online IDE and education tech interest" },
      { Round: 2, Type: "Technical interview", Description: "Build code editor component" },
      { Round: 3, Type: "System design", Description: "Design collaborative coding environment" },
      { Round: 4, Type: "Behavioral", Description: "Education accessibility mindset" }
    ],
    FrameworksOrTools: ["React", "Monaco Editor", "WebSockets"],
    DSA: "No",
    SpecialFocusAreas: ["Code editors", "Real-time collaboration"],
    Notes: ""
  },
  {
    Company: "Toptal",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://www.toptal.com/careers/7005-frontend-engineer",
    NoOfInterviewRounds: 3,
    RoundBreakdown: [
      { Round: 1, Type: "English test", Description: "Communication and JS basics" },
      { Round: 2, Type: "Technical screening", Description: "Algorithm and frontend problem solving" },
      { Round: 3, Type: "Test project", Description: "Real-world component build" }
    ],
    FrameworksOrTools: ["React", "Vue.js"],
    DSA: "No",
    SpecialFocusAreas: ["Client pitches", "Remote work"],
    Notes: ""
  },
  {
    Company: "Auth0",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://auth0.com/careers/frontend-engineer-remote",
    NoOfInterviewRounds: 4,
    RoundBreakdown: [
      { Round: 1, Type: "Recruiter screen", Description: "Authentication/security interest" },
      { Round: 2, Type: "Technical interview", Description: "Build login flow component" },
      { Round: 3, Type: "System design", Description: "Design secure UI architecture" },
      { Round: 4, Type: "Behavioral", Description: "Security-first development mindset" }
    ],
    FrameworksOrTools: ["React", "TypeScript", "Security APIs"],
    DSA: "No",
    SpecialFocusAreas: ["Authentication UI", "Security"],
    Notes: ""
  },
  {
    Company: "Clerk",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://clerk.dev/careers/frontend-engineer-remote",
    NoOfInterviewRounds: 3,
    RoundBreakdown: [
      { Round: 1, Type: "Technical screen", Description: "Authentication and React knowledge" },
      { Round: 2, Type: "Live coding", Description: "Build user authentication UI" },
      { Round: 3, Type: "Behavioral", Description: "Developer tools mindset" }
    ],
    FrameworksOrTools: ["React", "Next.js", "Authentication APIs"],
    DSA: "No",
    SpecialFocusAreas: ["Authentication flows", "Developer experience"],
    Notes: ""
  },
  {
    Company: "Railway",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://railway.app/careers/frontend-engineer",
    NoOfInterviewRounds: 3,
    RoundBreakdown: [
      { Round: 1, Type: "Recruiter screen", Description: "Cloud deployment knowledge" },
      { Round: 2, Type: "Technical interview", Description: "Build deployment dashboard component" },
      { Round: 3, Type: "Behavioral", Description: "Developer experience focus" }
    ],
    FrameworksOrTools: ["React", "TypeScript", "GraphQL"],
    DSA: "No",
    SpecialFocusAreas: ["Cloud UI", "Developer tools"],
    Notes: ""
  },
  {
    Company: "PlanetScale",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://planetscale.com/careers/frontend-engineer-remote",
    NoOfInterviewRounds: 4,
    RoundBreakdown: [
      { Round: 1, Type: "Phone screen", Description: "Database and scaling knowledge" },
      { Round: 2, Type: "Technical interview", Description: "Build database schema UI" },
      { Round: 3, Type: "System design", Description: "Design database management dashboard" },
      { Round: 4, Type: "Behavioral", Description: "Scaling mindset and teamwork" }
    ],
    FrameworksOrTools: ["React", "TypeScript", "Database APIs"],
    DSA: "No",
    SpecialFocusAreas: ["Database visualization", "Performance"],
    Notes: ""
  }
];
