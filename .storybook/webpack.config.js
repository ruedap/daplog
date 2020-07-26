const path = require('path')

module.exports = ({ config }) => {
  config.resolve.alias['@'] = path.join(__dirname, '..')

  return config
}
