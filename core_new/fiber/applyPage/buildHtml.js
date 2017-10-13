const getOutputPagePath = require('../getOutputPagePath')
const getNodeHtmlConfig = require('../getNodeHtmlConfig')

const getOutputHtmlPath = (outputPagePath, htmlName) => PATH.resolve(outputPagePath, `./${htmlName}`)
const writeHtmlToPath = (content, path) => {
    FS.mkdirpSync(PATH.dirname(path))
    FS.writeFileSync(path, content)
}

module.exports = function (page) {
    const htmlConfig = getNodeHtmlConfig(page)
    if (htmlConfig) {
        const { name: htmlName, content } = htmlConfig
        const outputPagePath = getOutputPagePath(page)
        const outputHtmlPath = getOutputHtmlPath(outputPagePath, htmlName)

        writeHtmlToPath(content, outputHtmlPath)
    }
}