const PATH = require('path')
const FS = require('fs-extra')

const webpackWatch = require('../webpackWatch/index')
const nodeWebpackWithoutEntryConfig = require('../config/nodeWebpackWithoutEntryConfig')
const getPageEntryJs = require('./getPageEntryJs')
const {
  webpackWatchCachePath,
  resolvePagePathInfoCachePath,
} = require('../config/mvvcConfig')
const buildHtml = require('../buildHtml')

module.exports = function resolvePagePathInfo(pagePathInfo) {
  // know web(webpack) was built or not
  let isWebWebpackBuilt = false

  // watch index.node.js(including get web's webpack config, and compile it by webpack)
  const {
    pagePath,
    project,
    page,
  } = pagePathInfo

  const entryFileName = PATH.relative(__dirname, pagePath).replace(/\.\.\//g, '').replace(/\//g, '_').concat('_entry.js')
  const outputFilename = PATH.relative(__dirname, pagePath).replace(/\.\.\//g, '').replace(/\//g, '_').concat('_node_controller.js')

  const originNodeControllerPath = PATH.resolve(pagePath, './controller/index.node.js')

  // create entry file
  const entryFilePath = PATH.resolve(__dirname, `./cache/${entryFileName}`)
  const pageHtml = getPageEntryJs({
    originNodeControllerPath,
    pagePath,
    project,
    page,
  })
  FS.ensureFileSync(entryFilePath)
  FS.writeFileSync(entryFilePath, pageHtml)

  const entry = entryFilePath
  const output = {
    path: webpackWatchCachePath,
    filename: outputFilename,
    libraryTarget: 'commonjs2',
  }

  webpackWatch(Object.assign(
    {
      entry,
      output,
    },
    nodeWebpackWithoutEntryConfig
  ), () => {
    const distWebWebpackEntry = `${webpackWatchCachePath}/${outputFilename}`
    const nodeController = require(distWebWebpackEntry).default

    // build web by webpack    
    if (!isWebWebpackBuilt) {
      nodeController.watchWebByWebpack()
      isWebWebpackBuilt = true
    }

    // if changed in development, rebuild html
    if (!process.env.production) {
      const html = nodeController.getHtml()
      buildHtml(pagePathInfo, html)
    }
  })
}

