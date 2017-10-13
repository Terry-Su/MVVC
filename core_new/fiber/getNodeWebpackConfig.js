const getNodeConfigByPage = require('./getNodeConfigByPage')


module.exports = function (page) {
    let webpackConfig
    
    const nodeConfig = getNodeConfigByPage(page)

    if (nodeConfig) {
        webpackConfig = nodeConfig.webpackConfig
    }

    return webpackConfig
}