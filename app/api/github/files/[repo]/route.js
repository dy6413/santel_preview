import { getServerSession } from "next-auth";
import { authOptions } from "../../../../lib/authOptions";

export async function GET(req, { params }) {
  const session = await getServerSession(authOptions);

  const token = session.user.accessToken; // session 구조에 맞춤
  const { repo } = params;

  const res = await fetch(`https://api.github.com/repos/YOUR_GITHUB_ID/${repo}/contents`, {
    headers: { Authorization: `token ${token}` },
  });

  const data = await res.json();
  return new Response(JSON.stringify(data), { status: 200 });
}
