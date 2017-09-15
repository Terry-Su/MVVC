const generateMvvcConfig = require('./generateMvvcConfig')
const generatePackageJson = require('./generatePackageJson')
const generateDotMvvc = require('./generateDotMvvc')

module.exports = function generateBasis({
  path,
  boilerplatePackageJsonPath,
  boilerplateMvvcConfigPath,
  boilerplateMvvcBabelrcPath,
  boilerplateMvvcDotMvvcPath,
}) {
  return Promise.resolve(
    new Promise((resolve, reject) => {
      generatePackageJson(path, boilerplatePackageJsonPath)
        .then(() => {
          return generateMvvcConfig(path, boilerplateMvvcConfigPath)
        })
        .then(() => {
          return generateDotMvvc(path, boilerplateMvvcDotMvvcPath)
        })
        .then(() => {
          resolve()
        })
    })
  )
}
