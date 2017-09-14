const program = require('commander')
const PATH = require('path')
const shell = require("shelljs")
const chalk = require('chalk')

const readCurrentLines = require('./readCurrentLines')

const {
  boilerplateRootPath,
  boilerplateSrcPath,
  boilerplatePackageJsonPath,
  boilerplateMvvcConfigPath,
  boilerplateMvvcDotMvvcPath,
  boilerplateMvvcBabelrcPath,
  boilerplateMvvcSharePath,
} = require('./config')

const currentPath = process.cwd()

const folderName = 'mvvcProject' + new Date().getTime()
const testPath = PATH.resolve(__dirname, '../test/mvvcUseCase')
const testTargetRootFolerPath = PATH.resolve(testPath, `./${folderName}`)
const testTargetSrcPath = PATH.resolve(testTargetRootFolerPath, './src')
const testOriginProjectPath = PATH.resolve(boilerplateSrcPath, './ReactReduxProject')

const generateBasis = require('./generate/generateBasis')
const generateRootFolder = require('./generate/generateRootFolder')
const generateProject = require('./generate/generateProject')
const generateSrcShare = require('./generate/generateSrcShare')


module.exports = function init(folderName) {
  folderName = folderName || ''
  const basicMethod = () => {
    // initialize in current path
    if (!folderName) {
      return Promise.resolve()
    }
    // crate folder and initialize in that folder
    if (folderName) {
      return generateRootFolder(currentPath, folderName)
    }
  }
  // common implementation
  const rootFolderPath = getRootFolderPath(currentPath, folderName)
  const srcPath = getSrcPath(rootFolderPath)
  basicMethod()
    .then(() => {
      const path = rootFolderPath
      return generateBasis({
        path,
        boilerplatePackageJsonPath,
        boilerplateMvvcConfigPath,
        boilerplateMvvcDotMvvcPath,
        boilerplateMvvcBabelrcPath,
      })
    })
    .then(() => {
      return readCurrentLines(boilerplateSrcPath)
    })
    .then(results => {
      // generate share
      generateSrcShare(rootFolderPath, boilerplateMvvcSharePath)

      // generate projects
      const generateProjectsPromises = results.map(({
        value,
        display,
      }) => {
        return new Promise(resolve => {
          const origin = value
          const isAll = display === 'All'

          if (isAll) {
            resolve()
          }
          if (!isAll) {
            generateProject({
              origin,
              src: srcPath,
              name: display,
            }).then(resolve)
          }
        })
      })
      Promise.all(generateProjectsPromises).then(() => {
        console.log(chalk.bold.green('All projects has been created!'))
      })
    })
}

function getRootFolderPath(currentPath, folderName) {
  return PATH.resolve(currentPath, `./${folderName}`)
}

function getSrcPath(rootFolderPath) {
  return PATH.resolve(rootFolderPath, `./src`)
}
