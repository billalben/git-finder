interface FollowerCardProps {
  username: string;
  avatarUrl: string;
  onSelect: (username: string) => void;
}

export function FollowerCard({
  username,
  avatarUrl,
  onSelect,
}: FollowerCardProps) {
  return (
    <article className="card follower-card">
      <figure className="avatar-circle img-holder">
        <img
          src={`${avatarUrl}&s=96`}
          width="56"
          height="56"
          loading="lazy"
          alt={username}
          className="img-cover"
        />
      </figure>
      <h3 className="card-title">{username}</h3>
      <button
        className="icon-btn"
        onClick={() => onSelect(username)}
        aria-label={`Go to ${username} profile`}
      >
        <span className="material-symbols-rounded" aria-hidden="true">
          link
        </span>
      </button>
    </article>
  );
}
