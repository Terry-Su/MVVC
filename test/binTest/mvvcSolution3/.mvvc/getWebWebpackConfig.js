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
} = require('./config/mvvcConfig')

function getWebEntryPath(pagePath) {
  return PATH.resolve(pagePath, './controller/entry.js')
}

function getWebConfig(pagePath) {
  const nodePath = PATH.resolve(pagePath, './controller/index.node.js')
  return require(nodePath)['default']
}

function getWebWebpackBasicConfig(pagePath) {
  const webConfig = getWebConfig(pagePath)
  const { webpackBasicConfig } = webConfig
  
  return webpackBasicConfig
}

function getOutputPath(project, page) {
  return PATH.resolve(outputRootPath, `./${project}/${page}`)
}


module.exports = function getWebWebpackConfig(pagePathInfos) {
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

    const webWebpackBasicConfig = getWebWebpackBasicConfig(pagePath) || {}    

    settings.push(Object.assign(
      webWebpackBasicConfig,
      {
        entry,
        output,
      }
    ))
  })

  return settings
}



