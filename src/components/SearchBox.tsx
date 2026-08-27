import { useEffect, useRef, useState } from "react";

interface SearchBoxProps {
  open: boolean;
  onToggleOpen: () => void;
  onSearch: (username: string) => void;
}

export function SearchBox({ open, onToggleOpen, onSearch }: SearchBoxProps) {
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const submit = () => {
    const username = value.trim();
    if (!username) return;
    onSearch(username);
  };

  return (
    <>
      <button
        className="icon-btn search-toggler"
        aria-controls="searchBox"
        aria-expanded={open}
        aria-label="Toggle search"
        onClick={onToggleOpen}
      >
        <span
          className="material-symbols-rounded search-icon"
          aria-hidden="true"
        >
          search
        </span>
        <span
          className="material-symbols-rounded close-icon"
          aria-hidden="true"
        >
          arrow_back
        </span>
      </button>
      <div className="search-box" id="searchBox">
        <span
          className="material-symbols-rounded leading-icon"
          aria-hidden="true"
        >
          search
        </span>
        <input
          type="search"
          ref={inputRef}
          name="search"
          aria-label="Search github username"
          placeholder="Search username*"
          className="search-field label-1"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") submit();
          }}
        />
        <button
          className="search-btn"
          aria-label="Search submit"
          onClick={submit}
        >
          <span className="material-symbols-rounded" aria-hidden="true">
            search
          </span>
          <span className="label-1">Search</span>
        </button>
      </div>
    </>
  );
}
