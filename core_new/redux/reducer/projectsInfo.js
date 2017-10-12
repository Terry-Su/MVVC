module.exports = function (state = [], action) {
    switch (action.type) {
        case 'UPDATE_PROJECTS_INFO':
            return Object.assign([], state, action.value)
        default:
            return state
    }
}