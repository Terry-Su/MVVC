const watchHtmlConfigAndRebuildHtml = require('./watchHtmlConfigAndRebuildHtml')
const watchWebpackConfigAndRestartWebpack = require('./watchWebpackConfigAndRestartWebpack')
const copyStaticToPublic = require('./copyStaticToPublic')
const getNodeHtmlConfig = require('../getNodeHtmlConfig')
const getNodeWebpackConfig = require('../getNodeWebpackConfig')

module.exports = function (page) {
    const watchHtmlConfigAndRebuildHtmlIfNeeded = (page) => {
        const htmlConfig = getNodeHtmlConfig(page)
        const exsitHtmlConfig = htmlConfig !== undefined
        if (exsitHtmlConfig) {
            watchHtmlConfigAndRebuildHtml(page)
        }
    }

    const watchWebpackConfigAndRebuildHtmlIfNeeded = (page) => {
        const webpackConfig = getNodeWebpackConfig(page)
        const exsitWebpackConfig = webpackConfig !== undefined
        if (exsitWebpackConfig) {
            watchWebpackConfigAndRestartWebpack(page)
        }
    }

    watchHtmlConfigAndRebuildHtmlIfNeeded(page)

    watchWebpackConfigAndRebuildHtmlIfNeeded(page)
    
    copyStaticToPublic(page)
}