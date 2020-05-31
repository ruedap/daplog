const path = require('path')

module.exports = {
  webpack (config, _) {
    config.resolve.alias['@'] = __dirname
    return config
  }
}
