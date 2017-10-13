const getProjects = require('./getProjects')
const { UPDATE_PROJECTS } = require('../module/main')

module.exports = function () {
    const projects = getProjects()

    UPDATE_PROJECTS(projects)
}