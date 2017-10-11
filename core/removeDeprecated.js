const FS = require('fs')
const dirTree = require('directory-tree');
const del = require('del')

const {
  outputRootPath,
  projectsRootPath,
  shareFolderName,
} = require('./config/mvvcConfig')


module.exports = {
  removeDeprecatedProjects,
  removeConfilctPagesInProjects
}

// compare projects and remove conflict project in dist
function removeDeprecatedProjects() {
  const srcProjectsRootPath = projectsRootPath
  const distProjectsRootPath = outputRootPath
  return removeDeprecatedFolders(srcProjectsRootPath, distProjectsRootPath)
}


// compare pages and remove conflict pages in dist
function removeDeprecatedPages(srcPagesRootPath, distPagesRootPath) {
  return removeDeprecatedFolders(srcPagesRootPath, distPagesRootPath)
}


// remove conflict pages in projects
function removeConfilctPagesInProjects() {
  const srcProjectsTree = dirTree(projectsRootPath)
  const distProjectsTree = dirTree(outputRootPath)

  if (!srcProjectsTree || !distProjectsTree) {
    return new Promise(resolve => resolve())
  }

  let promises = []
  srcProjectsTree.children
    .filter(srcProject => srcProject.name !== shareFolderName && srcProject.type === 'directory')
    .map(srcProject => {
      try {
        const srcPagesRootPath = srcProject.path
        const distProject = distProjectsTree.children
          .filter(distProject => distProject.type === 'directory' && distProject.name === srcProject.name)[0]
        const distPagesRootPath = distProject.path
        promises.push(new Promise((resolve) => {
          removeDeprecatedPages(srcPagesRootPath, distPagesRootPath)
            .then(v => {
              resolve()
            })
        }))
      } catch (e) {
        console.log(e)
      }
    })
  return Promise.resolve(promises)
}


// remove deprecated folders by src path and dist path
function removeDeprecatedFolders(srcRootPath, distRootPath) {
  const srcTree = dirTree(srcRootPath)
  const distTree = dirTree(distRootPath)

  if (!srcTree || !distTree) {
    return new Promise(resolve => resolve())
  }

  let promises = []
  distTree.children
    .filter(dist => dist.type === 'directory')
    .map(dist => {
      let exsit = srcTree.children
        .filter(src => src.name !== shareFolderName && src.type === 'directory')
        .some(src => src.name === dist.name)

      if (!exsit) {
        promises.push(new Promise((resolve, reject) => {
          try {
            del(dist.path).then(paths => {
              console.log('Files and folders were deleted:\n', paths.join('\n'))
              resolve(paths)
            })
          } catch (e) {
            console.log(e)
            reject(e)
          }
        }))
      }
    })

  return Promise.all(promises)
}
