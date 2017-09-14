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
  node: {
    __dirname: true,
    __filename: true,
  },
  plugins: [
    new webpack.ExternalsPlugin('commonjs', ['webpack', 'uglifyjs-webpack-plugin'])
  ]
}

module.exports = nodeWebpackWithoutEntryConfig