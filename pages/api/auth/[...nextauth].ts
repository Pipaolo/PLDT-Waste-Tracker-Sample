import NextAuth from "next-auth";
import Providers, { CredentialsProvider } from "next-auth/providers";
export default NextAuth({
  providers: [
    Providers.Credentials({
      credentials: {
        username: {
          type: "text",
        },
        password: {
          type: "text",
        },
      },
      authorize: async (creds, req) => {
        return {
          username: "admin",
          sampleData: "Nice Sample!",
        };
      },
    }),
  ],
  callbacks: {
    jwt: async (token, user) => {
      if (user) {
        token.user = user;
      }
      return token;
    },
    session: async (session, userOrToken) => {
      session.user = userOrToken.user;
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
});
