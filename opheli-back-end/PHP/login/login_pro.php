<?php
session_start();
session_destroy();
include ("../utiles/connexion.php");
include ("functions.php");
if (isset($_POST['login']) && isset($_POST['pwd'])) {
    if (isPro($bdd, $_POST['login'], $_POST['pwd']) > 1) {
        session_start();
        $_SESSION['mail'] = $_POST['login'];
        $_SESSION['role'] = iPro($bdd, $_POST['login'], $_POST['pwd']);
    } else {
        echo "Identifiant/mot de passe incorrect";
    }
}
?>