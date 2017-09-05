const PATH = require('path')

const boilerplateManager = {
  getConfigPath() {
    return PATH.resolve(__dirname, '../mvvc-boilerplate/mvvc.config.js')
  },

  getPackageJsonPath() {
    return PATH.resolve(__dirname, '../mvvc-boilerplate/package.json') 
  },

  getSrcPath() {
    return PATH.resolve(__dirname, '../mvvc-boilerplate/package.json') 
  },

  // project - react&redux
  getProjectReactReduxPath() {
    return PATH.resolve(__dirname, '../mvvc-boilerplate/src/ReactReduxProject') 
  },

  // project - inferno&redux
  getProjectInfernoReduxPath() {
    return PATH.resolve(__dirname, '../mvvc-boilerplate/src/InfernoReduxProject') 
  },
}


module.exports = boilerplateManager