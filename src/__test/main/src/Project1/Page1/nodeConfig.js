const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const PATH = require('path')


module.exports = {
  webpackConfig: {
    module: {
      rules: [
        {
          test: /\.js.*/,
          exclude: /node_modules/,
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
          test: /\.(html123)$/,
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

  htmlConfig: {
    name: 'index12.html',
    content: `
<html>
  <body>index.html</body>
</html>
`
  },
}
