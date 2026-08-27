import type { GithubRepo } from "../types/github";
import type { RequestStatus } from "../types/status";
import { EmptyState } from "./EmptyState";
import { LoadMoreButton } from "./LoadMoreButton";
import { RepoCard } from "./RepoCard";
import { RepoSkeleton } from "./RepoSkeleton";

interface RepoPanelProps {
  repos: GithubRepo[];
  status: RequestStatus;
  hasMore: boolean;
  isLoadingMore: boolean;
  onLoadMore: () => void;
}

export function RepoPanel({
  repos,
  status,
  hasMore,
  isLoadingMore,
  onLoadMore,
}: RepoPanelProps) {
  if (status === "idle" || status === "loading") {
    return <RepoSkeleton />;
  }

  if (status === "error") {
    return (
      <EmptyState text="Something went wrong while loading repositories." />
    );
  }

  if (repos.length === 0) {
    return <EmptyState text="Doesn't have any public repositories yet." />;
  }

  return (
    <>
      <h2 className="sr-only">Repositories</h2>
      {repos.map((repo) => (
        <RepoCard key={repo.id} repo={repo} />
      ))}
      <LoadMoreButton
        hasMore={hasMore}
        isLoading={isLoadingMore}
        onClick={onLoadMore}
      />
    </>
  );
}
