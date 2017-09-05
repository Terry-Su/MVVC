const PATH = require('path')
const dirtree = require('directory-tree')
const FS = require('fs-extra')
const chalk = require('chalk')


module.exports = function generateRootFolder(base, name) {
  return Promise.resolve(
    new Promise((resolve, reject) => {
      const path = PATH.resolve(base, `./${name}`)
      let isError = false

      // generate folder
      if (!dirtree(path)) {
        FS.mkdirSync(path)
        console.log(chalk.bold.green(`"${name}" was created!`), `(${path})`)
        resolve()
      } else {
        console.log(chalk.bold.red(`Folder:"${name}" already exsited!(${path})`))
      }
    })
  )
}