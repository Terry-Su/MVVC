const getNodeWebpackConfig= require('./getNodeWebpackConfig')
const watchNodeSpeicalConfigByPage = require('./watchNodeSpeicalConfigByPage')


module.exports = function (page, callback) {
  watchNodeSpeicalConfigByPage(getNodeWebpackConfig, page, callback, 1000)
}