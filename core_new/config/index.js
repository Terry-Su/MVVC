const PATH = require('path')

const mvvcConfigPath = PATH.resolve(process.cwd(), './mvvc.config.js')
const mvvcConfig = require(mvvcConfigPath)
const defaultMvvcConfig = require('./defaultMvvcConfig')

const config = Object.assign({}, defaultMvvcConfig, mvvcConfig, {

})


module.exports = config
