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
    function (context, request, callback) {
      if (/^\.?\//.test(request)) return callback()
      if (/^\.\.?\//.test(request)) return callback() // fixed √
      callback(null, `commonjs ${request}`)
    }
  ],
}

module.exports = nodeWebpackWithoutEntryConfig