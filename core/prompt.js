/**
 * prompt module
 */
const readlineSync = require('readline-sync')


module.exports = {
  ask,
  checkType,
  showTypeError
}

function ask(question, callback) {
  const input = readlineSync.question(question)
  callback(input)
}

function checkType(value, type) {
  if (type === 'number') {
    value = parseFloat(value)
    return value !== NaN
  }
  return typeof value === type
}

function showTypeError() {
  console.log(`Input's format was wrong!`)
}