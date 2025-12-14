export interface AnalysisResult {
  score: number;
  tier: "Bronze" | "Silver" | "Gold";
  category: "Beginner" | "Intermediate" | "Advanced";
  summary: string;
  strengths: string[];
  weaknesses: string[];
  roadmap: RoadmapItem[];
  stats: RepoStats;
  breakdown: ScoreBreakdown;
}

export interface RoadmapItem {
  id: string;
  title: string;
  description: string;
  priority: "High" | "Medium" | "Low";
  completed: boolean;
}

export interface RepoStats {
  languages: { [key: string]: number };
  totalFiles: number;
  totalFolders: number;
  linesOfCode: number;
  commits: number;
  branches: number;
  stars: number;
  forks: number;
  createdAt: string;
  lastUpdated: string;
}

export interface ScoreBreakdown {
  codeQuality: number;
  structure: number;
  documentation: number;
  testing: number;
  gitPractices: number;
}

export interface GitHubRepoData {
  name: string;
  description: string;
  languages: { [key: string]: number };
  files: FileInfo[];
  readme: string;
  commits: CommitInfo[];
  branches: number;
  stars: number;
  forks: number;
  size: number;
  createdAt: string;
  updatedAt: string;
  hasTests: boolean;
  hasCICD: boolean;
  hasLinting: boolean;
  hasGitignore: boolean;
  packageJson: object | null;
}

export interface FileInfo {
  path: string;
  type: "file" | "dir";
  size?: number;
}

export interface CommitInfo {
  sha: string;
  message: string;
  date: string;
}

export type AnalysisStatus =
  | "idle"
  | "fetching"
  | "analyzing"
  | "generating"
  | "complete"
  | "error";