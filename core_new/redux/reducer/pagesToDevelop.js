module.exports = function (state = [], action) {
    switch (action.type) {
        case 'UPDATE_PAGES_TO_DEVELOP':
            return Object.assign([], state, action.value)
        default:
            return state
    }
}