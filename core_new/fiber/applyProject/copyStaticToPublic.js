const getStaticPath = projectPath => PATH.resolve(projectPath, './static')
const getStaticOutputPath = (outputPath, projectName) => {
    return PATH.resolve(outputPath, `./${projectName}/static`)
}


module.exports = function (project) {
    const { path: projectPath, name: projectName } = project.project
    const staticPath = getStaticPath(projectPath)
    const { outputPath } = Config
    const staticOutputPath = getStaticOutputPath(outputPath, projectName)

    // check if staticPath exsited
    const exsitStaticPath = Util.checkPathExsitsAndIsDirectory(staticPath)
    
    if (exsitStaticPath) {
        FS.copySync(staticPath, staticOutputPath)
    }
    
}