import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	distDir: "build",
	eslint: {
		ignoreDuringBuilds: true,
	},
	poweredByHeader: false,
};

export default nextConfig;
