const getProjectsInfoToDevelop = require('./getProjectsInfoToDevelop')
const { UPDATE_PROJECTS_INFO } = require('../module/main')

module.exports = function ({
    srcPath,
    ignoredFolders,
}) {
    const projectsInfo = getProjectsInfoToDevelop({
        srcPath,
        ignoredFolders,
    })

    UPDATE_PROJECTS_INFO(projectsInfo)
}