import NextAuth from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/db/drizzle";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import { users, accounts, sessions, verificationTokens } from "@/db/schema";
import { eq } from "drizzle-orm";

console.log("AUTH DEBUG:", {
    clientId: process.env.GOOGLE_CLIENT_ID,
    hasClientSecret: !!process.env.GOOGLE_CLIENT_SECRET,
    hasAuthSecret: !!process.env.AUTH_SECRET,
});

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    adapter: DrizzleAdapter(db, {
        usersTable: users,
        accountsTable: accounts,
        sessionsTable: sessions,
        verificationTokensTable: verificationTokens,
    }),
    session: { strategy: "jwt" },
    ...authConfig,
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        Credentials({
            async authorize(credentials) {
                if (!credentials || typeof credentials.email !== "string" || typeof credentials.password !== "string") {
                    return null;
                }

                const user = await db.query.users.findFirst({
                    where: eq(users.email, credentials.email),
                });

                if (!user || !user.password) {
                    return null;
                }

                const passwordMatch = await bcrypt.compare(credentials.password, user.password);

                if (passwordMatch) {
                    return user;
                }

                return null;
            }
        })
    ],
});
