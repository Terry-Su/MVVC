const PATH = require('path')


const config = {
  openServerAutomatically: false,
  ignoredFolders: ['static', '__share'],
  srcPath: PATH.resolve(__dirname, './src'),
  outputPath: PATH.resolve(__dirname, './public'),
  shouldRemoveExtraFilesInPublic : false,
}


module.exports = config
