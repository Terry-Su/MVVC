const webpack = require('webpack')
const PATH = require('path')

/**
 * watch entry file with webpack
 */
module.exports = function webpackWatch(webpackConfig, watchCallback) {
  const config = !Array.isArray(webpackConfig) ? Object.assign(
    webpackConfig,
    {
    }
  ) : webpackConfig.map(config => (
    Object.assign(
      config,
      {
        
      }
    )
  ))

  const compiler = webpack(config)
  
  const watching = compiler.watch({}, (err, stats) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(stats.toString({
      chunks: false,
      colors: true
    }));

    watchCallback()
  })

}
