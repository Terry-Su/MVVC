const getOutputPagePath = require('../getOutputPagePath')
const getNodeHtmlConfig = require('../getNodeHtmlConfig')

const logSuccess = path => {
    const fileName = PATH.basename(path)
    console.log(Chalk.green.bold('\n' + fileName + ' [generated]\n'))
}

const getOutputHtmlPath = (outputPagePath, htmlName) => PATH.resolve(outputPagePath, `./${htmlName}`)
const writeHtmlToPath = (content, path) => {
    FS.mkdirpSync(PATH.dirname(path))
    FS.writeFileSync(path, content)

    logSuccess(path)
}


module.exports = function (page) {
    const htmlConfig = getNodeHtmlConfig(page)

    const { name: htmlName, content } = htmlConfig
    const outputPagePath = getOutputPagePath(page)
    const outputHtmlPath = getOutputHtmlPath(outputPagePath, htmlName)

    writeHtmlToPath(content, outputHtmlPath)
}