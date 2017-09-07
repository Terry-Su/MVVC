/**
 * build webpack config
 */
const PATH = require('path')
const FS = require('fs')
const dirTree = require('directory-tree');
const gulp = require('gulp')
const webpack = require('webpack')

const {
  projectsRootPath,
  getPagePathInfosByProjectInputInfo,
  outputRootPath,
} = require('./mvvcConfig')

function getWebEntryPath(pagePath) {
  return PATH.resolve(pagePath, './controller/entry.js')
}

function getNodeConfig(pagePath) {
  const nodePath = PATH.resolve(pagePath, './controller/index.node.js')
  return require(nodePath)['default']
}

function getNodeWebpackBasicConfig(pagePath) {
  const nodeConfig = getNodeConfig(pagePath)
  const { webpackBasicConfig } = nodeConfig
  
  return webpackBasicConfig
}

function getOutputPath(project, page) {
  return PATH.resolve(outputRootPath, `./${project}/${page}`)
}


module.exports = function getWebpackConfig(pagePathInfos) {
  let settings = []
  pagePathInfos.map(pagePathInfo => {
    const {
      pagePath,
      page,
      project
    } = pagePathInfo
    const entry = getWebEntryPath(pagePath)
    const output = {
      path: getOutputPath(project, page),
      filename: 'bundle.js'
    }

    const webpackBasicConfig = getNodeWebpackBasicConfig(pagePath) || {}    

    settings.push({
      ...webpackBasicConfig,
      entry,
      output,
    })
  })

  return settings
}



