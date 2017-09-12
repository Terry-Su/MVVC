const PATH = require('path')


const config = {
  localPort: 3000,

  openServerAutomatically: true,

  // should or not remove the extra files or custom files in public folder
  shouldRemoveExtraFilesInPublic: false,

  rootPath: PATH.resolve(process.cwd(), './'),
  outputRootPath: PATH.resolve(process.cwd(), './public'),
  projectsRootPath: PATH.resolve(process.cwd(), './src'),
}


module.exports = config
