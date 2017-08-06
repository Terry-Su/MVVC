const path = require('path')

module.exports = {
  rootPath: path.resolve(__dirname, './../../MVVC'),
  projectsRootPath: path.resolve(__dirname, './../src'),
  webpackConfigCachePath: path.resolve(__dirname, './../build/cache/webpackConfigCache.js'),
  webpackConfigOutputRootPath: path.resolve(__dirname, './../dist')
}