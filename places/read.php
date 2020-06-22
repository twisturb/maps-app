<?php

  include_once '../config/database.php';

  function parseToXML($htmlStr) {
    $xmlStr=str_replace('<','&lt;',$htmlStr);
    $xmlStr=str_replace('>','&gt;',$xmlStr);
    $xmlStr=str_replace('"','&quot;',$xmlStr);
    $xmlStr=str_replace("'",'&#39;',$xmlStr);
    $xmlStr=str_replace("&",'&amp;',$xmlStr);
    return $xmlStr;
  }

  if (!$pdo) {
    die('Not connected : ' . PDO::errorCode());
  }

  $sql = 'SELECT * FROM locations';
  $stmt = $pdo->query($sql)->fetchAll();

  header('Content-type: text/xml');

  echo "<?xml version='1.0' ?>";
  echo '<markers>';
  $i = 0;

  foreach ($stmt as $row) {
    echo '<marker ';
    echo 'id="' . $row['id'] . '" ';
    echo 'title="' . parseToXML($row['title']) . '" ';
    echo 'desc="' . parseToXML($row['description']) . '" ';
    echo 'lat="' . $row['latitude'] . '" ';
    echo 'lgt="' . $row['longitude'] . '" ';
    echo 'hours="' . $row['hours'] . '" ';
    echo 'fav="' . $row['favourite'] . '" ';
    echo '/>';
    $i = $i + 1;
  }

  echo '</markers>';

?>