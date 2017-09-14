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
} = require('./config/mvvcConfig')

const prompt = require('./prompt')
const projectsPrompt = require('./projectsPrompt')
const pagesPrompt = require('./pagesPrompt')
const { getNames, getPageNameRootPath } = require('./names')
const getWebWebpackConfig = require('./getWebWebpackConfig')

const getAllProjectsPagePathInfos = require('./getAllProjectsPagePathInfos')
const getPagePathInfosByProjectName = require('./getPagePathInfosByProjectName')
const getPagePathInfosByPageAndProjectName = require('./getPagePathInfosByPageAndProjectName')

const execWebpack = require('./execWebpack')

const {
  init: initWebServer
} = require('./webServer')
const {
  removeDeprecatedProjects,
  removeConfilctPagesInProjects
} = require('./removeDeprecated')

const resolvePagePathInfo = require('./resolvePagePathInfo/index')
const cleanAllCache = require('./cleanAllCache')
const readProjectsLines = require('./readProjectsLines')

// test
// resolvePagePathInfos([ { project: 'InfernoReduxProject',
// page: 'examplePage',
// pagePath: 'D:\\Project\\MVVC\\src\\InfernoReduxProject\\examplePage' } ])
// resolvePagePathInfos( [ { project: 'InfernoReduxProject',
// page: 'examplePage',
// pagePath: 'C:\\WorkingDocuments\\Project\\MVVC\\src\\InfernoReduxProject\\examplePage' } ])

init()

function init() {
  readProjectsLines()
    .then((pagePathInfos) => {
      resolvePagePathInfos(pagePathInfos)
    })
}


function resolvePagePathInfos(pagePathInfos) {
  // remove extra projects folders if needed
  const removeProjectsFn = shouldRemoveExtraFilesInPublic ? removeDeprecatedProjects : () => Promise.resolve(true)

  // remove extra projects' files if needed
  const removeFilesFn = shouldRemoveExtraFilesInPublic ? removeConfilctPagesInProjects : () => Promise.resolve(true)

  removeProjectsFn()
    .then(v => removeFilesFn())
    .then(v => {
      cleanAllCache()
       
      pagePathInfos.map(pagePathInfo => {
        resolvePagePathInfo(pagePathInfo)
      })

      if (!process.env.production) {
        initWebServer()
      }
    })
}
