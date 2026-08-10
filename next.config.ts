import type { NextConfig } from "next";

// A value that changes on every deploy — used by UpdateBanner to detect when a newer
// version of the app has been deployed while a user still has an old tab open.
// Vercel sets VERCEL_GIT_COMMIT_SHA at build time; falls back to the build timestamp
// for other hosts / local builds.
const BUILD_ID = process.env.VERCEL_GIT_COMMIT_SHA || String(Date.now());

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_BUILD_ID: BUILD_ID,
  },
};

export default nextConfig;
