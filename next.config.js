/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    apiUrl: process.env.HOST + '/api',
    awsRegion: process.env.AWS_REGION,
    awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    awsAccessKey: process.env.AWS_ACCESS_KEY,
    awsBucketName: process.env.AWS_BUCKET_NAME,
  },
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ['lh3.googleusercontent.com'],
  },
};

module.exports = nextConfig;
