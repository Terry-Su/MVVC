const checkPathExsitsAndIsDirectory = require('./checkPathExsitsAndIsDirectory')
const execWebpack = require('./execWebpack')
const cleanRequreCache = require('./cleanRequreCache')
const equalPlainObjects = require('./equalPlainObjects')


const util = {
    checkPathExsitsAndIsDirectory,
    execWebpack,
    cleanRequreCache,
    equalPlainObjects,
}

module.exports = util