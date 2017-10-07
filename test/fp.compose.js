const { compose } = require('../core/util/fp.js')

const add1 = x => x + 1
const mul5 = x => x * 5

compose(mul5, add1)(2)