/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "asvhruseebznfswjyxmx.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
      //   {
      //     protocol: "https",
      //     hostname: "lh3.googleusercontent.com",
      //     pathname: "/a/**",
      //   },
    ],
  },
  // output: "export",
};

export default nextConfig;
