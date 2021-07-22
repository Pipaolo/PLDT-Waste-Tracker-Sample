import mongoose from "mongoose";
import NextAuth from "next-auth";
import Providers, { CredentialsProvider } from "next-auth/providers";
import { AuthErrors } from "../../../consts/errors";
import { dbConnect } from "../../../utils/dbConnect";
import UserModel from "../../../models/user";
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
        await dbConnect();
        const user = await UserModel.findOne({
          username: creds.username,
        });
        if (!user) {
          throw Error("Invalid Username/Password!");
        }
        // Start checking for password
        const isPasswordCorrect = await new Promise<boolean | any>(
          (res, rej) => {
            user.comparePassword(creds.password, (err, isMatch) => {
              if (err) {
                rej(err);
              }
              res(isMatch);
            });
          }
        );

        if (!isPasswordCorrect) {
          throw Error(AuthErrors.INVALID_CREDENTIALS);
        }
        return user.toJSON();
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
