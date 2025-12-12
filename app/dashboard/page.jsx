"use client";

import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRepos() {
      const res = await fetch("/api/github/repos"); // 나중에 route.js에서 구현
      if (res.ok) {
        const data = await res.json();
        setRepos(data);
      } else {
        console.error("Failed to fetch repos");
      }
      setLoading(false);
    }
    fetchRepos();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Your GitHub Repos</h1>
      <ul>
        {repos.map((repo) => (
          <li key={repo.id}>
            <a href={`/dashboard/${repo.name}`}>{repo.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
