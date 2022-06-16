<!doctype html>
<html>

<head>
    <link rel="stylesheet" type="text/css" href="../css/login.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
</head>

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

<body>
<div class="container">
    <div class="row vh-100 justify-content-center align-items-center">
        <div class="col-auto bg-dark p-5 rounded">
            <div class="text-center text-light h1 my-2">S'inscrire en tant que professionnel</div>
            <div class="text-center text-white">Afin d'obtenir un code de création, merci d'envoyer un mail à cette adresse : </div>
            <form action="register_pro.php" method="post">
                <?php
                $t = $bdd -> query("SELECT * FROM specialite");
                ?>
                <!-- Prenom & Nom -->
                <div class="row my-2 g-2">
                    <div class="form-floating">
                        <input type="text" class="form-control" id="code" name="code" required value="<?php if (isset($_POST['code'])) {echo $_POST['code'];} ?>">
                        <label for="code">Code de création de compte</label>
                    </div>
                    <div class="form-floating">
                        <select id="spe" name="spe" class="form-control">
                            <?php
                            //A TRADUIRE EN REACT
                            while ($test = mysqli_fetch_row($t)) {
                                echo "<option value='".$test[0]."'>".$test[1]."</option>";
                            }
                            ?>
                        </select>
                        <label for="code">Catégorie</label>
                    </div>

                    <div class="row my-2 g-2 justify-content-center">
                        <div class="col-md-auto">
                            <button class="btn btn-primary" type="submit">S'inscrire</button>
                        </div>
                        <div class="col-md-auto">
                            <button class="btn btn-danger" type="reset">Annuler</button>
                        </div>
                    </div>
                <div class="text-center text-white"><a style="color:white" href="login.php">J'ai déjà une compte</a></div>
                <div class="text-center text-white"><a style="color:white" href="register.php">S'inscrire en tant que patient</a></div>
            </form>
        </div>
    </div>
</div>


<!-- Bootstrap scripts -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>

</body>

</html>
