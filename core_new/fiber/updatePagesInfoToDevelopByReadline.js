const Readline = require('../module/readline')
const { ADD_PAGES_TO_PAGES_TO_DEVELOP } = require('../module/main')

/**
 * get pages info to develop by reading lines
 * [
 *     {
 *         name: '',
 *         path: ''
 *         parentProject: {
 *             name: '',
 *             path: ''
 *         }
 *     }
 * ]
 * 
 */
module.exports = function () {
    // show projects to choose
    Readline.showProjectsToChooseTitle()
    const projectInfos = Readline.readlinesOfProjects()

    // update pages
    const updatePagesToDevelop = projectInfo => {
        Readline.showPagesToChooseTitle()

        const pages = Readline.readlinesOfPages(projectInfo)        
        ADD_PAGES_TO_PAGES_TO_DEVELOP(pages)
    }
    R.map(updatePagesToDevelop, projectInfos)
}