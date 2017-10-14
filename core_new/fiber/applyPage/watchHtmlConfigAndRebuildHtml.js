const buildHtml = require('./buildHtml')
const watchNodeHtmlConfigChageByPage= require('../watchNodeHtmlConfigChageByPage')

module.exports = function (page) {
    buildHtml(page)

    const callback = () => buildHtml(page)
    watchNodeHtmlConfigChageByPage(page, callback)
}