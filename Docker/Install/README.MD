## Docker ToolBox

- 下载[DockerToolBox](http://mirrors.aliyun.com/docker-toolbox/windows/docker-toolbox/)

- 默认安装DockerBox

- 运行Docker QuikStart

- 根据命令行提示下载boot2docker.iso

- 将下载完成的文件放入C:\Users\administrator\.docker\machine\cache

- 重新运行Docker QuikStart

## 创建DockerMachine

```bash
  docker-machine create --engine-registry-mirror=https://registry.docker-cn.com -d virtualbox DockerMachineName
```
