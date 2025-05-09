/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'utfs.io',
        port: ''
      },
      {
        protocol: 'https',
        hostname: 'api.slingacademy.com',
        port: ''
      },
      {
        protocol: 'https',
        hostname: 'example.com', // Added this entry
        port: ''
      },
      {
        protocol: 'https',
        hostname: 'icon-library.com', // Added this entry
        port: ''
      },
      {
        protocol: 'https',
        hostname: 'shandaarbuy.pk', // Added this entry
        port: ''
      },
      {
        protocol: 'https',
        hostname: 'i.insider.com', // Added this entry
        port: ''
      }
    ]
  },

  transpilePackages: ['geist']
};

module.exports = nextConfig;
