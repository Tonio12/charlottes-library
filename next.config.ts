import type { NextConfig } from 'next'
import TerserPlugin from 'terser-webpack-plugin'

const nextConfig: NextConfig = {
  useStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
      {
        protocol: 'https',
        hostname: 'm.media-amazon.com',
      },
      {
        protocol: 'https',
        hostname: 'ik.imagekit.io',
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        crypto: require.resolve('crypto-browserify'),
        stream: false,
        buffer: false,
      }
    }

    config.optimization.minimizer = [
      new TerserPlugin({
        terserOptions: {
          mangle: false, // Disable function renaming
          keep_fnames: true, // Preserve function names (prevents SHA256 loss)
          keep_classnames: true, // Preserve class names (for internal PDFKit use)
        },
      }),
    ]

    return config
  },
}

export default nextConfig
