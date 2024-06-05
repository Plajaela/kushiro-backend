/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	env: {
		ENDPOINT: process.env.ENDPOINT,
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "uyceldzehojijmikgqtl.supabase.co",
				port: "",
			},
		],
	},
};

export default nextConfig;
