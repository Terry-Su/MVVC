/**
 * prompt module
 */
const readline = require('readline')

module.exports = {
  ask,
  checkType,
  showTypeError
}

function ask(question, callback) {
  const readInput = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  readInput.question(question, (answer) => {
    readInput.close();    
    callback(answer)
  });
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