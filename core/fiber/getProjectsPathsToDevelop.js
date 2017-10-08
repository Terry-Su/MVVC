const dirTree = require('directory-tree')
const R = require('ramda')

const isDirectory = item => item.type === 'directory'
const filterDirectory = items => R.filter(isDirectory, items)
const getSrcChildren = srcPath => dirTree(srcPath).children
const getProjectChilren = projectPath => dirTree(projectPath).children


/**
 * get projects paths to develop
 * [
 *   {
 *     project: {...project info},
 *     pages: [
 *              {page info}
 *            ]
 *   }  
 * ]
 * @param { srcPath }  
 * @param { ignoredFolders }  ignored folders in src
 */
module.exports = function ({ srcPath, ignoredFolders = [] }) {
  let result = []

  // get projects 
  const srcChildren = getSrcChildren(srcPath)
  const notBelongIgnoredFolders = item => !ignoredFolders.includes(item.name)
  const excludeIngoredFolders = items => R.filter(notBelongIgnoredFolders, items)
  const projects = R.compose(excludeIngoredFolders, filterDirectory)(srcChildren)

  // map projects, get all pages
  const pushProjectAndPagesToResult = project => {
    const {
      path: projectPath
    } = project
    const projectChilren = getProjectChilren(projectPath)
    const pages = R.compose(excludeIngoredFolders, filterDirectory)(projectChilren)

    result.push({
      project,
      pages
    })
  }

  R.map(pushProjectAndPagesToResult, projects)

  return result
}