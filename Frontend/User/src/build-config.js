"use strict";

// This file is used by the Next.js build process to configure the build
module.exports = {
  generateBuildId: async () => {
    // You can add a custom build ID here if needed
    return `build-${Date.now()}`;
  },
  // Avoid rendering static pages for now
  generateStaticParams: async () => {
    return [];
  },
  // Minify the output to reduce bundle size
  compress: true
};
