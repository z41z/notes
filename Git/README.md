### 查看用户

``` bash
git config user.name
git config user.email
```

### 设置用户

``` bash
git config --global user.name "username"

git config --global user.email "email"
```

useradd userName

passwd userName

ssh-keygen

mkdir ~/.ssh && touch ~/.ssh/authorized_keys

cat .ssh/id_rsa.pub | ssh user@123.45.6.78 "cat >> ~/.ssh/authorized_keys"

git init --bare sample.git

### 错误处理

git pull origin master --allow-unrelated-histories

### clone Github过慢

git config --global http.postBuffer 524288000
git config --global http.proxy <http://127.0.0.1:1080> SS本地代理
git config --global http.proxy <https://127.0.0.1:1080> SS本地代理