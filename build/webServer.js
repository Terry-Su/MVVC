const express = require('express')
const app = express()
const {
  outputRootPath,
  localPort  
} = require('../config/server.config.js')
const PORT = process.env.PORT


module.exports = {
  init() {
    app.use(express.static(outputRootPath))
    app.listen(localPort)
  }
}

