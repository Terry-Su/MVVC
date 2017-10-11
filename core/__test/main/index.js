const PATH = require('path')
const { init } = require('../../controller/index.js')


const srcPath = PATH.resolve(__dirname, './src')
const ignoredFolders = []

init({
    srcPath,
    ignoredFolders
})