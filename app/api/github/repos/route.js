import { getServerSession } from "next-auth";
import { authOptions } from "../../../../lib/authOptions";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return new Response("Unauthorized", { status: 401 });

  const token = session.user.accessToken;

  const res = await fetch("https://api.github.com/user/repos", {
    headers: {
      Authorization: `token ${token}`,
    },
  });

  const data = await res.json();
  return new Response(JSON.stringify(data), { status: 200 });
}
