const readMultipleLines = require('readline-multiple')


const getItemsByDataOfReadMultipleLines = dataOfReadMultipleLines => {
    let items = []
    let isAll = false
    dataOfReadMultipleLines.map(info => {
        const { pressKey, value } = info

        const isCurrenPressKey0 = pressKey === '0'
        if (isCurrenPressKey0) {
            isAll = true
            items = value
        }

        if (!isAll) {
            items.push(value)
        }
    })

    return items
}


let self


const readline = {
    showProjectsToChooseTitle() {
        console.log(`\n\n${Chalk.bold(`Choose project(s):`)}  (eg. single: '1' or multiple: '1 2')\n`)
    },
    showPagesToChooseTitle() {
        console.log(`\n\n${Chalk.bold(`Choose page(s):`)}  (eg. single: '1' or multiple: '1 2')\n`)
    },
    /**
     * @returns {Array} projectInfos [ { project: { name: '', path: '' }, pages: [ { name: '', path: '' } ] } ]
     */
    readlinesOfProjects() {
        const getDataValue = data => data.value
        const getParamsForReadMultipleLines = projects => {
            let params = []

            const allProjectInfos = projects

            params.push({
                pressKey: '0',
                display: 'All',
                value: allProjectInfos,
            })

            allProjectInfos.map((projectInfo, index) => {
                const projectName = projectInfo.project.name

                params.push({
                    pressKey: '' + (index + 1),
                    display: projectName,
                    value: projectInfo
                })
            })

            return params
        }
        const getProjectInfosByDataOfReadMultipleLines = getItemsByDataOfReadMultipleLines

        const { projects } = getReduxState()

        const paramsForReadMultipleLines = getParamsForReadMultipleLines(projects)
        const dataOfReadMultipleLines = readMultipleLines(paramsForReadMultipleLines).then(data => data)
        const projectInfos = getProjectInfosByDataOfReadMultipleLines(dataOfReadMultipleLines)

        return projectInfos
    },
    /**
     * @returns {Array} [ { name: '', path: '', parent: { name: '', path; '' } } ]
     */
    readlinesOfPages(projectInfo) {
        const getParamsForReadMultipleLines = projectInfo => {
            let params = []

            const allPages = projectInfo.pages

            params.push({
                pressKey: '0',
                display: 'All',
                value: allPages,
            })

            allPages.map((page, index) => {
                const pageName = page.name

                params.push({
                    pressKey: '' + (index + 1),
                    display: pageName,
                    value: page
                })
            })

            return params
        }
        const getPagesByDataOfReadMultipleLines = getItemsByDataOfReadMultipleLines
        const paramsForReadMultipleLines = getParamsForReadMultipleLines(projectInfo)
        const dataOfReadMultipleLines = readMultipleLines(paramsForReadMultipleLines).then(data => data)
        const pages = getPagesByDataOfReadMultipleLines(dataOfReadMultipleLines)
        return pages
    }
}

self = readline

module.exports = readline