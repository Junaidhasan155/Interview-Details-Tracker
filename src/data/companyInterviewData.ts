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
      { Round: 3, Type: "System Design", Description: "Design checkout flow UI" },
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
      { Round: 2, Type: "Technical interview", Description: "JS fundamentals" },
      { Round: 3, Type: "Behavioral", Description: "Instamart team fit" }
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
    Company: "GitLab",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://about.gitlab.com/jobs/frontend-engineer",
    NoOfInterviewRounds: 4,
    RoundBreakdown: [
      { Round: 1, Type: "Recruiter Screen", Description: "Remote work experience and Vue.js knowledge" },
      { Round: 2, Type: "Technical interview", Description: "Live coding with Vue.js and GitLab workflows" },
      { Round: 3, Type: "System design", Description: "Design CI/CD pipeline visualization" },
      { Round: 4, Type: "Behavioral", Description: "Remote collaboration and async communication" }
    ],
    FrameworksOrTools: ["Vue.js", "TypeScript", "GraphQL"],
    DSA: "Medium",
    SpecialFocusAreas: ["Remote collaboration", "DevOps UI", "Performance"],
    Notes: "100% remote company, pays in USD globally"
  },
  {
    Company: "Toptal",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://toptal.com/careers/frontend-engineer",
    NoOfInterviewRounds: 5,
    RoundBreakdown: [
      { Round: 1, Type: "Screening", Description: "English proficiency and freelance experience" },
      { Round: 2, Type: "Technical assessment", Description: "Algorithm and logic problems" },
      { Round: 3, Type: "Live coding", Description: "React/Angular live project" },
      { Round: 4, Type: "Project submission", Description: "Build complete frontend application" },
      { Round: 5, Type: "Final interview", Description: "Technical discussion and culture fit" }
    ],
    FrameworksOrTools: ["React", "Angular", "Vue.js", "TypeScript"],
    DSA: "Yes",
    SpecialFocusAreas: ["Independent work", "Client communication", "Full-stack awareness"],
    Notes: "Top 3% talent network, USD payments worldwide"
  },
  {
    Company: "Zapier",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://zapier.com/jobs/frontend-engineer",
    NoOfInterviewRounds: 4,
    RoundBreakdown: [
      { Round: 1, Type: "Recruiter Screen", Description: "Remote work experience and automation interest" },
      { Round: 2, Type: "Technical interview", Description: "React component building and API integration" },
      { Round: 3, Type: "System design", Description: "Design workflow automation UI" },
      { Round: 4, Type: "Team interview", Description: "Async communication and collaboration" }
    ],
    FrameworksOrTools: ["React", "TypeScript", "Node.js"],
    DSA: "Medium",
    SpecialFocusAreas: ["API integrations", "Workflow design", "User experience"],
    Notes: "Fully distributed team, competitive USD salaries"
  },
  {
    Company: "Buffer",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://buffer.com/journey/frontend-engineer",
    NoOfInterviewRounds: 3,
    RoundBreakdown: [
      { Round: 1, Type: "Culture interview", Description: "Values alignment and remote work style" },
      { Round: 2, Type: "Technical challenge", Description: "Take-home React project with social media features" },
      { Round: 3, Type: "Technical discussion", Description: "Code review and architecture discussion" }
    ],
    FrameworksOrTools: ["React", "Redux", "TypeScript"],
    DSA: "Low",
    SpecialFocusAreas: ["Social media APIs", "Analytics dashboards", "User engagement"],
    Notes: "Remote-first culture, transparent salaries in USD"
  },
  {
    Company: "Automattic",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://automattic.com/work-with-us/frontend-engineer",
    NoOfInterviewRounds: 4,
    RoundBreakdown: [
      { Round: 1, Type: "Application review", Description: "Portfolio and WordPress experience assessment" },
      { Round: 2, Type: "Technical trial", Description: "Paid trial project on WordPress.com" },
      { Round: 3, Type: "Code review", Description: "Review trial work with team" },
      { Round: 4, Type: "Culture interview", Description: "Distributed work and company values" }
    ],
    FrameworksOrTools: ["React", "WordPress", "JavaScript", "PHP"],
    DSA: "Low",
    SpecialFocusAreas: ["Content management", "Performance", "Accessibility"],
    Notes: "Distributed workforce across 90+ countries, USD salaries"
  },
  {
    Company: "InVision",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://invisionapp.com/careers/frontend-engineer",
    NoOfInterviewRounds: 4,
    RoundBreakdown: [
      { Round: 1, Type: "Recruiter Screen", Description: "Design tool experience and remote work" },
      { Round: 2, Type: "Technical interview", Description: "Build design tool UI components" },
      { Round: 3, Type: "Design challenge", Description: "Create interactive prototyping interface" },
      { Round: 4, Type: "Team interview", Description: "Collaboration with designers and PMs" }
    ],
    FrameworksOrTools: ["React", "TypeScript", "Canvas API", "WebGL"],
    DSA: "Medium",
    SpecialFocusAreas: ["Design tools", "Real-time collaboration", "Canvas rendering"],
    Notes: "Design-focused remote company, competitive USD compensation"
  },
  {
    Company: "Doist (Todoist)",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://doist.com/careers/frontend-engineer",
    NoOfInterviewRounds: 3,
    RoundBreakdown: [
      { Round: 1, Type: "Initial interview", Description: "Remote work experience and productivity tools interest" },
      { Round: 2, Type: "Technical assignment", Description: "Build task management component with React" },
      { Round: 3, Type: "Final interview", Description: "Code discussion and culture fit" }
    ],
    FrameworksOrTools: ["React", "TypeScript", "Redux"],
    DSA: "Low",
    SpecialFocusAreas: ["User experience", "Cross-platform consistency", "Performance"],
    Notes: "Async-first remote company, location-independent salaries in USD"
  },
  {
    Company: "Hotjar",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://careers.hotjar.com/frontend-engineer",
    NoOfInterviewRounds: 4,
    RoundBreakdown: [
      { Round: 1, Type: "Recruiter call", Description: "Remote work experience and analytics interest" },
      { Round: 2, Type: "Technical interview", Description: "JavaScript and React live coding" },
      { Round: 3, Type: "System design", Description: "Design heatmap visualization system" },
      { Round: 4, Type: "Cultural interview", Description: "Remote team collaboration" }
    ],
    FrameworksOrTools: ["React", "TypeScript", "D3.js", "Canvas"],
    DSA: "Medium",
    SpecialFocusAreas: ["Data visualization", "Performance optimization", "User analytics"],
    Notes: "Fully remote since 2014, competitive USD salaries globally"
  },
  {
    Company: "Toggl",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://toggl.com/jobs/frontend-engineer",
    NoOfInterviewRounds: 3,
    RoundBreakdown: [
      { Round: 1, Type: "Initial call", Description: "Remote work setup and time tracking domain" },
      { Round: 2, Type: "Technical test", Description: "React time tracker component development" },
      { Round: 3, Type: "Team interview", Description: "Code review and async communication" }
    ],
    FrameworksOrTools: ["React", "TypeScript", "GraphQL"],
    DSA: "Low",
    SpecialFocusAreas: ["Time tracking interfaces", "Data visualization", "Mobile responsiveness"],
    Notes: "Estonia-based remote company, USD salary options"
  },
  {
    Company: "Ghost",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://ghost.org/careers/frontend-engineer",
    NoOfInterviewRounds: 3,
    RoundBreakdown: [
      { Round: 1, Type: "Application review", Description: "Portfolio review and publishing platform interest" },
      { Round: 2, Type: "Technical challenge", Description: "Build blog editor interface with React" },
      { Round: 3, Type: "Culture interview", Description: "Open source contribution and remote work" }
    ],
    FrameworksOrTools: ["React", "Node.js", "Ember.js"],
    DSA: "Low",
    SpecialFocusAreas: ["Content creation tools", "Performance", "SEO optimization"],
    Notes: "Non-profit remote team, transparent USD salaries"
  },
  {
    Company: "ConvertKit",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://convertkit.com/careers/frontend-engineer",
    NoOfInterviewRounds: 4,
    RoundBreakdown: [
      { Round: 1, Type: "Initial interview", Description: "Email marketing interest and remote experience" },
      { Round: 2, Type: "Technical assignment", Description: "Email template builder with React" },
      { Round: 3, Type: "Code review", Description: "Discuss assignment and improvements" },
      { Round: 4, Type: "Team fit", Description: "Culture and working style assessment" }
    ],
    FrameworksOrTools: ["React", "TypeScript", "Tailwind CSS"],
    DSA: "Low",
    SpecialFocusAreas: ["Email tools", "Drag-and-drop interfaces", "Marketing automation"],
    Notes: "Boise-based remote company, competitive USD compensation"
  },
  {
    Company: "Help Scout",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://helpscout.com/careers/frontend-engineer",
    NoOfInterviewRounds: 4,
    RoundBreakdown: [
      { Round: 1, Type: "Recruiter screen", Description: "Customer service software interest and remote work" },
      { Round: 2, Type: "Technical interview", Description: "React component development and testing" },
      { Round: 3, Type: "Design challenge", Description: "Customer support interface design" },
      { Round: 4, Type: "Cultural interview", Description: "Customer-centric mindset and team collaboration" }
    ],
    FrameworksOrTools: ["React", "TypeScript", "SCSS"],
    DSA: "Low",
    SpecialFocusAreas: ["Customer support tools", "Real-time messaging", "Accessibility"],
    Notes: "Boston-based remote company, strong USD benefits"
  },
  {
    Company: "Basecamp",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://basecamp.com/about/jobs/frontend-engineer",
    NoOfInterviewRounds: 3,
    RoundBreakdown: [
      { Round: 1, Type: "Application review", Description: "Portfolio assessment and project management interest" },
      { Round: 2, Type: "Technical exercise", Description: "Build project management interface" },
      { Round: 3, Type: "Final interview", Description: "Culture fit and work philosophy alignment" }
    ],
    FrameworksOrTools: ["Stimulus", "Turbo", "CSS", "JavaScript"],
    DSA: "Low",
    SpecialFocusAreas: ["Simplicity", "Performance", "Progressive enhancement"],
    Notes: "Chicago-based with remote options, stable USD compensation"
  },
  {
    Company: "Gatsby",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://gatsby.dev/careers/frontend-engineer",
    NoOfInterviewRounds: 4,
    RoundBreakdown: [
      { Round: 1, Type: "Recruiter call", Description: "JAMstack and static site generator experience" },
      { Round: 2, Type: "Technical interview", Description: "React and GraphQL live coding" },
      { Round: 3, Type: "System design", Description: "Design static site generation pipeline" },
      { Round: 4, Type: "Team interview", Description: "Open source contribution and collaboration" }
    ],
    FrameworksOrTools: ["React", "Gatsby", "GraphQL", "TypeScript"],
    DSA: "Medium",
    SpecialFocusAreas: ["Static site generation", "Performance optimization", "Developer tools"],
    Notes: "SF-based remote-friendly, strong USD salaries for remote roles"
  },
  {
    Company: "Netlify",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://netlify.com/careers/frontend-engineer",
    NoOfInterviewRounds: 4,
    RoundBreakdown: [
      { Round: 1, Type: "Initial screen", Description: "JAMstack architecture and deployment platforms" },
      { Round: 2, Type: "Technical coding", Description: "React dashboard and deployment interface" },
      { Round: 3, Type: "System design", Description: "Design CI/CD dashboard architecture" },
      { Round: 4, Type: "Culture interview", Description: "Remote collaboration and developer advocacy" }
    ],
    FrameworksOrTools: ["React", "TypeScript", "Node.js", "GraphQL"],
    DSA: "Medium",
    SpecialFocusAreas: ["Developer tools", "Deployment automation", "Performance"],
    Notes: "SF-based with global remote team, competitive USD compensation"
  },
  {
    Company: "Vercel",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://vercel.com/careers/frontend-engineer",
    NoOfInterviewRounds: 4,
    RoundBreakdown: [
      { Round: 1, Type: "Recruiter screen", Description: "Next.js and deployment platform experience" },
      { Round: 2, Type: "Technical interview", Description: "React/Next.js live coding session" },
      { Round: 3, Type: "System design", Description: "Design serverless deployment dashboard" },
      { Round: 4, Type: "Team interview", Description: "Developer experience and collaboration" }
    ],
    FrameworksOrTools: ["React", "Next.js", "TypeScript", "Vercel"],
    DSA: "Medium",
    SpecialFocusAreas: ["Developer experience", "Performance optimization", "Serverless"],
    Notes: "Global remote team, excellent USD compensation packages"
  },
  {
    Company: "Planetscale",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://planetscale.com/careers/frontend-engineer",
    NoOfInterviewRounds: 4,
    RoundBreakdown: [
      { Round: 1, Type: "Initial call", Description: "Database tooling and developer tools interest" },
      { Round: 2, Type: "Technical interview", Description: "React dashboard development for database management" },
      { Round: 3, Type: "System design", Description: "Design database branching visualization" },
      { Round: 4, Type: "Cultural interview", Description: "Remote work and database domain knowledge" }
    ],
    FrameworksOrTools: ["React", "TypeScript", "Next.js", "Tailwind"],
    DSA: "Medium",
    SpecialFocusAreas: ["Database tooling", "Developer experience", "Data visualization"],
    Notes: "SF-based remote-first company, strong USD compensation"
  },
  {
    Company: "Supabase",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://supabase.com/careers/frontend-engineer",
    NoOfInterviewRounds: 3,
    RoundBreakdown: [
      { Round: 1, Type: "Initial interview", Description: "Open source contribution and backend-as-a-service" },
      { Round: 2, Type: "Technical challenge", Description: "Build database management interface" },
      { Round: 3, Type: "Team interview", Description: "Remote collaboration and product thinking" }
    ],
    FrameworksOrTools: ["React", "Next.js", "TypeScript", "Tailwind"],
    DSA: "Low",
    SpecialFocusAreas: ["Developer tools", "Database interfaces", "Open source"],
    Notes: "Singapore-based remote team, competitive USD salaries globally"
  },
  {
    Company: "Linear",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://linear.app/careers/frontend-engineer",
    NoOfInterviewRounds: 4,
    RoundBreakdown: [
      { Round: 1, Type: "Recruiter call", Description: "Project management tools and design sensibility" },
      { Round: 2, Type: "Technical interview", Description: "React performance optimization and animations" },
      { Round: 3, Type: "Design challenge", Description: "Build issue tracking interface with smooth UX" },
      { Round: 4, Type: "Team interview", Description: "Product sense and attention to detail" }
    ],
    FrameworksOrTools: ["React", "TypeScript", "Framer Motion", "GraphQL"],
    DSA: "Medium",
    SpecialFocusAreas: ["Performance", "Animations", "Keyboard shortcuts", "Design systems"],
    Notes: "SF-based remote-friendly, premium USD compensation"
  },
  {
    Company: "Clerk",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://clerk.com/careers/frontend-engineer",
    NoOfInterviewRounds: 4,
    RoundBreakdown: [
      { Round: 1, Type: "Initial screen", Description: "Authentication systems and developer tools" },
      { Round: 2, Type: "Technical coding", Description: "Build auth components with React" },
      { Round: 3, Type: "System design", Description: "Design user management dashboard" },
      { Round: 4, Type: "Culture interview", Description: "Developer advocacy and product focus" }
    ],
    FrameworksOrTools: ["React", "TypeScript", "Next.js"],
    DSA: "Medium",
    SpecialFocusAreas: ["Authentication flows", "Security", "Developer experience"],
    Notes: "SF-based with remote team, competitive USD packages"
  },
  {
    Company: "Loom",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://loom.com/careers/frontend-engineer",
    NoOfInterviewRounds: 4,
    RoundBreakdown: [
      { Round: 1, Type: "Recruiter screen", Description: "Video communication tools and remote work" },
      { Round: 2, Type: "Technical interview", Description: "React and video player interface development" },
      { Round: 3, Type: "System design", Description: "Design video recording and sharing platform" },
      { Round: 4, Type: "Team interview", Description: "Async communication and product thinking" }
    ],
    FrameworksOrTools: ["React", "TypeScript", "WebRTC", "Video.js"],
    DSA: "Medium",
    SpecialFocusAreas: ["Video technology", "Real-time communication", "Performance"],
    Notes: "SF-based remote-friendly, strong USD benefits"
  },
  {
    Company: "Retool",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://retool.com/careers/frontend-engineer",
    NoOfInterviewRounds: 4,
    RoundBreakdown: [
      { Round: 1, Type: "Initial call", Description: "Low-code platforms and internal tools" },
      { Round: 2, Type: "Technical interview", Description: "Build drag-and-drop interface with React" },
      { Round: 3, Type: "System design", Description: "Design visual application builder" },
      { Round: 4, Type: "Cultural interview", Description: "Product thinking and user empathy" }
    ],
    FrameworksOrTools: ["React", "TypeScript", "Drag-and-drop", "Canvas"],
    DSA: "High",
    SpecialFocusAreas: ["Visual builders", "Performance", "Complex state management"],
    Notes: "SF-based with remote options, excellent USD compensation"
  },
  {
    Company: "Miro",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://miro.com/careers/frontend-engineer",
    NoOfInterviewRounds: 5,
    RoundBreakdown: [
      { Round: 1, Type: "Recruiter screen", Description: "Collaboration tools and canvas applications" },
      { Round: 2, Type: "Technical interview", Description: "JavaScript and React performance optimization" },
      { Round: 3, Type: "System design", Description: "Design real-time collaborative canvas" },
      { Round: 4, Type: "Coding challenge", Description: "Build whiteboard functionality" },
      { Round: 5, Type: "Team interview", Description: "Remote collaboration and product vision" }
    ],
    FrameworksOrTools: ["React", "TypeScript", "Canvas API", "WebGL"],
    DSA: "High",
    SpecialFocusAreas: ["Real-time collaboration", "Canvas rendering", "Performance optimization"],
    Notes: "Amsterdam-based remote-friendly, competitive USD salaries"
  },
  {
    Company: "Figma",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://figma.com/careers/frontend-engineer",
    NoOfInterviewRounds: 5,
    RoundBreakdown: [
      { Round: 1, Type: "Recruiter call", Description: "Design tools and collaboration platforms" },
      { Round: 2, Type: "Technical phone", Description: "JavaScript fundamentals and performance" },
      { Round: 3, Type: "Coding challenge", Description: "Build design tool interface components" },
      { Round: 4, Type: "System design", Description: "Design real-time design collaboration system" },
      { Round: 5, Type: "Team interview", Description: "Design sensibility and product thinking" }
    ],
    FrameworksOrTools: ["React", "TypeScript", "WebGL", "Canvas API"],
    DSA: "High",
    SpecialFocusAreas: ["Real-time collaboration", "Graphics rendering", "Performance"],
    Notes: "SF-based with remote roles, top-tier USD compensation"
  },
  {
    Company: "Framer",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://framer.com/careers/frontend-engineer",
    NoOfInterviewRounds: 4,
    RoundBreakdown: [
      { Round: 1, Type: "Initial screen", Description: "Design tools and prototyping experience" },
      { Round: 2, Type: "Technical interview", Description: "React animations and interaction development" },
      { Round: 3, Type: "Design challenge", Description: "Build interactive prototype interface" },
      { Round: 4, Type: "Culture interview", Description: "Design-developer collaboration" }
    ],
    FrameworksOrTools: ["React", "Framer Motion", "TypeScript", "WebGL"],
    DSA: "Medium",
    SpecialFocusAreas: ["Animations", "Design tools", "Performance", "User interactions"],
    Notes: "Amsterdam-based remote team, strong USD compensation"
  },
  {
    Company: "Canva",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://canva.com/careers/frontend-engineer",
    NoOfInterviewRounds: 4,
    RoundBreakdown: [
      { Round: 1, Type: "Recruiter screen", Description: "Design platforms and creative tools" },
      { Round: 2, Type: "Technical interview", Description: "React and canvas-based editor development" },
      { Round: 3, Type: "System design", Description: "Design scalable design editor architecture" },
      { Round: 4, Type: "Behavioral interview", Description: "Creativity and team collaboration" }
    ],
    FrameworksOrTools: ["React", "TypeScript", "Canvas API", "WebGL"],
    DSA: "Medium",
    SpecialFocusAreas: ["Canvas rendering", "Performance", "Design tools", "User experience"],
    Notes: "Sydney-based with global remote options, competitive USD rates"
  },
  {
    Company: "Webflow",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://webflow.com/careers/frontend-engineer",
    NoOfInterviewRounds: 4,
    RoundBreakdown: [
      { Round: 1, Type: "Recruiter call", Description: "Visual web development and no-code tools" },
      { Round: 2, Type: "Technical interview", Description: "React and visual editor component development" },
      { Round: 3, Type: "System design", Description: "Design visual website builder interface" },
      { Round: 4, Type: "Team interview", Description: "Product thinking and user empathy" }
    ],
    FrameworksOrTools: ["React", "TypeScript", "CSS-in-JS", "Drag-and-drop"],
    DSA: "Medium",
    SpecialFocusAreas: ["Visual editors", "CSS generation", "Responsive design"],
    Notes: "SF-based remote-friendly, excellent USD compensation"
  },
  {
    Company: "Notion",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://notion.so/careers/frontend-engineer",
    NoOfInterviewRounds: 4,
    RoundBreakdown: [
      { Round: 1, Type: "Recruiter screen", Description: "Productivity tools and block-based editors" },
      { Round: 2, Type: "Technical interview", Description: "React rich text editor development" },
      { Round: 3, Type: "System design", Description: "Design real-time collaborative document editor" },
      { Round: 4, Type: "Cultural interview", Description: "Product sense and user-centric thinking" }
    ],
    FrameworksOrTools: ["React", "TypeScript", "ProseMirror", "Real-time sync"],
    DSA: "Medium",
    SpecialFocusAreas: ["Rich text editing", "Real-time collaboration", "Performance"],
    Notes: "SF-based remote-friendly, competitive USD packages"
  },
  {
    Company: "Airtable",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://airtable.com/careers/frontend-engineer",
    NoOfInterviewRounds: 4,
    RoundBreakdown: [
      { Round: 1, Type: "Phone screen", Description: "Database interfaces and spreadsheet applications" },
      { Round: 2, Type: "Technical interview", Description: "React data grid and virtualization" },
      { Round: 3, Type: "System design", Description: "Design scalable data visualization interface" },
      { Round: 4, Type: "Behavioral interview", Description: "Product thinking and user workflows" }
    ],
    FrameworksOrTools: ["React", "TypeScript", "Virtualization", "GraphQL"],
    DSA: "Medium",
    SpecialFocusAreas: ["Data visualization", "Performance optimization", "Complex UIs"],
    Notes: "SF-based with remote roles, strong USD compensation"
  },
  {
    Company: "Plaid",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://plaid.com/careers/frontend-engineer",
    NoOfInterviewRounds: 4,
    RoundBreakdown: [
      { Round: 1, Type: "Recruiter screen", Description: "Fintech and financial data platforms" },
      { Round: 2, Type: "Technical interview", Description: "React dashboard development for financial data" },
      { Round: 3, Type: "System design", Description: "Design bank account linking flow" },
      { Round: 4, Type: "Team interview", Description: "Security-conscious development and collaboration" }
    ],
    FrameworksOrTools: ["React", "TypeScript", "Next.js", "GraphQL"],
    DSA: "Medium",
    SpecialFocusAreas: ["Financial interfaces", "Security", "Data visualization"],
    Notes: "SF-based remote-friendly, excellent USD fintech compensation"
  },
  {
    Company: "Stripe",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://stripe.com/careers/frontend-engineer",
    NoOfInterviewRounds: 5,
    RoundBreakdown: [
      { Round: 1, Type: "Recruiter screen", Description: "Payment systems and developer tools" },
      { Round: 2, Type: "Technical phone", Description: "JavaScript fundamentals and API integration" },
      { Round: 3, Type: "Coding challenge", Description: "Build payment form components" },
      { Round: 4, Type: "System design", Description: "Design payment dashboard architecture" },
      { Round: 5, Type: "Team interview", Description: "Developer experience and product focus" }
    ],
    FrameworksOrTools: ["React", "TypeScript", "Node.js", "GraphQL"],
    DSA: "High",
    SpecialFocusAreas: ["Payment flows", "Security", "Developer experience", "APIs"],
    Notes: "SF/Dublin with global remote, top-tier USD compensation"
  },
  {
    Company: "Coinbase",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://coinbase.com/careers/frontend-engineer",
    NoOfInterviewRounds: 4,
    RoundBreakdown: [
      { Round: 1, Type: "Phone screen", Description: "Cryptocurrency and trading platform experience" },
      { Round: 2, Type: "Technical interview", Description: "React trading interface development" },
      { Round: 3, Type: "System design", Description: "Design crypto trading dashboard" },
      { Round: 4, Type: "Behavioral interview", Description: "Risk management and compliance awareness" }
    ],
    FrameworksOrTools: ["React", "TypeScript", "Redux", "D3.js"],
    DSA: "High",
    SpecialFocusAreas: ["Financial data visualization", "Real-time updates", "Security"],
    Notes: "SF-based remote-friendly, crypto compensation + USD"
  },
  {
    Company: "Binance",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://binance.com/careers/frontend-engineer",
    NoOfInterviewRounds: 4,
    RoundBreakdown: [
      { Round: 1, Type: "Initial screen", Description: "Crypto trading and high-frequency interfaces" },
      { Round: 2, Type: "Technical test", Description: "React trading terminal with real-time data" },
      { Round: 3, Type: "System design", Description: "Design high-performance trading interface" },
      { Round: 4, Type: "Final interview", Description: "Global team collaboration and crypto knowledge" }
    ],
    FrameworksOrTools: ["React", "TypeScript", "WebSocket", "Canvas"],
    DSA: "High",
    SpecialFocusAreas: ["High-frequency updates", "Performance", "Financial charts"],
    Notes: "Global remote positions, competitive USD + crypto compensation"
  },
  {
    Company: "Polygon",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://polygon.technology/careers/frontend-engineer",
    NoOfInterviewRounds: 3,
    RoundBreakdown: [
      { Round: 1, Type: "Technical screen", Description: "Web3 and blockchain interface development" },
      { Round: 2, Type: "Coding challenge", Description: "Build DeFi dashboard with Web3 integration" },
      { Round: 3, Type: "Culture interview", Description: "Decentralized future and remote collaboration" }
    ],
    FrameworksOrTools: ["React", "TypeScript", "Web3.js", "Ethers.js"],
    DSA: "Medium",
    SpecialFocusAreas: ["Web3 integration", "Blockchain data", "DeFi interfaces"],
    Notes: "Global distributed team, USD + token compensation"
  },
  {
    Company: "Chainlink",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://chainlink.com/careers/frontend-engineer",
    NoOfInterviewRounds: 4,
    RoundBreakdown: [
      { Round: 1, Type: "Recruiter call", Description: "Oracle networks and blockchain infrastructure" },
      { Round: 2, Type: "Technical interview", Description: "React dashboard for blockchain data feeds" },
      { Round: 3, Type: "System design", Description: "Design oracle data visualization platform" },
      { Round: 4, Type: "Team interview", Description: "Decentralized systems and remote work" }
    ],
    FrameworksOrTools: ["React", "TypeScript", "GraphQL", "Web3.js"],
    DSA: "Medium",
    SpecialFocusAreas: ["Blockchain data", "Real-time feeds", "Data visualization"],
    Notes: "Global remote team, excellent USD + token packages"
  },
  {
    Company: "Uniswap",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://uniswap.org/careers/frontend-engineer",
    NoOfInterviewRounds: 3,
    RoundBreakdown: [
      { Round: 1, Type: "Portfolio review", Description: "DeFi experience and Web3 development" },
      { Round: 2, Type: "Technical challenge", Description: "Build DEX interface with wallet integration" },
      { Round: 3, Type: "Culture interview", Description: "DeFi passion and distributed team fit" }
    ],
    FrameworksOrTools: ["React", "TypeScript", "Web3.js", "GraphQL"],
    DSA: "Low",
    SpecialFocusAreas: ["DeFi protocols", "Wallet integration", "Trading interfaces"],
    Notes: "Fully remote, competitive USD + UNI token compensation"
  },
  {
    Company: "OpenSea",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://opensea.io/careers/frontend-engineer",
    NoOfInterviewRounds: 4,
    RoundBreakdown: [
      { Round: 1, Type: "Phone screen", Description: "NFT marketplace and Web3 experience" },
      { Round: 2, Type: "Technical interview", Description: "React NFT gallery and marketplace features" },
      { Round: 3, Type: "System design", Description: "Design scalable NFT marketplace interface" },
      { Round: 4, Type: "Cultural interview", Description: "NFT ecosystem and creator economy" }
    ],
    FrameworksOrTools: ["React", "Next.js", "TypeScript", "Web3.js"],
    DSA: "Medium",
    SpecialFocusAreas: ["NFT interfaces", "Marketplace features", "Wallet integration"],
    Notes: "NY-based remote-friendly, strong USD compensation"
  },
  {
    Company: "Magic Eden",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://magiceden.io/careers/frontend-engineer",
    NoOfInterviewRounds: 3,
    RoundBreakdown: [
      { Round: 1, Type: "Initial call", Description: "Solana NFTs and marketplace development" },
      { Round: 2, Type: "Technical test", Description: "Build NFT minting interface with Solana Web3" },
      { Round: 3, Type: "Team interview", Description: "Fast-paced startup and Web3 passion" }
    ],
    FrameworksOrTools: ["React", "TypeScript", "Solana Web3.js", "Next.js"],
    DSA: "Low",
    SpecialFocusAreas: ["Solana integration", "NFT marketplaces", "Crypto wallets"],
    Notes: "Remote-first Solana NFT marketplace, competitive USD packages"
  },
  {
    Company: "ConsenSys",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://consensys.net/careers/frontend-engineer",
    NoOfInterviewRounds: 4,
    RoundBreakdown: [
      { Round: 1, Type: "Recruiter screen", Description: "Ethereum ecosystem and MetaMask experience" },
      { Round: 2, Type: "Technical interview", Description: "React Web3 application development" },
      { Round: 3, Type: "System design", Description: "Design Ethereum-based application interface" },
      { Round: 4, Type: "Culture interview", Description: "Decentralized future and blockchain advocacy" }
    ],
    FrameworksOrTools: ["React", "TypeScript", "Web3.js", "MetaMask"],
    DSA: "Medium",
    SpecialFocusAreas: ["Ethereum development", "MetaMask integration", "DApp interfaces"],
    Notes: "Global distributed team, USD + ETH compensation options"
  },
  {
    Company: "The Graph",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://thegraph.com/careers/frontend-engineer",
    NoOfInterviewRounds: 3,
    RoundBreakdown: [
      { Round: 1, Type: "Technical screen", Description: "GraphQL and blockchain data indexing" },
      { Round: 2, Type: "Coding challenge", Description: "Build subgraph explorer interface" },
      { Round: 3, Type: "Team interview", Description: "Web3 infrastructure and remote collaboration" }
    ],
    FrameworksOrTools: ["React", "TypeScript", "GraphQL", "Apollo"],
    DSA: "Medium",
    SpecialFocusAreas: ["GraphQL interfaces", "Blockchain data", "Developer tools"],
    Notes: "Distributed team, strong USD + GRT token compensation"
  },
  {
    Company: "Alchemy",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://alchemy.com/careers/frontend-engineer",
    NoOfInterviewRounds: 4,
    RoundBreakdown: [
      { Round: 1, Type: "Recruiter call", Description: "Blockchain infrastructure and developer tools" },
      { Round: 2, Type: "Technical interview", Description: "React dashboard for blockchain analytics" },
      { Round: 3, Type: "System design", Description: "Design blockchain developer console" },
      { Round: 4, Type: "Cultural interview", Description: "Developer experience and Web3 growth" }
    ],
    FrameworksOrTools: ["React", "TypeScript", "Next.js", "GraphQL"],
    DSA: "Medium",
    SpecialFocusAreas: ["Developer tools", "Blockchain analytics", "API interfaces"],
    Notes: "SF-based remote-friendly, excellent USD developer tool compensation"
  },
  {
    Company: "Infura",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://infura.io/careers/frontend-engineer",
    NoOfInterviewRounds: 4,
    RoundBreakdown: [
      { Round: 1, Type: "Phone screen", Description: "Blockchain infrastructure and API services" },
      { Round: 2, Type: "Technical interview", Description: "React interface for blockchain node management" },
      { Round: 3, Type: "System design", Description: "Design API management dashboard" },
      { Round: 4, Type: "Team interview", Description: "Infrastructure reliability and developer focus" }
    ],
    FrameworksOrTools: ["React", "TypeScript", "Next.js", "Node.js"],
    DSA: "Medium",
    SpecialFocusAreas: ["API interfaces", "Infrastructure monitoring", "Developer experience"],
    Notes: "ConsenSys company, global remote with USD compensation"
  },
  {
    Company: "Moralis",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://moralis.io/careers/frontend-engineer",
    NoOfInterviewRounds: 3,
    RoundBreakdown: [
      { Round: 1, Type: "Initial interview", Description: "Web3 backend services and API development" },
      { Round: 2, Type: "Technical challenge", Description: "Build Web3 dashboard using Moralis APIs" },
      { Round: 3, Type: "Culture interview", Description: "Web3 education and developer community" }
    ],
    FrameworksOrTools: ["React", "Next.js", "TypeScript", "Web3.js"],
    DSA: "Low",
    SpecialFocusAreas: ["Web3 APIs", "Developer tools", "Blockchain integration"],
    Notes: "Remote-first Web3 infrastructure, competitive USD rates"
  },
  {
    Company: "QuickNode",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://quicknode.com/careers/frontend-engineer",
    NoOfInterviewRounds: 4,
    RoundBreakdown: [
      { Round: 1, Type: "Recruiter screen", Description: "Blockchain node infrastructure and API services" },
      { Round: 2, Type: "Technical interview", Description: "React dashboard for node management" },
      { Round: 3, Type: "System design", Description: "Design blockchain node monitoring interface" },
      { Round: 4, Type: "Team interview", Description: "Infrastructure scaling and developer experience" }
    ],
    FrameworksOrTools: ["React", "TypeScript", "GraphQL", "Next.js"],
    DSA: "Medium",
    SpecialFocusAreas: ["Infrastructure interfaces", "Real-time monitoring", "API management"],
    Notes: "Remote-friendly blockchain infrastructure, strong USD compensation"
  },
  {
    Company: "Ankr",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://ankr.com/careers/frontend-engineer",
    NoOfInterviewRounds: 3,
    RoundBreakdown: [
      { Round: 1, Type: "Technical screen", Description: "Multi-chain infrastructure and Web3 APIs" },
      { Round: 2, Type: "Coding test", Description: "Build multi-chain explorer interface" },
      { Round: 3, Type: "Culture interview", Description: "Decentralized infrastructure and global team" }
    ],
    FrameworksOrTools: ["React", "TypeScript", "Web3.js", "Multi-chain"],
    DSA: "Medium",
    SpecialFocusAreas: ["Multi-chain interfaces", "Infrastructure tools", "Blockchain data"],
    Notes: "Global distributed team, USD + ANKR token compensation"
  },
  {
    Company: "1inch",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://1inch.io/careers/frontend-engineer",
    NoOfInterviewRounds: 3,
    RoundBreakdown: [
      { Round: 1, Type: "Portfolio review", Description: "DeFi aggregation and trading experience" },
      { Round: 2, Type: "Technical challenge", Description: "Build DEX aggregator interface" },
      { Round: 3, Type: "Team interview", Description: "DeFi protocols and high-performance interfaces" }
    ],
    FrameworksOrTools: ["React", "TypeScript", "Web3.js", "Redux"],
    DSA: "Medium",
    SpecialFocusAreas: ["DeFi aggregation", "Trading interfaces", "Performance optimization"],
    Notes: "Global remote team, competitive USD + 1INCH compensation"
  },
  {
    Company: "Yearn Finance",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://yearn.finance/careers/frontend-engineer",
    NoOfInterviewRounds: 2,
    RoundBreakdown: [
      { Round: 1, Type: "Technical assessment", Description: "Build yield farming interface with Web3" },
      { Round: 2, Type: "Community interview", Description: "DeFi passion and DAO contribution mindset" }
    ],
    FrameworksOrTools: ["React", "TypeScript", "Web3.js", "Ethers.js"],
    DSA: "Low",
    SpecialFocusAreas: ["Yield farming interfaces", "DeFi protocols", "DAO tools"],
    Notes: "DAO-based remote work, USD + YFI token rewards"
  },
  {
    Company: "Compound",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://compound.finance/careers/frontend-engineer",
    NoOfInterviewRounds: 3,
    RoundBreakdown: [
      { Round: 1, Type: "Technical screen", Description: "DeFi lending protocols and financial interfaces" },
      { Round: 2, Type: "Coding challenge", Description: "Build lending/borrowing interface" },
      { Round: 3, Type: "Culture interview", Description: "DeFi innovation and protocol development" }
    ],
    FrameworksOrTools: ["React", "TypeScript", "Web3.js", "GraphQL"],
    DSA: "Medium",
    SpecialFocusAreas: ["Financial interfaces", "DeFi protocols", "Interest rate visualization"],
    Notes: "SF-based remote options, competitive USD + COMP tokens"
  },
  {
    Company: "Aave",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://aave.com/careers/frontend-engineer",
    NoOfInterviewRounds: 4,
    RoundBreakdown: [
      { Round: 1, Type: "Recruiter call", Description: "DeFi lending and liquidity protocols" },
      { Round: 2, Type: "Technical interview", Description: "React DeFi dashboard development" },
      { Round: 3, Type: "System design", Description: "Design multi-asset lending interface" },
      { Round: 4, Type: "Team interview", Description: "DeFi innovation and protocol safety" }
    ],
    FrameworksOrTools: ["React", "TypeScript", "Web3.js", "GraphQL"],
    DSA: "Medium",
    SpecialFocusAreas: ["DeFi protocols", "Financial dashboards", "Risk management interfaces"],
    Notes: "London-based remote-friendly, excellent USD + AAVE compensation"
  },
  {
    Company: "MakerDAO",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://makerdao.com/careers/frontend-engineer",
    NoOfInterviewRounds: 3,
    RoundBreakdown: [
      { Round: 1, Type: "Technical assessment", Description: "Stablecoin protocols and DAO governance" },
      { Round: 2, Type: "Coding challenge", Description: "Build DAO voting interface" },
      { Round: 3, Type: "DAO interview", Description: "Decentralized governance and community contribution" }
    ],
    FrameworksOrTools: ["React", "TypeScript", "Web3.js", "IPFS"],
    DSA: "Medium",
    SpecialFocusAreas: ["DAO interfaces", "Governance tools", "Stablecoin management"],
    Notes: "Fully decentralized DAO, USD + MKR token compensation"
  },
  {
    Company: "Synthetix",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://synthetix.io/careers/frontend-engineer",
    NoOfInterviewRounds: 3,
    RoundBreakdown: [
      { Round: 1, Type: "Portfolio review", Description: "Synthetic assets and derivatives trading" },
      { Round: 2, Type: "Technical test", Description: "Build derivatives trading interface" },
      { Round: 3, Type: "Team interview", Description: "DeFi derivatives and protocol understanding" }
    ],
    FrameworksOrTools: ["React", "TypeScript", "Web3.js", "Chart.js"],
    DSA: "Medium",
    SpecialFocusAreas: ["Trading interfaces", "Financial derivatives", "Complex financial data"],
    Notes: "Australia-based remote team, USD + SNX token packages"
  },
  {
    Company: "Curve Finance",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://curve.fi/careers/frontend-engineer",
    NoOfInterviewRounds: 2,
    RoundBreakdown: [
      { Round: 1, Type: "Technical challenge", Description: "Build AMM trading interface with Vyper integration" },
      { Round: 2, Type: "Protocol interview", Description: "AMM understanding and DeFi ecosystem knowledge" }
    ],
    FrameworksOrTools: ["React", "TypeScript", "Web3.js", "Python"],
    DSA: "Medium",
    SpecialFocusAreas: ["AMM interfaces", "Liquidity pool management", "Yield optimization"],
    Notes: "Switzerland-based remote, competitive USD + CRV rewards"
  },
  {
    Company: "Balancer",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://balancer.fi/careers/frontend-engineer",
    NoOfInterviewRounds: 3,
    RoundBreakdown: [
      { Round: 1, Type: "Technical screen", Description: "Automated market making and portfolio management" },
      { Round: 2, Type: "Coding challenge", Description: "Build liquidity pool interface" },
      { Round: 3, Type: "Culture interview", Description: "DeFi innovation and protocol development" }
    ],
    FrameworksOrTools: ["React", "TypeScript", "Web3.js", "D3.js"],
    DSA: "Medium",
    SpecialFocusAreas: ["Portfolio interfaces", "AMM visualization", "Liquidity management"],
    Notes: "Global remote team, USD + BAL token compensation"
  },
  {
    Company: "SushiSwap",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://sushi.com/careers/frontend-engineer",
    NoOfInterviewRounds: 3,
    RoundBreakdown: [
      { Round: 1, Type: "Portfolio assessment", Description: "DEX development and DeFi experience" },
      { Round: 2, Type: "Technical test", Description: "Build DEX interface with yield farming" },
      { Round: 3, Type: "Community interview", Description: "DAO participation and DeFi passion" }
    ],
    FrameworksOrTools: ["React", "Next.js", "TypeScript", "Web3.js"],
    DSA: "Low",
    SpecialFocusAreas: ["DEX interfaces", "Yield farming", "Community features"],
    Notes: "Community-driven DAO, competitive USD + SUSHI compensation"
  },
  {
    Company: "dYdX",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://dydx.careers/frontend-engineer",
    NoOfInterviewRounds: 4,
    RoundBreakdown: [
      { Round: 1, Type: "Phone screen", Description: "Derivatives trading and institutional DeFi" },
      { Round: 2, Type: "Technical interview", Description: "React high-performance trading interface" },
      { Round: 3, Type: "System design", Description: "Design institutional-grade trading platform" },
      { Round: 4, Type: "Team interview", Description: "Financial markets and trading experience" }
    ],
    FrameworksOrTools: ["React", "TypeScript", "WebSocket", "Trading APIs"],
    DSA: "High",
    SpecialFocusAreas: ["High-frequency trading", "Financial derivatives", "Real-time data"],
    Notes: "SF-based remote options, top-tier USD + DYDX compensation"
  },
  {
    Company: "Razorpay",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://razorpay.com/careers/frontend-engineer",
    NoOfInterviewRounds: 4,
    RoundBreakdown: [
      { Round: 1, Type: "Phone screen", Description: "Frontend experience and payment domain interest" },
      { Round: 2, Type: "Technical interview", Description: "React component building and state management" },
      { Round: 3, Type: "Machine coding", Description: "Build payment checkout flow UI" },
      { Round: 4, Type: "Cultural interview", Description: "Team collaboration and fast-paced environment" }
    ],
    FrameworksOrTools: ["React", "Redux", "TypeScript", "Webpack"],
    DSA: "Medium",
    SpecialFocusAreas: ["Payment flows", "Security", "Performance optimization"],
    Notes: "Fast-growing Indian fintech, aggressive hiring for growth"
  },
  {
    Company: "Zerodha",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://zerodha.com/careers/frontend-developer",
    NoOfInterviewRounds: 3,
    RoundBreakdown: [
      { Round: 1, Type: "Portfolio review", Description: "Code review and trading platform interest" },
      { Round: 2, Type: "Technical test", Description: "Build trading dashboard with real-time data" },
      { Round: 3, Type: "Final interview", Description: "Technical discussion and culture fit" }
    ],
    FrameworksOrTools: ["Vue.js", "JavaScript", "Python", "Chart.js"],
    DSA: "Low",
    SpecialFocusAreas: ["Real-time data", "Charts and graphs", "Performance"],
    Notes: "Bangalore-based, strong engineering culture, competitive packages"
  },
  {
    Company: "CRED",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://careers.cred.club/frontend-engineer",
    NoOfInterviewRounds: 4,
    RoundBreakdown: [
      { Round: 1, Type: "Recruiter call", Description: "Experience review and CRED product discussion" },
      { Round: 2, Type: "Technical interview", Description: "React Native and web development" },
      { Round: 3, Type: "Design interview", Description: "UI/UX sensibility and implementation" },
      { Round: 4, Type: "Culture interview", Description: "Product thinking and user obsession" }
    ],
    FrameworksOrTools: ["React", "React Native", "TypeScript", "GraphQL"],
    DSA: "Medium",
    SpecialFocusAreas: ["Mobile-first design", "Animation", "User experience"],
    Notes: "Premium product focus, design-heavy interviews, fast hiring"
  },
  {
    Company: "Unacademy",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://unacademy.com/careers/frontend-engineer",
    NoOfInterviewRounds: 3,
    RoundBreakdown: [
      { Round: 1, Type: "Phone screen", Description: "Frontend experience and EdTech interest" },
      { Round: 2, Type: "Technical assignment", Description: "Build learning platform component" },
      { Round: 3, Type: "Final interview", Description: "Code review and cultural fit" }
    ],
    FrameworksOrTools: ["React", "Redux", "TypeScript", "Next.js"],
    DSA: "Low",
    SpecialFocusAreas: ["Video streaming", "Real-time features", "Mobile optimization"],
    Notes: "EdTech leader, rapid scaling, good learning opportunities"
  },
  {
    Company: "Meesho",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://meesho.com/careers/frontend-developer",
    NoOfInterviewRounds: 4,
    RoundBreakdown: [
      { Round: 1, Type: "Initial screen", Description: "E-commerce and social commerce experience" },
      { Round: 2, Type: "Technical coding", Description: "React e-commerce features development" },
      { Round: 3, Type: "System design", Description: "Design product catalog interface" },
      { Round: 4, Type: "Behavioral interview", Description: "Scale mindset and team collaboration" }
    ],
    FrameworksOrTools: ["React", "Redux", "TypeScript", "PWA"],
    DSA: "Medium",
    SpecialFocusAreas: ["E-commerce flows", "Performance", "Progressive Web Apps"],
    Notes: "Social commerce unicorn, aggressive expansion hiring"
  },
  {
    Company: "PhonePe",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://phonepe.com/careers/frontend-engineer",
    NoOfInterviewRounds: 3,
    RoundBreakdown: [
      { Round: 1, Type: "Technical phone", Description: "Frontend and mobile payment app experience" },
      { Round: 2, Type: "Machine coding", Description: "Build payment flow interface" },
      { Round: 3, Type: "Architecture discussion", Description: "Scalable frontend architecture and team fit" }
    ],
    FrameworksOrTools: ["React", "React Native", "TypeScript", "Redux"],
    DSA: "Medium",
    SpecialFocusAreas: ["Mobile optimization", "Payment security", "Performance"],
    Notes: "Walmart-backed fintech, rapid growth, excellent compensation"
  },
  {
    Company: "Nykaa",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://nykaa.com/careers/frontend-developer",
    NoOfInterviewRounds: 3,
    RoundBreakdown: [
      { Round: 1, Type: "Portfolio review", Description: "E-commerce and beauty domain interest" },
      { Round: 2, Type: "Technical challenge", Description: "Build beauty product catalog with filters" },
      { Round: 3, Type: "Culture interview", Description: "Customer obsession and beauty product understanding" }
    ],
    FrameworksOrTools: ["React", "Next.js", "TypeScript", "Styled Components"],
    DSA: "Low",
    SpecialFocusAreas: ["E-commerce UI", "Search and filters", "Mobile responsiveness"],
    Notes: "Beauty e-commerce leader, woman-focused workplace, growing tech team"
  },
  {
    Company: "ShareChat",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://sharechat.com/careers/frontend-engineer",
    NoOfInterviewRounds: 4,
    RoundBreakdown: [
      { Round: 1, Type: "Phone screen", Description: "Social media and regional language platform experience" },
      { Round: 2, Type: "Technical coding", Description: "React social feed development" },
      { Round: 3, Type: "System design", Description: "Design social media feed architecture" },
      { Round: 4, Type: "Culture interview", Description: "Diversity and regional market understanding" }
    ],
    FrameworksOrTools: ["React", "Redux", "TypeScript", "WebRTC"],
    DSA: "Medium",
    SpecialFocusAreas: ["Social media features", "Real-time chat", "Content feeds"],
    Notes: "Social media unicorn, regional focus, high growth hiring"
  },
  {
    Company: "Dream11",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://dream11.com/careers/frontend-developer",
    NoOfInterviewRounds: 3,
    RoundBreakdown: [
      { Round: 1, Type: "Technical screening", Description: "Frontend and fantasy sports interest" },
      { Round: 2, Type: "Coding challenge", Description: "Build fantasy team selection interface" },
      { Round: 3, Type: "Final discussion", Description: "Sports knowledge and technical expertise" }
    ],
    FrameworksOrTools: ["React", "Redux", "TypeScript", "Socket.io"],
    DSA: "Medium",
    SpecialFocusAreas: ["Real-time updates", "Gaming UI", "Performance optimization"],
    Notes: "Fantasy sports leader, gaming domain, fast-paced development"
  },
  {
    Company: "Groww",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://groww.in/careers/frontend-engineer",
    NoOfInterviewRounds: 3,
    RoundBreakdown: [
      { Round: 1, Type: "Initial call", Description: "Investment platform and fintech interest" },
      { Round: 2, Type: "Technical test", Description: "Build investment tracking dashboard" },
      { Round: 3, Type: "Culture interview", Description: "Simplicity focus and user-first thinking" }
    ],
    FrameworksOrTools: ["React", "TypeScript", "Redux", "Chart.js"],
    DSA: "Low",
    SpecialFocusAreas: ["Financial dashboards", "Data visualization", "User experience"],
    Notes: "Investment app unicorn, user-centric design, rapid scaling"
  },
  {
    Company: "Licious",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://licious.com/careers/frontend-developer",
    NoOfInterviewRounds: 3,
    RoundBreakdown: [
      { Round: 1, Type: "Phone screen", Description: "E-commerce and food delivery domain" },
      { Round: 2, Type: "Technical assignment", Description: "Build meat ordering interface with complex filters" },
      { Round: 3, Type: "Final interview", Description: "Code discussion and operational excellence" }
    ],
    FrameworksOrTools: ["React", "Redux", "TypeScript", "PWA"],
    DSA: "Low",
    SpecialFocusAreas: ["E-commerce flows", "Location services", "Mobile-first design"],
    Notes: "D2C meat delivery, operational focus, expanding tech team"
  },
  {
    Company: "Urban Company",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://urbancompany.com/careers/frontend-engineer",
    NoOfInterviewRounds: 4,
    RoundBreakdown: [
      { Round: 1, Type: "Recruiter screen", Description: "Service marketplace and on-demand economy" },
      { Round: 2, Type: "Technical coding", Description: "React service booking flow development" },
      { Round: 3, Type: "System design", Description: "Design service provider dashboard" },
      { Round: 4, Type: "Leadership interview", Description: "Scaling mindset and operational thinking" }
    ],
    FrameworksOrTools: ["React", "Redux", "TypeScript", "React Native"],
    DSA: "Medium",
    SpecialFocusAreas: ["Marketplace UI", "Real-time tracking", "Multi-sided platforms"],
    Notes: "Home services leader, international expansion, strong tech culture"
  },
  {
    Company: "Dunzo",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://dunzo.com/careers/frontend-developer",
    NoOfInterviewRounds: 3,
    RoundBreakdown: [
      { Round: 1, Type: "Technical phone", Description: "On-demand delivery and hyperlocal experience" },
      { Round: 2, Type: "Coding challenge", Description: "Build delivery tracking interface" },
      { Round: 3, Type: "Culture interview", Description: "Speed and agility mindset" }
    ],
    FrameworksOrTools: ["React", "Redux", "TypeScript", "Maps API"],
    DSA: "Low",
    SpecialFocusAreas: ["Real-time tracking", "Maps integration", "Performance"],
    Notes: "Hyperlocal delivery, fast execution, startup culture"
  },
  {
    Company: "Zeta",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://zeta.tech/careers/frontend-engineer",
    NoOfInterviewRounds: 4,
    RoundBreakdown: [
      { Round: 1, Type: "Phone screen", Description: "Banking technology and fintech interest" },
      { Round: 2, Type: "Technical interview", Description: "React banking dashboard development" },
      { Round: 3, Type: "System design", Description: "Design financial transaction interface" },
      { Round: 4, Type: "Culture interview", Description: "Innovation and engineering excellence" }
    ],
    FrameworksOrTools: ["React", "Angular", "TypeScript", "Node.js"],
    DSA: "Medium",
    SpecialFocusAreas: ["Banking UI", "Security", "Compliance"],
    Notes: "Banking tech unicorn, B2B focus, strong engineering practices"
  },
  {
    Company: "Postman",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://postman.com/careers/frontend-engineer",
    NoOfInterviewRounds: 4,
    RoundBreakdown: [
      { Round: 1, Type: "Recruiter call", Description: "API development and developer tools experience" },
      { Round: 2, Type: "Technical interview", Description: "React component development for developer tools" },
      { Round: 3, Type: "System design", Description: "Design API testing interface" },
      { Round: 4, Type: "Team interview", Description: "Developer empathy and product thinking" }
    ],
    FrameworksOrTools: ["React", "Electron", "TypeScript", "Node.js"],
    DSA: "Medium",
    SpecialFocusAreas: ["Developer tools", "Desktop apps", "API interfaces"],
    Notes: "Developer tools unicorn, global remote team, strong engineering culture"
  },
  {
    Company: "Freshworks",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://freshworks.com/careers/frontend-engineer",
    NoOfInterviewRounds: 3,
    RoundBreakdown: [
      { Round: 1, Type: "Phone screen", Description: "SaaS and customer support software experience" },
      { Round: 2, Type: "Technical assignment", Description: "Build customer support dashboard" },
      { Round: 3, Type: "Final interview", Description: "Product thinking and customer obsession" }
    ],
    FrameworksOrTools: ["React", "Vue.js", "TypeScript", "Ruby on Rails"],
    DSA: "Low",
    SpecialFocusAreas: ["SaaS interfaces", "Customer experience", "Accessibility"],
    Notes: "Global SaaS company, Chennai-based, strong product culture"
  },
  {
    Company: "Chargebee",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://chargebee.com/careers/frontend-developer",
    NoOfInterviewRounds: 3,
    RoundBreakdown: [
      { Round: 1, Type: "Initial call", Description: "Subscription billing and SaaS experience" },
      { Round: 2, Type: "Technical test", Description: "Build billing dashboard with React" },
      { Round: 3, Type: "Culture interview", Description: "Global mindset and remote collaboration" }
    ],
    FrameworksOrTools: ["React", "TypeScript", "Redux", "GraphQL"],
    DSA: "Low",
    SpecialFocusAreas: ["Billing interfaces", "Data visualization", "SaaS UX"],
    Notes: "Subscription management leader, global customers, remote-friendly"
  },
  {
    Company: "Zoho",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://zoho.com/careers/frontend-engineer",
    NoOfInterviewRounds: 4,
    RoundBreakdown: [
      { Round: 1, Type: "Aptitude test", Description: "Programming logic and analytical thinking" },
      { Round: 2, Type: "Technical interview", Description: "JavaScript and framework knowledge" },
      { Round: 3, Type: "Practical coding", Description: "Build business application component" },
      { Round: 4, Type: "HR interview", Description: "Cultural fit and long-term commitment" }
    ],
    FrameworksOrTools: ["JavaScript", "React", "Angular", "Custom Frameworks"],
    DSA: "Medium",
    SpecialFocusAreas: ["Business applications", "Enterprise UI", "Performance"],
    Notes: "Large software suite, Chennai-based, stable long-term growth"
  },
  {
    Company: "ClearTax",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://cleartax.in/careers/frontend-developer",
    NoOfInterviewRounds: 3,
    RoundBreakdown: [
      { Round: 1, Type: "Phone screen", Description: "Tax technology and fintech domain" },
      { Round: 2, Type: "Technical challenge", Description: "Build tax filing interface" },
      { Round: 3, Type: "Final interview", Description: "Compliance understanding and technical skills" }
    ],
    FrameworksOrTools: ["React", "Redux", "TypeScript", "Next.js"],
    DSA: "Low",
    SpecialFocusAreas: ["Forms and validation", "Tax compliance", "User experience"],
    Notes: "Tax tech leader, compliance-heavy domain, good growth opportunities"
  },
  {
    Company: "Inshorts",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://inshorts.com/careers/frontend-engineer",
    NoOfInterviewRounds: 3,
    RoundBreakdown: [
      { Round: 1, Type: "Technical screen", Description: "News app and content consumption platforms" },
      { Round: 2, Type: "Coding test", Description: "Build news feed with infinite scroll" },
      { Round: 3, Type: "Culture interview", Description: "Content understanding and user engagement" }
    ],
    FrameworksOrTools: ["React", "React Native", "Redux", "PWA"],
    DSA: "Low",
    SpecialFocusAreas: ["Content feeds", "Mobile optimization", "Performance"],
    Notes: "News aggregation app, content-focused, mobile-first approach"
  },
  {
    Company: "Polygon (Matic)",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://polygon.technology/careers/frontend-engineer",
    NoOfInterviewRounds: 3,
    RoundBreakdown: [
      { Round: 1, Type: "Technical screen", Description: "Web3 and blockchain interface development" },
      { Round: 2, Type: "Coding challenge", Description: "Build DeFi dashboard with Web3 integration" },
      { Round: 3, Type: "Culture interview", Description: "Decentralized future and remote collaboration" }
    ],
    FrameworksOrTools: ["React", "TypeScript", "Web3.js", "Ethers.js"],
    DSA: "Medium",
    SpecialFocusAreas: ["Web3 integration", "Blockchain data", "DeFi interfaces"],
    Notes: "Indian Web3 unicorn, global distributed team, competitive packages"
  },
  {
    Company: "Paytm",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://paytm.com/careers/frontend-engineer",
    NoOfInterviewRounds: 4,
    RoundBreakdown: [
      { Round: 1, Type: "Phone screen", Description: "Digital payments and super app experience" },
      { Round: 2, Type: "Technical coding", Description: "React payment and commerce features" },
      { Round: 3, Type: "System design", Description: "Design super app architecture" },
      { Round: 4, Type: "Leadership interview", Description: "Scale mindset and innovation thinking" }
    ],
    FrameworksOrTools: ["React", "React Native", "Redux", "TypeScript"],
    DSA: "Medium",
    SpecialFocusAreas: ["Payment flows", "Super app architecture", "Performance"],
    Notes: "Digital payments leader, diverse product portfolio, large scale hiring"
  },
  {
    Company: "Ola",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://ola.com/careers/frontend-developer",
    NoOfInterviewRounds: 4,
    RoundBreakdown: [
      { Round: 1, Type: "Recruiter screen", Description: "Mobility and ride-hailing platform experience" },
      { Round: 2, Type: "Technical interview", Description: "React ride booking interface development" },
      { Round: 3, Type: "System design", Description: "Design driver-passenger matching interface" },
      { Round: 4, Type: "Behavioral interview", Description: "Fast-paced environment and problem solving" }
    ],
    FrameworksOrTools: ["React", "React Native", "Redux", "Maps API"],
    DSA: "Medium",
    SpecialFocusAreas: ["Real-time tracking", "Maps integration", "Mobile optimization"],
    Notes: "Mobility unicorn, diverse mobility solutions, expanding globally"
  },
  {
    Company: "Cars24",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://cars24.com/careers/frontend-engineer",
    NoOfInterviewRounds: 3,
    RoundBreakdown: [
      { Round: 1, Type: "Phone screen", Description: "Automotive marketplace and e-commerce experience" },
      { Round: 2, Type: "Technical assignment", Description: "Build car listing and comparison interface" },
      { Round: 3, Type: "Final interview", Description: "Product thinking and marketplace understanding" }
    ],
    FrameworksOrTools: ["React", "Next.js", "TypeScript", "Redux"],
    DSA: "Low",
    SpecialFocusAreas: ["E-commerce UI", "Search and filters", "Image optimization"],
    Notes: "Used car marketplace unicorn, expanding internationally, rapid hiring"
  },
  {
    Company: "Cred (Kunal Shah)",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://cred.club/careers/frontend-engineer",
    NoOfInterviewRounds: 4,
    RoundBreakdown: [
      { Round: 1, Type: "Portfolio review", Description: "Design sensibility and premium product focus" },
      { Round: 2, Type: "Technical interview", Description: "React animation and micro-interactions" },
      { Round: 3, Type: "Design challenge", Description: "Build premium fintech interface" },
      { Round: 4, Type: "Culture interview", Description: "Attention to detail and user obsession" }
    ],
    FrameworksOrTools: ["React", "React Native", "TypeScript", "Framer Motion"],
    DSA: "Medium",
    SpecialFocusAreas: ["Premium UI", "Animations", "Micro-interactions"],
    Notes: "Premium credit card app, design-heavy, selective hiring for quality"
  },
  {
    Company: "Vessel (Foreign - YC)",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://vessel.com/careers/frontend-engineer",
    NoOfInterviewRounds: 3,
    RoundBreakdown: [
      { Round: 1, Type: "Initial call", Description: "Creator economy and video platform interest" },
      { Round: 2, Type: "Technical challenge", Description: "Build video streaming interface" },
      { Round: 3, Type: "Team interview", Description: "Startup mindset and fast execution" }
    ],
    FrameworksOrTools: ["React", "TypeScript", "Video.js", "WebRTC"],
    DSA: "Low",
    SpecialFocusAreas: ["Video streaming", "Creator tools", "Performance optimization"],
    Notes: "YC-backed video platform, aggressive hiring for creator economy"
  },
  {
    Company: "Faire (Foreign)",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://faire.com/careers/frontend-engineer",
    NoOfInterviewRounds: 4,
    RoundBreakdown: [
      { Round: 1, Type: "Recruiter screen", Description: "B2B marketplace and wholesale experience" },
      { Round: 2, Type: "Technical interview", Description: "React B2B dashboard development" },
      { Round: 3, Type: "System design", Description: "Design wholesale ordering platform" },
      { Round: 4, Type: "Culture interview", Description: "Small business empathy and growth mindset" }
    ],
    FrameworksOrTools: ["React", "TypeScript", "GraphQL", "Next.js"],
    DSA: "Medium",
    SpecialFocusAreas: ["B2B interfaces", "Marketplace features", "Data visualization"],
    Notes: "Wholesale marketplace unicorn, rapid expansion, strong engineering culture"
  },
  {
    Company: "Ramp (Foreign)",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://ramp.com/careers/frontend-engineer",
    NoOfInterviewRounds: 4,
    RoundBreakdown: [
      { Round: 1, Type: "Phone screen", Description: "Corporate card and expense management experience" },
      { Round: 2, Type: "Technical coding", Description: "React financial dashboard development" },
      { Round: 3, Type: "System design", Description: "Design expense tracking interface" },
      { Round: 4, Type: "Team interview", Description: "B2B product thinking and execution speed" }
    ],
    FrameworksOrTools: ["React", "TypeScript", "Next.js", "GraphQL"],
    DSA: "Medium",
    SpecialFocusAreas: ["Financial interfaces", "B2B UX", "Data visualization"],
    Notes: "Corporate card unicorn, fast-growing, excellent compensation packages"
  },
  {
    Company: "Mercury (Foreign)",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://mercury.com/careers/frontend-engineer",
    NoOfInterviewRounds: 3,
    RoundBreakdown: [
      { Round: 1, Type: "Initial call", Description: "Banking for startups and fintech interest" },
      { Round: 2, Type: "Technical test", Description: "Build banking dashboard interface" },
      { Round: 3, Type: "Culture interview", Description: "Startup empathy and product focus" }
    ],
    FrameworksOrTools: ["React", "TypeScript", "GraphQL", "Next.js"],
    DSA: "Low",
    SpecialFocusAreas: ["Banking UI", "Startup-focused features", "Security"],
    Notes: "Startup banking platform, strong product culture, competitive packages"
  },
  {
    Company: "Brex (Foreign)",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://brex.com/careers/frontend-engineer",
    NoOfInterviewRounds: 4,
    RoundBreakdown: [
      { Round: 1, Type: "Recruiter call", Description: "Corporate finance and startup experience" },
      { Round: 2, Type: "Technical interview", Description: "React financial product development" },
      { Round: 3, Type: "System design", Description: "Design corporate expense platform" },
      { Round: 4, Type: "Leadership interview", Description: "Scale thinking and innovation mindset" }
    ],
    FrameworksOrTools: ["React", "TypeScript", "GraphQL", "Next.js"],
    DSA: "Medium",
    SpecialFocusAreas: ["Financial products", "B2B interfaces", "Compliance"],
    Notes: "Corporate finance unicorn, strong engineering team, excellent benefits"
  },
  {
    Company: "Lattice (Foreign)",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://lattice.com/careers/frontend-engineer",
    NoOfInterviewRounds: 3,
    RoundBreakdown: [
      { Round: 1, Type: "Phone screen", Description: "HR tech and people management software" },
      { Round: 2, Type: "Technical challenge", Description: "Build performance review interface" },
      { Round: 3, Type: "Team interview", Description: "Product thinking and user empathy" }
    ],
    FrameworksOrTools: ["React", "TypeScript", "Redux", "GraphQL"],
    DSA: "Low",
    SpecialFocusAreas: ["HR interfaces", "Data visualization", "User experience"],
    Notes: "HR tech leader, people-focused culture, strong growth trajectory"
  },
  {
    Company: "Clubhouse (Foreign)",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://clubhouse.com/careers/frontend-engineer",
    NoOfInterviewRounds: 3,
    RoundBreakdown: [
      { Round: 1, Type: "Technical screen", Description: "Audio social and real-time communication" },
      { Round: 2, Type: "Coding challenge", Description: "Build audio room interface" },
      { Round: 3, Type: "Culture interview", Description: "Audio-first thinking and community building" }
    ],
    FrameworksOrTools: ["React", "TypeScript", "WebRTC", "Real-time"],
    DSA: "Medium",
    SpecialFocusAreas: ["Audio interfaces", "Real-time communication", "Social features"],
    Notes: "Audio social pioneer, innovative product, rapid feature development"
  },
  {
    Company: "Primer (Foreign)",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://primer.io/careers/frontend-engineer",
    NoOfInterviewRounds: 3,
    RoundBreakdown: [
      { Round: 1, Type: "Initial call", Description: "Payment infrastructure and fintech APIs" },
      { Round: 2, Type: "Technical test", Description: "Build payment checkout flow" },
      { Round: 3, Type: "Final interview", Description: "API-first thinking and developer experience" }
    ],
    FrameworksOrTools: ["React", "TypeScript", "Payment APIs", "Next.js"],
    DSA: "Medium",
    SpecialFocusAreas: ["Payment flows", "Developer tools", "API integration"],
    Notes: "Payment infrastructure startup, developer-focused, strong technical team"
  },
  {
    Company: "Secfi (Foreign)",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://secfi.com/careers/frontend-developer",
    NoOfInterviewRounds: 3,
    RoundBreakdown: [
      { Round: 1, Type: "Phone screen", Description: "Equity and startup employee finance" },
      { Round: 2, Type: "Technical assignment", Description: "Build equity management dashboard" },
      { Round: 3, Type: "Culture interview", Description: "Startup empathy and financial product understanding" }
    ],
    FrameworksOrTools: ["React", "TypeScript", "Chart.js", "Financial APIs"],
    DSA: "Low",
    SpecialFocusAreas: ["Financial dashboards", "Data visualization", "Equity management"],
    Notes: "Startup equity financing, niche market, strong product-market fit"
  },
  {
    Company: "AngelList (Foreign)",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://angel.co/careers/frontend-engineer",
    NoOfInterviewRounds: 4,
    RoundBreakdown: [
      { Round: 1, Type: "Recruiter screen", Description: "Startup ecosystem and investment platform" },
      { Round: 2, Type: "Technical interview", Description: "React startup marketplace development" },
      { Round: 3, Type: "Product interview", Description: "Startup founder and investor needs understanding" },
      { Round: 4, Type: "Culture interview", Description: "Startup mindset and ecosystem thinking" }
    ],
    FrameworksOrTools: ["React", "Redux", "TypeScript", "GraphQL"],
    DSA: "Medium",
    SpecialFocusAreas: ["Marketplace interfaces", "Investment tools", "Startup workflows"],
    Notes: "Startup ecosystem platform, strong network effects, innovative hiring"
  },
  {
    Company: "Calendly (Foreign)",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://calendly.com/careers/frontend-engineer",
    NoOfInterviewRounds: 4,
    RoundBreakdown: [
      { Round: 1, Type: "Phone screen", Description: "Scheduling software and productivity tools" },
      { Round: 2, Type: "Technical interview", Description: "React calendar and scheduling interface" },
      { Round: 3, Type: "System design", Description: "Design scheduling conflict resolution UI" },
      { Round: 4, Type: "Behavioral interview", Description: "User empathy and product thinking" }
    ],
    FrameworksOrTools: ["React", "TypeScript", "Calendar APIs", "Real-time"],
    DSA: "Medium",
    SpecialFocusAreas: ["Calendar interfaces", "Scheduling logic", "Time zone handling"],
    Notes: "Scheduling automation leader, strong product-market fit, rapid growth"
  },
  {
    Company: "Superhuman (Foreign)",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://superhuman.com/careers/frontend-engineer",
    NoOfInterviewRounds: 4,
    RoundBreakdown: [
      { Round: 1, Type: "Product screen", Description: "Email productivity and power user tools" },
      { Round: 2, Type: "Technical interview", Description: "React high-performance email interface" },
      { Round: 3, Type: "System design", Description: "Design email client architecture" },
      { Round: 4, Type: "Culture interview", Description: "Speed obsession and user delight" }
    ],
    FrameworksOrTools: ["React", "TypeScript", "Electron", "Performance"],
    DSA: "High",
    SpecialFocusAreas: ["Performance optimization", "Keyboard shortcuts", "Email interfaces"],
    Notes: "Premium email client, performance-obsessed culture, selective hiring"
  },
  {
    Company: "Linear (Foreign)",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://linear.app/careers/frontend-engineer",
    NoOfInterviewRounds: 4,
    RoundBreakdown: [
      { Round: 1, Type: "Portfolio review", Description: "Design sensibility and tool-building experience" },
      { Round: 2, Type: "Technical interview", Description: "React performance and animation implementation" },
      { Round: 3, Type: "Design challenge", Description: "Build project management interface" },
      { Round: 4, Type: "Culture interview", Description: "Attention to detail and craftsmanship" }
    ],
    FrameworksOrTools: ["React", "TypeScript", "Framer Motion", "GraphQL"],
    DSA: "Medium",
    SpecialFocusAreas: ["Performance", "Animations", "Keyboard shortcuts", "Design systems"],
    Notes: "Project management tool with exceptional UX, design-focused hiring"
  },
  {
    Company: "Clay (Foreign)",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://clay.com/careers/frontend-engineer",
    NoOfInterviewRounds: 3,
    RoundBreakdown: [
      { Round: 1, Type: "Initial call", Description: "CRM and relationship management tools" },
      { Round: 2, Type: "Technical challenge", Description: "Build contact management interface" },
      { Round: 3, Type: "Team interview", Description: "Product thinking and relationship-focused mindset" }
    ],
    FrameworksOrTools: ["React", "TypeScript", "GraphQL", "Real-time"],
    DSA: "Low",
    SpecialFocusAreas: ["CRM interfaces", "Contact management", "Data visualization"],
    Notes: "Modern CRM platform, relationship-focused product, growing team"
  },
  {
    Company: "Gamma (Foreign)",
    HiringForFrontEnd: "Yes",
    JobDescriptionLink: "https://gamma.app/careers/frontend-engineer",
    NoOfInterviewRounds: 3,
    RoundBreakdown: [
      { Round: 1, Type: "Technical screen", Description: "Presentation software and AI-powered tools" },
      { Round: 2, Type: "Coding challenge", Description: "Build AI presentation interface" },
      { Round: 3, Type: "Culture interview", Description: "AI-first thinking and design automation" }
    ],
    FrameworksOrTools: ["React", "TypeScript", "AI APIs", "Canvas"],
    DSA: "Medium",
    SpecialFocusAreas: ["AI interfaces", "Presentation tools", "Design automation"],
    Notes: "AI-powered presentation tool, innovative product, rapid user growth"
  }
];
