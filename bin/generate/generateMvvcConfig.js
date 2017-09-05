const PATH = require('path')
const FS = require('fs-extra')
const dirtree = require('directory-tree')
const chalk = require('chalk')


module.exports = function generateMvvcConfig(rootFolderPath, boilerplateMvvcConfigPath) {
  return Promise.resolve(
    new Promise((resolve, reject) => {
      const path = PATH.resolve(rootFolderPath, './mvvc.config.js')

      // generate file
      if (!dirtree(path)) {
        FS.copySync(boilerplateMvvcConfigPath, path)
        console.log(chalk.bold.green(`"mvvc.config.js" was created!`), `(${path})`)               
        resolve()
      } else {
        console.log(chalk.bold.red(`mvvc.config.js is alread exsited, please remove it mutually! (${path})`))
      }
    })
  )
}