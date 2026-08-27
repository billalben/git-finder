import { useEffect, useState } from "react";
import { fetchUser } from "../api/github";
import type { GithubUser } from "../types/github";
import type { RequestStatus } from "../types/status";
import { getErrorMessage } from "../utils/format";

export function useGithubProfile(username: string) {
  const [user, setUser] = useState<GithubUser | null>(null);
  const [status, setStatus] = useState<RequestStatus>("loading");
  const [error, setError] = useState<string | null>(null);

  const [prevUsername, setPrevUsername] = useState(username);
  if (prevUsername !== username) {
    setPrevUsername(username);
    setUser(null);
    setStatus("loading");
    setError(null);
  }

  useEffect(() => {
    let ignore = false;

    fetchUser(username)
      .then((data) => {
        if (ignore) return;
        setUser(data);
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

  return { user, status, error };
}
