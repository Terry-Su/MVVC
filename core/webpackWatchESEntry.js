import webpackWatch from './webpackWatch/index'

/**
 *  watch ES6/ES6+ entry file or files with webpack
 */
export default function webpackWatchESEntry(entry, watchCallback) {
  const configWithoutEntry = {
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
                plugins: ['inferno']
              }
            }
          ]
        }
      ]
    }
  }

  const config = !Array.isArray(entry) ? {
    ...configWithoutEntry,
    entry
  } : entry.map(singleEntry => ({
    ...configWithoutEntry,
    entry: singleEntry
  }))
  

  return webpackWatch(config, watchCallback)
}