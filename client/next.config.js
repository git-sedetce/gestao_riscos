/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: "/",
        destination: "https://api-gestaoderiscos.sedet.ce.gov.br/",
      },
    ];
  },
};

module.exports = nextConfig;
