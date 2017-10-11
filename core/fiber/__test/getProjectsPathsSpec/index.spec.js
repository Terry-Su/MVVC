
const getProjectsPathsToDevelop = require('../getProjectsPathsToDevelop')

const PATH = require('path')




describe("getProjectsPathsToDevelop", function () {

  const srcPath = PATH.resolve(__dirname, './src')
  const ignoredFolders = [
    '__share',
    'static'
  ]
  const paths = getProjectsPathsToDevelop({ srcPath, ignoredFolders })

  it("getProjectsPathsToDevelop", function () {
    console.log(paths)
    // console.log(123, paths)
    expect(true).toBe(true);
  });
});