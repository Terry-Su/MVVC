import { Controller as SuperController } from '../../../share/controller/index.node.js'


export class Controller extends SuperController {
  webpackBaseConfig = {
    devtool: 'source-map',
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
}

export default new Controller()