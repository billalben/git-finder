import { useGithubList, type GithubListKind } from "../hooks/useGithubList";
import { EmptyState } from "./EmptyState";
import { FollowerCard } from "./FollowerCard";
import { FollowerSkeleton } from "./FollowerSkeleton";

interface GithubListPanelProps {
  username: string;
  kind: GithubListKind;
  isActive: boolean;
  onSelect: (username: string) => void;
  heading: string;
  emptyText: string;
}

export function GithubListPanel({
  username,
  kind,
  isActive,
  onSelect,
  heading,
  emptyText,
}: GithubListPanelProps) {
  const { data, hasError } = useGithubList(username, kind, isActive);

  if (hasError) {
    return <EmptyState text="Something went wrong while loading the list." />;
  }

  if (data === null) {
    return isActive ? <FollowerSkeleton /> : null;
  }

  if (data.length === 0) {
    return <EmptyState text={emptyText} />;
  }

  return (
    <>
      <h2 className="sr-only">{heading}</h2>
      {data.map((item) => (
        <FollowerCard
          key={item.login}
          username={item.login}
          avatarUrl={item.avatar_url}
          onSelect={onSelect}
        />
      ))}
    </>
  );
}
