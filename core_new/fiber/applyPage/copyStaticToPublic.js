const getOutputPagePath = require('../getOutputPagePath')
const getStaticPath = pagePath => PATH.resolve(pagePath, './static')
const getStaticOutputPath = (outputPagePath) => {
    return PATH.resolve(outputPagePath, `./static`)
}


module.exports = function (page) {
    const { path: pagePath, name: pageName, parentProject } = page
    const parentProjectName = parentProject.name


    const staticPath = getStaticPath(pagePath)
    const outputPagePath = getOutputPagePath(page)
    const staticOutputPath = getStaticOutputPath(outputPagePath)

    // check if staticPath exsited
    const exsitStaticPath = Util.checkPathExsitsAndIsDirectory(staticPath)
    
    if (exsitStaticPath) {
        FS.copySync(staticPath, staticOutputPath)
    }
    
}