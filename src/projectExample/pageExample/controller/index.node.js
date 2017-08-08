const Controller = require('../../share/controller/index.node.js')


module.exports = Object.assign(
  Controller, {
    title: Controller.getPageName(__dirname)
  }
)