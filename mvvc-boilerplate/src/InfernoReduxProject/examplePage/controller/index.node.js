import { Controller as SuperController } from '../../__share/controller/index.node.js'


export class Controller extends SuperController {
  webpackBasicConfig = {
    ...new SuperController().webpackBasicConfig,
  }
}

export default new Controller()