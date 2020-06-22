<?php

  $host = 'localhost';
  $username = 'root';
  $password = 'root';
  $database = 'maps_db';
  $charset = 'utf8';

  $conn = "mysql:host=$host;dbname=$database;charset=$charset";
  $options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
  ];

  try {
    $pdo = new PDO($conn, $username, $password, $options);
  } catch (\PDOException $e) {
    throw new \PDOException($e->getMessage(), (int)$e->getCode());
  }

?>