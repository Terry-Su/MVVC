const PATH = require('path')
const FS = require('fs-extra')
const dirtree = require('directory-tree')
const chalk = require('chalk')


module.exports = function generateDotMvvc(rootFolderPath, boilerplateMvvcDotMvvcPath) {
  return Promise.resolve(
    new Promise((resolve, reject) => {
      const path = PATH.resolve(rootFolderPath, './.mvvc')

      // generate file
      console.log(123, boilerplateMvvcDotMvvcPath)
      if (!dirtree(path)) {
        FS.copySync(boilerplateMvvcDotMvvcPath, path)
        console.log(chalk.bold.green(`".mvvc" was created!`), `(${path})`)               
        resolve()
      } else {
        console.log(chalk.bold.red(`.mvvc is alread exsited, please remove it mutually! (${path})`))
      }
    })
  )
}