const { projects: initialProjects } = require('../../store/initialState')


module.exports = function (state = initialProjects, action) {
    switch (action.type) {
        case 'UPDATE_PROJECTS':
            return Object.assign([], state, action.value)
        default:
            return state
    }
}