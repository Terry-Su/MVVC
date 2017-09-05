const readlineSync = require('readline-sync')

/**
 * @param {*} linesData 
 * [{
 *   pressKey: '1',
 *   display: 'React & redux',
 *   value: 'ReactReduxProjectPath'
 * }]
 * @param {*} questonTpl 
 */
function readMultipeLines(linesData, questonTpl) {
  const input = readlineSync.question(
    questonTpl ? questonTpl(linesData) : linesData.map(data => `${data.pressKey} ${data.display}`).join('\n')
  )

  return {
    then(callback) {
      const inputs = input.split(' ')
      const results = linesData.filter(item => inputs.includes(item.pressKey))
      return callback && callback(results)
    }
  }
}


module.exports = readMultipeLines