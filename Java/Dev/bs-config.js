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
let child_process = require('child_process')
let chalk = require('chalk')

// 项目名
const PROJECT_NAME = "ProjectName"
// 项目真实地址
const ORIGION_SERVER = "http://127.0.0.1:80"

// 前端CSS样式表监听
const PATH_CSS = "/**/*.css"
// 前端JavaScript监听
const PATH_JS = "/**/*.js"
// 后端客户端监听
const PATH_CLIENT = "/**/*.java"
// 后端服务端监听
const PATH_SERVICE = "/**/*.java"
// 后端模板监听
const PATH_FTL = "/**/*.ftl"

// 后端模板文件夹路径
const PATH_DEV_FTL = "\\templates"
// Tomcat部署模板路径
const PATH_PRO_FTL = "\\templates"
// 后端客户端监听变化打包
const CMD_CLIENT = "client.bat"
// 后端服务端监听变化打包
const CMD_SERVICE = "service.bat"

module.exports = {
    "ui": {
        "port": 3001
    },
    "files": [
        {   // watch client Java
            match: PATH_CLIENT,
            fn: function (event, file) {
                child_process.exec(`start cmd /k "${CMD_CLIENT}"`, function (error, stdout, stderr) {
                    if (error) {
                        console.log(chalk.red('Build Client Failed!'));
                    } else {
                        console.log(chalk.yellow(new Date()))
                        console.log(chalk.green('Build Client Successfully!'));
                    }
                })
            }
        },
        {   // watch service Java
            match: PATH_SERVICE,
            fn: function (event, file) {
                child_process.exec(`start cmd /k "${CMD_SERVICE}"`, function (error, stdout, stderr) {
                    if (error) {
                        console.log(chalk.red('Build Service Failed!'));
                        return
                    } else {
                        console.log(chalk.yellow(new Date()))
                        console.log(chalk.green('Build Service Successfully!'));
                    }
                })
            }
        },
        {   // watch css
            match: PATH_CSS,
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
        {   // watch javascript
            match: PATH_JS,
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
            // watch ftl
            match: PATH_FTL,
            fn: function (event, file) {
                child_process.exec(`xcopy /y /e ${PATH_DEV_FTL} ${PATH_PRO_FTL}`, function (error, stdout, stderr) {
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
    "proxy": ORIGION_SERVER,
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
    "logPrefix": PROJECT_NAME,
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
    "reloadThrottle": 500,
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