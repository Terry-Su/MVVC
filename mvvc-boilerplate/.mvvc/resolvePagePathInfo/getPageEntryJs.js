const PATH = require('path')
const FS = require('fs')
const {
  outputRootPath,
  resolvePagePathInfoCachePath,
} = require('../config/mvvcConfig')


module.exports = function getPageEntryJs({
  originNodeControllerPath,
  pagePath,
  project, 
  page
}) {
  const cacheFilePath = resolvePagePathInfoCachePath
  const relativeControllerPath = PATH.relative(
    cacheFilePath,
    originNodeControllerPath
  ).replace(/\\/g, "/")

  const entryPath = getWebEntryPath(pagePath)
  const outputPath = getOutputPath(project, page)
  const relativeEntryPath = PATH.relative(
    process.cwd(),
    entryPath
  ).replace(/\\/g, "/")
  let relativeOutputPath = PATH.relative(
    process.cwd(),
    outputPath
  ).replace(/\\/g, "/")

  return !`
  import PATH from 'path'
  import execWebpack from '../../execWebpack'
  
  
  export class Controller  {
    watchWebByWebpack = () => {
     console.log('execWebpack', execWebpack)
    }
  }
  
  export default 123
    ` || `
import PATH from 'path'
import execWebpack from '../../execWebpack'
import { Controller as SuperController } from '${relativeControllerPath}'


export class Controller extends SuperController {
  watchWebByWebpack = () => {
    const { webpackBasicConfig } = new SuperController()
    const webpackConfig = Object.assign(
      webpackBasicConfig,
      {
        entry: PATH.resolve(process.cwd(), '${relativeEntryPath}'),
        output: {
          path: PATH.resolve(process.cwd(), '${relativeOutputPath}'),
          filename: 'bundle.js',
        }
      }
    )
    
     execWebpack(webpackConfig)
  }
}

export default new Controller()
  `
}


function getWebEntryPath(pagePath) {
  return PATH.resolve(pagePath, './controller/entry.js')
}

function getOutputPath(project, page) {
  return PATH.resolve(outputRootPath, `./${project}/${page}`)
}
