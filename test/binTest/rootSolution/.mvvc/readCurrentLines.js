const dirtree = require('directory-tree')
const readMultipeLines = require('readline-multiple')
const chalk = require('chalk')
const {
  shareFolderName,
} = require('./config/mvvcConfig')


module.exports = function readCurrentLines(itemsRootPath, itemName) {
  return Promise.resolve(
    new Promise((resolve, reject) => {
      const items = dirtree(itemsRootPath).children
        .filter(item => item.type === 'directory' && item.name !== shareFolderName)
        .map(item => ({
          name: item.name,
          path: item.path
        }))

      const itemLines = items.map((item, index) => ({
        pressKey: `${index + 1}`,
        display: item.name,
        value: item.path,
      }))

      const lines = [{
        pressKey: '0',
        display: 'All',
        value: itemsRootPath,
      }].concat(itemLines)

      const getQuestion = data => `\n\n${chalk.bold(`Choose ${itemName || 'item'}(s)`)}(eg. single: '1' or multiple: '1 2'):\n`.concat(
        lines.map(data => `${data.pressKey} ${data.display}`).join('\n').concat('\n')
      )


      return readMultipeLines(lines, getQuestion).then(results => {
        // check
        if (results && results.length === 0) {
            console.log(chalk.bold.red(`Key you entered was not correct. Try again!`))
        }

        // if "all" is chosen
        const isAll = results && results.length > 0 && results.some(({ pressKey }) => pressKey === '0')

        resolve(!isAll ? results : lines)
      })
    })
  )
}
