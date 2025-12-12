"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProjectPage() {
  const params = useParams();
  const { project } = params;
  const [repoData, setRepoData] = useState(null);

  useEffect(() => {
    async function fetchRepo() {
      const res = await fetch(`/api/github/repos/${project}`);
      if (res.ok) {
        const data = await res.json();
        setRepoData(data);
      }
    }
    fetchRepo();
  }, [project]);

  if (!repoData) return <div>Loading...</div>;

  return (
    <div>
      <h1>{repoData.name}</h1>
      <p>{repoData.description}</p>
      <p>Stars: {repoData.stargazers_count}</p>
    </div>
  );
}
