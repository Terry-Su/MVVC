const PATH = require('path')
const FS = require('fs-extra')
const dirtree = require('directory-tree')
const chalk = require('chalk')


module.exports = function generatePackageJson(rootFolderPath, boilerplatePackageJsonPath) {
  return Promise.resolve(
    new Promise((resolve, reject) => {
      const path = PATH.resolve(rootFolderPath, './package.json')
    
      // generate file
      if (!dirtree(path)) {
        FS.copySync(boilerplatePackageJsonPath, path)
        console.log(chalk.bold.green(`"package.json" was created!`), `(${path})`)
        resolve()
      } else {
        console.log(chalk.bold.red(`package.json is alread exsited, please remove it mutually!(${path})`))
      }
    })
  )
}