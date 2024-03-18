/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = {
	nextConfig,
	images: {
		domains: [
			"firulaixcoin.finance",
			"alejandroaguilar.dev",
			"firu.alejandroaguilar.dev",
			"firutestnet.alejandroaguilar.dev",
			"youtube.com",
		],
	},
	async rewrites() {
		return [
			{
				source: "/domain/:path*",
				destination: `https://firulaixcoin.finance/images/:path*`,
			},
			{
				source: "/api/:path*",
				destination: `https://firu.alejandroaguilar.dev/:path*`,
			},
			{
				source: "/api/:path*",
				destination: `https://firutestnet.alejandroaguilar.dev/:path*`,
			},
		];
	},
};
