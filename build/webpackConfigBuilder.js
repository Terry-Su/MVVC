/**
 * build webpack config
 */
const PATH = require('path')
const FS = require('fs')
const dirTree = require('directory-tree');

const {
  projectsRootPath,
  getPagePathInfosByProjectInputInfo,
  webpackConfigCachePath,
  outputRootPath
} = require('../config/server.config.js')



module.exports = {
  build,
  getAllProjectsPagePathInfos,
  getPagePathInfosByProjectName,
  getPagePathInfosByPageAndProjectName
}

function build(pagePathInfos) {
  updateCachedWebpackConfig(pagePathInfos)
}

function getAllProjectsPagePathInfos() {
  let pagePathInfos = []
  dirTree(projectsRootPath).children.filter(project => project.type === 'directory' && project.name !== 'share').map(project => {
    const tmpPagePathInfos = getPagePathInfosByProjectName(project.name)
    pagePathInfos = pagePathInfos.concat(tmpPagePathInfos)
  })
  return pagePathInfos
}

function getPagePathInfosByProjectName(projectName) {
  let pagePathInfos = []
  const project = dirTree(projectsRootPath).children.filter(project => project.type === 'directory' && project.name !== 'share' && project.name === projectName)[0]
  project.children.filter(page => page.type === 'directory' && page.name !== 'share').map(page => {
    pagePathInfos.push({
      pagePath: page.path,
      page: page.name,
      project: projectName
    })
  })
  return pagePathInfos
}

function getPagePathInfosByPageAndProjectName(pageName, projectName) {
  let pagePathInfos = []
  const project = dirTree(projectsRootPath).children.filter(project => project.type === 'directory' && project.name !== 'share' && project.name === projectName)[0]
  const page = project.children.filter(page => page.type === 'directory' && page.name !== 'share' && page.name === pageName)[0]
  pagePathInfos.push({
    pagePath: page.path,
    page: page.name,
    project: projectName
  })
  return pagePathInfos
}


function getWebEntryPath(pagePath) {
  return PATH.resolve(pagePath, './controller/index.web.js')
}

function getOutputPath(project, page) {
  return PATH.resolve(outputRootPath, `./${project}/${page}`)
}


function updateCachedWebpackConfig(pagePathInfos) {
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
    settings.push({
      entry,
      output,
      devtool: 'source-map',
      module: {
        rules: [
          {
            "test": "/\.js.*/",
            "exclude": "/node_modules/",
            use: [
              {
                loader: 'babel-loader',
                options: {
                  presets: ['es2015', 'stage-0'],
                  plugins: ['inferno']
                }
              }
            ]
          }
        ]
      },
      resolve: {
        alias: {
          fetch: PATH.resolve(__dirname, './../src/share/util/fetch.js')
        }
      }
    })
  })

  const toWriteStr = `module.exports=${JSON.stringify(settings, null, 4)}`
    .replace(new RegExp('"/\.js.*/"', 'g'), '/\.js.*/')
    .replace(new RegExp('"/node_modules/"', 'g'), '/node_modules/')
  FS.writeFileSync(webpackConfigCachePath, toWriteStr)
}
