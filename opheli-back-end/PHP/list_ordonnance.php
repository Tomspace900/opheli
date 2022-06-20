<?php
session_start();
include("utiles/connexion.php");
//if (isset($_SESSION['role'])) {
    //if ($_SESSION['role'] == 1) {
        $t = $bdd -> query("SELECT * FROM `ordonnance` WHERE SecuriteSociale = \"".$_SESSION['secu']."\"");
    //}

//}
echo $t;
?>