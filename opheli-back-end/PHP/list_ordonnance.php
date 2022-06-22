<?php
session_start();
header('Access-Control-Allow-Origin: http://localhost:3000');
include("utiles/connexion.php");
//if (isset($_SESSION['role'])) {
//if ($_SESSION['role'] == 1) {
$t = $bdd -> query("SELECT * FROM `prescripteur`");
$rows = array();
while($r = mysqli_fetch_assoc($t)) {
    $rows[] = $r;
}
echo json_encode($rows);
?>