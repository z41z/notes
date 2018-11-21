# CentOS install nginx and Use ngx_brotli to compresses data

- 安装gcc

``` bash
  yum -y install gcc gcc-c++ make libtool zlib zlib-devel openssl openssl-devel pcre pcre-devel
```

- 下载nginx源代码

``` bash
  wget http://nginx.org/download/nginx-1.15.6.tar.gz
```

- 解压下载完成的包

``` bash
  tar -zxvf nginx-1.15.6.tar.gz
```

- 安装Git

``` bash
  yum install git
```

- 安装ngx_brotli模块并编译 Tips: brotli require HTTPS

``` bash
  git clone https://github.com/google/ngx_brotli.git
  cd ./ngx_brotli && git submodule update --init && cd /root/nginx-1.15.6
  ./configure --prefix=/usr/local/webserver/nginx --with-http_stub_status_module --with-http_ssl_module --with-pcre --add-module=./ngx_brotli
  make && make install
```

- 编辑nginx配置

``` bash
  cd /usr/local/webserver/nginx/conf
  vi nginx.conf
  #在http, server或者location对象中加入
  #Brotli Compression
  brotli on;
  brotli_comp_level 6;
  brotli_types text/plain text/css application/json application/x-javascript text/xml application/xml application/xml+rss text/javascript application/javascript image/svg+xml;
```

- 启动nginx

``` bash
  /usr/local/webserver/nginx/sbin/nginx
```

- 停止nginx

``` bash
  /usr/local/webserver/nginx/sbin/nginx -s stop
```

Tips: brotli require HTTPS
