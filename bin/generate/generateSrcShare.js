const PATH = require('path')
const FS = require('fs-extra')
const dirtree = require('directory-tree')
const chalk = require('chalk')


module.exports = function generateSrcShare(rootFolderPath, boilerplateMvvcSharePath) {
  return Promise.resolve(
    new Promise((resolve, reject) => {
      const path = PATH.resolve(rootFolderPath, './src/share')

      // generate file
      if (!dirtree(path)) {
        FS.copySync(boilerplateMvvcSharePath, path)
        console.log(chalk.bold.green(`"share" was created!`), `(${path})`)               
        resolve()
      } else {
        console.log(chalk.bold.red(`Folder: share is alread exsited, please remove it mutually! (${path})`))
      }
    })
  )
}