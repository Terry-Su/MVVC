const exportGlobalVars = require('../global/exportGlobalVars.js')
exportGlobalVars()

const updateProjects = require('../fiber/updateProjects')
const updatePagesInfoToDevelopByReadline = require('../fiber/updatePagesInfoToDevelopByReadline')
const applyPage = require('../fiber/applyPage/index')
const applyProject = require('../fiber/applyProject/index')
const readMultipeLines = require('readline-multiple')

// mock data
const { mockPagesToDevelop } = require('../mock/forTest')

let isMock = true

module.exports = {
    init() {
        let pagesToDevelop

        updateProjects()

        // [1] build static folder in projects
        const { projects } = getReduxState()
        R.map(applyProject, projects)


        // [2] get pages info to develop
        if (!isMock) {
            updatePagesInfoToDevelopByReadline()
            pagesToDevelop = getReduxState().pagesToDevelop

        }
        if (isMock) {
            pagesToDevelop = mockPagesToDevelop
        }


        // [3] map each page - watch and build html, webpack's output files, static files (caveat: rebuild webpack if webpack's config is changed)
        R.map(applyPage, pagesToDevelop)


        // [4] list page links
    }
}
