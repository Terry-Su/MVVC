/**
 * Resolve build command
 */
const path = require('path')
const BUILD = process.env.BUILD
const { exec } = require('child_process')

const {
  rootPath,
  projectsRootPath,
  webpackConfigCachePath
} = require('../config.js')
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
const {
  init: initWebServer
} = require('./webServer')
const {
  removeDeprecatedProjects,
  removeConfilctPagesInProjects
} = require('./removeDeprecated')



// initialize
projectsPrompt.show((input, projectsNames) => {
  resolveProjectInput(input, projectsNames)
})


function resolvePagePathInfos(pagePathInfos) {
  removeDeprecatedProjects()
    .then(v => removeConfilctPagesInProjects())
    .then(v => {
      buildWebpackConfig(pagePathInfos)
      watchAndBuildHtml(pagePathInfos)
      execWebpack()
      initWebServer()
    })
}


function resolveProjectInput(input, projectsNames) {
  input = parseInt(input)
  if (input === 0) {
    const pagePathInfos = getPagePathInfosByProjectInputInfo(input)
    resolvePagePathInfos(pagePathInfos)
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
  resolvePagePathInfos(pagePathInfos)
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
  if (BUILD) {
    return exec(`webpack -p --colors --config ${webpackConfigCachePath}`).stdout.pipe(process.stdout)
  }
  exec(`webpack --watch --colors --config ${webpackConfigCachePath}`).stdout.pipe(process.stdout)
}