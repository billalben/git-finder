export function FollowerSkeleton({ count = 8 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }, (_, index) => (
        <div className="card follower-skeleton" key={index}>
          <div className="skeleton avatar-skeleton"></div>
          <div className="skeleton title-skeleton"></div>
        </div>
      ))}
    </>
  );
}
