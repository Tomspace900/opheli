<?php
header('Access-Control-Allow-Origin: http://localhost:3000');
$user = $_POST['name'];
$bdd = mysqli_connect("localhost","root","", "ordonnance","3307");
$bdd -> query("INSERT INTO `utilisateur` (`IdUtilisateur`, `Nom`, `Prenom`, `Mail`, `MotDePasse`) VALUES (NULL, '$user', 'a', 'b', 'c');");

echo ("Hello from server: $user");