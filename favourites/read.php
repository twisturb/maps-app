<?php

  include_once '../config/database.php';

    if (!$pdo) {
      die('Not connected : ' . PDO::errorCode());
    }

    $sql = 'SELECT title FROM locations WHERE favourite = "1"';
    $stmt = $pdo->query($sql)->fetchAll();

    header('Content-type: text/html');

    $i = 1;

    foreach ($stmt as $row) {
      $no = $i++;
      echo '<li class="favourites-item" ';
      echo 'title="' . $row['title'] . '"';
      echo '>' . $no . '. ' . $row['title'] . '</li>';
    }

?>