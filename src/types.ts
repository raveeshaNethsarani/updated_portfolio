export interface ProjectItem {
  id: string;
  number: string;
  title: string;
  tagline: string;
  category: string;
  role: string;
  clientOrContext: string;
  summary: string;
  description: string;
  technologies: string[];
  architecture: {
    frontend: string;
    backend: string;
    database: string;
    infrastructure: string;
    keyFlow: string;
  };
  metricsAndHighlights: string[];
  challengesAndSolutions: {
    challenge: string;
    solution: string;
  }[];
  githubUrl?: string;
  liveUrl?: string;
  accentColor: string;
  previewType: 'ai-agent' | 'webhook-pipeline' | 'rbac-system' | 'clinic-system' | 'e-commerce';
}

export interface SkillCategory {
  id: string;
  title: string;
  description: string;
  skills: {
    name: string;
    level: string;
    notes?: string;
    highlight?: boolean;
  }[];
}

export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  status: string;
  location: string;
  overview: string;
  focusAreas: {
    title: string;
    description: string;
    tags: string[];
  }[];
}

export interface EducationItem {
  institution: string;
  degree: string;
  department: string;
  location: string;
  period: string;
  highlights: string[];
}

export interface ExploringTopic {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  useCase: string;
  tags: string[];
  status: string;
}
