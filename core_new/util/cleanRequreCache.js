const decache = require('decache')


module.exports = function (requiredPath) {
  decache(requiredPath)
}