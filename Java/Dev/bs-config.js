/*
 |--------------------------------------------------------------------------
 | Browser-sync config file
 |--------------------------------------------------------------------------
 |
 | For up-to-date information about the options:
 |   http://www.browsersync.io/docs/options/
 |
 | There are more options than you see here, these are just the ones that are
 | set internally. See the website for more info.
 |
 |
 */
var child_process = require('child_process')
var chalk = require('chalk')
module.exports = {
    "ui": {
        "port": 3001
    },
    "files": [
        {   
            match: "**/*.java",
            fn: function (event, file) {
                child_process.exec('start cmd /k "client.bat"', function (error, stdout, stderr) {
                    if (error) {
                        console.log(chalk.red('Build Client Failed!'));
                    } else {
                        console.log(chalk.yellow(new Date()))
                        console.log(chalk.green('Build Client Successfully!'));
                    }
                })
            }
        },
        {
            match: "**/*.css",
            fn: function (event, file) {
                child_process.exec('browser-sync reload --files="*.css"', function (error, stdout, stderr) {
                    if (error) {
                        console.log(chalk.red('Reload Browser Failed!'));
                    } else {
                        console.log(chalk.yellow(new Date()))
                        console.log(chalk.green('CSS changed.'))
                        console.log(chalk.green('Refetch CSS Successfully!'))
                    }
                })
            }
        },
        {
            match: "**/*.js",
            fn: function (event, file) {
                child_process.exec('browser-sync reload --files="*.js"', function (error, stdout, stderr) {
                    if (error) {
                        console.log(chalk.red('Reload Browser Failed!'));
                    } else {
                        console.log(chalk.yellow(new Date()))
                        console.log(chalk.green('Script changed.'))
                        console.log(chalk.green('Refetch Script files Successfully!'))
                    }
                })
            }
        },
        {
            match: "**/*.ftl",
            fn: function (event, file) {
                child_process.exec('xcopy /y /e service\\src\\main\\webapp\\WEB-INF\\templates\\ D:\\apache-tomcat-7.0.91\\webapps\\ROOT\\WEB-INF\\templates\\', function (error, stdout, stderr) {
                    if (error) {
                        console.log(chalk.red('Copy Template files Failed!'));
                        console.log(chalk.red('Copy Template files to Tomcat Failed!'));
                    } else {
                        child_process.exec('browser-sync reload', function (error, stdout, stderr) {
                            if (error) {
                                console.log(chalk.red('Reload Browser Failed!'));
                            } else {
                                console.log(chalk.yellow(new Date()))
                                console.log(chalk.green('Reload Browser Successfully!'))
                            }
                        })
                    }
                })
            }
        }
    ],
    "watchEvents": [
        "change"
    ],
    "watch": true,
    "ignore": [],
    "single": false,
    "watchOptions": {
        "ignoreInitial": true
    },
    "server": false,
    "proxy": "http://127.0.0.1:80",
    "port": 3000,
    "middleware": false,
    "serveStatic": [],
    "ghostMode": {
        "clicks": true,
        "scroll": true,
        "location": true,
        "forms": {
            "submit": true,
            "inputs": true,
            "toggles": true
        }
    },
    "logLevel": "info",
    "logPrefix": "Watch",
    "logConnections": false,
    "logFileChanges": true,
    "logSnippet": true,
    "rewriteRules": [],
    "open": "local",
    "browser": "default",
    "cors": false,
    "xip": false,
    "hostnameSuffix": false,
    "reloadOnRestart": false,
    "notify": true,
    "scrollProportionally": true,
    "scrollThrottle": 0,
    "scrollRestoreTechnique": "window.name",
    "scrollElements": [],
    "scrollElementMapping": [],
    "reloadDelay": 0,
    "reloadDebounce": 500,
    "reloadThrottle": 0,
    "plugins": [],
    "injectChanges": true,
    "startPath": null,
    "minify": true,
    "host": null,
    "localOnly": false,
    "codeSync": true,
    "timestamps": true,
    "clientEvents": [
        "scroll",
        "scroll:element",
        "input:text",
        "input:toggles",
        "form:submit",
        "form:reset",
        "click"
    ],
    "socket": {
        "socketIoOptions": {
            "log": false
        },
        "socketIoClientConfig": {
            "reconnectionAttempts": 50
        },
        "path": "/browser-sync/socket.io",
        "clientPath": "/browser-sync",
        "namespace": "/browser-sync",
        "clients": {
            "heartbeatTimeout": 5000
        }
    },
    "tagNames": {
        "less": "link",
        "scss": "link",
        "css": "link",
        "jpg": "img",
        "jpeg": "img",
        "png": "img",
        "svg": "img",
        "gif": "img",
        "js": "script"
    }
};