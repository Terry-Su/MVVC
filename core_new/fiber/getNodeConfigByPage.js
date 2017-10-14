const getNodeConfigPath = page => {
    const { path: pagePath } = page
    return PATH.resolve(pagePath, './nodeConfig.js')
}

module.exports = function (page) {
    let nodeConfig
    const nodeConfigPath = getNodeConfigPath(page)
    
    try {
        nodeConfig = require(nodeConfigPath)
        Util.cleanRequreCache(nodeConfigPath)
    } catch (e) {
        
    }

    return nodeConfig
}