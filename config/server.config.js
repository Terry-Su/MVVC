const path = require('path')

module.exports = {
  localPort: 3000,

  rootPath: path.resolve(__dirname, './../../MVVC'),
  outputRootPath: path.resolve(__dirname, './../dist'),    
  projectsRootPath: path.resolve(__dirname, './../src'),
  webpackConfigCachePath: path.resolve(__dirname, './../build/cache/webpackConfigCache.js'),
}