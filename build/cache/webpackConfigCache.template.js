module.exports = [{
  entry: __dirname + '/src/js/controller/index.js',
  output: {
    path: __dirname + '/dist',
    filename: 'pack.js' 
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js.*/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['es2015', 'stage-0'],
              plugins: ['inferno']
            }
          }
        ]
      }
    ]
  }
}]

