export function getNumber() {
  const store = getState()
  return store.foo.number
}


export function getFontSize() {
  const store = getState()
  return store.foo.fontSize
}


function getState() {
  return window.reduxStore.getState()
}