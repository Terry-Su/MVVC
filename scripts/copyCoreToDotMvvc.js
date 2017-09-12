const FS = require('fs-extra')
const PATH = require('path')
const corePath = PATH.resolve(__dirname, '../core')
const dotMvvcPath = PATH.resolve(__dirname, '../mvvc-boilerplate/.mvvc')
const rimraf = require('rimraf')

rimraf.sync(dotMvvcPath)
FS.copySync(corePath, dotMvvcPath)