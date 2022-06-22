<?php
include("../utiles/connexion.php");
if (isset($_POST["toDelete"])) {
    $t = $bdd -> query("SELECT IdPrescripteur FROM prescripteur WHERE IdUtilisateur = '".$_POST["toDelete"]."' ");
    $test = mysqli_fetch_row($t);
    if ($test != false) {
        $t = $bdd -> query("DELETE FROM prescripteur WHERE IdUtilisateur = '".$_POST["toDelete"]."' ");
        $t = $bdd -> query("DELETE FROM utilisateur WHERE IdUtilisateur = '".$_POST["toDelete"]."' ");
    } else {
        $t = $bdd -> query("SELECT SecuriteSociale FROM patient WHERE IdUtilisateur = '".$_POST["toDelete"]."' ");
        $test = mysqli_fetch_row($t);
        if ($test != false) {
            $t = $bdd -> query("DELETE FROM patient WHERE IdUtilisateur = '".$_POST["toDelete"]."' ");
            $t = $bdd -> query("DELETE FROM utilisateur WHERE IdUtilisateur = '".$_POST["toDelete"]."' ");
        }
    }
}