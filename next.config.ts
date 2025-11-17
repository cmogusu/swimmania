import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	distDir: "build",
	eslint: {
		ignoreDuringBuilds: true,
	},
	poweredByHeader: false,
	serverExternalPackages: ["tesseract.js", "better-sqlite3"],
};

export default nextConfig;
