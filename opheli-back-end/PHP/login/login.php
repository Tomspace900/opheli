<?php
session_start();
session_destroy();
include ("../utiles/connexion.php");
include ("functions.php");
if (isset($_POST['login']) && isset($_POST['pwd'])) {
    if (isUser($bdd, $_POST['login'], $_POST['pwd']) > 0) {
        session_start();
        $_SESSION['mail'] = $_POST['login'];
        $_SESSION['role'] = isUser($bdd, $_POST['login'], $_POST['pwd']);
    } else {
        echo "Identifiant/mot de passe incorrect";
    }
}
?>