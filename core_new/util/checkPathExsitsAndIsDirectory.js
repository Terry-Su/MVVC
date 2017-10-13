const FS = require('fs')

module.exports = function (path) {
    let result = false
    try {
        result = FS.lstatSync(path).isDirectory()
    } catch (e) {

    }
    return result
}