const PATH = require('path')
const dirtree = require('directory-tree')
const FS = require('fs-extra')
const chalk = require('chalk')


module.exports = function generateProject({
  origin,
  src,
  name
}) {
  return Promise.resolve(
    new Promise((resolve, reject) => {
      const path = PATH.resolve(src, `./${name}`)

      // generate project
      if (!dirtree(path)) {
        FS.copySync(origin, path)
        console.log(chalk.bold.green(`"${name}" was created!`), `(${path})`)
        resolve()
      } else {
        conosle.log(chalk.bold.red(`Project: ${name} already exsited`))
      }
    })
  )
}