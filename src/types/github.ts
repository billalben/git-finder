export interface GithubUser {
  login: string
  id: number
  avatar_url: string
  html_url: string
  type: string
  name: string | null
  bio: string | null
  location: string | null
  company: string | null
  blog: string | null
  twitter_username: string | null
  public_repos: number
  followers: number
  following: number
}

export interface GithubRepo {
  id: number
  name: string
  html_url: string
  description: string | null
  fork: boolean
  private: boolean
  language: string | null
  stargazers_count: number
  forks_count: number
}

export interface GithubUserSummary {
  login: string
  avatar_url: string
  url: string
}