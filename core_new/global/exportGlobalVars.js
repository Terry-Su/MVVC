// Manage global variables

const R = require('ramda')
const Chalk = require('chalk')

const reduxStore = require('../redux/index')
const reduxSelector = require('../redux/selector/index')
const { getReduxState } = reduxSelector

const exportObjectToGlobal = (object, key) => {
    global[key] = object
}
const exportVarsToGlobal = vars => {
    const keys = Object.keys(vars)
    const exportVarsToGlobalByKey = key => {
        const object = vars[key]
        exportObjectToGlobal(object, key)
    }
    R.map(exportVarsToGlobalByKey, keys)
}


const toExportVariables = {
    reduxStore,
    reduxSelector,
    getReduxState,
    R,
    Chalk,
}


module.exports = function exportGlobalVars() {
    exportVarsToGlobal(toExportVariables)
}