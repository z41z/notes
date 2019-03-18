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
``` bash
 sudo modprobe -r ideapad_laptop
```
