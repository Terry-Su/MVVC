const dirtree = require('directory-tree')
const readMultipeLines = require('./readline-multiple')
const chalk = require('chalk')


module.exports = function readCurrentLines(boilerplatesPath) {
  return Promise.resolve(
    new Promise((resolve, reject) => {
      const projects = dirtree(boilerplatesPath).children
        .filter(project => project.type === 'directory' && project.name !== 'share')
        .map(project => ({
          name: project.name,
          path: project.path
        }))

      const projectLines = projects.map((project, index) => ({
        pressKey: `${index + 1}`,
        display: project.name,
        value: project.path,
      }))

      const lines = [{
        pressKey: '0',
        display: 'All',
        value: boilerplatesPath,
      }].concat(projectLines)

      const getQuestion = data => `\n\n${chalk.bold(`Choose project(s) to generate`)}(eg. single: '1' or multiple: '1 2'):\n`.concat(
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
