const prompt = require('./prompt')
const { getNames } = require('./names')
const {
  rootPath,
  projectsRootPath
} = require('./config/mvvcConfig')



module.exports = {
  show(successCallback, failCallback) {
    const projectsNames = getNames(projectsRootPath)
    if (projectsNames.length > 0) {
      const question = projectsNames.map((name, index) => `${index}. ${name}`).join('\n').concat('\n')
      
      prompt.ask(`${question}Choose the project to develop: `, input => {
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