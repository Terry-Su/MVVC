const webpack = require('webpack')

const config = {
  "entry": "/Users/suxing/Documents/WorkingDocuments/Project/MVVC/src/firstProject/firstPage/controller/entry.js",
  "output": {
    "path": "/Users/suxing/Documents/WorkingDocuments/Project/MVVC/public/firstProject/firstPage",
    "filename": "bundle.js"
  },
  "watch": true,
  "devtool": "source-map",
  "module": {
    "rules": [
      {
        "test": /.js.*/,
        "exclude": /node_modules/,
        "use": [
          {
            "loader": "babel-loader",
            "options": {
              "presets": [
                "es2015",
                "stage-2"
              ],
              "plugins": [
                "inferno"
              ]
            }
          }
        ]
      }
    ]
  }
}

const compiler = webpack(config);


const watching = compiler.watch({
  /* watchOptions */
}, (err, stats) => {
  if (err) {
    console.error(err);
    return;
  }

  console.log(stats.toString({
    chunks: false,  // Makes the build much quieter
    colors: true    // Shows colors in the console
  }));
});