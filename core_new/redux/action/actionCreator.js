function createAction(name, defaultAction) {
  return (...arg) => {
    window.reduxStore.dispatch({
      type: name,
      ...defaultAction(...arg)
    })
  }
}


module.exports = function createActions(actions) {
  Object.keys(actions).map(key => {
    const defaultAction = actions[key]
    actions[key] = createAction(key, defaultAction)
  })
  return actions
}