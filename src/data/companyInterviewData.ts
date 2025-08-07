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
    Company: "Atlassian",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://www.atlassian.com/careers/jobs/1122-frontend-developer",
    NoOfInterviewRounds: 6,
    RoundBreakdown: [
      { Round: 1, Type: "Coding MCQs", Description: "JS/CSS/HTML multiple-choice quiz" },
      { Round: 2, Type: "Live machine coding", Description: "React UI task (e.g. Todo app)" },
      { Round: 3, Type: "Deep JS interview", Description: "Event loop, promises, prototypes" },
      { Round: 4, Type: "System design", Description: "Frontend architecture for plugin system" },
      { Round: 5, Type: "Values & culture", Description: "Atlassian values scenarios" },
      { Round: 6, Type: "Manager interview", Description: "Behavioral deep-dive" }
    ],
    FrameworksOrTools: ["React", "Redux", "TypeScript"],
    DSA: "Yes (basic)",
    SpecialFocusAreas: ["Security", "Modular design"],
    Notes: "No separate DSA round; emphasis on frontend architecture"
  },
  {
    Company: "Uber",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://www.uber.com/global/en/careers/list/1234-frontend-engineer",
    NoOfInterviewRounds: 4,
    RoundBreakdown: [
      { Round: 1, Type: "Recruiter screen", Description: "Intro and resume" },
      { Round: 2, Type: "Technical phone", Description: "JS live coding on arrays and DOM" },
      { Round: 3, Type: "On-site system design", Description: "Real-time UI update architecture" },
      { Round: 4, Type: "Behavioral", Description: "Leadership and product questions" }
    ],
    FrameworksOrTools: ["React", "Redux", "MobX"],
    DSA: "Yes",
    SpecialFocusAreas: ["WebSockets", "Performance at scale"],
    Notes: "Focus on real-time features and CORS"
  },
  {
    Company: "Netflix",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://jobs.netflix.com/jobs/2222-frontend-engineer",
    NoOfInterviewRounds: 5,
    RoundBreakdown: [
      { Round: 1, Type: "Phone screen", Description: "JS fundamentals + streaming UX discussion" },
      { Round: 2, Type: "Technical coding", Description: "React performance optimization tasks" },
      { Round: 3, Type: "System design", Description: "Design high-throughput video gallery" },
      { Round: 4, Type: "Behavioral", Description: "Culture & team collaboration" },
      { Round: 5, Type: "Final exec interview", Description: "Leadership and vision alignment" }
    ],
    FrameworksOrTools: ["React", "Redux", "Node.js"],
    DSA: "Yes",
    SpecialFocusAreas: ["Performance", "Scalability"],
    Notes: "Strong emphasis on UX and performance"
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
  {
    Company: "Airbnb",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://careers.airbnb.com/positions/frontend-engineer",
    NoOfInterviewRounds: 4,
    RoundBreakdown: [
      { Round: 1, Type: "Phone screen", Description: "React fundamentals and design patterns" },
      { Round: 2, Type: "Technical coding", Description: "JS + component styling tasks" },
      { Round: 3, Type: "System design", Description: "Host listing UI flow design" },
      { Round: 4, Type: "Behavioral", Description: "Collaboration scenarios" }
    ],
    FrameworksOrTools: ["React", "Styled-Components"],
    DSA: "Yes",
    SpecialFocusAreas: ["Design-driven code", "Accessibility"],
    Notes: "Strong UX focus"
  },
  {
    Company: "Shopify",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://www.shopify.com/careers/jobs/4444-frontend",
    NoOfInterviewRounds: 4,
    RoundBreakdown: [
      { Round: 1, Type: "Recruiter screen", Description: "Shopify theme knowledge" },
      { Round: 2, Type: "Coding interview", Description: "Liquid + JS tasks" },
      { Round: 3, Type: "System design", Description: "Design checkout UI" },
      { Round: 4, Type: "Behavioral", Description: "Merchant empathy" }
    ],
    FrameworksOrTools: ["React", "Liquid"],
    DSA: "Yes",
    SpecialFocusAreas: ["E-commerce UX", "Performance"],
    Notes: "Understand Shopify ecosystem"
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
    Company: "Ola",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://ola.com/careers/9999-frontend",
    NoOfInterviewRounds: 4,
    RoundBreakdown: [
      { Round: 1, Type: "Recruiter screen", Description: "Profile & JS basics" },
      { Round: 2, Type: "Technical interview", Description: "React + mapping UI" },
      { Round: 3, Type: "System design", Description: "Live-tracking widget" },
      { Round: 4, Type: "Behavioral", Description: "Culture fit" }
    ],
    FrameworksOrTools: ["React", "Mapbox"],
    DSA: "Yes",
    SpecialFocusAreas: ["Real-time UI", "Performance"],
    Notes: ""
  },
  {
    Company: "BYJU'S",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://byjus.com/careers/1010-frontend",
    NoOfInterviewRounds: 4,
    RoundBreakdown: [
      { Round: 1, Type: "Phone screen", Description: "JS & educational domain" },
      { Round: 2, Type: "Coding interview", Description: "React + interactive quiz UI" },
      { Round: 3, Type: "System design", Description: "Lesson player design" },
      { Round: 4, Type: "Behavioral", Description: "Culture & values" }
    ],
    FrameworksOrTools: ["React", "Redux"],
    DSA: "Yes",
    SpecialFocusAreas: ["Interactive UI", "Accessibility"],
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
  {
    Company: "Freshworks",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://freshworks.com/careers/3030-frontend",
    NoOfInterviewRounds: 5,
    RoundBreakdown: [
      { Round: 1, Type: "Online assessment", Description: "JS & React basics" },
      { Round: 2, Type: "Technical phone", Description: "Coding + API integration" },
      { Round: 3, Type: "On-site coding", Description: "Feature build in React" },
      { Round: 4, Type: "System design", Description: "Widget architecture" },
      { Round: 5, Type: "Behavioral", Description: "Culture fit" }
    ],
    FrameworksOrTools: ["React", "TypeScript"],
    DSA: "Yes",
    SpecialFocusAreas: ["API design", "Performance"],
    Notes: ""
  },
  {
    Company: "TCS",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://tcs.com/careers/4040-frontend",
    NoOfInterviewRounds: 3,
    RoundBreakdown: [
      { Round: 1, Type: "Recruiter screen", Description: "Resume review" },
      { Round: 2, Type: "Technical interview", Description: "HTML/CSS/JS questions" },
      { Round: 3, Type: "Behavioral", Description: "Team fit" }
    ],
    FrameworksOrTools: ["Vanilla JS"],
    DSA: "No",
    SpecialFocusAreas: ["Basics"],
    Notes: ""
  },
  {
    Company: "Wipro",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://wipro.com/careers/5050-frontend",
    NoOfInterviewRounds: 3,
    RoundBreakdown: [
      { Round: 1, Type: "Online test", Description: "MCQs on web basics" },
      { Round: 2, Type: "Technical interview", Description: "JS/React coding" },
      { Round: 3, Type: "Behavioral", Description: "Culture fit" }
    ],
    FrameworksOrTools: ["React", "Vanilla JS"],
    DSA: "No",
    SpecialFocusAreas: ["Basics", "Teamwork"],
    Notes: ""
  },
  {
    Company: "Adobe",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://adobe.com/careers/job/6001-frontend-engineer",
    NoOfInterviewRounds: 4,
    RoundBreakdown: [
      { Round: 1, Type: "Recruiter screen", Description: "Phone screen covering portfolio and JavaScript basics" },
      { Round: 2, Type: "Technical phone interview", Description: "Live coding: HTML/CSS/JS widget build" },
      { Round: 3, Type: "On-site system design", Description: "Design a scalable UI for Creative Cloud feature" },
      { Round: 4, Type: "Behavioral", Description: "Adobe values and teamwork discussion" }
    ],
    FrameworksOrTools: ["React", "TypeScript", "Sass"],
    DSA: "Yes",
    SpecialFocusAreas: ["Canvas API", "Performance", "Accessibility"],
    Notes: "Emphasis on design-driven code and component reusability"
  },
  {
    Company: "PayPal",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://paypal.com/careers/job/6002-frontend-engineer",
    NoOfInterviewRounds: 4,
    RoundBreakdown: [
      { Round: 1, Type: "Phone screen", Description: "Resume discussion and JS fundamentals" },
      { Round: 2, Type: "Take-home assignment", Description: "Build a mini payment checkout UI" },
      { Round: 3, Type: "Technical interview", Description: "Review assignment, DSA problem, API integration" },
      { Round: 4, Type: "Behavioral", Description: "PayPal culture fit and collaboration" }
    ],
    FrameworksOrTools: ["React", "Redux", "GraphQL"],
    DSA: "Yes",
    SpecialFocusAreas: ["Security", "PCI compliance", "Form validation"],
    Notes: "Strong focus on secure coding and API error handling"
  },
  {
    Company: "Salesforce",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://salesforce.com/careers/job/6003-frontend-engineer",
    NoOfInterviewRounds: 5,
    RoundBreakdown: [
      { Round: 1, Type: "Online assessment", Description: "Lightning Web Components coding challenge" },
      { Round: 2, Type: "Phone technical screen", Description: "JavaScript and LWC questions" },
      { Round: 3, Type: "On-site coding", Description: "Build a dashboard widget" },
      { Round: 4, Type: "System design", Description: "Design multi-tenant UI architecture" },
      { Round: 5, Type: "Behavioral", Description: "Salesforce leadership principles" }
    ],
    FrameworksOrTools: ["LWC", "Apex", "Salesforce CLI"],
    DSA: "Yes",
    SpecialFocusAreas: ["Multi-tenancy", "Performance", "Security"],
    Notes: "Candidates should know Salesforce platform fundamentals"
  },
  {
    Company: "LinkedIn",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://linkedin.com/jobs/view/6004-frontend-engineer",
    NoOfInterviewRounds: 4,
    RoundBreakdown: [
      { Round: 1, Type: "Recruiter screen", Description: "Profile alignment and JS basics" },
      { Round: 2, Type: "Technical phone", Description: "DSA problem + React component task" },
      { Round: 3, Type: "On-site system design", Description: "Design feed ranking UI" },
      { Round: 4, Type: "Behavioral", Description: "LinkedIn culture and collaboration" }
    ],
    FrameworksOrTools: ["React", "TypeScript", "Redux"],
    DSA: "Yes",
    SpecialFocusAreas: ["Data visualization", "Scalability"],
    Notes: "Focus on state management and large data sets"
  },
  {
    Company: "Spotify",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://spotifyjobs.com/job/6005-frontend-engineer",
    NoOfInterviewRounds: 4,
    RoundBreakdown: [
      { Round: 1, Type: "Phone screening", Description: "JavaScript and React basics" },
      { Round: 2, Type: "Take-home project", Description: "Create a music player UI" },
      { Round: 3, Type: "Technical interview", Description: "Review project and DSA question" },
      { Round: 4, Type: "Behavioral", Description: "Spotify values and teamwork" }
    ],
    FrameworksOrTools: ["React", "Redux", "Styled Components"],
    DSA: "Yes",
    SpecialFocusAreas: ["Animations", "Audio APIs", "Performance"],
    Notes: "Emphasis on smooth UI/UX and animations"
  },
  {
    Company: "eBay",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://ebaycareers.com/job/6006-frontend-engineer",
    NoOfInterviewRounds: 4,
    RoundBreakdown: [
      { Round: 1, Type: "Recruiter screen", Description: "JS fundamentals and product fit" },
      { Round: 2, Type: "Technical phone", Description: "Live coding: search filter component" },
      { Round: 3, Type: "On-site system design", Description: "Design listing UI with pagination" },
      { Round: 4, Type: "Behavioral", Description: "eBay culture and values" }
    ],
    FrameworksOrTools: ["React", "GraphQL", "TypeScript"],
    DSA: "Yes",
    SpecialFocusAreas: ["Search UX", "Performance"],
    Notes: ""
  },
  {
    Company: "Dropbox",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://dropbox.com/jobs/6007-frontend-engineer",
    NoOfInterviewRounds: 4,
    RoundBreakdown: [
      { Round: 1, Type: "Phone screen", Description: "JavaScript fundamentals" },
      { Round: 2, Type: "Technical interview", Description: "Build file-browser UI widget" },
      { Round: 3, Type: "System design", Description: "Design sync status component" },
      { Round: 4, Type: "Behavioral", Description: "Dropbox values and teamwork" }
    ],
    FrameworksOrTools: ["React", "TypeScript", "MobX"],
    DSA: "Yes",
    SpecialFocusAreas: ["File APIs", "Offline support"],
    Notes: ""
  },
  {
    Company: "Slack",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://slack.com/careers/6008-frontend-engineer",
    NoOfInterviewRounds: 4,
    RoundBreakdown: [
      { Round: 1, Type: "Phone screen", Description: "JS and React basics" },
      { Round: 2, Type: "Technical phone", Description: "Build a message list component" },
      { Round: 3, Type: "On-site system design", Description: "Design WebSocket-driven chat UI" },
      { Round: 4, Type: "Behavioral", Description: "Slack culture and collaboration" }
    ],
    FrameworksOrTools: ["React", "Redux", "Electron"],
    DSA: "Yes",
    SpecialFocusAreas: ["Real-time updates", "Performance"],
    Notes: ""
  },
  {
    Company: "Zoom",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://zoom.us/careers/job/6009-frontend-engineer",
    NoOfInterviewRounds: 4,
    RoundBreakdown: [
      { Round: 1, Type: "Recruiter screen", Description: "Motivation and JS fundamentals" },
      { Round: 2, Type: "Technical interview", Description: "Build a video call UI mockup" },
      { Round: 3, Type: "System design", Description: "Design scalable video grid" },
      { Round: 4, Type: "Behavioral", Description: "Zoom values and teamwork" }
    ],
    FrameworksOrTools: ["React", "WebRTC"],
    DSA: "Yes",
    SpecialFocusAreas: ["Real-time video", "Performance"],
    Notes: ""
  },
  {
    Company: "Pinterest",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://pinterestcareers.com/job/6010-frontend-engineer",
    NoOfInterviewRounds: 4,
    RoundBreakdown: [
      { Round: 1, Type: "Phone screen", Description: "JS and CSS basics" },
      { Round: 2, Type: "Technical interview", Description: "Build a Masonry grid component" },
      { Round: 3, Type: "System design", Description: "Design pin feed UI" },
      { Round: 4, Type: "Behavioral", Description: "Pinterest culture" }
    ],
    FrameworksOrTools: ["React", "GraphQL"],
    DSA: "Yes",
    SpecialFocusAreas: ["Layout optimization", "Image lazy loading"],
    Notes: ""
  },
  {
    Company: "Infosys",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://infosys.com/careers/6011-frontend-engineer",
    NoOfInterviewRounds: 3,
    RoundBreakdown: [
      { Round: 1, Type: "Online test", Description: "MCQs on HTML/CSS/JS" },
      { Round: 2, Type: "Technical interview", Description: "Build a responsive UI component" },
      { Round: 3, Type: "Behavioral", Description: "Team fit and communication" }
    ],
    FrameworksOrTools: ["Vanilla JS", "jQuery"],
    DSA: "No",
    SpecialFocusAreas: ["Fundamentals"],
    Notes: ""
  },
  {
    Company: "Cognizant",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://cognizant.com/careers/job/6012-frontend-engineer",
    NoOfInterviewRounds: 3,
    RoundBreakdown: [
      { Round: 1, Type: "Online assessment", Description: "MCQs + coding challenge" },
      { Round: 2, Type: "Technical interview", Description: "JS and CSS problem-solving" },
      { Round: 3, Type: "Behavioral", Description: "Client collaboration scenarios" }
    ],
    FrameworksOrTools: ["React", "Angular"],
    DSA: "Yes (basic)",
    SpecialFocusAreas: ["Client-facing code", "Responsiveness"],
    Notes: ""
  },
  {
    Company: "HCL Technologies",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://hcltech.com/careers/job/6013-frontend-engineer",
    NoOfInterviewRounds: 3,
    RoundBreakdown: [
      { Round: 1, Type: "Phone screen", Description: "Resume and basic JS" },
      { Round: 2, Type: "Technical interview", Description: "HTML/CSS/JS component build" },
      { Round: 3, Type: "Behavioral", Description: "Teamwork and communication" }
    ],
    FrameworksOrTools: ["React", "Vanilla JS"],
    DSA: "No",
    SpecialFocusAreas: ["Basics"],
    Notes: ""
  },
  {
    Company: "Tech Mahindra",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://techmahindra.com/careers/6014-frontend-engineer",
    NoOfInterviewRounds: 3,
    RoundBreakdown: [
      { Round: 1, Type: "Online test", Description: "MCQs on web fundamentals" },
      { Round: 2, Type: "Technical interview", Description: "JS and React tasks" },
      { Round: 3, Type: "Behavioral", Description: "Client scenario discussions" }
    ],
    FrameworksOrTools: ["React", "Angular"],
    DSA: "No",
    SpecialFocusAreas: ["Basics", "Client focus"],
    Notes: ""
  },
  {
    Company: "Oracle",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://oracle.com/careers/job/6021-frontend-engineer",
    NoOfInterviewRounds: 4,
    RoundBreakdown: [
      { Round: 1, Type: "Recruiter Screen", Description: "Phone call covering resume and basic JavaScript" },
      { Round: 2, Type: "Technical Phone", Description: "Coding on JS/DOM and SQL UI integration" },
      { Round: 3, Type: "On-site Coding", Description: "Build a data-table component with sorting/filtering" },
      { Round: 4, Type: "Behavioral", Description: "Oracle leadership principles and teamwork" }
    ],
    FrameworksOrTools: ["JavaScript", "React", "Angular", "TypeScript"],
    DSA: "Yes",
    SpecialFocusAreas: ["Data-intensive UI", "Accessibility"],
    Notes: ""
  },
  {
    Company: "IBM",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://ibm.com/careers/job/6022-frontend-engineer",
    NoOfInterviewRounds: 3,
    RoundBreakdown: [
      { Round: 1, Type: "Online Assessment", Description: "MCQs on web fundamentals" },
      { Round: 2, Type: "Technical Interview", Description: "React component build + DSA question" },
      { Round: 3, Type: "Behavioral", Description: "IBM values and project discussion" }
    ],
    FrameworksOrTools: ["React", "Vue.js", "JavaScript"],
    DSA: "Yes",
    SpecialFocusAreas: ["Enterprise UI patterns", "Cross-browser"],
    Notes: ""
  },
  {
    Company: "Accenture",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://accenture.com/careers/job/6023-frontend-engineer",
    NoOfInterviewRounds: 3,
    RoundBreakdown: [
      { Round: 1, Type: "Recruiter Screen", Description: "Resume fit and basic JS/CSS" },
      { Round: 2, Type: "Technical Interview", Description: "Build a responsive UI in plain HTML/CSS/JS" },
      { Round: 3, Type: "Behavioral", Description: "Teamwork and client scenario" }
    ],
    FrameworksOrTools: ["Vanilla JS", "Bootstrap", "React"],
    DSA: "No",
    SpecialFocusAreas: ["Responsive layout", "Client communication"],
    Notes: ""
  },
  {
    Company: "Deloitte",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://deloitte.com/careers/job/6024-frontend-developer",
    NoOfInterviewRounds: 4,
    RoundBreakdown: [
      { Round: 1, Type: "Online Assessment", Description: "MCQs and coding challenge" },
      { Round: 2, Type: "Technical Phone", Description: "JS + React coding" },
      { Round: 3, Type: "On-site System Design", Description: "Design analytics dashboard UI" },
      { Round: 4, Type: "Behavioral", Description: "Deloitte leadership questions" }
    ],
    FrameworksOrTools: ["React", "Angular", "D3.js"],
    DSA: "Yes",
    SpecialFocusAreas: ["Data visualization", "Performance"],
    Notes: ""
  },
  {
    Company: "Capgemini",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://capgemini.com/careers/job/6025-frontend-engineer",
    NoOfInterviewRounds: 3,
    RoundBreakdown: [
      { Round: 1, Type: "Screening Test", Description: "HTML/CSS/JS MCQs" },
      { Round: 2, Type: "Technical Interview", Description: "Build a React component and solve DSA" },
      { Round: 3, Type: "Behavioral", Description: "Team collaboration and values" }
    ],
    FrameworksOrTools: ["React", "Vue.js"],
    DSA: "Yes",
    SpecialFocusAreas: ["Responsive design", "Cross-browser"],
    Notes: ""
  },
  {
    Company: "Mindtree",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://mindtree.com/careers/job/6026-frontend-developer",
    NoOfInterviewRounds: 3,
    RoundBreakdown: [
      { Round: 1, Type: "Recruiter Screen", Description: "Profile fit and JS basics" },
      { Round: 2, Type: "Technical Interview", Description: "UI build in React + DSA" },
      { Round: 3, Type: "Behavioral", Description: "Mindtree values" }
    ],
    FrameworksOrTools: ["React", "Angular"],
    DSA: "Yes",
    SpecialFocusAreas: ["Component reuse", "Modular CSS"],
    Notes: ""
  },
  {
    Company: "Mphasis",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://mphasis.com/careers/job/6027-frontend-developer",
    NoOfInterviewRounds: 3,
    RoundBreakdown: [
      { Round: 1, Type: "Online Test", Description: "MCQs on HTML/CSS/JS" },
      { Round: 2, Type: "Technical Interview", Description: "Build UI widget + basic algorithm" },
      { Round: 3, Type: "Behavioral", Description: "Team dynamics" }
    ],
    FrameworksOrTools: ["Vue.js", "JavaScript"],
    DSA: "Yes (basic)",
    SpecialFocusAreas: ["Lightweight UI", "Performance"],
    Notes: ""
  },
  {
    Company: "Virtusa",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://virtusa.com/careers/job/6028-frontend-developer",
    NoOfInterviewRounds: 3,
    RoundBreakdown: [
      { Round: 1, Type: "Recruiter Screen", Description: "Resume discussion" },
      { Round: 2, Type: "Technical Interview", Description: "JS widget build + simple DSA" },
      { Round: 3, Type: "Behavioral", Description: "Client scenario fit" }
    ],
    FrameworksOrTools: ["React", "jQuery"],
    DSA: "Yes (basic)",
    SpecialFocusAreas: ["Legacy support", "Performance"],
    Notes: ""
  },
  {
    Company: "LTI (Larsen & Toubro Infotech)",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://lntinfotech.com/careers/job/6029-frontend-developer",
    NoOfInterviewRounds: 3,
    RoundBreakdown: [
      { Round: 1, Type: "Online Assessment", Description: "MCQs on HTML/CSS/JS" },
      { Round: 2, Type: "Technical Interview", Description: "Responsive UI build + DSA" },
      { Round: 3, Type: "Behavioral", Description: "Team fit" }
    ],
    FrameworksOrTools: ["React", "Angular"],
    DSA: "Yes",
    SpecialFocusAreas: ["Responsive UI", "Modular design"],
    Notes: ""
  },
  {
    Company: "Mindvalley",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://mindvalley.com/careers/job/6030-frontend-developer",
    NoOfInterviewRounds: 4,
    RoundBreakdown: [
      { Round: 1, Type: "Portfolio Review", Description: "Evaluate previous projects" },
      { Round: 2, Type: "Technical Interview", Description: "JS/React coding" },
      { Round: 3, Type: "System Design", Description: "Design learning portal UI" },
      { Round: 4, Type: "Behavioral", Description: "Mindvalley culture" }
    ],
    FrameworksOrTools: ["React", "TypeScript"],
    DSA: "Yes",
    SpecialFocusAreas: ["Interactive UI", "Animations"],
    Notes: ""
  },
  {
    Company: "Razorpay",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://razorpay.com/careers/job/6031-frontend-developer",
    NoOfInterviewRounds: 4,
    RoundBreakdown: [
      { Round: 1, Type: "Online Assessment", Description: "MCQs + small UI build" },
      { Round: 2, Type: "Technical Interview", Description: "React + payment form coding" },
      { Round: 3, Type: "System design", Description: "Design checkout flow UI" },
      { Round: 4, Type: "Behavioral", Description: "Razorpay values" }
    ],
    FrameworksOrTools: ["React", "Redux", "TypeScript"],
    DSA: "Yes",
    SpecialFocusAreas: ["Security", "Form validation"],
    Notes: ""
  },
  {
    Company: "Delhivery",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://delhivery.com/careers/job/6032-frontend-engineer",
    NoOfInterviewRounds: 3,
    RoundBreakdown: [
      { Round: 1, Type: "Recruiter Screen", Description: "Profile fit" },
      { Round: 2, Type: "Technical Interview", Description: "JS/React build" },
      { Round: 3, Type: "Behavioral", Description: "Team collaboration" }
    ],
    FrameworksOrTools: ["React", "Vue.js"],
    DSA: "Yes (basic)",
    SpecialFocusAreas: ["Logistics UI", "Performance"],
    Notes: ""
  },
  {
    Company: "Swiggy Genie",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://careers.swiggy.com/job/6033-genie-frontend-developer",
    NoOfInterviewRounds: 3,
    RoundBreakdown: [
      { Round: 1, Type: "Online Assessment", Description: "HackerRank React task" },
      { Round: 2, Type: "Technical interview", Description: "JS fundamentals" },
      { Round: 3, Type: "Behavioral", Description: "Genie team fit" }
    ],
    FrameworksOrTools: ["React", "TypeScript"],
    DSA: "Yes (basic)",
    SpecialFocusAreas: ["Performance", "Responsive UI"],
    Notes: ""
  },
  {
    Company: "Dream11",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://dream11.com/careers/job/6034-frontend-engineer",
    NoOfInterviewRounds: 4,
    RoundBreakdown: [
      { Round: 1, Type: "Recruiter Screen", Description: "JS fundamentals" },
      { Round: 2, Type: "Technical Interview", Description: "React component build + DSA" },
      { Round: 3, Type: "System Design", Description: "Design fantasy match scoreboard UI" },
      { Round: 4, Type: "Behavioral", Description: "Team fit" }
    ],
    FrameworksOrTools: ["React", "Redux"],
    DSA: "Yes",
    SpecialFocusAreas: ["Real-time UI", "Performance"],
    Notes: ""
  },
  {
    Company: "CRED",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://cred.club/careers/job/6035-frontend-engineer",
    NoOfInterviewRounds: 4,
    RoundBreakdown: [
      { Round: 1, Type: "Online Assessment", Description: "JS + UI build task" },
      { Round: 2, Type: "Technical Interview", Description: "React + design patterns" },
      { Round: 3, Type: "System Design", Description: "Design rewards dashboard UI" },
      { Round: 4, Type: "Behavioral", Description: "CRED culture and impact" }
    ],
    FrameworksOrTools: ["React", "Next.js"],
    DSA: "Yes",
    SpecialFocusAreas: ["Animations", "Performance"],
    Notes: ""
  },
  {
    Company: "Meesho",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://meesho.com/careers/job/6036-frontend-engineer",
    NoOfInterviewRounds: 3,
    RoundBreakdown: [
      { Round: 1, Type: "Recruiter Screen", Description: "JS and profiling" },
      { Round: 2, Type: "Technical Interview", Description: "React + e-commerce UI" },
      { Round: 3, Type: "Behavioral", Description: "Meesho values" }
    ],
    FrameworksOrTools: ["React", "Redux"],
    DSA: "Yes (basic)",
    SpecialFocusAreas: ["E-commerce UX", "Performance"],
    Notes: ""
  },
  {
    Company: "Myntra",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://www.myntra.com/careers/job/6037-frontend-engineer",
    NoOfInterviewRounds: 4,
    RoundBreakdown: [
      { Round: 1, Type: "Recruiter Screen", Description: "Profile fit and JavaScript fundamentals" },
      { Round: 2, Type: "Technical Interview", Description: "React component build + CSS challenge" },
      { Round: 3, Type: "System Design", Description: "Design product recommendation carousel" },
      { Round: 4, Type: "Behavioral", Description: "Myntra values and teamwork" }
    ],
    FrameworksOrTools: ["React", "Redux", "Styled-Components"],
    DSA: "Yes (basic)",
    SpecialFocusAreas: ["Animations", "Performance"],
    Notes: ""
  },
  {
    Company: "Pharmeasy",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://pharmeasy.com/careers/job/6038-frontend-engineer",
    NoOfInterviewRounds: 3,
    RoundBreakdown: [
      { Round: 1, Type: "Online Assessment", Description: "MCQs on HTML/CSS/JS" },
      { Round: 2, Type: "Technical Interview", Description: "Build a medicine search UI in React" },
      { Round: 3, Type: "Behavioral", Description: "Healthcare domain and teamwork" }
    ],
    FrameworksOrTools: ["React", "TypeScript"],
    DSA: "No",
    SpecialFocusAreas: ["Form validation", "Performance"],
    Notes: ""
  },
  {
    Company: "PolicyBazaar",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://policybazaar.com/careers/job/6039-frontend-engineer",
    NoOfInterviewRounds: 4,
    RoundBreakdown: [
      { Round: 1, Type: "Recruiter Screen", Description: "JS fundamentals and domain interest" },
      { Round: 2, Type: "Technical Interview", Description: "Responsive UI build + DSA" },
      { Round: 3, Type: "System Design", Description: "Design policy comparison table" },
      { Round: 4, Type: "Behavioral", Description: "Culture fit and values" }
    ],
    FrameworksOrTools: ["React", "Redux"],
    DSA: "Yes",
    SpecialFocusAreas: ["Data tables", "Accessibility"],
    Notes: ""
  },
  {
    Company: "Urban Company",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://urbancompany.com/careers/job/6040-frontend-engineer",
    NoOfInterviewRounds: 3,
    RoundBreakdown: [
      { Round: 1, Type: "Online Assessment", Description: "MCQs on web fundamentals" },
      { Round: 2, Type: "Technical Interview", Description: "Build booking widget in React" },
      { Round: 3, Type: "Behavioral", Description: "Customer-centric scenarios" }
    ],
    FrameworksOrTools: ["React", "TypeScript"],
    DSA: "No",
    SpecialFocusAreas: ["UX", "Performance"],
    Notes: ""
  },
  {
    Company: "MakeMyTrip",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://makemytrip.com/careers/job/6041-frontend-engineer",
    NoOfInterviewRounds: 4,
    RoundBreakdown: [
      { Round: 1, Type: "Recruiter Screen", Description: "Resume and JS basics" },
      { Round: 2, Type: "Technical Interview", Description: "Build flight search UI" },
      { Round: 3, Type: "System Design", Description: "Design multi-step booking flow" },
      { Round: 4, Type: "Behavioral", Description: "Team collaboration scenarios" }
    ],
    FrameworksOrTools: ["React", "Redux"],
    DSA: "Yes (basic)",
    SpecialFocusAreas: ["Form UX", "Performance"],
    Notes: ""
  },
  {
    Company: "Nykaa",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://nykaa.com/careers/job/6042-frontend-engineer",
    NoOfInterviewRounds: 3,
    RoundBreakdown: [
      { Round: 1, Type: "Online Assessment", Description: "MCQs + small UI build" },
      { Round: 2, Type: "Technical Interview", Description: "React component + styling" },
      { Round: 3, Type: "Behavioral", Description: "Brand alignment and values" }
    ],
    FrameworksOrTools: ["React", "SCSS"],
    DSA: "No",
    SpecialFocusAreas: ["Design-driven code", "Responsive UI"],
    Notes: ""
  },
  {
    Company: "Cleartrip",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://cleartrip.com/careers/job/6043-frontend-engineer",
    NoOfInterviewRounds: 4,
    RoundBreakdown: [
      { Round: 1, Type: "Recruiter Screen", Description: "Profile fit and JS basics" },
      { Round: 2, Type: "Technical Interview", Description: "Build itinerary planner component" },
      { Round: 3, Type: "System Design", Description: "Design travel search optimization" },
      { Round: 4, Type: "Behavioral", Description: "Culture and teamwork" }
    ],
    FrameworksOrTools: ["React", "TypeScript"],
    DSA: "Yes",
    SpecialFocusAreas: ["Performance", "Caching"],
    Notes: ""
  },
  {
    Company: "OYO",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://oyorooms.com/careers/job/6044-frontend-engineer",
    NoOfInterviewRounds: 3,
    RoundBreakdown: [
      { Round: 1, Type: "Online Test", Description: "MCQs on HTML/CSS/JS" },
      { Round: 2, Type: "Technical Interview", Description: "Build hotel listing UI" },
      { Round: 3, Type: "Behavioral", Description: "Customer-centric teamwork" }
    ],
    FrameworksOrTools: ["React", "Redux"],
    DSA: "No",
    SpecialFocusAreas: ["Mapping APIs", "Performance"],
    Notes: ""
  },
  {
    Company: "Grofers (Blinkit)",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://grofers.com/careers/job/6045-frontend-engineer",
    NoOfInterviewRounds: 3,
    RoundBreakdown: [
      { Round: 1, Type: "Recruiter Screen", Description: "Resume and basics" },
      { Round: 2, Type: "Technical Interview", Description: "Build grocery listing component" },
      { Round: 3, Type: "Behavioral", Description: "Fast-paced environment fit" }
    ],
    FrameworksOrTools: ["React", "TypeScript"],
    DSA: "No",
    SpecialFocusAreas: ["Performance", "Responsive UI"],
    Notes: ""
  },
  {
    Company: "BigBasket",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://bigbasket.com/careers/job/6046-frontend-engineer",
    NoOfInterviewRounds: 3,
    RoundBreakdown: [
      { Round: 1, Type: "Online Assessment", Description: "MCQs on JS/CSS" },
      { Round: 2, Type: "Technical Interview", Description: "Build catalog filter UI" },
      { Round: 3, Type: "Behavioral", Description: "Team collaboration" }
    ],
    FrameworksOrTools: ["React", "Redux"],
    DSA: "No",
    SpecialFocusAreas: ["Filtering Logic", "Performance"],
    Notes: ""
  },
  {
    Company: "Swiggy Instamart",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://careers.swiggy.com/job/6047-insta-frontend-engineer",
    NoOfInterviewRounds: 3,
    RoundBreakdown: [
      { Round: 1, Type: "Online Test", Description: "React task on Instamart home page" },
      { Round: 2, Type: "Technical Interview", Description: "React component optimizations" },
      { Round: 3, Type: "Behavioral", Description: "Team collaboration" }
    ],
    FrameworksOrTools: ["React", "TypeScript"],
    DSA: "No",
    SpecialFocusAreas: ["Performance", "Responsive UI"],
    Notes: ""
  },
  {
    Company: "Cure.fit",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://cure.fit/careers/job/6048-frontend-engineer",
    NoOfInterviewRounds: 3,
    RoundBreakdown: [
      { Round: 1, Type: "Recruiter Screen", Description: "JS basics and domain interest" },
      { Round: 2, Type: "Technical Interview", Description: "Build workout schedule UI" },
      { Round: 3, Type: "Behavioral", Description: "Health-focused teamwork" }
    ],
    FrameworksOrTools: ["React", "Sass"],
    DSA: "No",
    SpecialFocusAreas: ["Animations", "Responsive UI"],
    Notes: ""
  },
  {
    Company: "Lenskart",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://lenskart.com/careers/job/6049-frontend-engineer",
    NoOfInterviewRounds: 3,
    RoundBreakdown: [
      { Round: 1, Type: "Online Assessment", Description: "MCQs on HTML/CSS/JS" },
      { Round: 2, Type: "Technical Interview", Description: "Build try-on glasses UI" },
      { Round: 3, Type: "Behavioral", Description: "Customer experience fit" }
    ],
    FrameworksOrTools: ["React", "Three.js"],
    DSA: "No",
    SpecialFocusAreas: ["3D UI", "Performance"],
    Notes: ""
  },
  {
    Company: "PolicyBazaar Health",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://policybazaar.com/careers/job/6050-health-frontend-engineer",
    NoOfInterviewRounds: 3,
    RoundBreakdown: [
      { Round: 1, Type: "Online Test", Description: "MCQs on JS/CSS" },
      { Round: 2, Type: "Technical Interview", Description: "Build health checkup UI" },
      { Round: 3, Type: "Behavioral", Description: "Healthcare domain teamwork" }
    ],
    FrameworksOrTools: ["React", "Material-UI"],
    DSA: "No",
    SpecialFocusAreas: ["Form UX", "Accessibility"],
    Notes: ""
  },
  {
    Company: "Trello",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://trello.com/careers/job/6051-frontend-engineer",
    NoOfInterviewRounds: 4,
    RoundBreakdown: [
      { Round: 1, Type: "Phone screen", Description: "JS fundamentals and Trello product fit" },
      { Round: 2, Type: "Technical interview", Description: "Build a Kanban board UI component" },
      { Round: 3, Type: "System design", Description: "Design card move and persistence flow" },
      { Round: 4, Type: "Behavioral", Description: "Team collaboration and values" }
    ],
    FrameworksOrTools: ["React", "Redux"],
    DSA: "Yes",
    SpecialFocusAreas: ["Drag-and-drop", "Performance"],
    Notes: ""
  },
  {
    Company: "GitHub",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://github.com/about/careers/6052-frontend-engineer",
    NoOfInterviewRounds: 4,
    RoundBreakdown: [
      { Round: 1, Type: "Recruiter Screen", Description: "Resume fit and JavaScript basics" },
      { Round: 2, Type: "Technical interview", Description: "Build repository file explorer UI" },
      { Round: 3, Type: "System design", Description: "Design diff viewer component" },
      { Round: 4, Type: "Behavioral", Description: "Open source collaboration scenarios" }
    ],
    FrameworksOrTools: ["React", "GraphQL"],
    DSA: "Yes",
    SpecialFocusAreas: ["Performance", "Accessibility"],
    Notes: ""
  },
  {
    Company: "Bitbucket",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://bitbucket.org/careers/6053-frontend-engineer",
    NoOfInterviewRounds: 4,
    RoundBreakdown: [
      { Round: 1, Type: "Phone screen", Description: "JS fundamentals and Git workflows" },
      { Round: 2, Type: "Technical interview", Description: "Build branch compare UI" },
      { Round: 3, Type: "System design", Description: "Design pull request review flow" },  
      { Round: 4, Type: "Behavioral", Description: "Team collaboration and code review culture" }
    ],
    FrameworksOrTools: ["React", "TypeScript"],
    DSA: "Yes",
    SpecialFocusAreas: ["Performance", "UX"],
    Notes: ""
  },
  {
    Company: "Stripe",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://stripe.com/careers/job/6054-frontend-engineer",
    NoOfInterviewRounds: 4,
    RoundBreakdown: [
      { Round: 1, Type: "Recruiter Screen", Description: "JS fundamentals and Stripe product fit" },
      { Round: 2, Type: "Technical interview", Description: "Build payment form UI with validation" },
      { Round: 3, Type: "System design", Description: "Design modular UI components for checkout" },
      { Round: 4, Type: "Behavioral", Description: "Team ethics and values" }
    ],
    FrameworksOrTools: ["React", "TypeScript"],
    DSA: "Yes",
    SpecialFocusAreas: ["Security", "Form validation"],
    Notes: ""
  },
  {
    Company: "Mailchimp",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://mailchimp.com/about/careers/6055-frontend-engineer",
    NoOfInterviewRounds: 4,
    RoundBreakdown: [
      { Round: 1, Type: "Phone screen", Description: "JS/React fundamentals" },
      { Round: 2, Type: "Technical interview", Description: "Build email template editor UI" },
      { Round: 3, Type: "System design", Description: "Design drag-and-drop module" },
      { Round: 4, Type: "Behavioral", Description: "Creativity and teamwork" }
    ],
    FrameworksOrTools: ["React", "Redux"],
    DSA: "Yes",
    SpecialFocusAreas: ["Canvas API", "Performance"],
    Notes: ""
  },
  {
    Company: "Canva",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://canva.com/careers/6056-frontend-engineer",
    NoOfInterviewRounds: 4,
    RoundBreakdown: [
      { Round: 1, Type: "Recruiter Screen", Description: "Portfolio review and JS basics" },
      { Round: 2, Type: "Technical interview", Description: "Build design editor UI component" },
      { Round: 3, Type: "System design", Description: "Design real-time collaboration feature" },
      { Round: 4, Type: "Behavioral", Description: "Canva values and teamwork" }
    ],
    FrameworksOrTools: ["React", "TypeScript"],
    DSA: "Yes",
    SpecialFocusAreas: ["Real-time updates", "Performance"],
    Notes: ""
  },
  {
    Company: "Dropbox Paper",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://dropbox.com/jobs/6057-paper-frontend-engineer",
    NoOfInterviewRounds: 4,
    RoundBreakdown: [
      { Round: 1, Type: "Phone screen", Description: "JS fundamentals" },
      { Round: 2, Type: "Technical interview", Description: "Build collaborative editor UI" },
      { Round: 3, Type: "System design", Description: "Document editing architecture" },
      { Round: 4, Type: "Behavioral", Description: "Team dynamics and creativity" }
    ],
    FrameworksOrTools: ["React", "ProseMirror"],
    DSA: "Yes",
    SpecialFocusAreas: ["Real-time sync", "Performance"],
    Notes: ""
  },
  {
    Company: "Asana",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://asana.com/jobs/6058-frontend-engineer",
    NoOfInterviewRounds: 4,
    RoundBreakdown: [
      { Round: 1, Type: "Recruiter Screen", Description: "JS fundamentals and Asana fit" },
      { Round: 2, Type: "Technical interview", Description: "Build task list UI with drag-and-drop" },
      { Round: 3, Type: "System design", Description: "Design notification system UI" },
      { Round: 4, Type: "Behavioral", Description: "Team collaboration" }
    ],
    FrameworksOrTools: ["React", "Redux"],
    DSA: "Yes",
    SpecialFocusAreas: ["Drag-and-drop", "Performance"],
    Notes: ""
  },
  {
    Company: "DigitalOcean",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://digitalocean.com/careers/6059-frontend-engineer",
    NoOfInterviewRounds: 4,
    RoundBreakdown: [
      { Round: 1, Type: "Phone screen", Description: "JS fundamentals and cloud basics" },
      { Round: 2, Type: "Technical interview", Description: "Build droplets management UI" },
      { Round: 3, Type: "System design", Description: "Design scalable dashboard UI" },
      { Round: 4, Type: "Behavioral", Description: "Open source and teamwork" }
    ],
    FrameworksOrTools: ["React", "TypeScript"],
    DSA: "Yes",
    SpecialFocusAreas: ["Performance", "Real-time updates"],
    Notes: ""
  },
  {
    Company: "Heroku",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://heroku.com/careers/6060-frontend-engineer",
    NoOfInterviewRounds: 4,
    RoundBreakdown: [
      { Round: 1, Type: "Recruiter Screen", Description: "JS basics and cloud interest" },
      { Round: 2, Type: "Technical interview", Description: "Build deployment status UI" },
      { Round: 3, Type: "System design", Description: "Design build log viewer" },
      { Round: 4, Type: "Behavioral", Description: "Team collaboration" }
    ],
    FrameworksOrTools: ["React", "Redux"],
    DSA: "Yes",
    SpecialFocusAreas: ["Real-time logs", "Performance"],
    Notes: ""
  },
  {
    Company: "MongoDB",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://mongodb.com/careers/6061-frontend-engineer",
    NoOfInterviewRounds: 4,
    RoundBreakdown: [
      { Round: 1, Type: "Phone screen", Description: "JS fundamentals and database basics" },
      { Round: 2, Type: "Technical interview", Description: "Build data explorer UI" },
      { Round: 3, Type: "System design", Description: "Design query builder interface" },
      { Round: 4, Type: "Behavioral", Description: "Teamwork and values" }
    ],
    FrameworksOrTools: ["React", "TypeScript"],
    DSA: "Yes",
    SpecialFocusAreas: ["Data visualization", "Performance"],
    Notes: ""
  },
  {
    Company: "Elastic",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://elastic.co/careers/6062-frontend-engineer",
    NoOfInterviewRounds: 4,
    RoundBreakdown: [
      { Round: 1, Type: "Recruiter Screen", Description: "JS fundamentals and search domain interest" },
      { Round: 2, Type: "Technical interview", Description: "Build search UI with filters" },
      { Round: 3, Type: "System design", Description: "Design real-time search indexing UI" },
      { Round: 4, Type: "Behavioral", Description: "Team collaboration" }
    ],
    FrameworksOrTools: ["React", "Redux"],
    DSA: "Yes",
    SpecialFocusAreas: ["Search UX", "Performance"],
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
    Company: "Notion",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://notion.so/careers/6064-frontend-engineer",
    NoOfInterviewRounds: 4,
    RoundBreakdown: [
      { Round: 1, Type: "Recruiter Screen", Description: "JS fundamentals and product fit" },
      { Round: 2, Type: "Technical interview", Description: "Build markdown editor UI" },
      { Round: 3, Type: "System design", Description: "Design page rendering pipeline" },
      { Round: 4, Type: "Behavioral", Description: "Team collaboration and values" }
    ],
    FrameworksOrTools: ["React", "TypeScript"],
    DSA: "Yes",
    SpecialFocusAreas: ["Performance", "Real-time sync"],
    Notes: ""
  },
  {
    Company: "Calendly",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://calendly.com/careers/6065-frontend-engineer",
    NoOfInterviewRounds: 4,
    RoundBreakdown: [
      { Round: 1, Type: "Phone screen", Description: "JS fundamentals and scheduling interest" },
      { Round: 2, Type: "Technical interview", Description: "Build calendar picker component" },
      { Round: 3, Type: "System design", Description: "Design availability grid UI" },
      { Round: 4, Type: "Behavioral", Description: "Team collaboration" }
    ],
    FrameworksOrTools: ["React", "TypeScript"],
    DSA: "Yes",
    SpecialFocusAreas: ["Performance", "Accessibility"],
    Notes: ""
  },
  {
    Company: "Twilio",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://twilio.com/careers/6066-frontend-engineer",
    NoOfInterviewRounds: 4,
    RoundBreakdown: [
      { Round: 1, Type: "Recruiter Screen", Description: "JS fundamentals and Twilio API interest" },
      { Round: 2, Type: "Technical interview", Description: "Build messaging widget UI" },
      { Round: 3, Type: "System design", Description: "Design real-time messaging UI" },
      { Round: 4, Type: "Behavioral", Description: "Team collaboration" }
    ],
    FrameworksOrTools: ["React", "Redux"],
    DSA: "Yes",
    SpecialFocusAreas: ["WebSockets", "Performance"],
    Notes: ""
  },
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
    Company: "Arc.dev",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://arc.dev/careers/frontend-engineer-remote",
    NoOfInterviewRounds: 3,
    RoundBreakdown: [
      { Round: 1, Type: "Portfolio review", Description: "Assessment of previous remote work and projects" },
      { Round: 2, Type: "Technical interview", Description: "Build developer marketplace component" },
      { Round: 3, Type: "Behavioral", Description: "Remote freelancer platform fit" }
    ],
    FrameworksOrTools: ["React", "GraphQL", "TypeScript"],
    DSA: "No",
    SpecialFocusAreas: ["Marketplace UI", "Performance"],
    Notes: "Focus on freelancer-client interaction components"
  },
  {
    Company: "Turing",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://turing.com/careers/remote-frontend-engineer",
    NoOfInterviewRounds: 3,
    RoundBreakdown: [
      { Round: 1, Type: "Remote work assessment", Description: "Evaluation of remote development experience" },
      { Round: 2, Type: "Technical coding", Description: "React component build with API integration" },
      { Round: 3, Type: "Behavioral", Description: "Remote team collaboration scenarios" }
    ],
    FrameworksOrTools: ["React", "Node.js", "TypeScript"],
    DSA: "No",
    SpecialFocusAreas: ["Remote collaboration tools", "Performance"],
    Notes: "Heavy emphasis on remote work capabilities"
  },
  {
    Company: "Remote.com",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://remote.com/careers/frontend-engineer",
    NoOfInterviewRounds: 3,
    RoundBreakdown: [
      { Round: 1, Type: "Technical screen", Description: "JS fundamentals and API design" },
      { Round: 2, Type: "Coding test", Description: "Build remote dashboard UI" },
      { Round: 3, Type: "Behavioral", Description: "Remote culture fit" }
    ],
    FrameworksOrTools: ["React", "TypeScript"],
    DSA: "No",
    SpecialFocusAreas: ["Remote collaboration", "Performance"],
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
    Company: "X-Team",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://x-team.com/careers/frontend-developer",
    NoOfInterviewRounds: 3,
    RoundBreakdown: [
      { Round: 1, Type: "Application review", Description: "Portfolio and remote experience assessment" },
      { Round: 2, Type: "Technical challenge", Description: "Timed coding challenge in React" },
      { Round: 3, Type: "Culture interview", Description: "Team fit and nomadic lifestyle alignment" }
    ],
    FrameworksOrTools: ["React", "Vue.js", "Angular"],
    DSA: "No",
    SpecialFocusAreas: ["Cross-timezone collaboration", "Self-management"],
    Notes: ""
  },
  {
    Company: "Crossover",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://crossover.com/careers/frontend-engineer",
    NoOfInterviewRounds: 4,
    RoundBreakdown: [
      { Round: 1, Type: "Cognitive assessment", Description: "Problem-solving and logical reasoning" },
      { Round: 2, Type: "Technical skills test", Description: "React and JavaScript proficiency" },
      { Round: 3, Type: "Live coding", Description: "Real-time component building" },
      { Round: 4, Type: "Behavioral", Description: "Remote work discipline assessment" }
    ],
    FrameworksOrTools: ["React", "TypeScript"],
    DSA: "Yes",
    SpecialFocusAreas: ["Productivity tracking", "Self-management"],
    Notes: ""
  },
  {
    Company: "10up",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://10up.com/careers/frontend-engineer",
    NoOfInterviewRounds: 3,
    RoundBreakdown: [
      { Round: 1, Type: "Portfolio review", Description: "WordPress and React project assessment" },
      { Round: 2, Type: "Technical interview", Description: "WordPress theme development with React" },
      { Round: 3, Type: "Behavioral", Description: "Client-focused remote work scenarios" }
    ],
    FrameworksOrTools: ["React", "WordPress", "PHP"],
    DSA: "No",
    SpecialFocusAreas: ["WordPress ecosystem", "Client communication"],
    Notes: ""
  },
  {
    Company: "Webflow",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://webflow.com/careers/frontend-engineer-remote",
    NoOfInterviewRounds: 4,
    RoundBreakdown: [
      { Round: 1, Type: "Recruiter screen", Description: "Design tool interest and JS basics" },
      { Round: 2, Type: "Technical interview", Description: "Build visual editor component" },
      { Round: 3, Type: "System design", Description: "Design drag-and-drop UI architecture" },
      { Round: 4, Type: "Behavioral", Description: "No-code movement alignment" }
    ],
    FrameworksOrTools: ["React", "TypeScript", "Canvas API"],
    DSA: "No",
    SpecialFocusAreas: ["Visual editors", "Drag-and-drop"],
    Notes: ""
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
    Company: "ConvertKit",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://convertkit.com/careers/frontend-engineer",
    NoOfInterviewRounds: 3,
    RoundBreakdown: [
      { Round: 1, Type: "Application review", Description: "Remote work portfolio assessment" },
      { Round: 2, Type: "Technical interview", Description: "Build email marketing UI component" },
      { Round: 3, Type: "Behavioral", Description: "Creator economy understanding" }
    ],
    FrameworksOrTools: ["React", "Redux", "TypeScript"],
    DSA: "No",
    SpecialFocusAreas: ["Email UI", "Creator tools"],
    Notes: ""
  },
  {
    Company: "Help Scout",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://helpscout.com/careers/frontend-engineer",
    NoOfInterviewRounds: 3,
    RoundBreakdown: [
      { Round: 1, Type: "Phone screen", Description: "Customer support tool knowledge" },
      { Round: 2, Type: "Technical interview", Description: "Build helpdesk widget UI" },
      { Round: 3, Type: "Behavioral", Description: "Customer-first mindset" }
    ],
    FrameworksOrTools: ["React", "TypeScript"],
    DSA: "No",
    SpecialFocusAreas: ["Customer support UI", "Accessibility"],
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
    Company: "Doist (Todoist)",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://doist.com/careers/frontend-engineer",
    NoOfInterviewRounds: 3,
    RoundBreakdown: [
      { Round: 1, Type: "Application review", Description: "Productivity app portfolio assessment" },
      { Round: 2, Type: "Technical interview", Description: "Build task management component" },
      { Round: 3, Type: "Behavioral", Description: "Productivity and remote work alignment" }
    ],
    FrameworksOrTools: ["React", "Redux", "TypeScript"],
    DSA: "No",
    SpecialFocusAreas: ["Productivity UI", "Offline support"],
    Notes: ""
  },
  {
    Company: "Typeform",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://typeform.com/careers/frontend-engineer-remote",
    NoOfInterviewRounds: 3,
    RoundBreakdown: [
      { Round: 1, Type: "Portfolio review", Description: "Form building and design assessment" },
      { Round: 2, Type: "Technical interview", Description: "Build interactive form component" },
      { Round: 3, Type: "Behavioral", Description: "Design-driven development approach" }
    ],
    FrameworksOrTools: ["React", "CSS-in-JS", "Animation libraries"],
    DSA: "No",
    SpecialFocusAreas: ["Interactive forms", "Animations"],
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
  },
  {
    Company: "Replicate",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://replicate.com/careers/frontend-engineer-remote",
    NoOfInterviewRounds: 3,
    RoundBreakdown: [
      { Round: 1, Type: "Technical screen", Description: "AI/ML platform knowledge and React" },
      { Round: 2, Type: "Live coding", Description: "Build ML model interface component" },
      { Round: 3, Type: "Behavioral", Description: "AI democratization alignment" }
    ],
    FrameworksOrTools: ["React", "Python integration", "ML APIs"],
    DSA: "No",
    SpecialFocusAreas: ["AI/ML interfaces", "API integration"],
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
    Company: "CodeSandbox",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://codesandbox.io/careers/frontend-engineer-remote",
    NoOfInterviewRounds: 3,
    RoundBreakdown: [
      { Round: 1, Type: "Portfolio review", Description: "Online development tool experience" },
      { Round: 2, Type: "Technical interview", Description: "Build sandbox editor component" },
      { Round: 3, Type: "Behavioral", Description: "Developer community focus" }
    ],
    FrameworksOrTools: ["React", "Monaco Editor", "Webpack"],
    DSA: "No",
    SpecialFocusAreas: ["Online IDE", "Code execution"],
    Notes: ""
  },
  {
    Company: "Luma",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://lu.ma/careers/frontend-engineer-remote",
    NoOfInterviewRounds: 3,
    RoundBreakdown: [
      { Round: 1, Type: "Technical screen", Description: "Event management and React knowledge" },
      { Round: 2, Type: "Live coding", Description: "Build event listing component" },
      { Round: 3, Type: "Behavioral", Description: "Community building mindset" }
    ],
    FrameworksOrTools: ["React", "Next.js", "Calendar APIs"],
    DSA: "No",
    SpecialFocusAreas: ["Event management UI", "Calendar integration"],
    Notes: ""
  },
  {
    Company: "Circle",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://circle.so/careers/frontend-engineer-remote",
    NoOfInterviewRounds: 3,
    RoundBreakdown: [
      { Round: 1, Type: "Application review", Description: "Community platform experience" },
      { Round: 2, Type: "Technical interview", Description: "Build community feed component" },
      { Round: 3, Type: "Behavioral", Description: "Community building passion" }
    ],
    FrameworksOrTools: ["React", "GraphQL", "Real-time APIs"],
    DSA: "No",
    SpecialFocusAreas: ["Community features", "Real-time feeds"],
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
    Company: "Gamma",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://gamma.app/careers/frontend-engineer-remote",
    NoOfInterviewRounds: 3,
    RoundBreakdown: [
      { Round: 1, Type: "Technical screen", Description: "Presentation tool and AI knowledge" },
      { Round: 2, Type: "Live coding", Description: "Build presentation editor component" },
      { Round: 3, Type: "Behavioral", Description: "AI-powered creativity alignment" }
    ],
    FrameworksOrTools: ["React", "AI APIs", "Rich text editors"],
    DSA: "No",
    SpecialFocusAreas: ["Rich text editing", "AI integration"],
    Notes: ""
  }
];
