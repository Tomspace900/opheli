<?php
session_start();
include("utiles/connexion.php");
//if (isset($_SESSION['role'])) {
    //if ($_SESSION['role'] == 1) {
    $t = $bdd -> query("SELECT * FROM `prescripteur`");
    $rows = array();
    while($r = mysqli_fetch_assoc($t)) {
        $rows[] = $r;
    }
    //} SELECT * FROM `ordonnance` WHERE SecuriteSociale = \"".$_SESSION['secu']."\"

//}
echo json_encode($rows);
?>