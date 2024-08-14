// types/next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id?: string;
    phone?: string;
    fullname?: string;
    isAdmin?: boolean;
  }

  interface Session {
    user: User;
  }

  interface JWT {
    id?: string;
    phone?: string;
    fullname?: string;
    isAdmin?: boolean;
  }
}
