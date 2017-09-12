const dirTree = require('directory-tree');
const {
  projectsRootPath,
  shareFolderName,
} = require('./config/mvvcConfig')

module.exports = {
  getNames,
  getPageNameRootPath
}
/**
 * get projects or pages names
 */
function getNames(rootPath) {
  const tree = dirTree(rootPath)

  // ignore "share" directory
  let names = tree.children
    .filter(item => item.type === 'directory' && item.name !== shareFolderName)
    .map(item => item.name)

  if (names.length !== 0) {
    names = ['All'].concat(names)
  }

  return names
}

function getPageNameRootPath(projectName) {
  let pageNames = []
  const project = dirTree(projectsRootPath).children.filter(project => project.name === projectName)[0]
  return project.path
}