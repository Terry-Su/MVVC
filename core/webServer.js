const opn = require('opn')
const express = require('express')
const serveIndex = require('serve-index')
const app = express()
const {
  outputRootPath,
  localPort,
  openServerAutomatically
} = require('./mvvcConfig')
const PORT = process.env.PORT


module.exports = {
  init() {
    app.use(express.static(outputRootPath))
    
    app.use('/', serveIndex(outputRootPath))
    app.listen(localPort)

    // exec(`cd ${outputRootPath} && http-server -p ${localPort}`).stdout.pipe(process.stdout)
    console.log('\x1b[32m', `Server: http://localhost:${localPort}`)

    // open server
    setTimeout(() => {
      openServerAutomatically && opn(`http://localhost:${localPort}`)
    }, 1000)
  }
}

