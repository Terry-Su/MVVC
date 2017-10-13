const main = {
    UPDATE_PROJECTS(projects) {
        reduxStore.dispatch({
            type: 'UPDATE_PROJECTS',
            value: projects
        })
    },
    UPDATE_PAGES_TO_DEVELOP(pagesToDevelop) {
        reduxStore.dispatch({
            type: 'UPDATE_PAGES_TO_DEVELOP',
            value: pagesToDevelop
        })
    },
    ADD_PAGES_TO_PAGES_TO_DEVELOP(pages) {
        const { pagesToDevelop } = getReduxState()
        
        reduxStore.dispatch({
            type: 'UPDATE_PAGES_TO_DEVELOP',
            value: pagesToDevelop.concat(pages)
        })
    },
}

module.exports = main