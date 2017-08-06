const PATH = require('path')
const FS = require('fs')
const gulp = require('gulp')
const webpack = require('webpack-stream')
const WebpackOnBuildPlugin = require('on-build-webpack');
const decache = require('decache')

const {
  outputRootPath
} = require('../config/server.config.js')


module.exports = {
  watchAndBuild,
  build
}

function watchAndBuild(pagePathInfos) {
  pagePathInfos.map(pagePathInfo => {
    const {
      pagePath
    } = pagePathInfo
    const entryPath = getServerEntryPath(pagePath)
    build(pagePathInfo)
    gulp.src(entryPath).pipe(webpack({
      watch: true,
      plugins: [
        new WebpackOnBuildPlugin(function (stats) {
          build(pagePathInfo)
        })
      ]
    }))
  })

}

function build(pagePathInfo) {
  const {
    pagePath,
    page,
    project
  } = pagePathInfo
  const entryPath = getServerEntryPath(pagePath)

  const {
      getHtml
  } = require(entryPath)

  // delete require cache
  decache(entryPath)

  const outputPath = getOutputPath(project, page)
  const html = getHtml()
  writeHtml(outputPath, html)
}

function getOutputPath(project, page) {
  return PATH.resolve(outputRootPath, `./${project}/${page}/index.html`)
}

function getServerEntryPath(pagePath) {
  return PATH.resolve(pagePath, './controller/index.server.js')
}

function writeHtml(path, text) {
  try {
    FS.writeFileSync(path, text)
    console.log(`Build ${path} successfully!`)
  } catch (e) {
    console.log(`Building ${path} failed!`)
    console.log(e)
  }
}