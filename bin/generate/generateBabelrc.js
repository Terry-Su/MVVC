const PATH = require('path')
const FS = require('fs-extra')
const dirtree = require('directory-tree')
const chalk = require('chalk')


module.exports = function generateBabelrc(rootFolderPath, boilerplateMvvcBabelrcPath) {
  return Promise.resolve(
    new Promise((resolve, reject) => {
      const path = PATH.resolve(rootFolderPath, './.babelrc')

      // generate file
      if (!dirtree(path)) {
        FS.copySync(boilerplateMvvcBabelrcPath, path)
        console.log(chalk.bold.green(`".babelrc" was created!`), `(${path})`)               
        resolve()
      } else {
        console.log(chalk.bold.red(`.babelrc is alread exsited, please remove it mutually! (${path})`))
      }
    })
  )
}