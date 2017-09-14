const opn = require('opn')
const chalk = require('chalk')
const express = require('express')
const serveIndex = require('serve-index')

const {
  outputRootPath,
  localPort,
  openServerAutomatically
} = require('./config/mvvcConfig')

const app = express()
const PORT = process.env.PORT

module.exports = {
  init() {
    app.use(express.static(outputRootPath))
    
    app.use('/', serveIndex(outputRootPath))
    app.listen(localPort)

    // exec(`cd ${outputRootPath} && http-server -p ${localPort}`).stdout.pipe(process.stdout)
    console.log(`Server:`, chalk.bold.green(`http://localhost:${localPort}`))

    // open server
    setTimeout(() => {
      openServerAutomatically && opn(`http://localhost:${localPort}`)
    }, 2000)
  }
}

