const getProjectsPathsToDevelop = require('../../fiber/getProjectsPathsToDevelop')

const PATH = require('path')


const srcPath = PATH.resolve(__dirname, './src')
const ignoredFolders = [
  '__share',
  'static'
]

const paths = getProjectsPathsToDevelop({ srcPath, ignoredFolders })

console.log(123, paths)

// describe("Test fn: getProjectsPathsToDevelop", function () {
//   const srcPath = PATH.resolve(__dirname, './src')
//   const ignoredFolders = [
//     '__share',
//     'static'
//   ]
//   it("and so is a spec", function () {
//     const paths = getProjectsPathsToDevelop({srcPath, ignoredFolders })

//     // console.log(123, paths)
//     expect(true).toBe(true);
//   });
// });