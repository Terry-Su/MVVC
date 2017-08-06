module.exports=[
    {
        "entry": "/Users/suxing/Documents/WorkingDocuments/Project/MVVC/src/project1/page1/controller/index.web.js",
        "output": {
            "path": "/Users/suxing/Documents/WorkingDocuments/Project/MVVC/dist/project1/page1",
            "filename": "bundle.js"
        },
        "devtool": "source-map",
        "module": {
            "rules": [
                {
                    "test": /.js.*/,
                    "exclude": /node_modules/,
                    "use": [
                        {
                            "loader": "babel-loader",
                            "options": {
                                "presets": [
                                    "es2015",
                                    "stage-0"
                                ],
                                "plugins": [
                                    "inferno"
                                ]
                            }
                        }
                    ]
                }
            ]
        }
    }
]