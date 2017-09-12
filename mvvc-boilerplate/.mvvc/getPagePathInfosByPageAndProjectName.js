const dirTree = require('directory-tree')

const {
  projectsRootPath,
  getPagePathInfosByProjectInputInfo,
  outputRootPath,
  shareFolderName,
} = require('./config/mvvcConfig')


module.exports = function getPagePathInfosByPageAndProjectName(pageName, projectName) {
  let pagePathInfos = []
  const project = dirTree(projectsRootPath).children.filter(project => project.type === 'directory' && project.name !== shareFolderName && project.name === projectName)[0]
  const page = project.children.filter(page => page.type === 'directory' && page.name !== shareFolderName && page.name === pageName)[0]
  pagePathInfos.push({
    pagePath: page.path,
    page: page.name,
    project: projectName
  })
  return pagePathInfos
}