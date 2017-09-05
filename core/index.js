/**
 * Resolve build command
 */
const PATH = require('path')
const BUILD = process.env.BUILD
const { exec } = require('child_process')


const {
  rootPath,
  projectsRootPath,
  shouldRemoveExtraFilesInPublic
} = require('./mvvcConfig')

const prompt = require('./prompt')
const projectsPrompt = require('./projectsPrompt')
const pagesPrompt = require('./pagesPrompt')
const { getNames, getPageNameRootPath } = require('./names')
const getWebpackConfig = require('./getWebpackConfig')

const getAllProjectsPagePathInfos = require('./getAllProjectsPagePathInfos')
const getPagePathInfosByProjectName = require('./getPagePathInfosByProjectName')
const getPagePathInfosByPageAndProjectName = require('./getPagePathInfosByPageAndProjectName')

const execWebpack = require('./execWebpack')

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
  // remove extra projects folders if needed
  const removeProjectsFn = shouldRemoveExtraFilesInPublic ? removeDeprecatedProjects : () => Promise.resolve(true)
  // remove extra projects' files if needed
  const removeFilesFn = shouldRemoveExtraFilesInPublic ? removeConfilctPagesInProjects : () => Promise.resolve(true)
  removeConfilctPagesInProjects
  removeProjectsFn()
    .then(v => removeFilesFn())
    .then(v => {
      const webpackConfig = getWebpackConfig(pagePathInfos)
      execWebpack(webpackConfig)
      
      if (!process.env.production) {
        watchAndBuildHtml(pagePathInfos)
        initWebServer()
      }
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

