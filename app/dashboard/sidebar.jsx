"use client";

import useSWR from "swr";

const fetcher = (url) => fetch(url).then(r => r.json());

export default function Sidebar() {

  const { data: repos } = useSWR("/api/github/repos", fetcher);

  return (
    <div className="p-4 space-y-2">
      <h2 className="font-bold text-lg">GitHub Repos</h2>

      <div className="space-y-1">
        {repos?.map((repo) => (
          <a
            key={repo.id}
            href={`/dashboard/${repo.name}`}
            className="block px-2 py-1 hover:bg-gray-200 rounded"
          >
            {repo.name}
          </a>
        ))}
      </div>
    </div>
  );
}
