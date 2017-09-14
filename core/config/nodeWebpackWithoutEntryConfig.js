const webpack = require('webpack')


const nodeWebpackWithoutEntryConfig = {
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
  externals: [
    // function (context, request, callback) {
    //   const mainOriginRequireMododules = [
    //     'webpack'
    //   ]
      

    //   if (/^\.?\//.test(request)) return callback()
    //   if (/^\.\.?\//.test(request)) return callback()

    //   if (mainOriginRequireMododules.includes(request)) {
    //     callback(null, `commonjs ${request}`)
    //     return
    //   }

    //   return callback()
    // }
  ],
  plugins: [
    new webpack.ExternalsPlugin('commonjs', ['webpack', 'uglifyjs-webpack-plugin'])
  ]
}

module.exports = nodeWebpackWithoutEntryConfig