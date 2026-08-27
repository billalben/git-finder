import { useEffect, useState } from "react";
import { fetchFollowers, fetchFollowing } from "../api/github";
import type { GithubUserSummary } from "../types/github";

export type GithubListKind = "followers" | "following";

export function useGithubList(
  username: string,
  kind: GithubListKind,
  enabled: boolean,
) {
  const [data, setData] = useState<GithubUserSummary[] | null>(null);
  const [hasError, setHasError] = useState(false);

  const key = `${kind}:${username}`;
  const [prevKey, setPrevKey] = useState(key);
  if (prevKey !== key) {
    setPrevKey(key);
    setData(null);
    setHasError(false);
  }

  useEffect(() => {
    if (!enabled) return;

    let ignore = false;
    const fetcher = kind === "followers" ? fetchFollowers : fetchFollowing;

    fetcher(username)
      .then((items) => {
        if (ignore) return;
        setData(items);
        setHasError(false);
      })
      .catch(() => {
        if (ignore) return;
        setHasError(true);
      });

    return () => {
      ignore = true;
    };
  }, [enabled, kind, username]);

  return { data, hasError };
}
