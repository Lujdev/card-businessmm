/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'images.unsplash.com',
            port: '',
            pathname: '/**',
          },
          {
            protocol: 'https',
            hostname: 'pbs.twimg.com'
          },
          {
            protocol: 'https',
            hostname: 'flowbite.s3.amazonaws.com'
          },
          {
            protocol: 'https',
            hostname: 'flowbite.com'
          },
          {
            protocol: 'https',
            hostname: 'api.qrserver.com'
          }
        ],
      },
}

module.exports = nextConfig