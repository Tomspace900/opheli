<?php
include '../utiles/connexion.php';
header('Access-Control-Allow-Origin: http://localhost:3000');
$user = $_POST['name'];
$pass = $_POST['pass'];
