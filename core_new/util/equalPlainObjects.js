const _ = require('lodash')


const checkObjectCreatedByFunction = object => {
  return _.isObject(object) && _.isFunction(object.constructor)
}

const equalVars = (a, b) => {
  try {
    const isObject = _.isObject(a) && _.isObject(b)

    const isArray = _.isArray(a) && _.isArray(b)

    const isPlainObject = _.isPlainObject(a) && _.isPlainObject(b)

    const isRegExp = _.isRegExp(a) && _.isRegExp(b)

    const isFunction  = _.isFunction(a) && _.isFunction(b)

    const isObjectCreatedByFunction = checkObjectCreatedByFunction(a) && checkObjectCreatedByFunction(b)

    const shouldEqualDirectly = !isObject || isFunction

    if (shouldEqualDirectly) {
      return a === b
    }

    if (isArray) {
      const equalVar = (value, index) => equalVars(a[index], b[index])
      return a.every(equalVar) && a.length === b.length
    }

    if (isRegExp) {
      return a.toString() === b.toString()
    }

    if (isPlainObject) {
      const keysOfA = Object.keys(a)
      const keysOfB = Object.keys(b)
      const equalVar = key => equalVars(a[key], b[key])            
      return keysOfA.every(equalVar) && keysOfA.length === keysOfB.length
    }

    if (isObjectCreatedByFunction) {
      const checkConstructor = (a, b) => a.constructor === b.constructor
      const checkJsonStringify = (a, b) => JSON.stringify(a) === JSON.stringify(b)
      return checkConstructor(a, b) && checkJsonStringify(a, b)
    }

  } catch (e) {

  }

  return false  
}


module.exports = function (a, b) {
  let result = true

  try {
    result = equalVars(a, b)
  } catch (e) {
    result = false
  }

  return result
}