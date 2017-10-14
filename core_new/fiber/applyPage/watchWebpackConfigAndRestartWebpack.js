const applyWebpack = require('./applyWebpack')
const watchNodeWebpackConfigChageByPage = require('../watchNodeWebpackConfigChageByPage')

module.exports = function (page) {
    let webpackWatcher

    webpackWatcher = applyWebpack(page)

    const callback = () => {
        webpackWatcher.close(() => {
            webpackWatcher = applyWebpack(page)
            console.log(Chalk.green.bold('\nWebpack restarted\n'))
        })
        
    }

    watchNodeWebpackConfigChageByPage(page, callback)
}