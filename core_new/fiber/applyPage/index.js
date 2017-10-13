const watchHtmlConfigAndRebuildHtml = require('./watchHtmlConfigAndRebuildHtml')
const watchWebpackConfigAndRestartWebpack = require('./watchWebpackConfigAndRestartWebpack')
const copyStaticToPublic = require('./copyStaticToPublic')


module.exports = function (page) {
    // watchHtmlConfigAndRebuildHtml(page)
    watchWebpackConfigAndRestartWebpack(page)
    // copyStaticToPublic(page)
}