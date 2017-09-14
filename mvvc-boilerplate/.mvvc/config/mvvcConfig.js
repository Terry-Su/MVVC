const PATH = require('path')

const mvvcConfigPath = PATH.resolve(process.cwd(), './mvvc.config.js')

const basicMvvcConfig = {
  resolvePagePathInfoCachePath: PATH.resolve(__dirname, '../resolvePagePathInfo/cache'),
  webpackWatchCachePath: PATH.resolve(__dirname, '../webpackWatch/cache'),
}



module.exports = Object.assign(basicMvvcConfig, require(mvvcConfigPath))