import { Octokit } from "@octokit/rest";
import { GitHubRepoData, FileInfo, CommitInfo } from "@/types";

export async function fetchRepoData(
  owner: string,
  repo: string
): Promise<GitHubRepoData> {
  const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
  });

  try {
    // Fetch basic repo info
    const { data: repoInfo } = await octokit.repos.get({ owner, repo });

    // Fetch languages
    const { data: languages } = await octokit.repos.listLanguages({
      owner,
      repo,
    });

    // Fetch file tree
    let files: FileInfo[] = [];
    try {
      const { data: tree } = await octokit.git.getTree({
        owner,
        repo,
        tree_sha: repoInfo.default_branch,
        recursive: "true",
      });

      files = (tree.tree || []).map((item) => ({
        path: item.path || "",
        type: item.type === "tree" ? "dir" : "file",
        size: item.size,
      }));
    } catch (e) {
      console.log("Could not fetch tree:", e);
    }

    // Fetch README
    let readme = "";
    try {
      const { data: readmeData } = await octokit.repos.getReadme({
        owner,
        repo,
      });
      readme = Buffer.from(readmeData.content, "base64").toString("utf-8");
    } catch {
      readme = "";
    }

    // Fetch commits
    let commits: CommitInfo[] = [];
    try {
      const { data: commitsData } = await octokit.repos.listCommits({
        owner,
        repo,
        per_page: 100,
      });

      commits = commitsData.map((c) => ({
        sha: c.sha,
        message: c.commit.message,
        date: c.commit.committer?.date || "",
      }));
    } catch {
      commits = [];
    }

    // Fetch branches
    let branchCount = 1;
    try {
      const { data: branchesData } = await octokit.repos.listBranches({
        owner,
        repo,
        per_page: 100,
      });
      branchCount = branchesData.length;
    } catch {
      branchCount = 1;
    }

    // Check for specific files
    const filePaths = files.map((f) => f.path.toLowerCase());

    const hasTests = filePaths.some(
      (p) =>
        p.includes("test") ||
        p.includes("__tests__") ||
        p.includes(".spec.") ||
        p.includes(".test.")
    );

    const hasCICD = filePaths.some(
      (p) =>
        p.includes(".github/workflows") ||
        p.includes(".gitlab-ci") ||
        p.includes("jenkinsfile") ||
        p.includes(".circleci")
    );

    const hasLinting = filePaths.some(
      (p) =>
        p.includes(".eslintrc") ||
        p.includes(".prettierrc") ||
        p.includes("eslint.config") ||
        p.includes(".stylelintrc") ||
        p.includes("biome")
    );

    const hasGitignore = filePaths.some((p) => p === ".gitignore");

    // Try to fetch package.json
    let packageJson = null;
    try {
      const { data: pkgData } = await octokit.repos.getContent({
        owner,
        repo,
        path: "package.json",
      });
      if ("content" in pkgData) {
        packageJson = JSON.parse(
          Buffer.from(pkgData.content, "base64").toString("utf-8")
        );
      }
    } catch {
      packageJson = null;
    }

    return {
      name: repoInfo.name,
      description: repoInfo.description || "",
      languages,
      files,
      readme,
      commits,
      branches: branchCount,
      stars: repoInfo.stargazers_count,
      forks: repoInfo.forks_count,
      size: repoInfo.size,
      createdAt: repoInfo.created_at || "",
      updatedAt: repoInfo.updated_at || "",
      hasTests,
      hasCICD,
      hasLinting,
      hasGitignore,
      packageJson,
    };
  } catch (error: unknown) {
    console.error("GitHub API Error:", error);
    if (error instanceof Error && "status" in error) {
      const httpError = error as { status: number };
      if (httpError.status === 404) {
        throw new Error(
          "Repository not found. Make sure the URL is correct and the repository is public."
        );
      }
      if (httpError.status === 403) {
        throw new Error("API rate limit exceeded. Please try again later.");
      }
    }
    throw new Error("Failed to fetch repository data. Please try again.");
  }
}