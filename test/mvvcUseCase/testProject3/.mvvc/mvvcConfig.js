const PATH = require('path')

const mvvcConfigPath = PATH.resolve(process.cwd(), './mvvc.config.js')


module.exports = require(mvvcConfigPath)