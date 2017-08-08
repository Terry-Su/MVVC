module.exports=[
    {
        "entry": "/Users/suxing/Documents/WorkingDocuments/Project/MVVC/src/project2/page3/controller/index.web.js",
        "output": {
            "path": "/Users/suxing/Documents/WorkingDocuments/Project/MVVC/dist/project2/page3",
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
        },
        "resolve": {
            "alias": {
                "fetch": "/Users/suxing/Documents/WorkingDocuments/Project/MVVC/src/share/util/fetch.js"
            }
        }
    },
    {
        "entry": "/Users/suxing/Documents/WorkingDocuments/Project/MVVC/src/projectExample/page2/controller/index.web.js",
        "output": {
            "path": "/Users/suxing/Documents/WorkingDocuments/Project/MVVC/dist/projectExample/page2",
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
        },
        "resolve": {
            "alias": {
                "fetch": "/Users/suxing/Documents/WorkingDocuments/Project/MVVC/src/share/util/fetch.js"
            }
        }
    },
    {
        "entry": "/Users/suxing/Documents/WorkingDocuments/Project/MVVC/src/projectExample/pageExample/controller/index.web.js",
        "output": {
            "path": "/Users/suxing/Documents/WorkingDocuments/Project/MVVC/dist/projectExample/pageExample",
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
        },
        "resolve": {
            "alias": {
                "fetch": "/Users/suxing/Documents/WorkingDocuments/Project/MVVC/src/share/util/fetch.js"
            }
        }
    }
]