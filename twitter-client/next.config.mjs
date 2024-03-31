/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
        pathname: '/u/**',
      },
        {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',      
      },
      {
        protocol:"https",
        hostname:"**.amazonaws.com",
      }
    ],
  },
};


export default nextConfig;