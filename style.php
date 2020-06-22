<?php

  $dir = 'styles';
  require 'styles/scssphp/scss.inc.php';
  scss_server::serveFrom($dir);

?>
