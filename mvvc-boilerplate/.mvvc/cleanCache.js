const rimraf = require('rimraf')
const PATH = require('path')


module.exports = function cleanCache(path, callback) {
  rimraf.sync(path)
}