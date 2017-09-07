const init = require('./init')
const program = require('commander');
const shell = require("shelljs")
const PATH = require('path')
const dirtree = require('directory-tree')


let mvvcRoot = PATH.resolve(__dirname, './../')
let mvvcRootBin = PATH.resolve(__dirname, './../node_modules/.bin')

// update path when used 
mvvcRootBin =  dirtree(mvvcRootBin) ? mvvcRootBin : PATH.resolve(__dirname, './../../.bin')

program
  .parse(process.argv)

shell.exec(`cd ${mvvcRoot} & ${mvvcRootBin}/babel-node ${mvvcRoot}/core/index.js`)