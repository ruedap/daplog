module.exports = {
  webpack(config, _) {
    config.resolve.alias['@'] = __dirname
    return config
  },
  distDir: './.next',
}
