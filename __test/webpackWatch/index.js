const PATH = require('path')
const webpack = require('webpack')
const webpackWatch = require('../../core/webpackWatch/index.js')

const entry = PATH.resolve(__dirname, '../../core/resolvePagePathInfo/cache/src_InfernoReduxProject_examplePage_entry.js')
const output = {
  path: PATH.resolve(__dirname, './output'),
  filename: 'bundle.js',
  libraryTarget: 'commonjs2',
}
const webpackConfig = {
    entry,
    output,
    module: {
      rules: [
        {
          "test": /\.js.*/,
          "exclude": /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: ['es2015', 'stage-2'],
              }
            }
          ]
        },
        {
          test: /\.(html)$/,
          use: {
            loader: 'html-loader',
            options: {
              attrs: [':data-src']
            }
          }
        },
      ]
    },
    target: 'node',
    // externals: [

    // ],
    plugins: [
        new webpack.ExternalsPlugin('commonjs', ['webpack', 'uglifyjs-webpack-plugin'])
    ]
  }
  

  webpackWatch(webpackConfig, () => {
      console.log('watching!')
  })