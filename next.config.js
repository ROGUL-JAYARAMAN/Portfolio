/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // After lint fixed, build should block on lint errors (production gate)
    ignoreDuringBuilds: false,
  },
  // No output:export — Vercel handles SSR/Static automatically
  // Minimal config keeps build simple; public/ served at /
  async headers() {
    return [
      {
        // Global security headers — applied to all routes
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com data:",
              "img-src 'self' data: blob:",
              "connect-src 'self' ws: wss: https://vitals.vercel-insights.com",
              "frame-ancestors 'none'",
              "base-uri 'self'",
              "form-action 'self' mailto:",
              "object-src 'none'",
            ].join("; "),
          },
        ],
      },
      {
        source: "/Rogul_Jayaraman_Resume.pdf",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=3600, must-revalidate",
          },
          {
            key: "Content-Type",
            value: "application/pdf",
          },
        ],
      },
      {
        source: "/favicon.svg",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=3600, must-revalidate",
          },
          {
            key: "Content-Type",
            value: "image/svg+xml",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
