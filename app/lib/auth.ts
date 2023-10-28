// This need to be fixed later
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

interface User {
  name: string;
  email: string;
}

interface Session extends DefaultSession {
  user?: User;
}

export const config = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      id: "domain-login",
      name: "Domain Account",
      async authorize(credentials, req) {
        const user = {
          /* add function to get user */
        };
        return user;
      },
      credentials: {
        domain: {
          label: "Domain",
          type: "text ",
          placeholder: "CORPNET",
          value: "CORPNET",
        },
        username: { label: "Username", type: "text ", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
    }),
    // ...add more providers here
  ],
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
