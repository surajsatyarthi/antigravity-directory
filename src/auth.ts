import NextAuth from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import { db } from "@/lib/db";
import { accounts, sessions, users, verificationTokens } from "@/drizzle/schema";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    // Test-only Credentials provider for E2E testing
    ...(process.env.NODE_ENV === 'test' || process.env.NEXT_PUBLIC_IS_E2E === 'true' ? [
        Credentials({
            id: 'test-credentials',
            name: 'Test Credentials',
            credentials: {
                username: { label: "Username", type: "text" },
            },
            async authorize(credentials) {
                if (credentials?.username === 'e2e-test-user') {
                    // Return a user object that mimics the DB user
                    return {
                        id: 'e2e-test-user-id',
                        name: 'E2E Test User',
                        email: 'test@example.com',
                        image: 'https://github.com/test.png',
                    };
                }
                return null;
            }
        })
    ] : []),
  ],
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
        session.user.name = user.name; // Ensure username available in session
        // @ts-ignore
        session.user.role = user.role || 'USER';
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
});
