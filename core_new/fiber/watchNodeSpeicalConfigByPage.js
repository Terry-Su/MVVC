const equalPossibleObjects = (a, b) => {
  try {
    return Util.equalPlainObjects(a, b)
  } catch (e) {}
  
  return false
}

module.exports = function (getConfig, page, callback, interval = 1000) {
  let prevConfig = getConfig(page)

  let intervalTimer

  const callbackIfConfigChanged = () => {
    const currentConfig = getConfig(page)
    const isConfigChanged = !equalPossibleObjects(currentConfig, prevConfig)

    if (isConfigChanged) {
      prevConfig = currentConfig
      
      callback()
    }
  }

  intervalTimer = setInterval(callbackIfConfigChanged, interval)
}