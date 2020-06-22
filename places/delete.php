<?php

  include_once '../config/database.php';

  $id = $_POST['id'];

  if (!$pdo) {
    die('Not connected : ' . PDO::errorCode());
  }

  $sql = 'DELETE FROM locations WHERE id = ?';
  $stmt = $pdo->prepare($sql);
  $stmt->bindParam(1, $id, PDO::PARAM_INT);
  $stmt->execute();

?>