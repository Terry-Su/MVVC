const init = require('./init')
const program = require('commander');

program
  .option('-p, --project <project>', 'mvvc project')
  .parse(process.argv)


// initialize in current path
if (!program.project) {
  init()
}
// crate folder and initialize in that folder
if (program.project) {
  init(program.project)
}
