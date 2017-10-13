const { combineReducers } = require('redux')
const projects = require('./projects')
const pagesToDevelop = require('./pagesToDevelop')



module.exports = combineReducers({
    projects,
    pagesToDevelop
})