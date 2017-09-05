import webpackWatchESEntry from './webpackWatchESEntry'
import chalk from 'chalk'

const PATH = require('path')
const FS = require('fs')
const gulp = require('gulp')
const webpack = require('webpack')
const WebpackOnBuildPlugin = require('on-build-webpack');
const decache = require('decache')
const {
  outputFile
} = require('fs-extra')

const BUILD = process.env.BUILD

const {
  outputRootPath
} = require('./mvvcConfig')


module.exports = {
  watchAndBuild,
  build
}

function watchAndBuild(pagePathInfos) {
  pagePathInfos.map(pagePathInfo => {
    const {
      pagePath
    } = pagePathInfo

    const entry = getServerEntryPath(pagePath)

    webpackWatchESEntry(entry, () => {
      build(pagePathInfo)
    })
  })

  
}

function build(pagePathInfo) {
  const {
    pagePath,
    page,
    project
  } = pagePathInfo
  const entryPath = getServerEntryPath(pagePath)

  const nodeController = require(entryPath)['default']
  const {
    getHtml
  } = nodeController

  // delete require cache
  decache(entryPath)

  const outputPath = getOutputPath(project, page)
  const html = nodeController.getHtml()
  writeHtml(outputPath, html)
}

function getOutputPath(project, page) {
  return PATH.resolve(outputRootPath, `./${project}/${page}/index.html`)
}

function getServerEntryPath(pagePath) {
  return PATH.resolve(pagePath, './controller/index.node.js')
}

function writeHtml(path, text) {
  try {
    outputFile(path, text)
    // console.log(`\x1b[32m`, `${path} was built successfully!`)
    console.log(`${path}`, chalk.green.bold(`[built]`))
  } catch (e) {
    console.log(`\x1b[31m`, `Building ${path} failed!`)
    console.log(e)
  }
}