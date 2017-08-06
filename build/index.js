/**
 * Resolve build command
 */
const path = require('path')

const {
  rootPath,
  projectsRootPath,
  webpackConfigCachePath
} = require('../config/server.config.js')
const prompt = require('./prompt')
const projectsPrompt = require('./projectsPrompt')
const pagesPrompt = require('./pagesPrompt')
const { getNames, getPageNameRootPath } = require('./names')
const {
  build: buildWebpackConfig,
  getAllProjectsPagePathInfos,
  getPagePathInfosByProjectName,
  getPagePathInfosByPageAndProjectName
} = require('./webpackConfigBuilder')
const {
  watchAndBuild: watchAndBuildHtml
} = require('./htmlBuilder')
const { exec } = require('child_process')



// initialize
projectsPrompt.show((input, projectsNames) => {
  resolveProjectInput(input, projectsNames)
})



function resolveProjectInput(input, projectsNames) {
  input = parseInt(input)
  if (input === 0) {
    const pagePathInfos = getPagePathInfosByProjectInputInfo(input)
    buildWebpackConfig(pagePathInfos)
    watchAndBuildHtml(pagePathInfos)
    execWebpack()
  }
  if (input > 0) {
    const projectName = projectsNames[input]
    const pageRootPath = getPageNameRootPath(projectName)
    const pageNames = getNames(pageRootPath)
    pagesPrompt.show({
      projectName,
      pageNames,
      successCallback: (input, pageNames) => {
        resolvePageInput(input, pageNames)
      }
    })
  }
}

function resolvePageInput({
  input,
  pageNames,
  projectName
}) {
  input = parseInt(input)
  const pagePathInfos = getPagePathInfosByPageInputInfo({
    projectName,
    input,
    pageNames
  })
  buildWebpackConfig(pagePathInfos)
  watchAndBuildHtml(pagePathInfos)
  execWebpack()
}

function getPagePathInfosByProjectInputInfo(input) {
  const projectsNames = getNames(projectsRootPath)
  input = parseInt(input)
  if (input === 0) {
    return getAllProjectsPagePathInfos()
  }
  if (input > 0) {
    const projectName = projectsNames[input]
    return getPagePathInfosByProjectName(projectName)
  }
}

function getPagePathInfosByPageInputInfo({
  input,
  pageNames,
  projectName
}) {
  input = parseInt(input)
  if (input === 0) {
    return getPagePathInfosByProjectName(projectName)
  }
  if (input > 0) {
    const pageName = pageNames[input]
    return getPagePathInfosByPageAndProjectName(pageName, projectName)
  }
}



function execWebpack() {
  exec(`webpack --watch --colors --config ${webpackConfigCachePath}`).stdout.pipe(process.stdout)
}