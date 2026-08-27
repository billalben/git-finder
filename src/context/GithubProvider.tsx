import { useState, type ReactNode } from "react";
import { GithubContext } from "./GithubContext";

const DEFAULT_USERNAME = "billalben";

export function GithubProvider({ children }: { children: ReactNode }) {
  const [username, setUsername] = useState(DEFAULT_USERNAME);

  return (
    <GithubContext.Provider value={{ username, setUsername }}>
      {children}
    </GithubContext.Provider>
  );
}
