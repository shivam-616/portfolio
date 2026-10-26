/**
 * All site content lives here.
 * Shivam Mittal — Portfolio data.
 */

export const site = {
  name: "Shivam Mittal",
  title: "Software Engineer · GET at GridCrest Technologies",
  domain: "shivam-616.github.io",
  tagline: "Shivam Mittal — Portfolio",
  bio: "Computer Science graduate from Vellore Institute of Technology starting my first role as a Graduate Engineer Trainee (GET) at GridCrest Technologies. Backend-focused software engineer comfortable with Java, Spring Boot, REST APIs, Apache Kafka, and Docker microservices.",
  resumePath: "/resume.pdf",
  timezone: "Asia/Kolkata",
  timezoneLabel: "IST",
  footer: "Crafted with focus and care.",
  contactNote:
    "Feel free to reach out for software engineering discussions, tech chats, or collaborations.",
  /**
   * Discord presence via Lanyard API. Use "0" to keep the clock only.
   */
  lanyardDiscordId: "0",
} as const;

export const socials = [
  {
    label: "Email",
    value: "shivam.mittal307@gmail.com",
    href: "mailto:shivam.mittal307@gmail.com",
    copy: true,
  },
  {
    label: "GitHub",
    value: "github.com/shivam-616",
    href: "https://github.com/shivam-616",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/shivam-mittal",
    href: "https://linkedin.com/in/shivam-mittal",
  },
  {
    label: "Mobile",
    value: "+91-789 039 9551",
    href: "tel:+917890399551",
  },
] as const;

export type Experience = {
  company: string;
  role: string;
  start: string;
  end: string | null;
  duration?: string;
  location?: string;
  summary: string;
  featured?: boolean;
};

export const experience: Experience[] = [
  {
    company: "GridCrest Technologies",
    role: "Graduate Engineer Trainee (GET)",
    start: "Nov 2, 2026",
    end: null,
    duration: "Active Company",
    location: "On-site",
    summary:
      "Starting first full-time role as Graduate Engineer Trainee (GET), focusing on backend software engineering, scalable architectures, and core system services.",
    featured: true,
  },
  {
    company: "Ninternet",
    role: "Event Development Intern",
    start: "June 2026",
    end: "August 2026",
    duration: "3 mos internship",
    location: "Remote",
    summary:
      "Authored the PRD and built the captive portal backend, preparing it for a live on-site demo of the Wi-Fi mesh platform to senior telecom executives. Built and documented REST API endpoints for a Wi-Fi mesh network platform, using Redis for token validation and a MySQL data layer on AWS RDS.",
    featured: true,
  },
];

export const featuredExperience = experience;

export type Education = {
  institution: string;
  degree: string;
  start: string;
  end: string;
  score: string;
};

export const education: Education[] = [
  {
    institution: "Vellore Institute of Technology",
    degree: "B.Tech in Computer Science and Engineering",
    start: "2022",
    end: "2026",
    score: "CGPA: 7.8/10",
  },
  {
    institution: "Agrasain Boys School",
    degree: "Class XII (ICSE)",
    start: "2020",
    end: "2022",
    score: "Score: 87%",
  },
];

export type SkillGroup = {
  category: string;
  items: string[];
};

export const skills: SkillGroup[] = [
  {
    category: "Languages",
    items: ["Java", "Python", "SQL"],
  },
  {
    category: "Backend & Frameworks",
    items: [
      "Spring Boot",
      "Spring Data JPA",
      "Spring AI",
      "WebSockets",
      "REST APIs",
    ],
  },
  {
    category: "Messaging & Data",
    items: ["Apache Kafka", "Redis", "MySQL", "AWS RDS"],
  },
  {
    category: "Cloud & DevOps",
    items: [
      "AWS (RDS)",
      "Google Cloud (Cloud SQL)",
      "Docker",
      "Docker Compose",
      "GitHub Actions (CI/CD)",
    ],
  },
  {
    category: "API & Tools",
    items: ["Postman (API Testing)", "OpenAPI/Swagger", "Git"],
  },
  {
    category: "Core Areas",
    items: ["OOP", "Operating Systems", "Data Structures & Algorithms"],
  },
];

export const achievements = [
  "Solved 320+ DSA problems on LeetCode, including 160+ medium-level questions.",
  "Built a custom HTTP server and an echo server with LRU caching from scratch (no framework) to strengthen networking and caching fundamentals.",
  "Completed JPMorgan Chase and AWS virtual simulations focused on backend API development and deployment work.",
  "Certifications: Bits and Bytes of Computer Networking (Coursera), Blockchain Fundamentals, OCI Foundations Associate (Issued).",
  "Participated in Secvita cybersecurity hackathon (bug hunting) and UX design hackathon at VIT.",
  "Languages: English (Full Professional), Hindi (Native), Bengali (Conversational).",
];

export type Project = {
  name: string;
  type: string;
  description: string;
  stack: string[];
  source?: string;
  live?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    name: "Expense Tracker",
    type: "Microservices & AI Backend",
    description:
      "A microservices-based backend in Java/Spring Boot using Apache Kafka for async messaging and Kong API Gateway for request routing. Features an SMS processing pipeline using Spring AI with basic PII detection and masking for sensitive fields. Containerized with Docker Compose using database-per-service isolation, JWT authentication, and Kafka consumers.",
    stack: [
      "Spring Boot",
      "Spring AI",
      "LLM",
      "Kafka",
      "Kong",
      "JWT",
      "Docker",
      "AWS",
      "MySQL",
    ],
    source: "https://github.com/shivam-616",
    live: "https://github.com/shivam-616",
    featured: true,
  },
  {
    name: "LAN P2P Chat (CLI)",
    type: "Networking CLI Tool",
    description:
      "A command-line peer-to-peer chat tool for local networks using UDP broadcast for peer discovery and TCP for direct messaging. Designed a probe-response discovery model and automatic friend-list building based on message exchange history. Used multithreading to handle peer listening and active chats concurrently.",
    stack: ["Java", "UDP/TCP Sockets", "Multithreading"],
    source: "https://github.com/shivam-616",
    live: "https://github.com/shivam-616",
    featured: true,
  },
  {
    name: "QR-Driven Queue Automation",
    type: "Real-time Queue Platform",
    description:
      "QR-based onboarding system where users join active queues within 1–2 seconds after scanning. Delivered 7 OpenAPI-documented REST endpoints with MySQL/Cloud SQL support, and tested with 50–100 concurrent users on the WebSocket update flow keeping updates under 120ms.",
    stack: [
      "Java",
      "Spring Boot",
      "WebSockets",
      "Docker",
      "MySQL",
      "OpenAPI",
      "Google Cloud",
    ],
    source: "https://github.com/shivam-616",
    live: "https://github.com/shivam-616",
    featured: true,
  },
  {
    name: "HTTP & Echo Server from Scratch",
    type: "Systems & Networking",
    description:
      "Built a basic HTTP server and an echo server with LRU caching from scratch (no framework) to strengthen networking and caching fundamentals.",
    stack: ["Java", "Sockets", "HTTP", "LRU Cache", "Multithreading"],
    source: "https://github.com/shivam-616",
    live: "https://github.com/shivam-616",
    featured: false,
  },
];

export type Post = {
  slug: string;
  title: string;
  date: string;
  minutes: number;
  excerpt: string;
  body: string;
};

// Set to empty for now; blog section renders "Coming Soon"
export const posts: Post[] = [];

export const featuredProjects = projects.filter((p) => p.featured).slice(0, 3);

export function formatPostDate(iso: string) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
