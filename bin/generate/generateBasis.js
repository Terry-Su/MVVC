const generateMvvcConfig = require('./generateMvvcConfig')
const generatePackageJson = require('./generatePackageJson')
const generateBabelrc = require('./generateBabelrc')

module.exports = function generateBasis({
  path,
  boilerplatePackageJsonPath,
  boilerplateMvvcConfigPath,
  boilerplateMvvcBabelrcPath,
}) {
  return Promise.resolve(
    new Promise((resolve, reject) => {
      generatePackageJson(path, boilerplatePackageJsonPath)
        .then(() => {
          return generateMvvcConfig(path, boilerplateMvvcConfigPath)
        })
        .then(() => {
          return generateBabelrc(path, boilerplateMvvcBabelrcPath)
        })
        .then(() => {
          resolve()
        })
    })
  )
}
