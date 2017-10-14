const webpack = require('webpack')

module.exports = function (config) {
  const compiler = webpack(config);

  const watcher = compiler.watch({
    /* watchOptions */
  }, (err, stats) => {
    if (err) {
      console.error(err);
      return
    }

    console.log(stats.toString({
      chunks: false,  // Makes the build much quieter
      colors: true    // Shows colors in the console
    }))
  })

  return watcher

  // if (process.env.production) {
  //   compiler.run((err, stats) => {
  //     if (err) {
  //       console.error(err);
  //       return
  //     }

  //     console.log(stats.toString({
  //       chunks: false,  // Makes the build much quieter
  //       colors: true    // Shows colors in the console
  //     }))
  //   })
  // }

}