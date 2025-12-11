import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";

export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return new Response(JSON.stringify({ error: "Not authenticated" }), { status: 401 });

    const token = session.accessToken;
    if (!token) return new Response(JSON.stringify({ error: "No access token" }), { status: 401 });

    const url = new URL(req.url);
    const path = url.searchParams.get("path") || "";
    const owner = "dy6413";   // GitHub ID
    const repo = "santel_preview"; // Repo 이름

    const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
      },
    });

    const data = await res.json();
    const files = Array.isArray(data) ? data : [];
    return new Response(JSON.stringify(files), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
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

