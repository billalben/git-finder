import type { GithubRepo } from "../types/github";
import type { RequestStatus } from "../types/status";
import { EmptyState } from "./EmptyState";
import { RepoCard } from "./RepoCard";
import { RepoSkeleton } from "./RepoSkeleton";

interface ForkPanelProps {
  forks: GithubRepo[];
  status: RequestStatus;
}

export function ForkPanel({ forks, status }: ForkPanelProps) {
  if (status === "loading" && forks.length === 0) {
    return <RepoSkeleton />;
  }

  if (forks.length === 0) {
    return <EmptyState text="Doesn't have any forked repositories yet." />;
  }

  return (
    <>
      <h2 className="sr-only">Forked repositories</h2>
      {forks.map((repo) => (
        <RepoCard key={repo.id} repo={repo} />
      ))}
    </>
  );
}
