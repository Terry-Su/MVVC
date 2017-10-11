const getProjectsPathsToDevelop = require('../fiber/getProjectsPathsToDevelop')



module.exports = {
    init({
        srcPath,
        ignoredFolders,
    }) {
        const getPagesToDevelop = () => {
            return getProjectsPathsToDevelop({
                srcPath,
                ignoredFolders,
            })
        }


        // get pages to develop
        const pagesToDevelop = getPagesToDevelop()

        console.log(pagesToDevelop)

        // map each page - watch and build html, webpack's output files, static files (caveat: rebuild webpack if webpack's config is changed)


        // list page links
    }
}
