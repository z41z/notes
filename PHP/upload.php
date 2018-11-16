<?php
  header('Content-Type:text/json;charset=utf-8');
  function getExt($filename){
    $first=explode(".",$filename); 
    $ext=strtolower(end($first));
    return $ext;
  }
  
  $msg = array();
  $files = $_FILES['filename'];
  $uploaddir = './uploads/';
  $ext = getExt($files['name']);
  $ext_type = array('gif','jpg','jpeg','png');

  if(in_array($ext,$ext_type)){
    $destName = $uploaddir.date('YmdHis', time()).rand(1000,9999).'.'.$ext;
    if (move_uploaded_file($files['tmp_name'], $destName)) {
        $msg = array(
          'data' => $destName,
          'code' => 200
        );
    } else {
      $msg = array(
        'data' => '上传失败',
        'code' => 500
      );
    }
  }
  else{
    $msg = array(
      'data' => '文件类型错误',
      'code' => 500
    );
  }
  echo json_encode($msg);
?>
