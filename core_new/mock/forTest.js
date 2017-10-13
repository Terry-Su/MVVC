module.exports = {
    mockPagesToDevelop: [
        {
            name: 'Page1',
            path: PATH.resolve(__dirname, '../../core_new/__test/main/src/Project1/Page1'),
            parentProject:{ 
                name: "Project1",
                path:  PATH.resolve(__dirname, '../../core_new/__test/main/src/Project1')
            }
        },
        {
            name: 'Page2',
            path: PATH.resolve(__dirname, '../../core_new/__test/main/src/Project1/Page2'),
            parentProject:{ 
                name: "Project1",
                path:  PATH.resolve(__dirname, '../../core_new/__test/main/src/Project1')
            }
        }
    ]
}