const Controller = require('../../share/controller/index.server.js')


module.exports = Object.assign(
  Controller, {
    htmlConfig: Object.assign(
      Controller.htmlConfig, {
      title: '123'
    }
    )
  }
)