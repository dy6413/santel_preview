import { getServerSession } from "next-auth";
import { authOptions } from "../../../../lib/authOptions";

export async function POST(req) {
  try {
    const { repo, path, content, message } = await req.json();
    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response(JSON.stringify({ error: "Not authenticated" }), { status: 401 });
    }

    const token = session.user.accessToken;
    const owner = process.env.GITHUB_ID; // GitHub 사용자/조직 ID
    const vercelHook = process.env.VERCEL_WEBHOOK_URL; // Preview 배포용 Hook

    // 1️⃣ 기존 파일 SHA 가져오기
    const fileRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
      headers: { Authorization: `token ${token}` },
    });

    const fileData = await fileRes.json();
    const sha = fileData.sha || undefined; // 파일이 없으면 새로 생성

    // 2️⃣ GitHub Commit
    const commitRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
      method: "PUT",
      headers: {
        Authorization: `token ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
        content: Buffer.from(content).toString("base64"),
        sha,
      }),
    });

    const commitData = await commitRes.json();

    // 3️⃣ Vercel Deploy Hook 호출 (선택)
    let previewUrl = null;
    if (vercelHook) {
      const vercelRes = await fetch(vercelHook, { method: "POST" });
      const vercelData = await vercelRes.json().catch(() => null);
      previewUrl = vercelData?.deployment?.url || null;
    }

    return new Response(
      JSON.stringify({ commit: commitData, previewUrl }),
      { status: 200 }
    );

  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
