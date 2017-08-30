import webpack from 'webpack'
import PATH from 'path'
import rimraf from 'rimraf'



/**
 * watch entry file with webpack
 */
export default function webpackWatch(webpackConfig, watchCallback) {
  cleanCache()

  const output = {
    path: __dirname + '/cache',
    filename: new Date().getTime() + '.js'
  }  

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


function cleanCache() {
  rimraf(PATH.resolve(__dirname, './cache'), () => {
  })
}