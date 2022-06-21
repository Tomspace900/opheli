<?php
if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');    // cache for 1 day
}
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
        header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
        header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
}
session_start();
include("../utiles/connexion.php");
$t = $bdd -> query("SELECT IdPrescripteur, NomSpecialite FROM prescripteur, specialite, utilisateur WHERE utilisateur.IdUtilisateur = prescripteur.IdUtilisateur AND specialite.IdSpecialite = prescripteur.IdSpecialite");
$rows = array();
while($r = mysqli_fetch_assoc($t)) {
    $rows[] = $r;
}
echo json_encode($rows);
?>