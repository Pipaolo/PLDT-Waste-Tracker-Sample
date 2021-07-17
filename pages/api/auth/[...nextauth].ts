import mongoose from "mongoose";
import NextAuth from "next-auth";
import Providers, { CredentialsProvider } from "next-auth/providers";
import { dbConnect } from "../../../utils/dbConnect";
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
        const db = await dbConnect();
        const user = await db
          .collection("users")
          .findOne({ username: creds.username, password: creds.password });
        if (!user) {
          throw Error("Invalid Username/Password!");
        }

        return user;
      },
    }),
  ],
  callbacks: {
    redirect: async (url, baseURL) => {
      return "/admin";
    },
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
    error: "/auth/error",
  },
});
