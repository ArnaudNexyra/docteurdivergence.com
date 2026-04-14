import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  async headers() {
    return [
      {
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
            value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self';",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.youtube.com https://s3.tradingview.com https://js.stripe.com https://www.paypal.com https://js.paypal.com;",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;",
              "img-src 'self' data: https://www.youtube.com https://s3.tradingview.com https://*.tradingview.com https://www.paypalobjects.com https://*.stripe.com;",
              "font-src 'self' data: https://fonts.gstatic.com;",
              "frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com https://*.tradingview.com https://js.stripe.com https://www.paypal.com;",
              "connect-src 'self' https://*.tradingview.com https://api.stripe.com https://www.paypal.com;",
            ].join(" "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
