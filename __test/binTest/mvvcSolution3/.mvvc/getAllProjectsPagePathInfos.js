const dirTree = require('directory-tree')

const {
  projectsRootPath,
  getPagePathInfosByProjectInputInfo,
  outputRootPath,
  shareFolderName,
} = require('./config/mvvcConfig')

const getPagePathInfosByProjectName = require('./getPagePathInfosByProjectName')


module.exports = function getAllProjectsPagePathInfos() {
  let pagePathInfos = []
  dirTree(projectsRootPath).children.filter(project => project.type === 'directory' && project.name !== shareFolderName).map(project => {
    const tmpPagePathInfos = getPagePathInfosByProjectName(project.name)
    pagePathInfos = pagePathInfos.concat(tmpPagePathInfos)
  })
  return pagePathInfos
}