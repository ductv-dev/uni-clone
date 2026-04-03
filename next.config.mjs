import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  disable: false, // Disabled during dev by default, but enabled here for testing the prompt
  register: true,
  skipWaiting: true,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false,
};

export default withPWA(nextConfig);
