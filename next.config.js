/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    apiUrl: `${process.env.HOST}/api`,
    awsRegion: process.env.REGION_AWS,
    awsSecretAccessKey: process.env.SECRET_ACCESS_KEY_AWS,
    awsAccessKey: process.env.ACCESS_KEY_AWS,
    awsBucketName: process.env.BUCKET_NAME_AWS,
    nextAuthSecret: process.env.NEXTAUTH_SECRET,
    googleClientId: process.env.GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  },
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ['lh3.googleusercontent.com'],
  },
};

module.exports = nextConfig;
