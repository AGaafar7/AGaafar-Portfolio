
export interface Project {
  id: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  techStack: string[];
  architecture: string;
  aiUsage?: string;
  demoUrl?: string;
  imageUrl: string;
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  highlights: string[];
}

export interface Education {
  institution: string;
  degree: string;
  period: string;
  notable: string;
}

export interface TerminalLine {
  type: 'input' | 'output' | 'error' | 'ai';
  content: string;
}

export type WindowType = 'terminal' | 'project' | 'about' | 'resume' | 'projects';

export interface WindowState {
  id: string;
  type: WindowType;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  position: { x: number; y: number };
  data?: any;
}
