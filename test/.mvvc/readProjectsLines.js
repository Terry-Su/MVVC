const dirtree = require('directory-tree')
const {
  projectsRootPath,
  shareFolderName,
} = require('./config/mvvcConfig')
const readCurrentLines = require('./readCurrentLines')

let pagePathInfos = []


module.exports = function readProjectsLines() {
  return readCommonLines({
    itemsRootPath: projectsRootPath,
    itemName: 'project',
    resolveInfoFn: resolveProjectInfoFn,
    resolveAllInfoFn: resolveProjectAllInfoFn
  }).then(() => {
    return pagePathInfos
  })
}

function resolveProjectInfoFn(info, resolve) {
  const { display: projectName, value: pagesRootPath } = info
  return readPagesLines({
    pagesRootPath,
    resolvePageInfoFn: (info, resolve) => {
      return resolvePageInfoSpecialFn({
        projectName,
        info,
        resolve,
      })
    }
  }).then(() => {
    resolve()
  })
}

function resolveProjectAllInfoFn(info, resolve) {
  const { display: projectName, value: pagesRootPath } = info

  const pages = dirtree(pagesRootPath).children
    .filter(page => page.type === 'directory' && page.name !== shareFolderName)
    .map(page => {
      const { name: pageName, path: pagePath } = page
      pagePathInfos.push({
        project: projectName,
        page: pageName,
        pagePath
      })
    })

    resolve()
}



function readCommonLines({
  itemsRootPath,
  itemName,
  resolveInfoFn,
  resolveAllInfoFn
}) {
  return readCurrentLines(itemsRootPath, itemName)
    .then(infos => {
      let promises = []
      // special situation: all
      const isAll = infos.some(info => info.pressKey === '0')
      if (isAll) {
        promises = infos.filter(info => info.pressKey !== '0').map(info => (
          new Promise(resolve => {
            resolveAllInfoFn(info, resolve)
          })
        ))
        return Promise.all(promises)
      }
      if (!isAll) {
        promises = infos.map(info => (
          new Promise(resolve => {
            resolve(
              resolveInfoFn(info, resolve)
            )
          })
        ))
        return Promise.all(promises)
      }
    })
}



function readPagesLines({
  pagesRootPath,
  resolvePageInfoFn,
}) {
  return readCommonLines({
    itemsRootPath: pagesRootPath,
    itemName: 'page',
    resolveInfoFn: resolvePageInfoFn,
    resolveAllInfoFn: resolvePageInfoFn
  })
}

// !!!!!! side effects for resolving pagePathInfos
function resolvePageInfoSpecialFn({
  projectName,
  info,
  resolve
}) {
  const { display: pageName, value: pagePath } = info
  pagePathInfos.push({
    project: projectName,
    page: pageName,
    pagePath
  })
  resolve()
}
