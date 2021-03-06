const PATH = require('path')
const mvvcConfig = require('../mvvc.config.js')

const {
  shareFolderName
} = mvvcConfig


module.exports = {
  // like: /mvvc-boilerplate/src
  boilerplateRootPath: PATH.resolve(__dirname, './../mvvc-boilerplate'),
  boilerplateSrcPath: PATH.resolve(__dirname, './../mvvc-boilerplate/src'),
  boilerplatePackageJsonPath: PATH.resolve(__dirname, './../mvvc-boilerplate/packageTpl.json'),
  boilerplateMvvcConfigPath: PATH.resolve(__dirname, './../mvvc-boilerplate/mvvc.config.js'),
  boilerplateMvvcDotMvvcPath: PATH.resolve(__dirname, './../mvvc-boilerplate/.mvvc'),
  boilerplateMvvcBabelrcPath: PATH.resolve(__dirname, './../mvvc-boilerplate/.babelrc'),
  boilerplateMvvcSharePath: PATH.resolve(__dirname, `./../mvvc-boilerplate/src/${shareFolderName}`),    
}