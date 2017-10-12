const { combineReducers } = require('redux')
const projectsInfo = require('./projectsInfo')
const pagesToDevelop = require('./pagesToDevelop')



module.exports = combineReducers({
    projectsInfo,
    pagesToDevelop
})