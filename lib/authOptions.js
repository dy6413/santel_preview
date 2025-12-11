import GitHubProvider from "next-auth/providers/github";

/**
 * NextAuth 설정 옵션 (서버 API에서 재사용)
 */
export const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
};
