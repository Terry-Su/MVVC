const path = require('path')

module.exports = {
  localPort: 3200,

  openServerAutomatically: true,

  // should or not remove the extra files or custom files in public folder
  shouldRemoveExtraFilesInPublic: false,

  shareFolderName: '__share',

  rootPath: path.resolve(__dirname, './'),
  outputRootPath: path.resolve(__dirname, './public'),
  projectsRootPath: path.resolve(__dirname, './src'),
}