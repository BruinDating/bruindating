import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["randomuser.me"], // ✅ 允许加载外部图片
},
};

export default nextConfig;
