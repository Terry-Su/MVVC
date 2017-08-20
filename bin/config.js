const path = require('path')

module.exports = {
  localPort: 3000,

  rootPath: path.resolve(__dirname, './../'),
  outputRootPath: path.resolve(__dirname, './../dist'),
  projectsRootPath: path.resolve(__dirname, './../src'),
  webpackConfigCachePath: path.resolve(__dirname, './build/cache/webpackConfigCache.js'),

  defaultPagePath: '', // example: "firstProject/firstPage"
  // defaultPagePath: 'firstProject/firstPage', 

  webpackTemplate(entry, output) {
    return {
      entry,
      output,
      devtool: 'source-map',
      module: {
        rules: [
          {
            "test": "/\.js.*/",
            "exclude": "/node_modules/",
            use: [
              {
                loader: 'babel-loader',
                options: {
                  presets: ['es2015', 'stage-2'],
                  plugins: ['inferno']
                }
              }
            ]
          }
        ]
      }
    }
  }
}