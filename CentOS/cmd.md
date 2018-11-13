
# 端口及防火墙

- ## 查看单个端口占用
``` bash
  lsof -i tcp:80
```

- ## 查看所有端口

``` bash
  netstat -ntlp
```

- ## iptables 开启端口
> 方法一：
``` bash
  /sbin/iptables -I INPUT -p tcp --dport 80 -j ACCEPT
```
- ## 保存iptables修改
``` bash
  /etc/init.d/iptables save
```

- ## 重启防火墙
``` bash
 service iptables restart
```

> 方法二：
``` bash
  编辑 vi /etc/sysconfig/iptables
  写入 -A INPUT -p tcp -m state --state NEW -m tcp --dport 80 -j ACCEPT
  重启 service iptables restart
```
- ## 查看iptables状态
``` bash
  /etc/init.d/iptables status
```

# CPU及内存

- ## 查看内存占用
``` bash
  top
```

- ## 查看内存整体使用情况
``` bash
  free -m
```
