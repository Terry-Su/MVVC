const applyPageBuildFolderStructure = require('../applyPage/buildFolderStructure')
const getOutputProjectPath = (projectName, outputPath) => PATH.resolve(outputPath, `./${projectName}`)


/**
 * | Project1
 * |__ Page1
 * |__ Page2
 * | Project2
 * |__ Page3
 * |__ Page4
 */
module.exports = function (project) {
    const { pages } = project
    const { name: projectName } = project.project

    const { outputPath } = Config
    const outputProjectPath = getOutputProjectPath(projectName, outputPath)
    FS.ensureDirSync(outputProjectPath)

    R.map(applyPageBuildFolderStructure, pages)
}