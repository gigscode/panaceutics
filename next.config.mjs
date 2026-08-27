/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: '/explore',
        destination: '/explore/categories',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
