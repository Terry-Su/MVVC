// Manage global variables

const R = require('ramda')
const FS = require('fs-extra')
const PATH = require('path')

const Chalk = require('chalk')
const reduxStore = require('../redux/index')
const reduxSelector = require('../redux/selector/index')
const { getReduxState } = reduxSelector
const Config = require('../config/index')
const Util = require('../util/index')
const InitialState = require('../store/initialState')

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
    FS,
    PATH,
    Chalk,
    Config,
    Util,
    InitialState,
}


module.exports = function exportGlobalVars() {
    exportVarsToGlobal(toExportVariables)
}