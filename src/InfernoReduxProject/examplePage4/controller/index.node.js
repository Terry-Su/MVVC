import { Controller as SuperController } from '../../share/controller/index.node.js'


export class Controller extends SuperController {
  webpackBasicConfig = {
    ...new SuperController().webpackBasicConfig,
  }
}

export default new Controller()