const chalk = require('chalk')

const PATH = require('path')
const FS = require('fs')
const {
  outputFile
} = require('fs-extra')

const {
  outputRootPath
} = require('./config/mvvcConfig')


module.exports = function buildHtml(pagePathInfo, html) {
  const {
    project,
    page,
  } = pagePathInfo

  const outputPath = getOutputPath(project, page)
  writeHtml(outputPath, html)
  
}

function getOutputPath(project, page) {
  return PATH.resolve(outputRootPath, `./${project}/${page}/index.html`)
}


function writeHtml(path, text) {
  try {
    outputFile(path, text)
    console.log(`${path}`, chalk.green.bold(`[built]`))
  } catch (e) {
    console.log(`\x1b[31m`, `Building ${path} failed!`)
    console.log(e)
  }
}