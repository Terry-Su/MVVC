const dirTree = require('directory-tree')

const {
  projectsRootPath,
  getPagePathInfosByProjectInputInfo,
  outputRootPath,
  shareFolderName,
} = require('./config/mvvcConfig')


module.exports = function getPagePathInfosByProjectName(projectName) {
  let pagePathInfos = []
  const project = dirTree(projectsRootPath).children.filter(project => project.type === 'directory' && project.name !== shareFolderName && project.name === projectName)[0]
  project.children.filter(page => page.type === 'directory' && page.name !== shareFolderName).map(page => {
    pagePathInfos.push({
      pagePath: page.path,
      page: page.name,
      project: projectName
    })
  })
  return pagePathInfos
}