import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../lib/authOptions";

export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) return new Response("Unauthorized", { status: 401 });

    const response = await fetch("https://api.github.com/user/repos", {
      headers: {
        Authorization: `token ${session.accessToken}`,
      },
    });

    const data = await response.json();
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (err) {
    return new Response("Error fetching repos", { status: 500 });
  }
}
