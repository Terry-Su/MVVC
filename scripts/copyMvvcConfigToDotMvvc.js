const FS = require('fs-extra')
const PATH = require('path')
const corePath = PATH.resolve(__dirname, '../mvvc.config.js')
const dotMvvcPath = PATH.resolve(__dirname, '../mvvc-boilerplate/.mvvc/mvvc.config.js')
const rimraf = require('rimraf')

rimraf.sync(dotMvvcPath)
FS.copySync(corePath, dotMvvcPath)