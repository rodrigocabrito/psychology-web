import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root to this project (a stray lockfile elsewhere on the
  // machine was otherwise being picked up as the root).
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
