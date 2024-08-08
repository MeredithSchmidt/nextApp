/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['res.cloudinary.com'],
    },
    async rewrites() {
      return [
        {
          source: '/api/protected-route',
          destination: '/api/protected-route',
        },
      ];
    },
  };
  
  export default nextConfig;