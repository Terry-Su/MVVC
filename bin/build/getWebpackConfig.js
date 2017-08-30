/**
 * build webpack config
 */
const PATH = require('path')
const FS = require('fs')
const dirTree = require('directory-tree');
const gulp = require('gulp')
const webpack = require('webpack')

const getAllProjectsPagePathInfos = require('./getAllProjectsPagePathInfos')
const getPagePathInfosByProjectName = require('./getPagePathInfosByProjectName')
const getPagePathInfosByPageAndProjectName = require('./getPagePathInfosByPageAndProjectName')

const {
  projectsRootPath,
  getPagePathInfosByProjectInputInfo,
  webpackConfigCachePath,
  outputRootPath,
  webpackTemplate,
} = require('../config.js')

function getWebEntryPath(pagePath) {
  return PATH.resolve(pagePath, './controller/entry.js')
}

function getNodeConfig() {
  const nodePath = PATH.resolve(pagePath, './controller/index.node.js')
  return require(nodePath)
}

function getNodeWebpackConfig() {
  const nodeConfig = getNodeConfig()
  const { webpackConfig } = nodeConfig
  return webpackConfig
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
    settings.push(
      webpackTemplate(entry, output)
    )
  })

  return settings
}



