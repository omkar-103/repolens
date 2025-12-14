import { GitHubRepoData, ScoreBreakdown } from "@/types";

export function analyzeRepo(data: GitHubRepoData): {
  score: number;
  breakdown: ScoreBreakdown;
  tier: "Bronze" | "Silver" | "Gold";
  category: "Beginner" | "Intermediate" | "Advanced";
} {
  const breakdown: ScoreBreakdown = {
    codeQuality: calculateCodeQuality(data),
    structure: calculateStructure(data),
    documentation: calculateDocumentation(data),
    testing: calculateTesting(data),
    gitPractices: calculateGitPractices(data),
  };

  const score = Math.min(
    100,
    breakdown.codeQuality +
      breakdown.structure +
      breakdown.documentation +
      breakdown.testing +
      breakdown.gitPractices
  );

  let tier: "Bronze" | "Silver" | "Gold";
  let category: "Beginner" | "Intermediate" | "Advanced";

  if (score >= 71) {
    tier = "Gold";
    category = "Advanced";
  } else if (score >= 41) {
    tier = "Silver";
    category = "Intermediate";
  } else {
    tier = "Bronze";
    category = "Beginner";
  }

  return { score, breakdown, tier, category };
}

function calculateCodeQuality(data: GitHubRepoData): number {
  let score = 0;

  // Linting config (+5)
  if (data.hasLinting) score += 5;

  // Average file size check (+10)
  const codeFiles = data.files.filter(
    (f) =>
      f.type === "file" &&
      (f.path.endsWith(".js") ||
        f.path.endsWith(".ts") ||
        f.path.endsWith(".jsx") ||
        f.path.endsWith(".tsx") ||
        f.path.endsWith(".py") ||
        f.path.endsWith(".java"))
  );
  const avgSize =
    codeFiles.length > 0
      ? codeFiles.reduce((sum, f) => sum + (f.size || 0), 0) / codeFiles.length
      : 0;
  if (avgSize < 10000) score += 10;
  else if (avgSize < 20000) score += 5;

  // Gitignore (+5)
  if (data.hasGitignore) score += 5;

  // Modern frameworks (+5)
  const modernLanguages = [
    "TypeScript",
    "Rust",
    "Go",
    "Kotlin",
    "Swift",
    "Python",
  ];
  if (
    Object.keys(data.languages).some((lang) => modernLanguages.includes(lang))
  ) {
    score += 5;
  }

  return Math.min(25, score);
}

function calculateStructure(data: GitHubRepoData): number {
  let score = 0;

  // Organized folders (+10)
  const organizedFolders = [
    "src",
    "lib",
    "components",
    "utils",
    "hooks",
    "services",
    "api",
    "public",
    "assets",
    "app",
  ];
  const folders = data.files
    .filter((f) => f.type === "dir")
    .map((f) => f.path.split("/")[0]);
  const hasOrganization = organizedFolders.some((folder) =>
    folders.includes(folder)
  );
  if (hasOrganization) score += 10;

  // Config files properly placed (+5)
  const rootConfigs = data.files.filter(
    (f) =>
      f.type === "file" &&
      !f.path.includes("/") &&
      (f.path.endsWith(".json") ||
        f.path.endsWith(".config.js") ||
        f.path.endsWith(".config.ts") ||
        f.path.endsWith(".config.mjs"))
  );
  if (rootConfigs.length > 0) score += 5;

  // Reasonable file count (+5)
  const fileCount = data.files.filter((f) => f.type === "file").length;
  if (fileCount >= 5 && fileCount <= 500) score += 5;

  return Math.min(20, score);
}

function calculateDocumentation(data: GitHubRepoData): number {
  let score = 0;

  // README exists (+10)
  if (data.readme.length > 0) score += 10;

  // README quality (+5)
  if (data.readme.length > 500) {
    const hasHeaders = data.readme.includes("#");
    const hasSections =
      data.readme.toLowerCase().includes("install") ||
      data.readme.toLowerCase().includes("usage") ||
      data.readme.toLowerCase().includes("getting started");
    if (hasHeaders && hasSections) score += 5;
  }

  // Additional docs (+5)
  const hasDocs = data.files.some(
    (f) =>
      f.path.toLowerCase().includes("docs/") ||
      f.path.toLowerCase().includes("documentation") ||
      f.path.toLowerCase() === "contributing.md" ||
      f.path.toLowerCase() === "changelog.md"
  );
  if (hasDocs) score += 5;

  return Math.min(20, score);
}

function calculateTesting(data: GitHubRepoData): number {
  let score = 0;

  // Test files present (+10)
  if (data.hasTests) score += 10;

  // CI/CD config (+5)
  if (data.hasCICD) score += 5;

  return Math.min(15, score);
}

function calculateGitPractices(data: GitHubRepoData): number {
  let score = 0;

  // Regular commits (+10)
  if (data.commits.length >= 10) {
    const dates = data.commits.map((c) => new Date(c.date).toDateString());
    const uniqueDates = new Set(dates);
    if (uniqueDates.size >= 3) score += 10;
    else if (uniqueDates.size >= 2) score += 5;
  } else if (data.commits.length >= 5) {
    score += 5;
  }

  // Meaningful commit messages (+5)
  const meaningfulCommits = data.commits.filter((c) => {
    const msg = c.message.toLowerCase();
    return msg.length > 10 && !msg.startsWith("update") && msg !== "initial commit";
  });
  if (meaningfulCommits.length >= data.commits.length * 0.3) score += 5;

  // Multiple branches (+5)
  if (data.branches >= 2) score += 5;

  return Math.min(20, score);
}

export function calculateStats(data: GitHubRepoData) {
  const totalFiles = data.files.filter((f) => f.type === "file").length;
  const totalFolders = data.files.filter((f) => f.type === "dir").length;

  // Estimate lines of code from file sizes
  const codeExtensions = [
    ".js", ".ts", ".jsx", ".tsx", ".py", ".java", ".cpp", ".c", ".go", ".rs", ".rb", ".php",
  ];
  const codeFiles = data.files.filter(
    (f) =>
      f.type === "file" && codeExtensions.some((ext) => f.path.endsWith(ext))
  );
  const totalBytes = codeFiles.reduce((sum, f) => sum + (f.size || 0), 0);
  const linesOfCode = Math.round(totalBytes / 30);

  return {
    languages: data.languages,
    totalFiles,
    totalFolders,
    linesOfCode,
    commits: data.commits.length,
    branches: data.branches,
    stars: data.stars,
    forks: data.forks,
    createdAt: data.createdAt,
    lastUpdated: data.updatedAt,
  };
}