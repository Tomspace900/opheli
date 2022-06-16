<?php
session_start();
session_destroy();
include("functions.php");
$bdd = mysqli_connect("localhost", "root", "", "ordonnance", "3307");
if (isset($_POST['code']) && isset($_POST['spe'])) {
    if (checkCode($bdd, $_POST['code'])) {
        session_start();
        $_SESSION['spe'] = $_POST['spe'];
        header('Location: register_med.php');
    } else {
        echo "<div>Mauvais code.</div>";
    }
}
?>