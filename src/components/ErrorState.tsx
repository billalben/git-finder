import { useEffect } from "react";

interface ErrorStateProps {
  text: string;
}

export function ErrorState({ text }: ErrorStateProps) {
  useEffect(() => {
    document.body.style.overflowY = "hidden";
    return () => {
      document.body.style.overflowY = "visible";
    };
  }, []);

  return (
    <section className="error">
      <p className="title-1">Oops! :(</p>
      <p className="text">There is no account with this username yet.</p>
      <p className="text">{text}</p>
    </section>
  );
}
