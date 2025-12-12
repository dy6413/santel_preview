import { getServerSession } from "next-auth";
import { authOptions } from "../../../../lib/authOptions";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new Response(JSON.stringify({ error: "Not authenticated" }), { status: 401 });
  }

  const token = session.user.accessToken; // session 구조에 맞춰 수정 필요

  const res = await fetch("https://api.github.com/user/repos", {
    headers: { Authorization: `token ${token}` },
  });

  const data = await res.json();

  return new Response(JSON.stringify(data), { status: 200 });
}
