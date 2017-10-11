const PATH = require('path')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')


module.exports = {
  webpackConfig: {
    entry: PATH.resolve(__dirname, './webEntry.js'),
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
    devtool: 'source-map',
    plugins: process.env.production ? [
      new UglifyJSPlugin()
    ] : []
  },
  html: `<html>...</html>`,
}