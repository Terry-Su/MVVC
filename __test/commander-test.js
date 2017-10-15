var program = require('commander');

program
.option('-s, --show <show>', 'show log')
.parse(process.argv);

console.log('%j', program.show);
