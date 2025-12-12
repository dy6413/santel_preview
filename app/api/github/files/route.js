import { getServerSession } from "next-auth";
import { authOptions } from "../../../../lib/authOptions"; // 상대 경로 수정

export async function GET(req) {
  try {
    const session = await getServerSession(authOptions); // 세션 확인

    if (!session) {
      return new Response(
        JSON.stringify({ error: "Not authenticated" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    const token = session.accessToken; // 세션에서 액세스 토큰 가져오기
    if (!token) {
      return new Response(
        JSON.stringify({ error: "No access token found" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    const owner = "dy6413"; // GitHub ID
    const repo = "santel_preview"; // GitHub Repo 이름

    // GitHub API로 파일 목록 요청
    const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
      },
    });

    const data = await res.json();

    // 배열이 아닌 경우 빈 배열로 처리
    const files = Array.isArray(data) ? data : [];

    return new Response(JSON.stringify(files), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}




// import { getServerSession } from "next-auth";
// import { authOptions } from "../../auth/[...nextauth]/route";

// export async function GET() {
//   try {
//     const session = await getServerSession(authOptions);

//     if (!session) {
//       return new Response(JSON.stringify({ error: "Not authenticated" }), {
//         status: 401,
//         headers: { "Content-Type": "application/json" },
//       });
//     }

//     const token = session.accessToken;
//     const owner = "dy6413"; // GitHub username
//     const repo = "santel_preview"; // repo 이름

//     const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         Accept: "application/vnd.github+json",
//       },
//     });

//     const data = await res.json();

//     const files = Array.isArray(data)
//       ? data.map((file) => ({
//           name: file.name,
//           path: file.path,
//           type: file.type,
//           sha: file.sha,
//         }))
//       : [];

//     return new Response(JSON.stringify(files), {
//       status: 200,
//       headers: { "Content-Type": "application/json" },
//     });
//   } catch (err) {
//     return new Response(JSON.stringify({ error: err.message }), {
//       status: 500,
//       headers: { "Content-Type": "application/json" },
//     });
//   }
// }

