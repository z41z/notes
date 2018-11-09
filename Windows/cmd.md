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
