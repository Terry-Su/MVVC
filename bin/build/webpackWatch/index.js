import webpack from 'webpack'
import PATH from 'path'


/**
 * watch entry file with webpack
 */
export default function webpackWatch(webpackConfig, watchCallback) {
  const output = {}  

  const config = !Array.isArray(webpackConfig) ? {
    ...webpackConfig,
    output,
  } : webpackConfig.map(config => ({
    ...config,
    output,
  }))


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

