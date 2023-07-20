/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    apiUrl: '/api',
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
};

module.exports = nextConfig;
