const buildFolderStructure = require('./buildFolderStructure')
const copyStaticToPublic = require('./copyStaticToPublic')

module.exports = function (project) {
    buildFolderStructure(project)
    copyStaticToPublic(project)
}