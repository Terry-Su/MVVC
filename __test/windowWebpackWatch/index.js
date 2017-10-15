const webpack = require('webpack')
const PATH = require('path')

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
  externals: [
    function (context, request, callback) {
      const mainOriginRequireMododules = [
        'webpack'
      ]
      

      if (/^\.?\//.test(request)) return callback()
      if (/^\.\.?\//.test(request)) return callback()

      if (mainOriginRequireMododules.includes(request)) {
        callback(null, `commonjs ${request}`)
        return
      }

      return callback()



      // if (/^\.?\//.test(request)) return callback()
      // if (/^\.\.?\//.test(request)) return callback()

      // if (/\\/.test(request)) return callback() // resolve the special situation in windows

      // callback(null, `commonjs ${request}`)
    }],
  plugins: [
    // new webpack.ExternalsPlugin('commonjs', ['webpack'])
  ]
}


const compiler = webpack(webpackConfig)

const watching = compiler.watch({}, (err, stats) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(stats.toString({
    chunks: false,
    colors: true
  }));

})