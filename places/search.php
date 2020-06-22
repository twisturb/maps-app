<?php

  include_once '../config/database.php';

    $txt = $_POST['txt'];

    if (!$pdo) {
      die('Not connected : ' . PDO::errorCode());
    }

    $sql = 'SELECT * FROM locations WHERE title = ?';
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(1, $txt, PDO::PARAM_STR, 250);
    $stmt->execute();

?>