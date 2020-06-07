const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
  webpack (config, _) {
    config.resolve.alias['@'] = __dirname
    return config
  }
})

module.exports = withBundleAnalyzer
