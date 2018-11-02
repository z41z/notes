# 基本配置

```js
{
  "java.home": JdkHomePath,
  "java.trace.server": "verbose",
}
```

## 运行问题备用解决方案
- 始终显示“Starting Java Language Server”
    - 方案一：删除%APPDATA%\Code\User\workspaceStorage\里面的文件 [Issues/433](https://github.com/redhat-developer/vscode-java/issues/162)
    - 方案二：设置 "java.trace.server": "verbose" [Issues/433](https://github.com/redhat-developer/vscode-java/issues/162)
