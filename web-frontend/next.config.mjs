/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	env: {
		ENDPOINT: process.env.ENDPOINT,
	},
};

export default nextConfig;
