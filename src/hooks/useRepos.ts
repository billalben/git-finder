import { useCallback, useEffect, useState } from "react";
import { fetchRepos, REPOS_PER_PAGE } from "../api/github";
import type { GithubRepo } from "../types/github";
import type { RequestStatus } from "../types/status";
import { getErrorMessage } from "../utils/format";

export function useRepos(username: string, totalRepos: number) {
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [forks, setForks] = useState<GithubRepo[]>([]);
  const [page, setPage] = useState(0);
  const [status, setStatus] = useState<RequestStatus>("idle");
  const [error, setError] = useState<string | null>(null);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const [prevUsername, setPrevUsername] = useState(username);
  if (prevUsername !== username) {
    setPrevUsername(username);
    setRepos([]);
    setForks([]);
    setPage(0);
    setStatus("loading");
    setError(null);
    setIsLoadingMore(false);
  }

  useEffect(() => {
    let ignore = false;

    fetchRepos(username, 1)
      .then((data) => {
        if (ignore) return;
        setRepos(data.filter((repo) => !repo.fork));
        setForks(data.filter((repo) => repo.fork));
        setPage(1);
        setStatus("success");
      })
      .catch((err: unknown) => {
        if (ignore) return;
        setError(getErrorMessage(err));
        setStatus("error");
      });

    return () => {
      ignore = true;
    };
  }, [username]);

  const loadMore = useCallback(() => {
    setIsLoadingMore(true);
    fetchRepos(username, page + 1)
      .then((data) => {
        setRepos((prev) => [...prev, ...data.filter((repo) => !repo.fork)]);
        setForks((prev) => [...prev, ...data.filter((repo) => repo.fork)]);
        setPage((prev) => prev + 1);
      })
      .catch((err: unknown) => {
        setError(getErrorMessage(err));
        setStatus("error");
      })
      .finally(() => {
        setIsLoadingMore(false);
      });
  }, [username, page]);

  const hasMore = page * REPOS_PER_PAGE < totalRepos;

  return { repos, forks, status, error, hasMore, isLoadingMore, loadMore };
}
