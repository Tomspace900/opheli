<?php
include '../utiles/connexion.php';
header('Access-Control-Allow-Origin: http://localhost:3000');
$user = $_POST['name'];
include("../utiles/connexion.php");
$bdd -> query("INSERT INTO `utilisateur` (`IdUtilisateur`, `Nom`, `Prenom`, `Mail`, `MotDePasse`) VALUES (NULL, '$user', 'a', 'b', 'c');");
echo ("Hello from server: $user");