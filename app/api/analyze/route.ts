import { NextRequest, NextResponse } from "next/server";
import { parseGitHubUrl } from "@/lib/utils";
import { fetchRepoData } from "@/lib/github";
import { analyzeRepo, calculateStats } from "@/lib/analyzer";
import { generateAIInsights } from "@/lib/ai";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { repoUrl } = body;

    if (!repoUrl) {
      return NextResponse.json(
        { error: "Repository URL is required" },
        { status: 400 }
      );
    }

    const parsed = parseGitHubUrl(repoUrl);
    if (!parsed) {
      return NextResponse.json(
        { error: "Invalid GitHub URL format. Try: github.com/owner/repo" },
        { status: 400 }
      );
    }

    const { owner, repo } = parsed;
    console.log(`Analyzing: ${owner}/${repo}`);

    // Fetch repository data from GitHub
    const repoData = await fetchRepoData(owner, repo);
    console.log(`Fetched repo: ${repoData.name}, ${repoData.files.length} files`);

    // Analyze the repository
    const { score, breakdown, tier, category } = analyzeRepo(repoData);
    console.log(`Analysis complete: Score ${score}, Tier ${tier}`);

    // Calculate stats
    const stats = calculateStats(repoData);

    // Generate AI insights using Gemini
    console.log("Generating AI insights...");
    const aiInsights = await generateAIInsights(repoData, score, tier);
    console.log("AI insights generated");

    return NextResponse.json({
      score,
      tier,
      category,
      breakdown,
      stats,
      summary: aiInsights.summary,
      strengths: aiInsights.strengths,
      weaknesses: aiInsights.weaknesses,
      roadmap: aiInsights.roadmap,
      repoName: repoData.name,
      repoDescription: repoData.description,
    });
  } catch (error) {
    console.error("Analysis error:", error);
    const message =
      error instanceof Error ? error.message : "Failed to analyze repository";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}