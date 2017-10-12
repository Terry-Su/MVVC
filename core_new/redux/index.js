const { createStore } = require('redux')
const reducer = require('./reducer/index')

const reduxStore = createStore(reducer)

module.exports = reduxStore