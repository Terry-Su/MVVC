import controller, { Controller as SuperController } from '../src/firstProject/firstPage/controller/index.node.js'

class Controller extends SuperController {
  title = 123
}


console.log(
  (new Controller()).title
)