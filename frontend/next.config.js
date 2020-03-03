const path = require("path");

/**
 * This is here to make nextjs understand @src folder references
 * - also configured in tsconfig.json, so typescript understands it as well
 */

const withApp = (nextConfig = {}) => {
  return Object.assign({}, nextConfig, {
    webpack(config, options) {
      config.resolve.alias["@src"] = path.resolve("./src");
      return config;
    }
  });
};
module.exports = {
  ...withApp(),
  // enforce .page convention for pages
  pageExtensions: ["page.tsx", "page.ts", "page.js"]
};
