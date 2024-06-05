/** @type {import('next').NextConfig} */
const nextConfig = {
	webpack: (config, { isServer }) => {
		config.experiments = { asyncWebAssembly: true, layers: true }
		if (!isServer) {
			config.resolve.fallback = {
				fs: false,
				os: false,
				path: false,
				module: false
			}
		}
		return config
	}
}

module.exports = nextConfig
