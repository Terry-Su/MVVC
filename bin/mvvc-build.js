const init = require('./init')
const program = require('commander');
const shell = require("shelljs")
const PATH = require('path')

const mvvcRoot = PATH.resolve(__dirname, './../')
const mvvcRootBin = PATH.resolve(__dirname, './../node_modules/.bin')

program
  .parse(process.argv)

shell.exec(`cd ${mvvcRoot} & ${mvvcRootBin}/cross-env production=true ${mvvcRootBin}/node ${mvvcRoot}/core/index.js`)