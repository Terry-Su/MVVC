const getNodeWebpackConfig = require('../getNodeWebpackConfig')
const getOutputPagePath = require('../getOutputPagePath')

const getKeys = object => Object.keys(object)
const checkExsitRawWebpackConfigEntry = (rawWebpackConfig) => getKeys(rawWebpackConfig).includes('entry')
const checkExsitRawWebpackConfigOutput = (rawWebpackConfig) => getKeys(rawWebpackConfig).includes('output')
const getFileName = filePath => PATH.basename(filePath)
const getDefaultEntry = page => {
    const { path: pagePath } = page
    return PATH.resolve(pagePath, './entry.js')
}
const getDefaultOutput = page => {
    const outputPagePath = getOutputPagePath(page)
    const path = outputPagePath
    const filename = 'bundle.js'
    return {
        path,
        filename,
    }
}

module.exports = function (page) {
    const rawWebpackConfig = getNodeWebpackConfig(page)

    const cookRawWebpackConfig = rawWebpackConfig => {
        let cookedWebpackConfig = Object.assign({}, rawWebpackConfig)

        const checkEntryAndCookWebpackConfigIfNeeded = webpackConfig => {
            // check entry
            const exsitRawWebpackConfigEntry = checkExsitRawWebpackConfigEntry(webpackConfig)
            // add default entry to webpack config if entry don't exsit
            if (!exsitRawWebpackConfigEntry) {
                const entry = getDefaultEntry(page)
                webpackConfig = Object.assign({}, webpackConfig, { entry })
            }
            return webpackConfig
        }

        const checkOutputAndCookWebpackConfigIfNeeded = webpackConfig => {
            // check output
            const exsitRawWebpackConfigOutput = checkExsitRawWebpackConfigOutput(webpackConfig)
            // add default output to webpack config if output don't exsit
            if (!exsitRawWebpackConfigOutput) {
                const output = getDefaultOutput(page)
                webpackConfig = Object.assign({}, webpackConfig, { output })
            }
            return webpackConfig
        }

        cookedWebpackConfig = checkEntryAndCookWebpackConfigIfNeeded(cookedWebpackConfig)

        cookedWebpackConfig = checkOutputAndCookWebpackConfigIfNeeded(cookedWebpackConfig)

        return cookedWebpackConfig
    }

    const cookedWebpackConfig = cookRawWebpackConfig(rawWebpackConfig)

    const webpackWatcher = Util.execWebpack(cookedWebpackConfig)

    return webpackWatcher
}