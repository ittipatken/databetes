// This need to be fixed later
/* eslint-disable no-param-reassign */
import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import type {
  DefaultSession,
  NextAuthOptions as NextAuthConfig,
} from "next-auth";
import { getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { type JWT } from "next-auth/jwt";

interface User {
  id: number;
  name: string;
  lastname: string;
  email: string;
  amount: number;
}

interface Session extends DefaultSession {
  user?: User;
}

export const config = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "chula",
      credentials: {
        chulaId: { label: "chulaId", type: "text ", placeholder: "chula" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials, req) {
        const api = `http://localhost:3000/api/credential/signin`;

        const res = await fetch(api, {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" },
        });

        const data = await res.json();

        if ((data.status === "ok")) {
          const user = {
            id: data.profile.id,
            name: data.profile.name,
            lastname: data.profile.lastname,
            email: data.profile.email,
            amount: data.profile.amount,
          };
          return user

        }
        return null;
      },
    }),
    // ...add more providers here
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.user) {
        session.user = token.user as User;
      }
      return session;
    },
  },

  session: {
    maxAge: 24 * 60 * 60,
  },


} satisfies NextAuthConfig;

// Helper function to get session without passing config every time
// https://next-auth.js.org/configuration/nextjs#getserversession

export async function auth(
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, config);
}
