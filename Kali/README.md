### 安装报找不到光盘镜像
 使用[win32diskimager](https://sourceforge.net/projects/win32diskimager/)写入U盘镜像

### 切换阿里云源
打开leafpad /etc/apt/sources.list，添加
 ``` bash
  deb http://mirrors.aliyun.com/kali kali-rolling main non-free contrib
 ```
 ``` bash
  apt-get update
  apt --fix-broken install
 ```
 
### 安装中文输入法
 ``` bash
  apt-get install fcitx fcitx-googlepinyin
 ```
 
### 开启Wifi

- 方案一：每次开机后运行命令
``` bash
 sudo modprobe -r ideapad_laptop
```
 - 方案二[(By:Pilot6)](https://askubuntu.com/questions/918519/wifi-is-disabled-new-install),运行
 ``` bash
  sudo tee /etc/modprobe.d/blacklist-ideapad.conf <<< "blacklist ideapad_laptop"
 ```
 ``` bash
  reboot
 ```
 
### 关机时间太长
 - 方案一：编辑/etc/systemd/system.conf,修改#DefaultTimeoutStopSec=90s
 - 方案二：ctrl+alt+delete跳过
 - 方案三：sudo apt install exfat-fuse exfat-utils
 - 方案四：关闭WiFi

### 打开或运行Chrome
 - [Kali forums](https://forums.kali.org/showthread.php?26604-Google-chrome-not-starting-as-root-in-kali-2-0)
