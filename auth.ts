import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { prisma } from "@/prisma";

export const { handlers, auth, signIn, signOut } = NextAuth({
	debug: !!process.env.AUTH_DEBUG,
	theme: { logo: "/images/swimmania-logo.png" },
	adapter: PrismaAdapter(prisma),
	providers: [
		GitHub({
			clientId: process.env.AUTH_GITHUB_ID,
			clientSecret: process.env.AUTH_GITHUB_SECRET,
		}),
	],
	basePath: "/api/auth",
	session: { strategy: "database" },
	callbacks: {
		async session({ session, token }) {
			if (token?.accessToken) {
				session.accessToken = token.accessToken as string;
			}

			return session;
		},
	},
});

declare module "next-auth" {
	interface Session {
		accessToken?: string;
	}
}
