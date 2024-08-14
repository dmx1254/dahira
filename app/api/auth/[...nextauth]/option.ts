import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "@/lib/db";
import bcrypt from "bcrypt";
import TalibeModel from "@/lib/model";

connectDB();

export const options: NextAuthOptions = {
  pages: {
    signIn: "/",
    signOut: "/",
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24,
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        phone: { label: "Phone", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(
        credentials: Record<"phone" | "password", string> | undefined,
        req
      ) {
        if (credentials) {
          const user = await TalibeModel.findOne({ phone: credentials.phone });
          if (!user) {
            throw new Error("Pas de d'utilisateur avec ce numéro");
          }
          if (!user.isAdmin) {
            throw new Error("Vous n'êtes pas autorise à accéder à cette page");
          }
          const isCorrectPassword = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (!isCorrectPassword) {
            throw new Error("Mot de passe incorrect");
          }

          return {
            id: user._id.toString(),
            phone: user.phone,
            fullname: user.fullname,
            isAdmin: user.isAdmin,
          };
        }
        return null; // Assurez-vous de retourner null si credentials est undefined
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.phone = user.phone;
        token.fullname = user.fullname;
        token.isAdmin = user.isAdmin;
      }
      return token;
    },
    async session({ session, token, user }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.phone = token.phone as string;
        session.user.fullname = token.fullname as string;
        session.user.isAdmin = token.isAdmin as boolean;
      }
      return session;
    },
  },
};
