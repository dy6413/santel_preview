export const dynamic = "force-dynamic";
export const revalidate = 0;

import { getServerSession } from "next-auth/next";
import { authOptions } from "../../lib/authOptions";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <div style={{ padding: 40 }}>
        <h2>GitHub Dashboard</h2>
        <a href="/api/auth/signin">로그인</a>
      </div>
    );
  }

  return (
    <div style={{ padding: 40 }}>
      <h3>로그인됨: {session.user?.name}</h3>
      <a href="/repo">Repo 파일 목록 보기 →</a>
    </div>
  );
}



// "use client";

// import { useEffect, useState } from "react";

// export default function DashboardPage() {
//   const [repos, setRepos] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function fetchRepos() {
//       const res = await fetch("/api/github/repos"); // 나중에 route.js에서 구현
//       if (res.ok) {
//         const data = await res.json();
//         setRepos(data);
//       } else {
//         console.error("Failed to fetch repos");
//       }
//       setLoading(false);
//     }
//     fetchRepos();
//   }, []);

//   if (loading) return <div>Loading...</div>;

//   return (
//     <div>
//       <h1>Your GitHub Repos</h1>
//       <ul>
//         {repos.map((repo) => (
//           <li key={repo.id}>
//             <a href={`/dashboard/${repo.name}`}>{repo.name}</a>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }
