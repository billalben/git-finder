import { useState } from "react";
import { ErrorState } from "./components/ErrorState";
import { Footer } from "./components/Footer";
import { ForkPanel } from "./components/ForkPanel";
import { GithubListPanel } from "./components/GithubListPanel";
import { Header } from "./components/Header";
import { ProfileCard } from "./components/ProfileCard";
import { ProfileSkeleton } from "./components/ProfileSkeleton";
import { RepoPanel } from "./components/RepoPanel";
import { Tabs, type TabItem } from "./components/Tabs";
import { useGithubUsername } from "./context/GithubContext";
import { GithubProvider } from "./context/GithubProvider";
import { useGithubProfile } from "./hooks/useGithubProfile";
import { useRepos } from "./hooks/useRepos";

function Main() {
  const { username, setUsername } = useGithubUsername();
  const [activeTab, setActiveTab] = useState("repos");

  const {
    user,
    status: profileStatus,
    error: profileError,
  } = useGithubProfile(username);
  const {
    repos,
    forks,
    status: reposStatus,
    hasMore,
    isLoadingMore,
    loadMore,
  } = useRepos(username, user?.public_repos ?? 0);

  const tabItems: TabItem[] = [
    {
      id: "repos",
      label: "Repositories",
      content: (
        <RepoPanel
          repos={repos}
          status={reposStatus}
          hasMore={hasMore}
          isLoadingMore={isLoadingMore}
          onLoadMore={loadMore}
        />
      ),
    },
    {
      id: "forks",
      label: "Forked",
      content: <ForkPanel forks={forks} status={reposStatus} />,
    },
    {
      id: "followers",
      label: "Followers",
      content: (
        <GithubListPanel
          username={username}
          kind="followers"
          isActive={activeTab === "followers"}
          onSelect={setUsername}
          heading="Followers"
          emptyText="Doesn't have any follower yet."
        />
      ),
    },
    {
      id: "following",
      label: "Following",
      content: (
        <GithubListPanel
          username={username}
          kind="following"
          isActive={activeTab === "following"}
          onSelect={setUsername}
          heading="Followings"
          emptyText="Doesn't have any following yet."
        />
      ),
    },
  ];

  return (
    <>
      <a href="#main" className="skip-to-content">
        Skip To Content
      </a>

      <Header />

      <main className="main" id="main">
        <div className="container">
          {profileStatus === "error" ? (
            <ErrorState text={profileError ?? ""} />
          ) : (
            <>
              <section className="profile" data-profile-card>
                {profileStatus === "loading" || !user ? (
                  <ProfileSkeleton />
                ) : (
                  <ProfileCard user={user} />
                )}
              </section>

              <Tabs
                items={tabItems}
                activeId={activeTab}
                onChange={setActiveTab}
              />
            </>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}

export default function App() {
  return (
    <GithubProvider>
      <Main />
    </GithubProvider>
  );
}
