
const getProjectsInfoToDevelop = require('../getProjectsInfoToDevelop')

const PATH = require('path')




describe("getProjectsInfoToDevelop", function () {

  const srcPath = PATH.resolve(__dirname, './src')
  const ignoredFolders = [
    '__share',
    'static'
  ]
  const paths = getProjectsInfoToDevelop({ srcPath, ignoredFolders })

  it("getProjectsInfoToDevelop", function () {
    expect(true).toBe(true);
  });
});