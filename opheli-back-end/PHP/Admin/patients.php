<?php
session_start();
include("../utiles/connexion.php");
$t = $bdd -> query("SELECT utilisateur.IdUtilisateur, SecuriteSociale, Nom, Prenom, Mail FROM patient, utilisateur WHERE utilisateur.IdUtilisateur = patient.IdUtilisateur");
$rows = array();
while($r = mysqli_fetch_assoc($t)) {
    $rows[] = $r;
}
echo json_encode($rows);
?>