# 1. Virtual mini Wifi
```
  netsh wlan set hostednetwork mode=allow ssid=YourWifiName key=YourWifiPassword
  netsh wlan start/stop hostednetwork
```
# 2. Service
> show service status
```
  sc query serviceName
```
> show/stop a service
```
  sc start/stop serviceName
```

# 3.找到流氓弹窗的可程序执行文件

```
 Win + R输入psr打开“问题步骤记录器”,开始记录，鼠标移到对应流氓弹窗上，关闭记录并保存结果。
```
