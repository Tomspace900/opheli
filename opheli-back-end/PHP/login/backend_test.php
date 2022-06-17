<?php
include '../utiles/connexion.php';
header('Access-Control-Allow-Origin: http://localhost:3000');
$user = $_POST['name'];
$pass = $_POST['pass'];
$bdd -> query("INSERT INTO `utilisateur` (`IdUtilisateur`, `Nom`, `Prenom`, `Mail`, `MotDePasse`) VALUES (NULL, '$user', 'a', 'b','$pass');");

echo ("Hello from server: $pass");