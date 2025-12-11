// lib/authOptions.js
import GitHubProvider from "next-auth/providers/github";

/**
 * NextAuth 설정 옵션 (서버 API에서 재사용)
 */
export const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/signin", // 로그인 페이지 (필요하면 사용자 정의)
  },
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token; // 로그인 후 GitHub 액세스 토큰 저장
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken; // 세션에 액세스 토큰 저장
      return session;
    },
  },
};
