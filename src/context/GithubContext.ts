import { createContext, useContext } from "react";

export interface GithubContextValue {
  username: string;
  setUsername: (username: string) => void;
}

export const GithubContext = createContext<GithubContextValue | null>(null);

export function useGithubUsername(): GithubContextValue {
  const ctx = useContext(GithubContext);
  if (!ctx) {
    throw new Error("useGithubUsername must be used within GithubProvider");
  }
  return ctx;
}
