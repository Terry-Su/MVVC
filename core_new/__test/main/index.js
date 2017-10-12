const PATH = require('path')
const { init } = require('../../controller/index.js')


const srcPath = PATH.resolve(__dirname, './src')
const ignoredFolders = ['static', '__share']

init({
    srcPath,
    ignoredFolders
})