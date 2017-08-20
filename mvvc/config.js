const path = require('path')

module.exports = {
  localPort: 3100,

  rootPath: path.resolve(__dirname, './../'),
  outputRootPath: path.resolve(__dirname, './../dist'),
  projectsRootPath: path.resolve(__dirname, './../src'),
  webpackConfigCachePath: path.resolve(__dirname, './build/cache/webpackConfigCache.js'),

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
      },
      resolve: {
        alias: {

        }
      }
    }
  }
}