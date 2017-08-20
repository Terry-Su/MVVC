module.exports=[
    {
        "entry": "/Users/suxing/Documents/WorkingDocuments/Project/MVVC/src/firstProject/firstPage/controller/entry.js",
        "output": {
            "path": "/Users/suxing/Documents/WorkingDocuments/Project/MVVC/dist/firstProject/firstPage",
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
                                    "stage-2"
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
            "alias": {}
        }
    }
]