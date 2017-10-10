// build html and bundle.js based on pageInfo
const PATH = require('path')
const FS = require('fs-extra')

const execWebpack = require('./execWebpack')

const pageInfo = {
    name: 'Page1',
    path: 'D:/Project/MVVC/core/__test/laboratory/src/Project1/Page1'
}
const pageName = pageInfo.name


const config = {
    publicPath: 'D:/Project/MVVC/core/__test/laboratory/public',
    webEntryPath: 'D:/Project/MVVC/core/__test/laboratory/src/Project1/Page1/webEntry.js',
    nodeConfigPath: 'D:/Project/MVVC/core/__test/laboratory/src/Project1/Page1/nodeConfig.js',
}

const outputPagePath = PATH.resolve(config.publicPath, `./${pageName}`)
const outputHtmlPath = PATH.resolve(outputPagePath, `./index.html`)

const nodeConfig = require('D:/Project/MVVC/core/__test/laboratory/src/Project1/Page1/nodeConfig.js')

const { webpackConfig: baseWebpackConfig, html } = nodeConfig
const webpackConfig = Object.assign(baseWebpackConfig, {
    output: {
        path: outputPagePath,
        filename: 'bundle.js',
    }
})



const build = {
    buildHtml() {
        FS.mkdirpSync(PATH.dirname(outputHtmlPath))
        FS.writeFileSync(outputHtmlPath, html)
    }
}

// build 
Object.keys(build).map(key => build[key]())

// execute webpack
execWebpack(webpackConfig)