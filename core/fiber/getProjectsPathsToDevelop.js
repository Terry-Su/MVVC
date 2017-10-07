const dirTree = require('directory-tree')
const { compose } = require('../util/fp')



/**
 * get projects paths to develop
 * @param { srcPath }  
 * @param { ignoredFolders }  ignored folders in src
 */
module.exports = function ({ srcPath, ignoredFolders = [] }) {
  const filterDirectory = items => items.filter(item => item.type === 'directory')
  const excludeFolders = folders => items => items.filter(item => !folders.includes(item.name))
  const excludeIngoredFolders = excludeFolders(ignoredFolders)

  // get projects
  const srcChildren = dirTree(srcPath).children
  const projects = compose(filterDirectory, excludeIngoredFolders)(srcChildren)
  
  // map projects, get pages
}