import { GoogleGenerativeAI } from "@google/generative-ai";
import { GitHubRepoData, RoadmapItem } from "@/types";

export async function generateAIInsights(
  data: GitHubRepoData,
  score: number,
  tier: string
): Promise<{
  summary: string;
  strengths: string[];
  weaknesses: string[];
  roadmap: RoadmapItem[];
}> {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `You are a code quality expert. Analyze this GitHub repository and provide actionable insights.

Repository: ${data.name}
Description: ${data.description || "No description provided"}
Score: ${score}/100 (${tier} tier)
Languages: ${Object.keys(data.languages).join(", ") || "Unknown"}
Total Files: ${data.files.length}
Total Commits: ${data.commits.length}
Has Tests: ${data.hasTests ? "Yes" : "No"}
Has CI/CD: ${data.hasCICD ? "Yes" : "No"}
Has Linting: ${data.hasLinting ? "Yes" : "No"}
Has .gitignore: ${data.hasGitignore ? "Yes" : "No"}
Stars: ${data.stars}
Forks: ${data.forks}

Recent commit messages:
${data.commits.slice(0, 5).map((c) => `- ${c.message.slice(0, 100)}`).join("\n")}

README Preview (first 800 chars):
${data.readme.slice(0, 800)}

Based on this information, provide your analysis as a JSON object with this EXACT structure:
{
  "summary": "A 2-3 sentence summary describing what this repository does and its overall code quality",
  "strengths": ["strength 1", "strength 2", "strength 3"],
  "weaknesses": ["weakness 1", "weakness 2"],
  "roadmap": [
    {
      "title": "Short action title",
      "description": "Detailed description of what to do and why it matters",
      "priority": "High"
    }
  ]
}

IMPORTANT RULES:
- Provide exactly 3-4 strengths
- Provide exactly 2-3 weaknesses  
- Provide exactly 5-7 roadmap items
- Priority MUST be exactly one of: "High", "Medium", or "Low"
- Make roadmap items specific and actionable
- Respond with ONLY the JSON object, no markdown, no code blocks, no extra text`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const responseText = response.text() || "";
    
    console.log("Gemini response:", responseText.slice(0, 200));

    // Clean up the response - remove markdown code blocks if present
    let jsonString = responseText.trim();
    
    // Remove ```json and ``` markers
    jsonString = jsonString.replace(/^```json\s*/i, "");
    jsonString = jsonString.replace(/^```\s*/i, "");
    jsonString = jsonString.replace(/\s*```$/i, "");
    
    // Try to find JSON object
    const jsonMatch = jsonString.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.error("No JSON found in Gemini response");
      return getDefaultInsights(data);
    }

    const parsed = JSON.parse(jsonMatch[0]);

    return {
      summary: parsed.summary || "Analysis complete.",
      strengths: Array.isArray(parsed.strengths) ? parsed.strengths : [],
      weaknesses: Array.isArray(parsed.weaknesses) ? parsed.weaknesses : [],
      roadmap: Array.isArray(parsed.roadmap)
        ? parsed.roadmap.map(
            (
              item: { title?: string; description?: string; priority?: string },
              index: number
            ) => ({
              id: `roadmap-${index}`,
              title: item.title || "Improvement task",
              description: item.description || "No description provided",
              priority: validatePriority(item.priority),
              completed: false,
            })
          )
        : getDefaultRoadmap(),
    };
  } catch (error) {
    console.error("Gemini API error:", error);
    return getDefaultInsights(data);
  }
}

function validatePriority(priority?: string): "High" | "Medium" | "Low" {
  const normalized = priority?.toLowerCase();
  if (normalized === "high") return "High";
  if (normalized === "medium") return "Medium";
  if (normalized === "low") return "Low";
  return "Medium";
}

function getDefaultRoadmap(): RoadmapItem[] {
  return [
    {
      id: "1",
      title: "Add comprehensive README",
      description: "Include installation instructions, usage examples, and contribution guidelines.",
      priority: "High",
      completed: false,
    },
    {
      id: "2",
      title: "Set up automated testing",
      description: "Add unit tests and configure CI/CD pipeline for automated testing on each commit.",
      priority: "High",
      completed: false,
    },
    {
      id: "3",
      title: "Add code linting",
      description: "Configure ESLint/Prettier for consistent code style across the project.",
      priority: "Medium",
      completed: false,
    },
    {
      id: "4",
      title: "Improve commit messages",
      description: "Use conventional commits format for better changelog generation.",
      priority: "Medium",
      completed: false,
    },
    {
      id: "5",
      title: "Add TypeScript",
      description: "Consider migrating to TypeScript for better type safety.",
      priority: "Low",
      completed: false,
    },
  ];
}

function getDefaultInsights(data: GitHubRepoData) {
  const strengths: string[] = [];
  const weaknesses: string[] = [];

  if (data.commits.length > 20) strengths.push("Active development with regular commits");
  if (data.hasTests) strengths.push("Test coverage implemented");
  if (data.hasCICD) strengths.push("CI/CD pipeline configured");
  if (data.hasLinting) strengths.push("Code linting configured for consistency");
  if (data.readme.length > 500) strengths.push("Well-documented with comprehensive README");
  if (Object.keys(data.languages).includes("TypeScript")) strengths.push("Uses TypeScript for type safety");

  if (strengths.length < 3) {
    strengths.push("Project is set up and functional");
    strengths.push("Using version control effectively");
    strengths.push("Clear project structure");
  }

  if (!data.hasTests) weaknesses.push("No test coverage detected");
  if (!data.hasCICD) weaknesses.push("No CI/CD pipeline configured");
  if (!data.hasLinting) weaknesses.push("No linting configuration found");
  if (data.readme.length < 200) weaknesses.push("README could be more comprehensive");

  if (weaknesses.length < 2) {
    weaknesses.push("Could benefit from additional documentation");
  }

  return {
    summary: `${data.name} is a ${Object.keys(data.languages)[0] || "software"} project with ${data.commits.length} commits. The repository shows ${data.commits.length > 20 ? "active" : "moderate"} development activity and could benefit from ${!data.hasTests ? "testing" : "continued improvement"}.`,
    strengths: strengths.slice(0, 4),
    weaknesses: weaknesses.slice(0, 3),
    roadmap: getDefaultRoadmap(),
  };
}