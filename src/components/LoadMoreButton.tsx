interface LoadMoreButtonProps {
  hasMore: boolean;
  isLoading: boolean;
  onClick: () => void;
}

export function LoadMoreButton({
  hasMore,
  isLoading,
  onClick,
}: LoadMoreButtonProps) {
  if (!hasMore) return null;

  return (
    <div className="btn-wrapper">
      <button
        className="btn btn-secondary next-prev-btn"
        onClick={onClick}
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : "Load more"}
      </button>
    </div>
  );
}
