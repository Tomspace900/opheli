<?php
$bdd = mysqli_connect("localhost", "root", "", "ordonnance", "3307");
include("functions.php");
if (isset($_POST['mail']) && isset($_POST['pwd']) && isset($_POST['nom']) && isset($_POST['prenom']) && isset($_POST['num'])) {
    if ($_POST['pwd'] == $_POST['pwd2']) {
        if ($_SESSION["spe"] == 4) {
            if (isset($_POST['rue']) && strlen($_POST['rue'])!=0 && isset($_POST['code']) && strlen($_POST['code'])!=0 && isset($_POST['ville']) && strlen($_POST['ville'])!=0) {
                createPharm1($bdd,$_POST['mail'],$_POST['pwd'],$_POST['nom'],$_POST['prenom'],$_POST['num'],$_POST['nomp'],$_POST['rue'],$_POST['code'],$_POST['ville']);
            } else {
                createPharm2($bdd,$_POST['mail'],$_POST['pwd'],$_POST['nom'],$_POST['prenom'],$_POST['num'],$_POST['pharm']);
            }
        } else {
            createMedic($bdd,$_POST['mail'],$_POST['pwd'],$_POST['nom'],$_POST['prenom'],$_POST['num'],$_POST['rue'],$_POST['code'],$_POST['ville']);
        }
        $_SESSION['mail'] = $_POST['mail'];
        $_SESSION['role'] = isUser($bdd, $_POST['mail'], $_POST['pwd']);
    } else {
        echo "<div>Mots de passe différents.</div>";
    }
}
?>