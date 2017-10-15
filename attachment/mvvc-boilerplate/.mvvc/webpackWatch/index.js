const webpack = require('webpack')
const PATH = require('path')

/**
 * watch entry file with webpack
 */
module.exports = function webpackWatch(webpackConfig, watchCallback) {
  const compiler = webpack(webpackConfig)
  let cacheHash = null

  const watching = compiler.watch({}, (err, stats) => {
    if (err) {
      console.error(err);
      return;
    }

    // to solve the problem in windows: 
    // Filesystem inaccuracies may trigger multiple builds for a single change,
    // use hash watching instead
    if (cacheHash !== stats.hash) {
      cacheHash = stats.hash

      // console.log(stats.toString({
      //   chunks: false,
      //   colors: true
      // }))

      watchCallback()
    }
  })

}
