import { Controller as SuperController } from '../../../__share/controller/index.node.js'


export class Controller extends SuperController {
  webpackBasicConfig = {
    ...new SuperController().webpackBasicConfig,
    module: {
      rules: [
        {
          "test": /\.js.*/,
          "exclude": /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: ['es2015', 'stage-2', 'react'],
              }
            }
          ]
        }
      ]
    }
  }
}

export default new Controller()