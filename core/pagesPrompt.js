const prompt = require('./prompt')
const { getNames } = require('./names')
const {
  rootPath,
  projectsRootPath
} = require('./config/mvvcConfig')



module.exports = {
  show({
    projectName,
    pageNames, 
    successCallback, 
    failCallback
  }) {
    if (pageNames.length > 0) {
      
      const question = pageNames.map((name, index) => `${index}. ${name}`).join('\n').concat('\n')    
      prompt.ask(`${question}Choose the page to develop: `, input => {
        // check input' type is number or not
        const check = prompt.checkType(input, 'number')
        if (check) {
          successCallback({
            projectName,
            pageNames,
            input
          })
        }
        if (!check) {
          prompt.showTypeError()
          failCallback()
        }
      })
    } else {
      console.log(`Page's not found!`)
    }
  }
}