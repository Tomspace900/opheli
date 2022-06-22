<?php
session_start();
include("../utiles/connexion.php");
$t = $bdd -> query("SELECT utilisateur.IdUtilisateur, IdPrescripteur, NomSpecialite, Nom, Prenom, Mail FROM prescripteur, specialite, utilisateur WHERE utilisateur.IdUtilisateur = prescripteur.IdUtilisateur AND specialite.IdSpecialite = prescripteur.IdSpecialite");
$rows = array();
while($r = mysqli_fetch_assoc($t)) {
    $rows[] = $r;
}
echo json_encode($rows);
?>