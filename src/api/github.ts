import type {
  GithubRepo,
  GithubUser,
  GithubUserSummary,
} from "../types/github";

const GITHUB_API = "https://api.github.com";

export const REPOS_PER_PAGE = 12;

const RATE_LIMIT_STATUS = 403;
const RATE_LIMIT_HEADER_REMAINING = "X-RateLimit-Remaining";
const RATE_LIMIT_HEADER_RESET = "X-RateLimit-Reset";

export class GithubApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "GithubApiError";
    this.status = status;
  }
}

async function request<T>(url: string): Promise<T> {
  const response = await fetch(url);

  if (!response.ok) {
    if (response.status === RATE_LIMIT_STATUS) {
      const rateLimitRemaining = response.headers.get(
        RATE_LIMIT_HEADER_REMAINING,
      );
      const rateLimitReset = response.headers.get(RATE_LIMIT_HEADER_RESET);

      if (rateLimitRemaining === "0" && rateLimitReset) {
        const resetTime = new Date(
          Number(rateLimitReset) * 1000,
        ).toLocaleTimeString();
        throw new GithubApiError(
          `Rate limit exceeded. Try again at ${resetTime}.`,
          RATE_LIMIT_STATUS,
        );
      }
    }
    throw new GithubApiError(
      `HTTP error! status: ${response.status}`,
      response.status,
    );
  }

  return (await response.json()) as T;
}

export function fetchUser(username: string): Promise<GithubUser> {
  return request<GithubUser>(`${GITHUB_API}/users/${username}`);
}

export function fetchRepos(
  username: string,
  page: number,
): Promise<GithubRepo[]> {
  return request<GithubRepo[]>(
    `${GITHUB_API}/users/${username}/repos?sort=created&per_page=${REPOS_PER_PAGE}&page=${page}`,
  );
}

export function fetchFollowers(username: string): Promise<GithubUserSummary[]> {
  return request<GithubUserSummary[]>(
    `${GITHUB_API}/users/${username}/followers`,
  );
}

export function fetchFollowing(username: string): Promise<GithubUserSummary[]> {
  return request<GithubUserSummary[]>(
    `${GITHUB_API}/users/${username}/following`,
  );
}
