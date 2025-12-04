/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/dental-portfolio' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/dental-portfolio/' : '',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
}

export default nextConfig
