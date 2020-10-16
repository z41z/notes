#### 代码片段
``` js
{
	"Vue Template Init": {
		"scope": "javascript,typescript,vue",
		"prefix": "init",
		"body": [
			"<template>",
			"\t<div class=\"$1\">",
			"\t</div>",
			"</template>",
			"<script>",
			"export default {",
			"\tdata() {",
			"\t\treturn {",
			"\t\t}",
			"\t},",
			"\tmounted() {",
			"\t},",
			"\tmethods: {",
			"\t},",
			"\tcomponents:{",
			"\t},",
			"}",
			"</script>",
			"<style lang=\"less\" scoped>",
			"</style>"
		],
		"description": "Vue Template"
	},
	"Arrow Function": {
		"scope": "javascript,typescript,vue",
		"prefix": "arrow",
		"body": [
			"()=>{$1}"
		],
		"description": "箭头函数"
	},
	"console.log()": {
		"scope": "javascript,typescript,vue",
		"prefix": "log",
		"body": [
			"console.log($1)"
		],
		"description": "console.log()"
	},
	"console.time()": {
		"scope": "javascript,typescript,vue",
		"prefix": "ctime",
		"body": [
			"console.time()"
		],
		"description": "console.time()"
	},
	"console.timeEnd()": {
		"scope": "javascript,typescript,vue",
		"prefix": "ctimeend",
		"body": [
			"console.timeEnd()"
		],
		"description": "console.timeEnd()"
	},
	"new Date": {
		"scope": "javascript,typescript,vue",
		"prefix": "date",
		"body": [
			"(new Date)"
		],
		"description": "new Date()"
	},
	"year": {
		"scope": "javascript,typescript,vue",
		"prefix": "year",
		"body": [
			"(new Date).getFullYear()"
		],
		"description": "getFullYear()"
	},
	"month": {
		"scope": "javascript,typescript,vue",
		"prefix": "month",
		"body": [
			"(new Date).getMonth()"
		],
		"description": "getMonth()"
	}
}
```