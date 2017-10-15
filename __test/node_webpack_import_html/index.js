const PATH = require('path')
const webpack = require('webpack')

const webpackConfig = {
  entry: PATH.resolve(__dirname, './__private/entry.js'),
  output: {
    path: PATH.resolve(__dirname, './__private/dist'),
    filename: 'bundle.js'
  },
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
  target: 'node'
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