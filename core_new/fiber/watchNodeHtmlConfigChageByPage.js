const getNodeHtmlConfig= require('./getNodeHtmlConfig')
const watchNodeSpeicalConfigByPage = require('./watchNodeSpeicalConfigByPage')


module.exports = function (page, callback) {
  watchNodeSpeicalConfigByPage(getNodeHtmlConfig, page, callback, 1000)
}