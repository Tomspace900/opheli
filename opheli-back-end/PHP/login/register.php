<?php
include("functions.php");
$bdd = mysqli_connect("localhost", "root", "", "ordonnance", "3307");
if (isset($_POST['mail']) && isset($_POST['pwd']) && isset($_POST['nom']) && isset($_POST['prenom']) && isset($_POST['date']) && isset($_POST['num'])) {
    if ($_POST['pwd'] == $_POST['pwd2']) {
        $test = createUser($bdd, $_POST['mail'], $_POST['pwd'], $_POST['nom'], $_POST['prenom'], $_POST['date'], $_POST['num']);
        if ($test == false) {
            echo "<div>Cette adresse email est déjà utilisée.</div>";
        } else {
            session_start();
            $_SESSION['mail'] = $_POST['mail'];
            $_SESSION['role'] = isUser($bdd, $_POST['mail'], $_POST['pwd']);
        }
    } else {
        echo "<div>Mots de passe différents.</div>";
    }
}
?>