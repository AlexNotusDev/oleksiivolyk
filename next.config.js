/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    apiUrl: `${process.env.HOST}/api`,
    awsRegion: process.env.REGION_AWS,
    awsSecretAccessKey: process.env.SECRET_ACCESS_KEY_AWS,
    awsAccessKey: process.env.ACCESS_KEY_AWS,
    awsBucketName: process.env.BUCKET_NAME_AWS,
    dbUrl: process.env.DATABASE_URL,
  },
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ['lh3.googleusercontent.com'],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/blog',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
