
import { Project, Experience, Education } from './types';

export const PERSONAL_INFO = {
  name: "Ahmed Gaafar",
  role: "Computer Engineering Student & Flutter Engineer",
  summary: "A dedicated Computer Engineering Student driven by challenges and innovation. Expert in mobile development with Flutter, with a strong foundation in hardware, cybersecurity, and emerging AI technologies.",
  email: "a.gaafar.junior@gmail.com",
  location: "Alexandria, Egypt",
  socials: {
    github: "github.com/agaafar7",
    linkedin: "linkedin.com/in/agaafar7",
    figma: "figma.com/@ahmedgaafar"
  }
};

export const PROJECTS: Project[] = [
  {
    id: "airwallex-plugin",
    name: "Airwallex Payment Plugin",
    shortDescription: "Custom Flutter plugin for cross-border payment integration.",
    fullDescription: "Developed a custom Flutter plugin to address the absence of existing packages on pub.dev. Successfully published after rigorous testing and refinement to enable seamless payment processing.",
    techStack: ["Flutter", "Dart", "Android", "iOS", "API Integration"],
    architecture: "Plugin Architecture with platform channels for native bridge communication. Adheres to pub.dev publishing standards.",
    aiUsage: "Utilized LLMs for optimizing native code bridges (Kotlin/Swift) and generating comprehensive unit tests for edge-case payment scenarios.",
    imageUrl: "https://picsum.photos/seed/airwallex/800/450"
  },
  {
    id: "xshop",
    name: "XShop eCommerce",
    shortDescription: "A high-performance eCommerce mobile application.",
    fullDescription: "XShop is an advanced eCommerce solution exploring the depths of the Flutter framework. Features complex state management, optimized performance, and seamless payment gateway integration.",
    techStack: ["Flutter", "Dart", "Firebase", "State Management", "Rest API"],
    architecture: "Clean Architecture with BLoC state management to ensure separation of concerns and scalability.",
    imageUrl: "https://picsum.photos/seed/xshop/800/450"
  },
  {
    id: "focus-todo",
    name: "Focus - Time Management",
    shortDescription: "Productivity application with 400+ active users.",
    fullDescription: "A high-impact personal Todo and time management application. Navigated complex technical hurdles during the development lifecycle and successfully scaled to a public user base.",
    techStack: ["Flutter", "Dart", "Local Storage", "User Experience"],
    architecture: "Modular UI design with reactive data binding, focusing on minimalist UX principles and low latency performance.",
    aiUsage: "Integrated basic NLP for task categorization and smart scheduling suggestions.",
    imageUrl: "https://picsum.photos/seed/focustodo/800/450"
  }
];

export const EXPERIENCES: Experience[] = [
  {
    company: "AAST-TV",
    role: "Head of Media & Organizer",
    period: "Jan 2024 - Present",
    highlights: [
      "Led media operations and team coordination for diverse technical backgrounds.",
      "Organized successful technical bootcamps and college-level events.",
      "Managed negotiation and leadership responsibilities under strict deadlines."
    ]
  },
  {
    company: "IEEE & Competitive Programming Club",
    role: "Active Member & Contestant",
    period: "2023 - Present",
    highlights: [
      "Third place team at X-Coders: Team Forge (Dec 2024).",
      "Best Design Prize Winner, RoboPirates Contest (May 2024).",
      "Participated in Mobile Mastery Boot Camp and Cyber Vigilance programs."
    ]
  },
  {
    company: "Rotaract Club of Alexandria Capital",
    role: "Contributor - Social Responsibility",
    period: "Apr 2024 - Apr 2024",
    highlights: [
      "Contributed to 'Alex. Kitchen' supporting community meal distribution.",
      "Demonstrated strong dedication to social impact and collaborative teamwork."
    ]
  }
];

export const EDUCATION: Education[] = [
  {
    institution: "Arab Academy for Science, Technology and Maritime Transport",
    degree: "B.E. in Computer Engineering",
    period: "2023 - Present",
    notable: "Focusing on hardware/software integration and advanced computer languages."
  }
];

export const SKILLS = {
  languages: ["Flutter/Dart", "Kotlin", "Java", "C++", "Arduino", "Javascript", "HTML/CSS"],
  technologies: ["Figma", "Framer", "Software Testing", "DevOps", "Ethical Hacking", "Git", "Google Cloud"],
  architectures: ["UI/UX Design", "Generative AI", "LLM Integration", "Cybersecurity", "Embedded Systems"]
};
