<?php
session_start();
session_destroy();
if (isset($_POST['login']) && isset($_POST['pwd'])) {
    $bdd = mysqli_connect("localhost","root","", "ordonnance","3307");
    include("functions.php");
    if (isUser($bdd, $_POST['login'], $_POST['pwd']) > 0) {
        session_start();
        $_SESSION['mail'] = $_POST['login'];
        $_SESSION['role'] = isUser($bdd, $_POST['login'], $_POST['pwd']);
        header("Location: ../accueil.php");
    } else {
        echo "Identifiant/mot de passe incorrect";
    }
}
?>