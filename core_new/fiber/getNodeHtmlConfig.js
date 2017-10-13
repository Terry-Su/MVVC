const getNodeConfigByPage = require('./getNodeConfigByPage')


module.exports = function (page) {
    let htmlConfig
    
    const nodeConfig = getNodeConfigByPage(page)

    if (nodeConfig) {
        htmlConfig = nodeConfig.htmlConfig
    }

    return htmlConfig
}