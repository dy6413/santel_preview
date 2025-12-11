import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";

export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new Response(JSON.stringify({ error: "Not authenticated" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const token = session.accessToken;
    if (!token) {
      return new Response(JSON.stringify({ error: "No access token" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    // path query
    const { searchParams } = new URL(req.url);
    const path = searchParams.get("path") || "";
    const owner = "dy6413";
    const repo = "santel_preview";

    const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
      },
    });

    const data = await res.json();
    const files = Array.isArray(data) ? data : [];
    return new Response(JSON.stringify(files), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
