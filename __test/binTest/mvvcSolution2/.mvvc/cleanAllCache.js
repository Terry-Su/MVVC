const {
  webpackWatchCachePath,
  resolvePagePathInfoCachePath,
} = require('./config/mvvcConfig')
const cleanCache = require('./cleanCache')

module.exports = function cleanAllCache(path, callback) {
  cleanCache(webpackWatchCachePath)
  cleanCache(resolvePagePathInfoCachePath)
}