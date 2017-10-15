const readlineSync = require('readline-sync')


/**
 * 
 * @param {*} linesData 
 * [{
 *   pressKey: '1',
 *   display: 'React & redux',
 *   value: 'ReactReduxProjectPath'
 * }]
 * 
 * 
 * 
 * 
 */
function showLines(linesData) {
  const input = readlineSync.question(`
    Input some value  
  `)

  return {
    then(fn) {
      const {
        pressKey,
        display,
        value
      } = linesData.filter(item => item.pressKey === input)[0]

      fn({
        pressKey,
        display,
        value
      })
    }
  }
}


module.exports = showLines