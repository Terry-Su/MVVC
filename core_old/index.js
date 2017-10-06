/**
 * Resolve build command
 */
const BUILD = process.env.BUILD

const {
  shouldRemoveExtraFilesInPublic
} = require('./config/mvvcConfig')

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
