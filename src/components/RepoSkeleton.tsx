export function RepoSkeleton({ count = 4 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }, (_, index) => (
        <article className="card repo-skeleton" key={index}>
          <div className="card-body">
            <div className="skeleton title-skeleton"></div>
            <div className="skeleton text-skeleton text-1"></div>
            <div className="skeleton text-skeleton text-2"></div>
          </div>
          <div className="card-footer">
            <div className="skeleton text-skeleton"></div>
            <div className="skeleton text-skeleton"></div>
            <div className="skeleton text-skeleton"></div>
          </div>
        </article>
      ))}
    </>
  );
}
