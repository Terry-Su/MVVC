const pathStateController = require('./path/index')

function init() {
  global.mvvcStateControllers = {

  }

  // state
  mvvcStateControllers = Object.assign(mvvcStateControllers, {
    pathStateController
  })

  // mutation
  let { mutation } = pathStateController
  const keys = Object.keys(mutation)
  const fns = Object.values(mutation)
  fns.map((fn, index) => {
    if(typeof fn === 'function') {
      mutation[index] = (state, param) => fn(pathStateController.state, param)
    }
  })

  // actions
  

  // getters

}