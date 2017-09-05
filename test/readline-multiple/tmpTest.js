const showLines = require('./index.js')

const linesData = [{
  pressKey: '1',
  display: 'React & redux',
  value: 'ReactReduxProjectPath'
}]


showLines(linesData).then(({
  pressKey,
  display,
  value
}) => {
  console.log(`
you have choosen ${pressKey},
display is: ${display},
value is: ${value}
`)
})