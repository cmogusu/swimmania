import { UnstorageAdapter } from "@auth/unstorage-adapter";
import NextAuth from "next-auth";
import Facebook from "next-auth/providers/facebook";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import LinkedIn from "next-auth/providers/linkedin";
import Twitter from "next-auth/providers/twitter";
import { createStorage } from "unstorage";
import memoryDriver from "unstorage/drivers/memory";
import vercelKVDriver from "unstorage/drivers/vercel-kv";

const storage = createStorage({
	driver: process.env.VERCEL
		? vercelKVDriver({
				url: process.env.AUTH_KV_REST_API_URL,
				token: process.env.AUTH_KV_REST_API_TOKEN,
				env: false,
			})
		: memoryDriver(),
});

export const { handlers, auth, signIn, signOut } = NextAuth({
	debug: !!process.env.AUTH_DEBUG,
	theme: { logo: "https://authjs.dev/img/logo-sm.png" },
	adapter: UnstorageAdapter(storage),
	providers: [Facebook, GitHub, Google, LinkedIn, Twitter],
	basePath: "/auth",
	session: { strategy: "jwt" },
	callbacks: {
		async session({ session, token }) {
			if (token?.accessToken) session.accessToken = token.accessToken;

			return session;
		},
	},
});

declare module "next-auth" {
	interface Session {
		accessToken?: string;
	}
}
