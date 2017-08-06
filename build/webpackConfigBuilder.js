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
  webpackConfigOutputRootPath
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


function getEntryPath(pagePath) {
  return PATH.resolve(pagePath, './controller/index.js')
}

function updateCachedWebpackConfig(pagePathInfos) {
  let settings = []
  pagePathInfos.map(pagePathInfo => {
    const {
      pagePath,
      page,
      project
    } = pagePathInfo
    const entry = getEntryPath(pagePath)
    const output = {
      path: PATH.resolve(webpackConfigOutputRootPath, `./${project}/${page}`),
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
      }
    })
  })

  const toWriteStr = `module.exports=${JSON.stringify(settings, null, 4)}`
    .replace('"/\.js.*/"', '/\.js.*/')
    .replace('"/node_modules/"', '/node_modules/')
  FS.writeFileSync(webpackConfigCachePath, toWriteStr)
}
