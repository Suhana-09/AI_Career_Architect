
export enum Proficiency {
  BEGINNER = 'Beginner',
  INTERMEDIATE = 'Intermediate',
  ADVANCED = 'Advanced'
}

export enum LearningStyle {
  VIDEOS = 'Videos',
  PROJECTS = 'Projects',
  READING = 'Reading',
  MIXED = 'Mixed'
}

export enum Timeline {
  THREE_MONTHS = '3 Months',
  SIX_MONTHS = '6 Months',
  ONE_YEAR = '1 Year'
}

export interface UserProfile {
  education: {
    degree: string;
    branch: string;
    year: string;
  };
  skills: string[];
  proficiency: Proficiency;
  targetRoles: string[];
  availability: string;
  timeline: Timeline;
  learningStyle: LearningStyle;
}

export interface SkillGap {
  strong: string[];
  partial: string[];
  missing: string[];
}

export interface RoadmapWeek {
  week: number;
  focus: string;
  tasks: string[];
}

export interface ProjectSuggestion {
  name: string;
  skillsGained: string[];
  relevance: string;
  githubStrategy: string;
}

export interface CareerPath {
  name: string;
  description: string;
  readinessLevel: number;
  confidenceScore: number;
  tradeOffs: string;
}

export interface ArchitectResponse {
  skillGapAnalysis: SkillGap;
  readinessScore: number;
  paths: CareerPath[];
  actionPlan: RoadmapWeek[];
  projects: ProjectSuggestion[];
  optimizationAdvice: string;
  reasoning: string;
}
