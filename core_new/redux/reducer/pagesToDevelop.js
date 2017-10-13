const { pagesToDevelop: initialPagesToDevelop } = require('../../store/initialState')


module.exports = function (state = initialPagesToDevelop, action) {
    switch (action.type) {
        case 'UPDATE_PAGES_TO_DEVELOP':
            return Object.assign([], state, action.value)
        default:
            return state
    }
}