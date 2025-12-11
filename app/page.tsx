"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function HomePage() {
  const { data: session } = useSession();

  return (
    <div style={{ padding: 40 }}>
      {!session ? (
        <>
          <h2>GitHub Dashboard</h2>
          <button onClick={() => signIn("github")}>GitHub 로그인</button>
        </>
      ) : (
        <>
          <h3>로그인됨: {session.user?.name}</h3>
          <button onClick={() => signOut()}>로그아웃</button>
          <br />
          <a href="/repo">Repo 파일 목록 보기 →</a>
        </>
      )}
    </div>
  );
}



// "use client";

// import { signIn, signOut, useSession } from "next-auth/react";

// export default function Home() {
//   const { data: session } = useSession();

//   return (
//     <div style={{ padding: 40 }}>
//       {!session && (
//         <>
//           <h2>GitHub Dashboard</h2>
//           <button onClick={() => signIn("github")} style={{ padding: "10px 20px" }}>
//             GitHub 로그인
//           </button>
//         </>
//       )}

//       {session && (
//         <>
//           <h3>로그인됨: {session.user?.name}</h3>
//           <button onClick={() => signOut()} style={{ padding: "10px 20px" }}>
//             로그아웃
//           </button>
//           <br /><br />
//           <a href="/repo" style={{ fontSize: 20 }}>Repo 파일 목록 보기 →</a>
//         </>
//       )}
//     </div>
//   );
// }
