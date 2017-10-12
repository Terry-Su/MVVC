const exportGlobalVars = require('../global/exportGlobalVars.js')

const updateProjectsInfo = require('../fiber/updateProjectsInfo')
const updatePagesInfoToDevelopByReadline = require('../fiber/updatePagesInfoToDevelopByReadline')
const readMultipeLines = require('readline-multiple')

// mock data
const { mockPagesToDevelop } = require('../mock/forTest')

let isMock = true

module.exports = {
    init({
        srcPath,
        ignoredFolders,
    }) {

        exportGlobalVars()
        
        updateProjectsInfo({
            srcPath,
            ignoredFolders,
        })

        // [1] get pages info to develop
        let pagesToDevelop
        if (!isMock) {
            updatePagesInfoToDevelopByReadline()
            const { pagesToDevelop: thePagesToDevelop } = getReduxState()
            pagesToDevelop = thePagesToDevelop

        }
        if (isMock) {
            pagesToDevelop = mockPagesToDevelop
        }

        
        // [2] map each page - watch and build html, webpack's output files, static files (caveat: rebuild webpack if webpack's config is changed)


        // [3] list page links
    }
}
