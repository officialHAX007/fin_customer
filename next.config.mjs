/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/fin-customer',      // makes pages live at /fin-customer
  experimental: { instrumentationHook: true },
};
export default nextConfig;
