import NextAuth, { Session, User } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
// Whenever a user signs-in we need to store some information about them in the db
// The Account, VerificationToken, Session etc. will be stored
// For the schema you need to work with this adapter you need to go to the documentation
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/db";

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET

if (!GITHUB_CLIENT_ID || !GITHUB_CLIENT_SECRET){
    throw new Error("Missing github oauth credentials")
}

export const authOptions = {
    adapter: PrismaAdapter(db),
    providers: [
        GitHubProvider({
            clientId: GITHUB_CLIENT_ID,
            clientSecret: GITHUB_CLIENT_SECRET,
        }),
    ],
    authorizationParams: {
        clientId: GITHUB_CLIENT_ID,
        clientSecret: GITHUB_CLIENT_SECRET,
    },
    basePath: "/api/auth",
    callbacks: {
        async session({ session, user }: { session: Session; user: User }) {
            if (session && user) {
                session.user = { ...session.user, id: user.id };
            }
            return session;
        },
    },
};

export const { handlers: {GET, POST}, auth, signOut, signIn } = NextAuth(authOptions);