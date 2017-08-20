const prompt = require('./prompt')
const { getNames } = require('./names')
const {
  rootPath,
  projectsRootPath
} = require('../config.js')



module.exports = {
  show(successCallback, failCallback) {
    const projectsNames = getNames(projectsRootPath)
    if (projectsNames.length > 0) {
      projectsNames.map((name, index) => console.log(`${index}. ${name}`))
      prompt.ask(`Choose the project to develop: `, input => {
        // check input' type is number or not
        const check = prompt.checkType(input, 'number')
        if (check) {
          successCallback(input, projectsNames)
        }
        if (!check) {
          prompt.showTypeError()
          failCallback()
        }
      })
    } else {
      console.log(`Project's not found!`)
    }
  }
}