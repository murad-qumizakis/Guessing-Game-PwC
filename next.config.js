/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: [
      "avatars.githubusercontent.com",
      "www.link-j.org",
      "www.hrlact.org",
    ],
  },
  // async rewrites() {
  //   return [
  //     {
  //       source: "/api/:path*",
  //       destination: "http://localhost:3001/api/:path*",
  //     },
  //   ];
  // },
};

module.exports = nextConfig;
