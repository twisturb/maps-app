<?php

  include_once '../config/database.php';

    $id = $_POST['id'];
    $title = $_POST['title'];
    $desc = $_POST['desc'];
    $lat = $_POST['lat'];
    $lgt = $_POST['lgt'];
    $hours = $_POST['hours'];

    if (!$pdo) {
      die('Not connected : ' . PDO::errorCode());
    }

    $sql = 'UPDATE locations SET title = ?, description = ?, latitude = ?, longitude = ?, hours = ? WHERE id = ?';
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(1, $title, PDO::PARAM_STR, 250);
    $stmt->bindParam(2, $desc, PDO::PARAM_STR, 500);
    $stmt->bindParam(3, $lat, PDO::PARAM_STR, 10.6);
    $stmt->bindParam(4, $lgt, PDO::PARAM_STR, 10.6);
    $stmt->bindParam(5, $hours, PDO::PARAM_STR, 500);
    $stmt->bindParam(6, $id, PDO::PARAM_INT);
    $stmt->execute();

?>