import { useState } from "react";
import { useGithubUsername } from "../context/GithubContext";
import { useScrollActive } from "../hooks/useScrollActive";
import { SearchBox } from "./SearchBox";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  const isScrolled = useScrollActive();
  const [searchOpen, setSearchOpen] = useState(false);
  const { setUsername } = useGithubUsername();

  const handleSearch = (username: string) => {
    setUsername(username);
    setSearchOpen(false);
  };

  const headerClass = [
    "header",
    isScrolled ? "active" : "",
    searchOpen ? "search-active" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <header className={headerClass} data-header>
      <div className="container">
        <a href="#" className="logo">
          <span className="text-primary">Git</span>Finder
        </a>
        <div className="header-search">
          <SearchBox
            open={searchOpen}
            onToggleOpen={() => setSearchOpen((open) => !open)}
            onSearch={handleSearch}
          />
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
}
