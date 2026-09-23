import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {

  images: {
    unoptimized: true,

    remotePatterns: [
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "1337",
        pathname: "/uploads/**",
      },
      {
        protocol: "http",
        hostname: "13.234.18.254",
        port: "1337",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "ceaibackend.elroiitsolutions.com",
        pathname: "/uploads/**",
      },
    ],
  },
  async rewrites() {
    const rawUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://13.234.18.254:1337';
    const baseUrl = rawUrl.replace(/\/+$/, '');
    return [
      {
        source: '/uploads/:path*',
        destination: `${baseUrl}/uploads/:path*`,
      },
    ];
  },
};

export default withNextIntl(nextConfig);