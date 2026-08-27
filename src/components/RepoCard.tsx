import type { GithubRepo } from "../types/github";
import { numberToKilo } from "../utils/format";

interface RepoCardProps {
  repo: GithubRepo;
}

export function RepoCard({ repo }: RepoCardProps) {
  return (
    <article className="card repo-card">
      <div className="card-body">
        <a
          href={repo.html_url}
          target="_blank"
          rel="noreferrer"
          className="card-title"
        >
          <h3 className="title-3">{repo.name}</h3>
        </a>

        {repo.description ? (
          <p className="card-text">{repo.description}</p>
        ) : null}

        <span className="badge">{repo.private ? "Private" : "Public"}</span>
      </div>
      <div className="card-footer">
        {repo.language ? (
          <div className="meta-item">
            <span className="material-symbols-rounded" aria-hidden="true">
              code_blocks
            </span>
            <span className="span">{repo.language}</span>
          </div>
        ) : null}

        <div className="meta-item">
          <span className="material-symbols-rounded" aria-hidden="true">
            star_rate
          </span>
          <span className="span">{numberToKilo(repo.stargazers_count)}</span>
        </div>

        <div className="meta-item">
          <span className="material-symbols-rounded" aria-hidden="true">
            family_history
          </span>
          <span className="span">{numberToKilo(repo.forks_count)}</span>
        </div>
      </div>
    </article>
  );
}
